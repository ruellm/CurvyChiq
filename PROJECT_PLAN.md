# CurvyChiQ — Execution Plan

> Read `PROJECT_BRIEF.md` first for context, commercial terms and the current state of the code.
>
> **Shape:** 5 weeks, 4 phases, ₱50,000. Each phase ends with a client demo and a payment.

---

## Step 0 — Pre-flight (before the clock starts)

Nothing here is billable and none of it should be skipped. Estimated half a day.

| # | Task | Why it matters |
|---|---|---|
| 0.1 | **`git init`**, first commit, push to a **private GitHub repo** | There is currently no version control on ~4,200 lines of work. `.gitignore` is already correct (ignores `.env*` and `*.tsbuildinfo`). Do this before touching anything. |
| 0.2 | Confirm **MySQL vs PostgreSQL** with the client | Ask whether her programme mandates MySQL/XAMPP. Blocks schema work. |
| 0.3 | Pick the **query layer** (Drizzle / Prisma / raw SQL) | Decide with 0.2 |
| 0.4 | Create accounts: Neon (or TiDB), Cloudinary, Resend, Vercel — **all in her name** | She owns everything; also avoids a handover problem later |
| 0.5 | Rotate the committed `.env`, move to `.env.local` | Currently `root` with an empty password |
| 0.6 | **Request her data now** — product names, descriptions, prices, stock per size and colour, categories, shipping rules, domain choice, business email | This is the long pole. It is not on the critical path until suddenly it is. |
| 0.7 | Confirm the deposit (₱15,000) has cleared | Do not start Phase 1 unpaid |

**Deliverable:** a private repo, accounts provisioned, both technical decisions made, deposit received.

---

## Phase 1 — Foundations and catalogue (weeks 1–2)

**Goal:** the site runs entirely from a real database, with stock that actually exists.

### 1A. Schema (do this first, on paper, before any code)

Design all tables up front and produce an **ER diagram** — she needs it for her paper, and a
written schema stops it being quietly redesigned in week 3.

Proposed tables (first cut — refine in Claude web before implementing):

```
users                 id, email (unique), password_hash, first_name, last_name,
                      phone, role (customer|admin), email_verified_at, created_at

addresses             id, user_id → users, line1, city, province, postal_code,
                      phone, is_default, created_at

categories            id, name, slug (unique), sort_order, is_active

products              id, name, slug (unique, permanent), description, category_id → categories,
                      base_price, status (draft|published), created_at, updated_at
                      -- slug is stored, NOT derived from the name

product_variants      id, product_id → products, size, colour, sku (unique),
                      stock_qty, price_override, is_active
                      -- UNIQUE (product_id, size, colour); this is what makes stock work

product_images        id, product_id → products, colour, url, sort_order, is_primary

carts                 id, user_id → users (nullable for guests), session_token, updated_at
cart_items            id, cart_id → carts, variant_id → product_variants, qty

orders                id, order_number (human-readable, unique), user_id → users,
                      status, subtotal, shipping_fee, total,
                      ship_to_name, ship_to_address, ship_to_city, ship_to_phone, ship_to_email,
                      placed_at
                      -- shipping address is SNAPSHOTTED, not a foreign key

order_items           id, order_id → orders, variant_id → product_variants,
                      product_name, size, colour, unit_price, qty
                      -- name and price snapshotted at time of sale

payments              id, order_id → orders, method (gcash|card|cod),
                      status (pending|paid|failed|cancelled), amount, reference, created_at

shipments             id, order_id → orders, tracking_number (unique), courier,
                      status, created_at
shipment_events       id, shipment_id → shipments, status, note, occurred_at
                      -- gives the customer-facing status timeline

reviews               id, product_id → products, user_id → users, order_id → orders,
                      rating, comment, size_purchased, is_approved, created_at
```

**Design notes worth defending to a panel:**
- `order_items` snapshots product name and price. A later price change must never alter
  historical orders.
- `product_variants` with `UNIQUE (product_id, size, colour)` is what makes per-size stock
  possible. Everything about inventory depends on this table.
- `products.slug` is stored and permanent, so renaming a product does not break its URL.
- Shipping address on `orders` is copied, not referenced — she may edit or delete an address later.

### 1B. Build

| # | Task | Notes |
|---|---|---|
| 1.1 | Provision the hosted database, dev + production | |
| 1.2 | Write migration scripts for the full schema | Repeatable, checked into the repo |
| 1.3 | Rewrite `scripts/migrate.mjs` to read env vars | Currently hardcodes `localhost`/`root` |
| 1.4 | Seed the 29 products from `data/inventory.json` into the new shape | Generate variants for each size × colour; stock can start at a placeholder |
| 1.5 | Replace `lib/db.ts` with the chosen driver | Neon HTTP driver if Postgres |
| 1.6 | Split `app/actions.ts` into a typed data-access layer | Stop loading every product and every review on every page |
| 1.7 | **Deploy to Vercel and connect the database** | ← do this in week 1, not week 5 |
| 1.8 | Install Tailwind *or* convert admin pages to CSS Modules | Pick one. Admin is currently unstyled. |
| 1.9 | Variants wired into the product page — real sizes, sold-out greyed out | Replaces the hardcoded `['S','M','L','XL','XXL']` |
| 1.10 | Sold-out badges on product cards and category pages | |
| 1.11 | Photo upload to Cloudinary, multiple images per colour | Forced by serverless — no disk to write to |
| 1.12 | **Run the deletion checklist** (below) | Do not defer this |

### 1C. The deletion checklist — complete in Phase 1

