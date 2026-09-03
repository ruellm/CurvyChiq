# CurvyChiQ — repo context for Claude Code

Plus-size fashion e-commerce site (Zara-styled), built as a paid college capstone project.
Phase 1 is complete. Read `PHASE_1_SUMMARY.md` first, then `PROJECT_BRIEF.md` for full context
and `PROJECT_PLAN.md` for the phase plan. **Read all three before starting substantial work.**

## Stack

- Next.js 16.1.4, App Router, Server Components + Server Actions
- React 19.2.3, TypeScript, `strict` on
- **CSS Modules** for the customer-facing site — the look is contractually preserved
- **Tailwind v4 for `/admin` only**, via `app/admin/admin.css`. Preflight is deliberately not
  imported so it cannot reset the customer pages. Never import it outside `app/admin/`
- **PostgreSQL on Neon**, `drizzle-orm` + `@neondatabase/serverless` HTTP driver
- **Cloudinary** for product images
- `nodemailer` is installed but **unused** — nothing imports it. Task 3.10 will likely use
  Resend or Brevo instead

## Commands

```bash
npm run dev                          # dev server
npm run build                        # production build
npm run lint                         # eslint
npx drizzle-kit generate             # emit migration SQL from db/schema.ts
npx tsx db/seed.ts --dry-run         # seed preview, writes nothing
npx tsx db/seed.ts                   # seed the catalogue (truncates first)
npx tsx scripts/migrate-images.ts    # upload local images to Cloudinary, repoint URLs
ADMIN_ENABLED=true npm run dev       # the only way to reach /admin
```

`scripts/migrate.mjs` is the legacy MySQL migrator. It is superseded by drizzle-kit and pending
deletion. Do not run it.

## Layout

```
app/              routes. actions.ts holds server actions ONLY, never reads
app/admin/        Tailwind-styled admin, blocked by middleware.ts (404) unless ADMIN_ENABLED
components/       shared UI — Header, CartSidebar, ProductCard, SizeChart, CartContext
db/schema.ts      14 tables, the single source of schema truth
db/queries.ts     the ONLY module that talks to the database
db/seed.ts        seeds the catalogue from data/inventory.json
drizzle/          generated migration SQL, checked in
lib/db.ts         drizzle + Neon HTTP client
middleware.ts     404s /admin unless ADMIN_ENABLED=true
scripts/          migrate-images.ts, generate_doc.js, migrate.mjs (legacy)
data/             inventory.json — SEED INPUT ONLY, never read at runtime
public/generated/ 50 local images, kept as the only backup now that Cloudinary serves them
```

## Conventions

- Match the surrounding style: CSS Modules on customer pages, Tailwind only under `app/admin/`
- Server Components by default; `'use client'` only where interactivity requires it
- All reads go through `db/queries.ts`. Pages do not query directly
- Fetch only what a page needs. A product page is 1 query; a listing page must not load variant
  rows per card
- Database is the single source of truth
- Money, stock and order code must be explicitly tested. **The Neon HTTP driver has no
  interactive transactions** — use a conditional `UPDATE ... WHERE stock_qty >= $1` and check the
  affected row count, and `db.batch()` for multi-table writes

## Never do these

Every one of these existed in this repo and was removed in Phase 1. Do not reintroduce them.

1. **No `data/inventory.json` fallback at runtime.** The database is the only source of truth.
   If it is down, show an error — never silently serve stale data.
2. **No localStorage authentication.** Sessions are httpOnly cookies, passwords are hashed
   (bcrypt/argon2). Never store a password anywhere but as a hash. The only legitimate
   localStorage use is the guest cart under `curvychiq-cart`, until task 3.4 moves it server-side.
3. **No card number, expiry or CVC capture.** Payment is demonstration mode only.
4. **No secrets in the repo.** Env vars only; `.env*` is gitignored. Never add `ADMIN_ENABLED`
   to `.env.example` or to Vercel.
5. **No unprotected `/admin` route or admin server action.** Every one needs an auth check —
   middleware alone is not enough if an action can be invoked directly.
6. **No slug derived from a product name at render time.** Slugs are stored and permanent; read
   `products.slug`.
7. **No writing to the filesystem at runtime.** Serverless has no persistent disk — uploads go
   to Cloudinary.
8. **No hardcoded sizes.** `['S','M','L','XL','XXL']` was hardcoded in two components. Sizes come
   from `product_variants` for the selected colour. The only legitimate copy is `db/seed.ts`.
9. **No Tailwind preflight on customer pages.** It resets every element globally and the CSS
   Modules look is contractual. Verify with a before/after diff of the served CSS if you touch
   the Tailwind setup.
10. **No float for money.** `numeric(10,2)` everywhere. No `timestamp` without a time zone.
11. **No success screen for something that saved nothing.** If a form has nowhere to submit,
    disable it and say so.

## Scope boundary

Fourteen features are explicitly **out of scope** (deferred, quoted separately): search,
filter/sort, sale pricing, wishlist, saved addresses, password reset, Google sign-in, admin
category management, sales dashboard, customer list, review moderation, customer-written reviews,
newsletter signup, SEO basics.

Do not build these. If one seems necessary, flag it rather than absorbing it.

## Current phase

**Phase 1 complete.** Next is **Phase 2 — admin area (week 3)**, starting with task 2.1, real
admin authentication, which replaces the `ADMIN_ENABLED` shutter in `middleware.ts`.

Deliberately switched off right now: login, register, profile, checkout and `/admin`. Each
renders a clear disabled state rather than a form that discards input. See `PHASE_1_SUMMARY.md`
for which phase restores each.
