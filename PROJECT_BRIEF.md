# CurvyChiQ — Project Brief

> **Purpose of this document:** to bring a fresh Claude conversation fully up to speed on the
> CurvyChiQ project. Read this first, then `PROJECT_PLAN.md` for the execution plan.
>
> Last updated: 2026-08-28

---

## 1. What this is

CurvyChiQ is a plus-size women's fashion e-commerce website (styled after Zara) built as a
**college capstone project**. The student owner already has a good-looking storefront but no
working shop behind it. We have been engaged to turn it into a real, database-backed,
deployed online store.

The developer (our side) is helping on a paid basis. This is **not our own product** — we are
the contractor.

---

## 2. The client and the constraints

| | |
|---|---|
| Client | CurvyChiQ — student owner, Philippines |
| Nature | College capstone / thesis project, submitted for a diploma |
| Hard requirement | Working site, **integrated with a database**, **deployed online** |
| Professor's requirement | Site must **stay live for approximately 1 year** |
| Payment processing | **Dummy / demonstration mode is acceptable** — no real money needs to move |
| Delivery tracking | **Dummy statuses acceptable** — no courier API needed |
| Budget | Student-sized. Negotiated down from ₱65,000 to **₱50,000** |
| Currency | Philippine pesos (₱) |

**Important nuance:** the "dummy payment is fine" allowance and the "live for a year"
requirement pull in opposite directions — a throwaway demo versus real production hosting.
Check decisions against both. She also has to **defend this to an academic panel**, so she must
be able to explain the schema and the order flow herself.

---

## 3. Commercial terms — APPROVED

The proposal has been accepted. These terms are settled:

| | |
|---|---|
| Package | **Essential** (the smaller of two originally offered) |
| Price | **₱50,000 fixed** — described to the client as a reduced capstone project rate |
| Timeline | **5 weeks, in 4 phases** |
| Features included | 27 |
| Features deferred | 14 (documented as "Available later", quoted separately) |
| Free post-launch fixes | 2 weeks |
| Optional care plan | ₱3,000–8,000/month, not yet taken up |

### Payment schedule

| Payment | Trigger | Amount |
|---|---|---|
| Deposit | On acceptance, before Phase 1 | ₱15,000 |
| Payment 2 | End of Phase 2 (week 3) — admin area working | ₱15,000 |
| Payment 3 | End of Phase 3 (week 4) — full purchase works end to end | ₱15,000 |
| Final | End of Phase 4 (week 5) — go-live and handover | ₱5,000 |

### The 14 deferred features (NOT in the ₱50,000 — do not build these)

Product search · filter and sort · sale prices and discount badges · wishlist ·
saved delivery addresses · forgot-password by email · Google sign-in ·
category management in admin · sales dashboard and reports · customer list ·
review moderation · customer-written reviews · newsletter signup · SEO basics

If any of these come up mid-project, they are a **change request**, quoted separately and
agreed in writing before any work starts. This is the main scope-creep risk.

---

## 4. Current codebase state

> Rewritten at the end of Phase 1. Everything below describes the repo as it actually is.
> See `PHASE_1_SUMMARY.md` for what changed and why.

### Stack

- **Next.js 16.1.4**, App Router, Server Components + Server Actions
- **React 19.2.3**, TypeScript, `strict` on
- **CSS Modules** for the customer-facing site — the look is contractually preserved
- **Tailwind v4** for `/admin` **only**, scoped so it cannot touch customer pages
- **PostgreSQL on Neon** via `drizzle-orm` and the `@neondatabase/serverless` HTTP driver
- **Cloudinary** for product images
- `nodemailer` is still installed but **unused** — nothing imports it

### Where things live

```
app/            routes. actions.ts holds server actions only, no reads
db/schema.ts    14 tables, the single source of schema truth
db/queries.ts   the only module that talks to the database
db/seed.ts      seeds the catalogue from data/inventory.json
drizzle/        generated migration SQL, checked in
lib/db.ts       drizzle + Neon HTTP client, throws if DATABASE_URL is missing
middleware.ts   blocks /admin with a 404 unless ADMIN_ENABLED=true
scripts/        migrate-images.ts (Cloudinary), generate_doc.js, migrate.mjs (legacy)
data/           inventory.json — SEED INPUT ONLY, never read at runtime
```

### What works, from the database

