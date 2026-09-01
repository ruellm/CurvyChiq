'use server';

import nodemailer from 'nodemailer';

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

export async function processOrder(cart: any[], total: number, customerDetails: any) {
    // Generate a tracking number
    const trackingNumber = 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // We send an email to chiquiglee@gmail.com
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chiquiglee@gmail.com',
            pass: 'YOUR_APP_PASSWORD_HERE'
        }
    });

    let mailOptions = {
        from: '"CurvyChiq Orders" <no-reply@curvychiq.test>',
        to: 'chiquiglee@gmail.com',
        subject: `New Order Received! Tracking: ${trackingNumber}`,
        text: `You have received a new order.\n\nTracking Number: ${trackingNumber}\nTotal: ₱${total.toLocaleString()}\nItems: ${cart.map(i => i.name).join(', ')}\nCustomer Email: ${customerDetails.email}`,
    };

    try {
        if ((transporter.options as any).auth?.pass !== 'YOUR_APP_PASSWORD_HERE') {
            await transporter.sendMail(mailOptions);
        }
    } catch(err) {
        console.error("Failed to send email", err);
    }

    return { success: true, trackingNumber };
}
