'use server';

import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import pool from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

async function getLocalInventory(): Promise<Product[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'inventory.json');
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading local inventory:', error);
        return [];
    }
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    colors?: string[];
    colorImages?: Record<string, string | string[]>;
    isNewArrival?: boolean;
    rating?: string;
    reviewCount?: number;
    reviews?: any[];
}

export async function getProducts(): Promise<Product[]> {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        const [reviews] = await pool.query('SELECT * FROM reviews');
        
        return (products as any[]).map(p => ({
            ...p,
            colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : (p.colors || []),
            colorImages: typeof p.colorImages === 'string' ? JSON.parse(p.colorImages) : (p.colorImages || {}),
            reviews: (reviews as any[]).filter(r => r.product_id === p.id)
        }));
    } catch (error: any) {
        if (error.code === 'ECONNREFUSED') {
            console.warn('MySQL refused connection, falling back to local inventory.json');
            return await getLocalInventory();
        }
        console.error('Error fetching products from MySQL:', error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        const rows = products as any[];
        if (rows.length === 0) return undefined;

        const product = rows[0];
        const [reviews] = await pool.query('SELECT * FROM reviews WHERE product_id = ?', [id]);

        return {
            ...product,
            colors: typeof product.colors === 'string' ? JSON.parse(product.colors) : (product.colors || []),
            colorImages: typeof product.colorImages === 'string' ? JSON.parse(product.colorImages) : (product.colorImages || {}),
            reviews: reviews as any[]
        };
    } catch (error: any) {
        if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
            const inventory = await getLocalInventory();
            return inventory.find(p => p.id === id);
        }
        console.error('Error fetching product by id from MySQL:', error);
        return undefined;
    }
}

export async function addProduct(formData: FormData) {
    const id = Date.now().toString();
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const category = formData.get('category') as string;
    const image = formData.get('image') as string || '/placeholder.png';
    const description = formData.get('description') as string;
    const colors = JSON.stringify([]);

    await pool.query(
        'INSERT INTO products (id, name, price, category, image, description, colors) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, name, price, category, image, description, colors]
    );

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/category/${category.toLowerCase()}`);
}

export async function deleteProduct(id: string) {
    // Get product first to revalidate its category page
    const [products] = await pool.query('SELECT category FROM products WHERE id = ?', [id]);
    const p = (products as any[])[0];
    
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    revalidatePath('/admin');
    revalidatePath('/');
    if (p) {
        revalidatePath(`/category/${p.category.toLowerCase()}`);
    }
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const description = formData.get('description') as string;

    await pool.query(
        'UPDATE products SET name = ?, price = ?, category = ?, image = ?, description = ? WHERE id = ?',
        [name, price, category, image, description, id]
    );

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/category/${category.toLowerCase()}`);
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