| Area | State |
|---|---|
| **Catalogue** | 29 products, 4 categories, served entirely from Postgres. No JSON fallback. |
| **Stock** | Real. 435 variants, one per size × colour, `UNIQUE (product_id, size, colour)`. |
| **Product page** | Real sizes per colour, sold-out sizes struck through and unselectable, sold-out colours dimmed, CTA disabled until an in-stock size is chosen. |
| **Listing pages** | Sold-out badge from a SQL aggregate. Cards link to the stored slug and no longer sell. |
| **Images** | 45 rows, all on Cloudinary. Local files kept in `public/generated/` as the only backup. |
| **Reviews** | 108 seeded rows displayed on product pages. Rating and count derived, not stored. |
| **Queries** | A product page issues **1** query; homepage 1; category pages 2. |
| **Size guide** | Reachable from the product page size selector. |

### What is deliberately switched off

These are not broken. They were removed because they were unsafe, and the page now says so.

| Area | State | Restored by |
|---|---|---|
| **Login / register** | Forms render, disabled, "coming soon" | Phase 3, tasks 3.1–3.2 |
| **Profile** | Signed-out notice | Phase 3 / Phase 4 (4.4) |
| **Checkout** | Renders, Place Order disabled | Phase 3, tasks 3.6–3.9 |
| **Orders** | `processOrder()` is a stub that saves nothing and admits it | Phase 3, task 3.7 |
| **Admin** | Returns **404** unless `ADMIN_ENABLED=true` | Phase 2, task 2.1 |
| **Admin writes** | `addProduct`/`updateProduct`/`deleteProduct` throw | Phase 2, tasks 2.3–2.7 |

### What is still missing

- No authentication of any kind. No `users` rows.
- No orders, payments or shipments. Those tables exist and are empty.
- Stock is a uniform placeholder of **10** on all 435 variants.
- Photography is thin: 23 of 29 products have any image, and only 2 have a full colour gallery.

---

## 5. Decisions made — now facts

1. **Continued from the existing source.** The presentation layer was kept, everything under it
   replaced. The ~1,850 lines of CSS Modules survive untouched.
2. **PostgreSQL on Neon.** Provisioned, migrated, seeded.
3. **Drizzle ORM** with the `@neondatabase/serverless` HTTP driver.
4. **Cloudinary** holds the product images; 45 assets under `curvychiq/products`.
5. **Vercel** for hosting. *Caveat unchanged:* the Hobby plan is non-commercial, which is
   accurate for a capstone but means Pro (~$20/mo) or Netlify if she ever trades for real.
6. **Cloudflare Pages ruled out** — Workers runtime, hostile to Node libraries.
7. **Payment and tracking stay simulated**, as agreed with the client.
8. **Security is folded into feature work.** The Phase 1 deletion checklist is complete.

---

## 6. Open decisions — RESOLVED

### A. MySQL or PostgreSQL? → **PostgreSQL on Neon**

Neon's free tier scales to zero but **auto-wakes**, so the site is never down when the
professor opens it. Its HTTP driver removes the serverless connection-pool problem entirely.
Postgres also *enforces* `CHECK` constraints, which MySQL silently ignored before 8.0.16 — that
matters because `CHECK (stock_qty >= 0)` is the backstop for the concurrency case in task 3.7.

### B. Raw SQL or a query builder? → **Drizzle**

Typed queries, and close enough to SQL that she can explain any of it to the panel. The schema
lives in TypeScript at `db/schema.ts` and `drizzle-kit generate` emits the migration SQL, which
is checked in and reviewable.

### C. Identity keys, not UUIDs

`GENERATED ALWAYS AS IDENTITY` integers. She has to defend the schema to a panel, and
"the database assigns it, and the application cannot overwrite it" is a sentence she can say.

---

## 7. Serverless constraints — how each is handled

| Constraint | Resolution |
|---|---|
| No SSH, no persistent filesystem | Migrations and seeds run from the developer's machine against the remote database. Deployment is git-push. |
| `data/inventory.json` read at runtime | **Removed.** `lib/db.ts` throws if `DATABASE_URL` is absent rather than serving stale JSON. |
| Connection pooling breaks | **Gone.** The Neon HTTP driver holds no connections. `mysql2` and its `connectionLimit: 10` pool are uninstalled. |
| Photo uploads need object storage | **Cloudinary.** All 45 images migrated; `next.config.ts` allows `res.cloudinary.com`. |
| `scripts/migrate.mjs` hardcoded localhost/root | Superseded by `drizzle-kit`. The file is still present pending a decision to delete it. |

### One constraint discovered during Phase 1

**The Neon HTTP driver has no interactive transactions.** `db.transaction()` throws. This is the
single most important thing to know before task 3.7. Two consequences:

- Stock deduction must be a **conditional UPDATE** — `... SET stock_qty = stock_qty - $1
  WHERE id = $2 AND stock_qty >= $1` — and check the affected row count, rather than
  read-then-write.
- Multi-table writes use `db.batch([...])`, which Neon executes as one server-side transaction.

---

