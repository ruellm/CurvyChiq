import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { neon } from '@neondatabase/serverless'

config({ path: '.env.local' })

const DRY_RUN = process.argv.includes('--dry-run')

const IMAGE_DIR = 'public/generated'
const IMAGE_PREFIX = '/generated/'
const FOLDER = 'curvychiq/products'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set. Put it in .env.local`)
  return value
}

const databaseUrl = requireEnv('DATABASE_URL')

cloudinary.config({
  cloud_name: requireEnv('CLOUDINARY_CLOUD_NAME'),
  api_key: requireEnv('CLOUDINARY_API_KEY'),
  api_secret: requireEnv('CLOUDINARY_API_SECRET'),
  secure: true,
})

const sql = neon(databaseUrl)

// Filenames contain spaces, so the stored URL is decoded before it is matched against disk.
// The match is case sensitive on purpose: Windows would open White_Tee.jpeg for
// white_tee.jpeg, Linux and Cloudinary will not.
function localFileFor(url: string, onDisk: Set<string>): string | null {
  if (!url.startsWith(IMAGE_PREFIX)) return null
  const name = decodeURIComponent(url.slice(IMAGE_PREFIX.length))
  if (!name || name.includes('/')) return null
  return onDisk.has(name) ? name : null
}

// public_id is the filename without its extension, so a second run overwrites the same
// asset instead of creating a duplicate. Spaces become underscores to keep %20 out of the
// delivery URLs; the files on disk keep their original names.
function publicIdFor(filename: string): string {
  return filename.replace(/\.[^.]+$/, '').replace(/ /g, '_')
}

type Row = { id: number; url: string }

async function main() {
  const onDisk = new Set(readdirSync(resolve(process.cwd(), IMAGE_DIR)))
  const rows = (await sql`select id, url from product_images order by id`) as Row[]

  const alreadyRemote = rows.filter((r) => /^https?:\/\//.test(r.url))
  const pending = rows.filter((r) => !/^https?:\/\//.test(r.url))

  console.log(`product_images rows : ${rows.length}`)
  console.log(`already on Cloudinary: ${alreadyRemote.length}`)
  console.log(`to migrate           : ${pending.length}`)

  const missing: Row[] = []
  const work: { row: Row; filename: string; path: string; publicId: string }[] = []

  for (const row of pending) {
    const filename = localFileFor(row.url, onDisk)
    if (!filename) {
      missing.push(row)
      continue
    }
    const path = resolve(process.cwd(), IMAGE_DIR, filename)
    if (!existsSync(path)) {
      missing.push(row)
      continue
    }
    work.push({ row, filename, path, publicId: publicIdFor(filename) })
  }

  if (missing.length) {
    console.error(`\n${missing.length} row(s) point at a file that is not on disk:`)
    for (const r of missing) console.error(`  id ${r.id}  ${r.url}`)
    console.error('\nNothing uploaded. The database and Cloudinary are unchanged.')
    process.exit(1)
  }

  // Two different files must never map to one public_id, or the second upload would
  // silently replace the first.
  const byPublicId = new Map<string, string[]>()
  for (const w of work) {
    const list = byPublicId.get(w.publicId) ?? []
    list.push(w.filename)
    byPublicId.set(w.publicId, list)
  }
  const collisions = [...byPublicId].filter(([, files]) => files.length > 1)
  if (collisions.length) {
    console.error(`\n${collisions.length} public_id collision(s):`)
    for (const [id, files] of collisions) console.error(`  ${id}  <-  ${files.join(', ')}`)
    console.error('\nNothing uploaded. Change publicIdFor so these stay distinct.')
    process.exit(1)
  }
  console.log(`distinct public_ids  : ${byPublicId.size}`)

  if (DRY_RUN) {
    console.log('\n=== DRY RUN, nothing uploaded and nothing written ===')
    for (const w of work.slice(0, 5)) {
      console.log(`  ${w.row.url}\n    -> ${FOLDER}/${w.publicId}`)
    }
    console.log(`  ... ${work.length} file(s) total`)
    return
  }

  let uploaded = 0
  let updated = 0
  const samples: { id: number; before: string; after: string }[] = []

  for (const w of work) {
    const result = await cloudinary.uploader.upload(w.path, {
      folder: FOLDER,
      public_id: w.publicId,
      overwrite: true,
      // Never let Cloudinary invent a suffix; the public_id must stay stable across runs.
      unique_filename: false,
      use_filename: false,
      resource_type: 'image',
    })
    uploaded++

    const before = w.row.url
    await sql`update product_images set url = ${result.secure_url} where id = ${w.row.id}`
    updated++

    if (samples.length < 3) samples.push({ id: w.row.id, before, after: result.secure_url })
    console.log(`  [${uploaded}/${work.length}] ${w.filename} -> ${result.secure_url}`)
  }

  console.log(`\nUploaded : ${uploaded}`)
  console.log(`Rows updated: ${updated}`)
  for (const s of samples) {
    console.log(`\nrow ${s.id}\n  before: ${s.before}\n  after : ${s.after}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
