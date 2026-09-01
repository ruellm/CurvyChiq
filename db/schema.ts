import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core'

// Shared column helpers

const id = () => integer().primaryKey().generatedAlwaysAsIdentity()
const money = (name: string) => numeric(name, { precision: 10, scale: 2 })
const createdAt = () => timestamp('created_at', { withTimezone: true }).defaultNow().notNull()

// Enums

export const userRole = pgEnum('user_role', ['customer', 'admin'])
export const productStatus = pgEnum('product_status', ['draft', 'published'])
export const orderStatus = pgEnum('order_status', [
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])
export const paymentMethod = pgEnum('payment_method', ['gcash', 'card', 'cod'])
export const paymentStatus = pgEnum('payment_status', ['pending', 'paid', 'failed', 'cancelled'])
export const shipmentStatus = pgEnum('shipment_status', [
  'pending',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
])

// Accounts

export const users = pgTable('users', {
  id: id(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone'),
  role: userRole('role').default('customer').notNull(),
  emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
  createdAt: createdAt(),
})

// FK users: cascade. An address has no meaning without its owner.
export const addresses = pgTable('addresses', {
  id: id(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  line1: text('line1').notNull(),
  city: text('city').notNull(),
  province: text('province').notNull(),
  postalCode: text('postal_code').notNull(),
  phone: text('phone'),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: createdAt(),
})

// Catalogue

// Seed these four and only these four. "New Arrival" is not a category, it is
// products.is_new_arrival.
export const categories = pgTable('categories', {
  id: id(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  sortOrder: integer('sort_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
})

// FK categories: restrict. Deleting a category that still has products would orphan the catalogue.
export const products = pgTable(
  'products',
  {
    id: id(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'restrict' }),
    basePrice: money('base_price').notNull(),
    status: productStatus('status').default('draft').notNull(),
    // These five are still filed under "New Arrival" in data/inventory.json and need a real
    // category picked before they can be seeded:
    //   25 Tweed Cropped Blazer
    //   27 Velvet Evening Gown
    //   28 Cashmere Blend Poncho
    //   29 Distressed Denim Jacket
    //   30 Sequined Party Dress
    isNewArrival: boolean('is_new_arrival').default(false).notNull(),
    createdAt: createdAt(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('products_category_idx').on(t.categoryId),
    check('products_base_price_non_negative', sql`${t.basePrice} >= 0`),
  ],
)

// FK products: cascade. Variants are part of the product, not independent records.
export const productVariants = pgTable(
  'product_variants',
  {
    id: id(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    size: text('size').notNull(),
    colour: text('colour').notNull(),
    sku: text('sku').notNull().unique(),
    stockQty: integer('stock_qty').default(0).notNull(),
    priceOverride: money('price_override'),
    isActive: boolean('is_active').default(true).notNull(),
  },
  (t) => [
    unique('product_variants_product_size_colour_key').on(t.productId, t.size, t.colour),
    check('product_variants_stock_non_negative', sql`${t.stockQty} >= 0`),
    check('product_variants_price_override_non_negative', sql`${t.priceOverride} >= 0`),
  ],
)

// FK products: cascade. An image belongs to one product and nothing else.
export const productImages = pgTable(
  'product_images',
  {
    id: id(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    colour: text('colour'),
    url: text('url').notNull(),
    sortOrder: integer('sort_order').default(0).notNull(),
    isPrimary: boolean('is_primary').default(false).notNull(),
  },
  (t) => [index('product_images_product_idx').on(t.productId)],
)

// Cart

// FK users: cascade, and nullable so guests can hold a cart against a session token only.
export const carts = pgTable(
  'carts',
  {
    id: id(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    sessionToken: text('session_token').notNull().unique(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique('carts_user_key').on(t.userId)],
)

// FK carts: cascade. FK product_variants: cascade, a cart line for a deleted variant is unbuyable.
export const cartItems = pgTable(
  'cart_items',
  {
    id: id(),
    cartId: integer('cart_id')
      .notNull()
      .references(() => carts.id, { onDelete: 'cascade' }),
    variantId: integer('variant_id')
      .notNull()
      .references(() => productVariants.id, { onDelete: 'cascade' }),
    qty: integer('qty').notNull(),
  },
  (t) => [
    unique('cart_items_cart_variant_key').on(t.cartId, t.variantId),
    check('cart_items_qty_positive', sql`${t.qty} > 0`),
  ],
)

// Orders

// FK users: set null, and nullable. An order is a financial record; it must outlive the account.
export const orders = pgTable(
  'orders',
  {
    id: id(),
    orderNumber: text('order_number').notNull().unique(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
    status: orderStatus('status').default('pending').notNull(),
    subtotal: money('subtotal').notNull(),
    shippingFee: money('shipping_fee').default('0').notNull(),
    total: money('total').notNull(),
    shipToName: text('ship_to_name').notNull(),
    shipToAddress: text('ship_to_address').notNull(),
    shipToCity: text('ship_to_city').notNull(),
    shipToPhone: text('ship_to_phone').notNull(),
    shipToEmail: text('ship_to_email').notNull(),
    placedAt: timestamp('placed_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('orders_user_idx').on(t.userId),
    check('orders_subtotal_non_negative', sql`${t.subtotal} >= 0`),
    check('orders_shipping_fee_non_negative', sql`${t.shippingFee} >= 0`),
    check('orders_total_non_negative', sql`${t.total} >= 0`),
  ],
)

// FK orders: cascade. FK product_variants: set null, the line survives on its snapshot alone.
export const orderItems = pgTable(
  'order_items',
  {
    id: id(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    variantId: integer('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
    productName: text('product_name').notNull(),
    size: text('size').notNull(),
    colour: text('colour').notNull(),
    unitPrice: money('unit_price').notNull(),
    qty: integer('qty').notNull(),
  },
  (t) => [
    index('order_items_order_idx').on(t.orderId),
    check('order_items_qty_positive', sql`${t.qty} > 0`),
    check('order_items_unit_price_non_negative', sql`${t.unitPrice} >= 0`),
  ],
)

// FK orders: cascade. A payment attempt has no meaning without the order it was for.
export const payments = pgTable(
  'payments',
  {
    id: id(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    method: paymentMethod('method').notNull(),
    status: paymentStatus('status').default('pending').notNull(),
    amount: money('amount').notNull(),
    reference: text('reference'),
    createdAt: createdAt(),
  },
  (t) => [
    index('payments_order_idx').on(t.orderId),
    check('payments_amount_non_negative', sql`${t.amount} >= 0`),
  ],
)

// FK orders: cascade. One shipment per order in this shop's model.
export const shipments = pgTable(
  'shipments',
  {
    id: id(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    trackingNumber: text('tracking_number').notNull().unique(),
    courier: text('courier'),
    status: shipmentStatus('status').default('pending').notNull(),
    createdAt: createdAt(),
  },
  (t) => [unique('shipments_order_key').on(t.orderId)],
)

// FK shipments: cascade. The timeline is part of the shipment.
export const shipmentEvents = pgTable(
  'shipment_events',
  {
    id: id(),
    shipmentId: integer('shipment_id')
      .notNull()
      .references(() => shipments.id, { onDelete: 'cascade' }),
    status: shipmentStatus('status').notNull(),
    note: text('note'),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('shipment_events_shipment_idx').on(t.shipmentId)],
)

// Reviews

// FK products: cascade. FK users: set null. FK orders: set null.
// user_id and order_id are nullable because the 29 seeded reviews carry a display name
// and have no account behind them.
export const reviews = pgTable(
  'reviews',
  {
    id: id(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
    orderId: integer('order_id').references(() => orders.id, { onDelete: 'set null' }),
    reviewerName: text('reviewer_name').notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    sizePurchased: text('size_purchased'),
    isApproved: boolean('is_approved').default(true).notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    index('reviews_product_idx').on(t.productId),
    check('reviews_rating_range', sql`${t.rating} between 1 and 5`),
  ],
)
