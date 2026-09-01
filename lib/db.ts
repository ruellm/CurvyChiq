import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/db/schema'

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error(
    'DATABASE_URL is not set. The database is the only source of truth for the catalogue, ' +
      'there is no local fallback.',
  )
}

// DB_LOG=true prints every statement, for checking how many queries a page really issues.
export const db = drizzle(neon(url), { schema, logger: process.env.DB_LOG === 'true' })

export type Db = typeof db
