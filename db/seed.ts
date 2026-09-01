import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { sql } from 'drizzle-orm'
import { categories, productImages, productVariants, products, reviews } from './schema'

config({ path: '.env.local' })

const DRY_RUN = process.argv.includes('--dry-run')

// The four real categories. "New Arrival" is not one of them, it is products.is_new_arrival.
const CATEGORIES = ['Tops', 'Bottoms', 'Dresses', 'Accessories'] as const
type CategoryName = (typeof CATEGORIES)[number]

// The five products still filed under "New Arrival" in the JSON, with the category the
// client picked for each. Product 26 already carries a real category and is not listed.
const NEW_ARRIVAL_CATEGORY: Record<string, CategoryName> = {
  '25': 'Tops', // Tweed Cropped Blazer
  '27': 'Dresses', // Velvet Evening Gown
  '28': 'Tops', // Cashmere Blend Poncho
  '29': 'Tops', // Distressed Denim Jacket
  '30': 'Dresses', // Sequined Party Dress
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const
const PLACEHOLDER_STOCK = 10

// Most of the URLs in inventory.json point at files that were never generated. Only images
// that actually exist in public/generated get seeded.
const IMAGE_DIR = 'public/generated'
const IMAGE_PREFIX = '/generated/'

function loadImageFiles(): Set<string> {
  return new Set(readdirSync(resolve(process.cwd(), IMAGE_DIR)))
}

// Case sensitive on purpose. The dev machine is Windows, production is Linux, and a name that
// only differs by case works here and 404s there.
function imageExists(url: string | undefined, files: Set<string>): boolean {
  if (!url || !url.startsWith(IMAGE_PREFIX)) return false
  const name = decodeURIComponent(url.slice(IMAGE_PREFIX.length))
  if (!name || name.includes('/')) return false
  return files.has(name)
}

type JsonReview = {
  id: string
  reviewer: string
  rating: number
  date: string
  comment: string
  sizePurchased: string
}

type JsonProduct = {
  id: string
  name: string
  price: number
  category: string
  description: string
  image?: string
  colors: string[]
  colorImages: Record<string, string[]>
  reviews: JsonReview[]
  isNewArrival?: boolean
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type Rows = {
  categories: { name: string; slug: string; sortOrder: number; isActive: boolean }[]
  products: {
    jsonId: string
    name: string
    slug: string
    description: string
    categoryName: CategoryName
    basePrice: string
    status: 'published'
    isNewArrival: boolean
  }[]
  productImages: {
    jsonId: string
    colour: string | null
    url: string
    sortOrder: number
    isPrimary: boolean
  }[]
  productVariants: {
    jsonId: string
    size: string
    colour: string
    sku: string
    stockQty: number
    isActive: boolean
  }[]
  reviews: {
    jsonId: string
    reviewerName: string
    rating: number
    comment: string
    sizePurchased: string
    isApproved: boolean
    createdAt: Date
  }[]
}

type ImageStats = {
  urlsSeen: number
  kept: number
  droppedMissing: number
  droppedRedundant: number
  noImages: { id: string; name: string; colours: number }[]
  fewerThanColours: { id: string; name: string; images: number; colours: number }[]
}

function buildRows(
  inventory: JsonProduct[],
  imageFiles: Set<string>,
): { rows: Rows; errors: string[]; imageStats: ImageStats } {
  const errors: string[] = []
  const imageStats: ImageStats = {
    urlsSeen: 0,
    kept: 0,
    droppedMissing: 0,
    droppedRedundant: 0,
    noImages: [],
    fewerThanColours: [],
  }
  const rows: Rows = {
    categories: CATEGORIES.map((name, i) => ({
      name,
      slug: slugify(name),
      sortOrder: i,
      isActive: true,
    })),
    products: [],
    productImages: [],
    productVariants: [],
    reviews: [],
  }

  const slugOwner = new Map<string, string>()
  const skuOwner = new Map<string, string>()

  for (const p of inventory) {
    const label = `product ${p.id} "${p.name}"`

    const categoryName =
      p.category === 'New Arrival' ? NEW_ARRIVAL_CATEGORY[p.id] : (p.category as CategoryName)

    if (!categoryName) {
      errors.push(`${label}: category "New Arrival" with no mapping in NEW_ARRIVAL_CATEGORY`)
      continue
    }
    if (!CATEGORIES.includes(categoryName)) {
      errors.push(`${label}: unknown category "${p.category}"`)
      continue
    }
    if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price < 0) {
      errors.push(`${label}: bad price ${JSON.stringify(p.price)}`)
      continue
    }
    if (!p.colors?.length) {
      errors.push(`${label}: no colours`)
      continue
    }

    const slug = slugify(p.name)
    if (!slug) {
      errors.push(`${label}: name produces an empty slug`)
      continue
    }
    const collidesWith = slugOwner.get(slug)
    if (collidesWith) {
      errors.push(`${label}: slug "${slug}" collides with product ${collidesWith}`)
      continue
    }
    slugOwner.set(slug, p.id)

    rows.products.push({
      jsonId: p.id,
      name: p.name,
      slug,
      description: p.description,
      categoryName,
      basePrice: p.price.toFixed(2),
      status: 'published',
      isNewArrival: p.isNewArrival === true,
    })

    // Images: walk colors in order, keeping only URLs whose file is actually on disk.
    const imageColours = Object.keys(p.colorImages ?? {})
    const orphaned = imageColours.filter((c) => !p.colors.includes(c))
    if (orphaned.length) {
      errors.push(`${label}: colorImages has colours not in colors: ${orphaned.join(', ')}`)
    }

    const kept: Rows['productImages'] = []
    const allUrls = [...p.colors.flatMap((c) => p.colorImages?.[c] ?? []), ...(p.image ? [p.image] : [])]
    const missing = allUrls.filter((url) => !imageExists(url, imageFiles)).length

    for (const colour of p.colors) {
      const urls = p.colorImages?.[colour] ?? []
      // sort_order is resequenced over the survivors so there are no gaps.
      urls
        .filter((url) => imageExists(url, imageFiles))
        .forEach((url, i) => {
          kept.push({ jsonId: p.id, colour, url, sortOrder: i, isPrimary: false })
        })
    }

    // Fall back to the single main image only when no colour gallery survived.
    if (kept.length === 0 && imageExists(p.image, imageFiles)) {
      kept.push({ jsonId: p.id, colour: null, url: p.image!, sortOrder: 0, isPrimary: false })
    }

    imageStats.urlsSeen += allUrls.length
    imageStats.droppedMissing += missing
    // A main image that exists but was not needed, because the colour gallery survived.
    imageStats.droppedRedundant += allUrls.length - missing - kept.length

    // Exactly one primary per product that has any image at all, none for a product with none.
    if (kept.length > 0) kept[0].isPrimary = true
    const primaryCount = kept.filter((r) => r.isPrimary).length
    if (primaryCount !== (kept.length > 0 ? 1 : 0)) {
      errors.push(`${label}: ${primaryCount} primary images for ${kept.length} image rows`)
    }

    imageStats.kept += kept.length
    rows.productImages.push(...kept)

    // A product with no surviving image is seeded anyway. The UI fallback is task 1.11.
    if (kept.length === 0) {
      imageStats.noImages.push({ id: p.id, name: p.name, colours: p.colors.length })
    } else if (kept.length < p.colors.length) {
      imageStats.fewerThanColours.push({
        id: p.id,
        name: p.name,
        images: kept.length,
        colours: p.colors.length,
      })
    }

    // Variants: every colour crossed with every size.
    for (const colour of p.colors) {
      for (const size of SIZES) {
        const sku = `${slug}-${colour}-${size}`.toUpperCase()
        const skuCollidesWith = skuOwner.get(sku)
        if (skuCollidesWith) {
          errors.push(`${label}: sku "${sku}" collides with product ${skuCollidesWith}`)
          continue
        }
        skuOwner.set(sku, p.id)
        rows.productVariants.push({
          jsonId: p.id,
          size,
          colour,
          sku,
          stockQty: PLACEHOLDER_STOCK,
          isActive: true,
        })
      }
    }

    for (const r of p.reviews ?? []) {
      if (!r.reviewer) {
        errors.push(`${label}: review ${r.id} has no reviewer name`)
        continue
      }
      if (!(r.rating >= 1 && r.rating <= 5)) {
        errors.push(`${label}: review ${r.id} rating ${r.rating} outside 1-5`)
        continue
      }
      const createdAt = new Date(r.date)
      if (Number.isNaN(createdAt.getTime())) {
        errors.push(`${label}: review ${r.id} has unparseable date "${r.date}"`)
        continue
      }
      rows.reviews.push({
        jsonId: p.id,
        reviewerName: r.reviewer,
        rating: r.rating,
        comment: r.comment,
        sizePurchased: r.sizePurchased,
        isApproved: true,
        createdAt,
      })
    }
  }

  return { rows, errors, imageStats }
}

function reportImages(s: ImageStats) {
  console.log('\nImages:')
  console.log(`  urls in inventory.json   ${s.urlsSeen}`)
  console.log(`  kept (file on disk)      ${s.kept}`)
  console.log(`  dropped, file missing    ${s.droppedMissing}`)
  console.log(`  dropped, main img unused ${s.droppedRedundant}`)

  console.log(`\nProducts with zero images (${s.noImages.length}), seeded anyway:`)
  if (!s.noImages.length) console.log('  none')
  for (const p of s.noImages) {
    console.log(`  ${p.id.padStart(2)}  ${p.name.padEnd(26)} ${p.colours} colours, 0 images`)
  }

  console.log(`\nProducts with fewer images than colours (${s.fewerThanColours.length}):`)
  if (!s.fewerThanColours.length) console.log('  none')
  for (const p of s.fewerThanColours) {
    console.log(
      `  ${p.id.padStart(2)}  ${p.name.padEnd(26)} ${p.images} images, ${p.colours} colours`,
    )
  }
}

function report(rows: Rows) {
  const counts = {
    categories: rows.categories.length,
    products: rows.products.length,
    product_images: rows.productImages.length,
    product_variants: rows.productVariants.length,
    reviews: rows.reviews.length,
  }
  console.log('\nRows per table:')
  for (const [table, n] of Object.entries(counts)) {
    console.log(`  ${table.padEnd(17)} ${n}`)
  }
  console.log(`  ${'total'.padEnd(17)} ${Object.values(counts).reduce((a, b) => a + b, 0)}`)
  return counts
}

function preview(rows: Rows) {
  const sections: [string, unknown[]][] = [
    ['categories', rows.categories],
    ['products', rows.products],
    ['product_images', rows.productImages],
    ['product_variants', rows.productVariants],
    ['reviews', rows.reviews],
  ]
  for (const [name, list] of sections) {
    console.log(`\n${name} (first 2 of ${list.length}):`)
    console.dir(list.slice(0, 2), { depth: null, maxStringLength: 90 })
  }
}

async function main() {
  const path = resolve(process.cwd(), 'data/inventory.json')
  const inventory: JsonProduct[] = JSON.parse(readFileSync(path, 'utf8'))
  console.log(`Read ${inventory.length} products from ${path}`)

  const imageFiles = loadImageFiles()
  console.log(`Found ${imageFiles.size} files in ${IMAGE_DIR}`)

  const { rows, errors, imageStats } = buildRows(inventory, imageFiles)

  if (errors.length) {
    console.error(`\n${errors.length} validation failure(s):`)
    for (const e of errors) console.error(`  ${e}`)
    console.error('\nNothing written. Fix the data or the mapping and run again.')
    process.exit(1)
  }
  console.log('Validation passed, no products rejected.')

  if (DRY_RUN) {
    console.log('\n=== DRY RUN, nothing will be written ===')
    report(rows)
    reportImages(imageStats)
    preview(rows)
    console.log('\nDry run complete. Re-run without --dry-run to write.')
    return
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Put it in .env.local')
  }
  const db = drizzle(neon(process.env.DATABASE_URL), {
    schema: { categories, products, productImages, productVariants, reviews },
  })

  // TRUNCATE ... CASCADE reaches cart_items and order_items through product_variants,
  // so refuse to run if there is anything real to lose.
  const guard = await db.execute<{ orders: number; cartItems: number }>(sql`
    select
      (select count(*)::int from orders) as "orders",
      (select count(*)::int from cart_items) as "cartItems"
  `)
  const { orders, cartItems } = guard.rows[0]
  if (orders > 0 || cartItems > 0) {
    throw new Error(
      `Refusing to seed: ${orders} order(s) and ${cartItems} cart item(s) exist. ` +
        'Truncating the catalogue would cascade into them.',
    )
  }

  await db.execute(
    sql`truncate table reviews, product_images, product_variants, products, categories restart identity cascade`,
  )

  const insertedCategories = await db.insert(categories).values(rows.categories).returning()
  const categoryId = new Map(insertedCategories.map((c) => [c.name, c.id]))

  const insertedProducts = await db
    .insert(products)
    .values(
      rows.products.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        categoryId: categoryId.get(p.categoryName)!,
        basePrice: p.basePrice,
        status: p.status,
        isNewArrival: p.isNewArrival,
      })),
    )
    .returning({ id: products.id, slug: products.slug })

  const productId = new Map(
    rows.products.map((p, i) => {
      if (insertedProducts[i].slug !== p.slug) {
        throw new Error(`Insert order changed: expected ${p.slug}, got ${insertedProducts[i].slug}`)
      }
      return [p.jsonId, insertedProducts[i].id]
    }),
  )

  // One batch, so the three child tables land in a single server-side transaction.
  await db.batch([
    db.insert(productImages).values(
      rows.productImages.map((r) => ({
        productId: productId.get(r.jsonId)!,
        colour: r.colour,
        url: r.url,
        sortOrder: r.sortOrder,
        isPrimary: r.isPrimary,
      })),
    ),
    db.insert(productVariants).values(
      rows.productVariants.map((r) => ({
        productId: productId.get(r.jsonId)!,
        size: r.size,
        colour: r.colour,
        sku: r.sku,
        stockQty: r.stockQty,
        isActive: r.isActive,
      })),
    ),
    db.insert(reviews).values(
      rows.reviews.map((r) => ({
        productId: productId.get(r.jsonId)!,
        userId: null,
        orderId: null,
        reviewerName: r.reviewerName,
        rating: r.rating,
        comment: r.comment,
        sizePurchased: r.sizePurchased,
        isApproved: r.isApproved,
        createdAt: r.createdAt,
      })),
    ),
  ])

  console.log('\nSeed complete.')
  report(rows)
  reportImages(imageStats)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
