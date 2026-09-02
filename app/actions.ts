'use server';

// Reads live in db/queries.ts. This file holds server actions only.
// Re-exported so existing imports of the Product type keep working.
export type { Product, Review, Variant } from '@/db/queries';

const PHASE_2 =
    'Admin product management is not implemented until Phase 2. It wrote to columns that no longer exist.';

export async function addProduct(_formData: FormData): Promise<never> {
    throw new Error(PHASE_2);
}

export async function updateProduct(_id: string, _formData: FormData): Promise<never> {
    throw new Error(PHASE_2);
}

export async function deleteProduct(_id: string): Promise<never> {
    throw new Error(PHASE_2);
}

// Phase 3 replaces this entirely: task 3.7 writes orders and order_items and decrements stock
// in one transaction, 3.8 records the payment, 3.10 sends the confirmation email through a
// real sending account. The previous version hardcoded a Gmail address and an app-password
// placeholder in source, generated a tracking number and saved nothing.
export async function processOrder(
    _cart: unknown[],
    _total: number,
    _customerDetails: unknown,
): Promise<{ success: false; reason: string }> {
    return {
        success: false,
        reason: 'Orders are not implemented yet. Nothing was saved and no email was sent.',
    };
}