## 8. Yearly running costs (client pays providers directly)

| Item | Provider | Cost |
|---|---|---|
| Domain | Namecheap / GoDaddy | ₱800–2,500/year — **the only certain cost** |
| Web hosting | Vercel | Free (non-commercial) |
| Database | Neon or TiDB | Free |
| Photo storage | Cloudinary | Free |
| Order emails | Resend or Brevo | Free (~3,000/month) |
| SSL | Included | Free |
| Uptime monitoring | UptimeRobot | Free |

Free-tier terms change often — verify before committing.

---

## 9. Risks to manage

1. **Unsafe code surviving because it looks finished.** The localStorage passwords, fake SSO,
   JSON fallback and card capture all currently "work". This is the top risk of continuing from
   source. Mitigation: an explicit deletion checklist completed in Phase 1, verified by grep —
   not deferred to Phase 4.
2. **Scope creep from the 14 deferred features.** Everything is written down; hold the line.
3. **Client response time.** The proposal makes ~2-day feedback at weekly check-ins an explicit
   condition of the 5-week timeline. It is the largest single source of delay on projects this size.
4. **Money, stock and concurrency bugs.** Two customers buying the last XL simultaneously is the
   classic case. Order creation and stock deduction must be transactional.
5. **She must be able to defend the code.** If she cannot explain her own schema to the panel,
   that is a real problem regardless of code quality. The handover walkthrough matters.
6. **Fake reviews.** All 29 products carry generated review data. Fine for a demo, should be
   cleared or disclosed before real customers see it.

---

## 10. How we are working

- **Claude web** — planning, schema design, architecture decisions, reviewing progress,
  drafting client communications. Attach the documents listed in the handover note.
- **Claude Code** — all implementation work, in the repo at `d:\dump\curvychiq\orig`.
  A `CLAUDE.md` in the repo root carries the project context automatically into every session.

---

## 11. Reference documents in the repo

In the repo (`d:\dump\curvychiq\orig`):

| File | What it is | Audience |
|---|---|---|
| `PHASE_1_SUMMARY.md` | What Phase 1 shipped, deleted and switched off — **read first** | Internal |
| `PROJECT_BRIEF.md` | This document | Internal |
| `PROJECT_PLAN.md` | Phase-by-phase execution plan | Internal |
| `CLAUDE.md` | Repo context, auto-loaded by Claude Code | Internal |
| `FULL_CODE_DOCUMENTATION.md` | Full source dump, generated 2026-03-23 | Reference |

In `d:\dump\curvychiq\Docs to send`:

| File | What it is | Audience |
|---|---|---|
| `CurvyChiQ_Proposal_v1.0.xlsx` | The approved client proposal — **the scope boundary** | **Client-facing** |
| `CurvyChiQ_VibeCoded_Time_and_Price.xlsx` | AI-assisted estimate + pricing strategy | **INTERNAL ONLY — must never be sent.** Contains effective hourly rates, margin analysis and negotiation notes. It is currently sitting in a folder called "Docs to send" — move it out. |

---

## 12. Waiting on the client — blocks Phase 2 sign-off

These three are not code problems. Nothing downstream can be finished without them, and all
three are visible in the demo.

### 12.1 Real stock numbers

Every one of the 435 variants is seeded at **10**. The Phase 1 demo line — "set a size to zero
and watch it grey out" — works, but the numbers are fiction. Needed: stock per size and colour,
per product. Until then no low-stock warning (task 2.7) means anything.

### 12.2 Product photography

The image data she supplied is mostly missing from disk. Current state:

| | |
|---|---|
| Products with a full colour gallery | **2** (Cropped Cardigan, Asymmetric Hem Skirt) |
| Products with a single image | **21** |
| Products with **no** image at all | **6** — all dresses |

The six with none are Linen Blend Dress, Floral Maxi Dress, Ribbed Midi Knit Dress, Satin Wrap
Dress, Halter Neck Mini Dress, Long Sleeve Shift Dress. The Dresses category page is visibly
sparse. The pages do not break — a product with no photo renders a neutral placeholder cell —
but this is the most obvious weakness on the live site. Needed: photos per product, ideally per
colour. Upload lands in task 2.5.

### 12.3 The size chart contradicts the catalogue

`components/SizeChart.tsx` documents **XL, 2XL, 3XL, 4XL, 5XL** with bust/waist/hip
measurements. The catalogue sells **S, M, L, XL, XXL**. Only "XL" appears in both, and it may
not mean the same body in each. This is a content decision, not a bug: either the chart is
rewritten to the sizes actually sold, or the sizes sold are renamed to the chart's scale — which
would mean re-seeding all 435 variants and their SKUs. Cheaper to decide now than after orders
exist.
