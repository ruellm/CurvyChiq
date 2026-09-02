import { sql, type SQL } from 'drizzle-orm'
import { db } from '@/lib/db'

// The shape the UI has always consumed. Kept as the boundary so no component has to change,
// but every field now comes out of the normalised schema.
export interface Review {
  id: string
  reviewer: string
  rating: number
  date: string
  comment: string
  sizePurchased: string
}

export interface Variant {
  size: string
  colour: string
  stockQty: number
  isActive: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: string
  image: string | null
  description?: string
  colors?: string[]
  colorImages?: Record<string, string[]>
  isNewArrival?: boolean
  rating?: string
  reviewCount?: number
  reviews?: Review[]
  // True when no variant is both active and in stock. Aggregated in SQL so a card never has
  // to load the variant rows.
  soldOut: boolean
  // Populated by getProductBySlug and getProductById only. List queries leave it empty and
  // use soldOut instead.
  variants: Variant[]
}

type ProductRow = {
  id: number
  name: string
  slug: string
  description: string | null
  base_price: string
  is_new_arrival: boolean
  category: string
  image: string | null
  images: { colour: string; url: string }[]
  variants: Variant[]
  colours: string[]
  sold_out: boolean
  review_count: number
  rating: string | null
  reviews: {
    id: number
    reviewer: string
    rating: number
    comment: string | null
    sizePurchased: string | null
    createdAt: string
  }[]
}

// Reviews and the full variant list are only worth fetching on a product page. A card needs
// neither: it renders the review count, the colours and one sold-out flag, all aggregated in
// this same statement so listing pages stay at one query.
function selectProduct(detail: boolean): SQL {
  const reviews = detail
    ? sql`coalesce((
        select json_agg(json_build_object(
          'id', r.id, 'reviewer', r.reviewer_name, 'rating', r.rating,
          'comment', r.comment, 'sizePurchased', r.size_purchased, 'createdAt', r.created_at
        ) order by r.created_at desc)
        from reviews r where r.product_id = p.id and r.is_approved
      ), '[]'::json)`
    : sql`'[]'::json`

  const variants = detail
    ? sql`coalesce((
        select json_agg(json_build_object(
          'size', v.size, 'colour', v.colour, 'stockQty', v.stock_qty, 'isActive', v.is_active
        ) order by v.id)
        from product_variants v where v.product_id = p.id
      ), '[]'::json)`
    : sql`'[]'::json`

  return sql`
    select
      p.id,
      p.name,
      p.slug,
      p.description,
      p.base_price,
      p.is_new_arrival,
      c.name as category,
      (select i.url from product_images i
        where i.product_id = p.id and i.is_primary limit 1) as image,
      coalesce((
        select json_agg(json_build_object('colour', i.colour, 'url', i.url)
                        order by i.colour, i.sort_order)
        from product_images i
        where i.product_id = p.id and i.colour is not null
      ), '[]'::json) as images,
      ${variants} as variants,
      -- Colours in the order they were first seeded, from the variants rather than the images.
      (select coalesce(json_agg(g.colour order by g.first_id), '[]'::json)
        from (
          select v.colour, min(v.id) as first_id
          from product_variants v where v.product_id = p.id
          group by v.colour
        ) g) as colours,
      -- Sold out when nothing sellable is left anywhere on the product.
      not exists (
        select 1 from product_variants v
        where v.product_id = p.id and v.is_active and v.stock_qty > 0
      ) as sold_out,
      (select count(*)::int from reviews r
        where r.product_id = p.id and r.is_approved) as review_count,
      (select round(avg(r.rating), 1) from reviews r
        where r.product_id = p.id and r.is_approved) as rating,
      ${reviews} as reviews
    from products p
    join categories c on c.id = p.category_id
  `
}

const REVIEW_DATE = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function toProduct(row: ProductRow): Product {
  const colorImages: Record<string, string[]> = {}
  for (const img of row.images) {
    ;(colorImages[img.colour] ??= []).push(img.url)
  }

  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    price: Number(row.base_price),
    category: row.category,
    image: row.image,
    description: row.description ?? undefined,
    colors: row.colours,
    colorImages,
    isNewArrival: row.is_new_arrival,
    soldOut: row.sold_out,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count,
    reviews: row.reviews.map((r) => ({
      id: String(r.id),
      reviewer: r.reviewer,
      rating: r.rating,
      date: REVIEW_DATE.format(new Date(r.createdAt)),
      comment: r.comment ?? '',
      sizePurchased: r.sizePurchased ?? '',
    })),
    variants: row.variants,
  }
}

async function run(query: SQL): Promise<Product[]> {
  const result = await db.execute<ProductRow>(query)
  return result.rows.map(toProduct)
}

export async function getProducts(): Promise<Product[]> {
  return run(sql`${selectProduct(false)} where p.status = 'published' order by p.id`)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const rows = await run(
    sql`${selectProduct(true)} where p.slug = ${slug} and p.status = 'published' limit 1`,
  )
  return rows[0]
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return run(
    sql`${selectProduct(false)} where c.slug = ${categorySlug} and p.status = 'published' order by p.id`,
  )
}

export async function getNewArrivals(): Promise<Product[]> {
  return run(
    sql`${selectProduct(false)} where p.is_new_arrival and p.status = 'published' order by p.id`,
  )
}

export type Category = { id: number; name: string; slug: string }

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const result = await db.execute<Category>(
    sql`select id, name, slug from categories where slug = ${slug} and is_active limit 1`,
  )
  return result.rows[0]
}

// Admin edit screen only. Kept so that page still compiles; /admin is blocked in middleware
// until Phase 2.
export async function getProductById(id: string): Promise<Product | undefined> {
  const numeric = Number(id)
  if (!Number.isInteger(numeric)) return undefined
  const rows = await run(sql`${selectProduct(true)} where p.id = ${numeric} limit 1`)
  return rows[0]
}