Verify each by grep before closing the phase. These currently "work", which is exactly what
makes them dangerous.

- [ ] `data/inventory.json` runtime fallback removed from `app/actions.ts:12`
- [ ] localStorage account storage gone from `app/register/page.tsx` and `app/login/page.tsx`
- [ ] Plaintext passwords gone — nothing writes a password anywhere but a hash
- [ ] Fake Google SSO button removed (or left out until it is real)
- [ ] Card number / expiry / CVC capture removed from `app/checkout/page.tsx`
- [ ] Hardcoded Gmail credentials removed from `app/actions.ts`
- [ ] Root-level one-off scripts deleted: `add_reviews.js`, `auto_match_images.js`,
      `generate_inventory.js`, `update_images.js`, `update_prices.js`, `update_to_product_shots.js`
- [ ] `tsconfig.tsbuildinfo` removed from the repo

**Client demo:** the full product list running from a real database; set a size to zero stock
and watch it grey out on the live staging URL.

---

## Phase 2 — Your admin area (week 3) → ₱15,000

**Goal:** she can run the shop herself, and nobody else can get in.

| # | Task |
|---|---|
| 2.1 | Admin authentication + middleware protecting every `/admin` route and action |
| 2.2 | Roles: `customer` vs `admin` |
| 2.3 | Product management — create, edit, publish/draft, soft delete |
| 2.4 | Variant management — sizes, colours, SKUs |
| 2.5 | Photo management — upload, reorder, set primary, per-colour |
| 2.6 | Price editing |
| 2.7 | Stock management per size and colour, bulk restock, low-stock warnings |
| 2.8 | Order list screen (read-only at this stage — orders arrive in Phase 3) |
| 2.9 | Admin layout and styling finished |

**Security check before closing:** log out entirely, then attempt to reach `/admin` and to invoke
each admin server action directly. Both must fail.

**Client demo:** she logs in herself and adds a brand new product, photos and all, from her phone.

---

## Phase 3 — Accounts, checkout and orders (week 4) → ₱15,000

**Goal:** a real purchase works end to end. This is the heart of the project.

| # | Task |
|---|---|
| 3.1 | Real authentication — hashed passwords (bcrypt/argon2), httpOnly session cookies |
| 3.2 | Registration with server-side validation and duplicate email checks |
| 3.3 | Customer profile — view and edit contact details |
| 3.4 | Server-side cart tied to the account; merge the guest cart on login |
| 3.5 | Cart validated against live stock and current price at checkout |
| 3.6 | Checkout rebuild — delivery details, shipping fee rules, total breakdown |
| 3.7 | **Order creation: write `orders` + `order_items`, snapshot prices, decrement stock atomically** |
| 3.8 | Payment step — GCash / card / COD in demonstration mode, with success, failure and cancel outcomes, recorded in `payments` |
| 3.9 | Order confirmation page with order number |
| 3.10 | Confirmation email to the customer and notification to the owner, from a real sending account |

**Task 3.7 is the single most important thing in the project.** Wrap order creation and stock
deduction in one transaction. Test explicitly: two simultaneous purchases of the last remaining
item — one must succeed, one must fail cleanly.

**Client demo:** a complete purchase from start to finish, with the order appearing in her admin
and the stock dropping by itself.

---

## Phase 4 — Tracking, testing and launch (week 5) → ₱5,000

**Goal:** live on her domain, safe to leave running for a year.

| # | Task |
|---|---|
| 4.1 | Shipment records with a status pipeline: Pending → Packed → Shipped → Out for Delivery → Delivered |
| 4.2 | `shipment_events` history for the timeline |
| 4.3 | Customer tracking page, reachable by tracking number and from the profile |
| 4.4 | Order history in the profile — real data replacing the hardcoded empty state |
| 4.5 | Admin order management — update status, add courier and tracking number |
| 4.6 | Shop content pages: Contact, FAQ, Shipping & Returns, Terms (drafted for her approval) |
| 4.7 | Mobile and tablet pass on real devices |
| 4.8 | Error handling — loading states, error boundaries, styled 404/500, friendly DB-down message |
| 4.9 | Security pass — input validation on every action, login rate limiting, secure cookies, no secrets in the repo |
| 4.10 | Point the domain, verify SSL |
| 4.11 | Automated backups + UptimeRobot monitoring |
| 4.12 | Full end-to-end test: browse → cart → register → checkout → pay → track |
| 4.13 | Admin guide written |
| 4.14 | **Handover walkthrough session with her** |

**Extra deliverables for her paper** (cheap to produce alongside, disproportionately valuable):
ER diagram, system architecture page, order-process data flow, and a short written rationale for
each design decision.

**Client demo:** her live web address, plus the walkthrough.

---

## After launch

- 2 weeks of free fixes (contractual)
- Then either the ₱3,000–8,000/month care plan, or the relationship ends cleanly
- Set a calendar reminder for her **domain renewal** — a lapsed domain kills the site mid-year

---

## Definition of done for every phase

1. The client demo has been shown and acknowledged
2. Nothing on the deletion checklist has crept back in
3. The code is committed and deployed to the staging URL
4. The invoice for that phase is issued

---

## Sequencing rules

- **Schema before code.** Lock it in Phase 1 and change it only deliberately. Schema churn is the
  most expensive rework there is.
- **Deploy early.** Staging URL from week 1 kills "works on my machine" while it is still cheap.
- **Weekly demos, always.** A 2-minute screen recording each Friday is the best protection against
  "this isn't what I wanted" in week 5.
- **Deferred features are change requests.** Quote separately, agree in writing, never absorb.
