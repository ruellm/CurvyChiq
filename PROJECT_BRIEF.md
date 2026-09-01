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

### Stack (already correct — no migration needed)

- **Next.js 16.1.4**, App Router, Server Components + Server Actions
- **React 19.2.3**, TypeScript
- **CSS Modules** (12 files, ~1,850 lines) — *no Tailwind installed*
- `mysql2` ^3.20.0, `nodemailer` ^8.0.2
- ~2,360 lines of TSX across `app/` and `components/`
- 29 products in `data/inventory.json`; 50 images in `public/generated/`
- Categories in the data: Tops (6), Bottoms (7), Dresses (6), Accessories (5), New Arrival (5)

### What genuinely works and is being KEPT

Homepage, category pages, product detail (colour swatches + photo gallery), cart drawer,
size chart, checkout **form**, login/register **pages**, About and Privacy pages. All the
CSS Modules. This is real, finished work and the proposal contractually promises the look is kept.

### What is fake, broken or missing

| Area | Reality |
|---|---|
| **Orders** | `processOrder()` in `app/actions.ts` generates a random tracking number, tries to email, and **saves nothing**. There is no orders table. |
| **Stock** | Does not exist. Sizes are hardcoded `['S','M','L','XL','XXL']` in `ProductClient.tsx` for every product. |
| **Auth** | Accounts stored in browser **localStorage as plain text, including passwords**. Login compares strings client-side. |
| **Google SSO** | Entirely fake — writes a hardcoded `googleuser@gmail.com` to localStorage. |
| **Payment** | Collects card number / expiry / CVC and discards them. No gateway. |
| **Tracking** | Number generated then thrown away. No shipment record, no lookup page. |
| **Order history** | Profile "Purchases" tab hardcoded to "You haven't made any purchases yet." |
| **Admin** | Exists at `/admin` and works — with **zero access control**. Anyone can delete the catalogue. |
| **Admin styling** | Written in Tailwind classes, but **Tailwind is not installed**. Renders unstyled. |
| **Database** | Only 2 tables (`products`, `reviews`) via `scripts/migrate.mjs`. ~13 more needed. |
| **Data source** | `getProducts()` silently falls back to `data/inventory.json` when MySQL is unreachable — two sources of truth, admin edits can vanish with no warning. |
| **Reviews** | All 29 products' reviews are generated fake data (see `add_reviews.js`). |
| **Product URLs** | Slug derived from product name, so renaming breaks links and duplicate names collide. |
| **Version control** | **No git repository at all.** |
| **Secrets** | `.env` committed with `root` / empty password. |

---

## 5. Decisions already made

1. **Continue from the existing source, do not rebuild.** Keep the presentation layer, replace
   everything underneath. Rebuilding ~1,850 lines of CSS would burn the budget for zero
   client-visible gain, and the proposal promises the look is kept.
2. **Hosting: Vercel free tier.** Best Next.js support by a wide margin (built by the Next team).
   *Caveat:* the Hobby plan is licensed for non-commercial use — accurate for a capstone, but if
   she trades for real it means Vercel Pro (~$20/mo) or a move to Netlify.
3. **Cloudflare Pages was ruled out.** It runs the Workers runtime, not Node.js, which is hostile
   to `mysql2` (raw TCP) and `nodemailer`. Netlify is the fallback if Vercel is ever a problem.
4. **Deploy in week 1, not week 5.** Get a staging URL up as soon as the database connects.
   Phase 4's go-live then just points the domain at something already proven.
5. **Payment and tracking stay simulated**, as agreed with the client.
6. **Security is folded into feature work**, not a separate line item. It still gets built —
   the site holds customer accounts and stays public for a year.

## 6. Open decisions — RESOLVE BEFORE PHASE 1

### A. MySQL or PostgreSQL? ← the big one

Switching costs almost nothing *right now* (only `lib/db.ts`, ~6 queries in `app/actions.ts`,
and `scripts/migrate.mjs`) and the schema is being rewritten from scratch anyway. That cost
climbs every week.

- **Preferred: PostgreSQL on Neon.** Free tier, scales to zero but **auto-wakes**, and its
  HTTP serverless driver completely removes the connection-pool problem (below). First-class
  Vercel integration.
- **If MySQL is mandated: TiDB Cloud Serverless.** MySQL-compatible so `mysql2` works unchanged,
  ~5GB free, no hard pause.
- **Avoid Supabase free tier** — it *pauses* a project after ~1 week of inactivity and needs a
  manual restore. For a site that sits idle between demos, that is the exact failure mode where
  the professor opens the URL and it is down.
- PlanetScale and Railway no longer have free tiers.

**Blocking question for the client:** does her programme require MySQL/XAMPP? Some capstone
programmes specify it. Ask before deciding.

### B. Raw SQL or a query builder?

~15 tables are being designed. **Drizzle** pairs well with Neon, gives typed queries, and stays
close enough to SQL that she can explain it to a panel — which matters more here than usual.
Prisma is the alternative. Decide alongside A.

---

## 7. Known technical constraints from serverless hosting

These are imposed by Vercel's model, not preferences:

1. **No SSH, no persistent filesystem.** Deployment is git-push-triggered. Migrations run from
   the developer's machine against the remote database.
2. **`data/inventory.json` fallback must be removed.** `app/actions.ts:12` reads it at runtime.
   Bundled files are readable but never writable.
3. **Connection pooling breaks.** `lib/db.ts` sets `connectionLimit: 10`; every warm serverless
   instance opens its own pool, so ten instances means 100 connections and a free-tier database
   refuses them. Needs an HTTP driver (Neon) or a much lower limit plus a pooler.
4. **Photo uploads must go to object storage** (Cloudinary), not the server disk. This is forced,
   not optional.
5. **`scripts/migrate.mjs` hardcodes `localhost` / `root` / empty password** — must read env vars.

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
| `PROJECT_BRIEF.md` | This document | Internal |
| `PROJECT_PLAN.md` | Phase-by-phase execution plan | Internal |
| `CLAUDE.md` | Repo context, auto-loaded by Claude Code | Internal |
| `FULL_CODE_DOCUMENTATION.md` | Full source dump, generated 2026-03-23 | Reference |

In `d:\dump\curvychiq\Docs to send`:

| File | What it is | Audience |
|---|---|---|
| `CurvyChiQ_Proposal_v1.0.xlsx` | The approved client proposal — **the scope boundary** | **Client-facing** |
| `CurvyChiQ_VibeCoded_Time_and_Price.xlsx` | AI-assisted estimate + pricing strategy | **INTERNAL ONLY — must never be sent.** Contains effective hourly rates, margin analysis and negotiation notes. It is currently sitting in a folder called "Docs to send" — move it out. |
