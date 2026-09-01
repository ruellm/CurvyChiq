# CurvyChiQ — repo context for Claude Code

Plus-size fashion e-commerce site (Zara-styled), built as a paid college capstone project.
Full context in `PROJECT_BRIEF.md`; the phase plan is in `PROJECT_PLAN.md`. **Read both before
starting substantial work.**

## Stack

- Next.js 16.1.4, App Router, Server Components + Server Actions
- React 19.2.3, TypeScript
- **CSS Modules** for all styling — Tailwind is **NOT** installed
- `mysql2` (migrating to Postgres/Neon — confirm current state before writing queries)
- `nodemailer` for order emails

## Commands

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
node scripts/migrate.mjs   # schema + seed (reads env vars)
```

## Layout

```
app/            routes (App Router). actions.ts is the current data layer.
components/     shared UI — Header, CartSidebar, ProductCard, SizeChart, CartContext
lib/db.ts       database connection
data/           inventory.json — SEED INPUT ONLY, never read at runtime
public/generated/  50 product images
scripts/        migration and maintenance tools (run locally, never deployed)
```

## Conventions

- Match the surrounding style: CSS Modules, not utility classes or inline styles
- Server Components by default; `'use client'` only where interactivity requires it
- Fetch only what a page needs — do not load the whole catalogue to render one product
- Database is the single source of truth
- Money, stock and order code must be transactional and explicitly tested

## Never do these

These all exist in the git history and some may still be in the tree. Do not reintroduce them.

1. **No `data/inventory.json` fallback at runtime.** The database is the only source of truth.
   If it is down, show an error — never silently serve stale data.
2. **No localStorage authentication.** Sessions are httpOnly cookies, passwords are hashed
   (bcrypt/argon2). Never store a password anywhere but as a hash.
3. **No card number, expiry or CVC capture.** Payment is demonstration mode only.
4. **No secrets in the repo.** Env vars only; `.env*` is gitignored.
5. **No unprotected `/admin` route or admin server action.** Every one needs an auth check —
   middleware alone is not enough if an action can be invoked directly.
6. **No slug derived from a product name at render time.** Slugs are stored and permanent.
7. **No writing to the filesystem at runtime.** Serverless has no persistent disk — uploads go
   to Cloudinary.

## Scope boundary

Fourteen features are explicitly **out of scope** (deferred, quoted separately): search,
filter/sort, sale pricing, wishlist, saved addresses, password reset, Google sign-in, admin
category management, sales dashboard, customer list, review moderation, customer-written reviews,
newsletter signup, SEO basics.

Do not build these. If one seems necessary, flag it rather than absorbing it.

## Current phase

**Step 0 — pre-flight.** Git repo, database decision (MySQL vs Postgres), accounts, client data.
See `PROJECT_PLAN.md`.
