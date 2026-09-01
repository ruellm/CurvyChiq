# CurvyChiq Project - Source Code Documentation

Generated on: 3/23/2026, 1:47:06 PM

This document contains all source code files for the CurvyChiq project for school submission purposes.

## File: add_reviews.js

```js
const fs = require('fs');
const path = require('path');

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryData = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));

const mockReviewers = ["Sarah M.", "Jessica T.", "Amanda R.", "Chloe S.", "Emily W.", "Nina K.", "Jasmine L."];
const mockComments = [
    "Love the fit! Super comfortable and stylish, perfect for daily wear.",
    "Material feels very premium. Highly recommend for the price.",
    "True to size, the color is exactly like the picture. Very flattering on my curves!",
    "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
    "A bit snug initially but stretched to fit perfectly. Great quality overall.",
    "I've gotten so many compliments on this piece! It makes me feel so confident.",
    "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!"
];

function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

inventoryData.forEach(item => {
    // Determine random number of reviews between 2 and 5
    const reviewCount = Math.floor(Math.random() * 4) + 2;
    const selectedComments = getRandomItems(mockComments, reviewCount);
    const selectedReviewers = getRandomItems(mockReviewers, reviewCount);
    
    item.rating = (Math.random() * 0.5 + 4.5).toFixed(1); // Random rating between 4.5 and 5.0
    item.reviewCount = reviewCount * 12 + Math.floor(Math.random() * 10); // Fake a larger number of total reviews
    
    item.reviews = selectedReviewers.map((reviewer, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        reviewer,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
        comment: selectedComments[index],
        sizePurchased: ['S', 'M', 'L', 'XL', 'XXL'][Math.floor(Math.random() * 5)]
    }));
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully injected mock Shein-style reviews into all inventory items.');

```

---

## File: app\about\page.module.css

```css
.main {
  padding: var(--spacing-lg) var(--spacing-sm);
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.title {
  font-size: 3rem;
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1.1rem;
}

.contentGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 900px) {
  .contentGrid {
    grid-template-columns: 1fr 1fr;
  }
}

.imageWrapper {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  object-fit: cover;
}

.textContent {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section {
  background-color: var(--color-gray-50);
  padding: var(--spacing-md);
  border-left: 4px solid var(--color-black);
}

.sectionTitle {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.text {
  color: var(--color-gray-800);
  line-height: 1.7;
  font-size: 1.1rem;
}

.textBlock {
  margin-bottom: 1rem;
}

.cta {
  text-align: center;
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-xl) var(--spacing-md);
  border-radius: 8px;
}

.ctaTitle {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-white);
}

.ctaText {
  color: var(--color-gray-200);
  margin-bottom: var(--spacing-lg);
  font-size: 1.1rem;
}

.button {
  display: inline-block;
  background-color: var(--color-white);
  color: var(--color-black);
  text-transform: uppercase;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 4px;
}

.button:hover {
  background-color: var(--color-gray-200);
}

```

---

## File: app\about\page.tsx

```typescript
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>About CurvyChiQ</h1>
        <p className={styles.subtitle}>
          Because fashion comes in all sizes.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/generated/plus_dress_1773806957456.png" 
            alt="Beautiful plus size model in a floral dress"
            fill
            className={styles.image}
            priority
          />
        </div>
        
        <div className={styles.textContent}>
          <div>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.textBlock + ' ' + styles.text}>
              I founded CurvyChiQ out of a deep personal frustration. For too long, finding affordable, chic, and genuinely stylish clothing for plus-size women felt like an impossible treasure hunt. The fashion industry often treated inclusive sizing as an afterthought, offering limited options that sacrificed trendiness for scale. 
            </p>
            <p className={styles.text}>
              I decided it was time to change that narrative. CurvyChiQ was born from the belief that style has no size limit. We meticulously curate and design pieces that celebrate your curves rather than hiding them, bringing high-fashion looks directly to your wardrobe.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              To empower women of all sizes by providing accessible, premium, and on-trend fashion. We strive to make shopping an exciting and inclusive experience where every woman can discover clothing that makes her feel confident, beautiful, and unapologetically herself.
            </p>
          </div>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.text}>
              We envision a world where "plus-size fashion" is simply known as "fashion." A world where every trend, style, and silhouette is available to everyone, completely eliminating the divide in the retail industry.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to find your new favorite outfit?</h2>
        <p className={styles.ctaText}>
          Explore our latest collections and experience the CurvyChiQ difference.
        </p>
        <Link href="/category/new-arrival" className={styles.button}>
          Shop New Arrivals
        </Link>
      </div>
    </main>
  );
}

```

---

## File: app\actions.ts

```ts
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

```

---

## File: app\admin\layout.tsx

```typescript
import Link from "next/link";
import "../globals.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold font-serif text-gray-800">CurvyChiQ Admin</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block p-3 rounded hover:bg-gray-50 text-gray-700 font-medium">
                                Inventory
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block p-3 rounded hover:bg-gray-50 text-gray-700 font-medium">
                                View Store
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}

```

---

## File: app\admin\page.tsx

```typescript
import Link from 'next/link';
import { getProducts, deleteProduct } from '@/app/actions';
import Image from 'next/image';

export default async function AdminDashboard() {
    const products = await getProducts();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
                <Link
                    href="/admin/products/create"
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    + Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 border-b font-semibold text-gray-600">Image</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Name</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Category</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Price</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 border-b last:border-0">
                                <td className="p-4">
                                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                <td className="p-4 text-gray-600">{product.category}</td>
                                <td className="p-4 text-gray-800">₱{product.price.toLocaleString()}</td>
                                <td className="p-4 flex gap-4 mt-2">
                                    <Link href={`/admin/products/${product.id}/edit`} className="text-blue-500 hover:text-blue-700 font-medium">
                                        Edit
                                    </Link>
                                    <form action={async () => {
                                        'use server';
                                        await deleteProduct(product.id);
                                    }}>
                                        <button className="text-red-500 hover:text-red-700 font-medium">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No products found. Add one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

```

---

## File: app\admin\products\create\page.tsx

```typescript
import { addProduct } from '@/app/actions';
import { redirect } from 'next/navigation';

export default function CreateProductPage() {
    async function create(formData: FormData) {
        'use server';
        await addProduct(formData);
        redirect('/admin');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h2>

            <form action={create} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="e.g. Silk Blouse"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price (₱)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            placeholder="e.g. 1500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                            <option value="New Arrival">New Arrival</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="/linen-blend-dress.png"
                        defaultValue="/linen-blend-dress.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">For now, use local paths like /linen-blend-dress.png</p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Product details..."
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}

```

---

## File: app\admin\products\[id]\edit\page.tsx

```typescript
import { getProductById, updateProduct } from '@/app/actions';
import { redirect } from 'next/navigation';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center bg-white shadow rounded">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
                <p className="text-gray-600">The product you are trying to edit does not exist.</p>
            </div>
        );
    }

    async function edit(formData: FormData) {
        'use server';
        await updateProduct(id, formData);
        redirect('/admin');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h2>

            <form action={edit} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={product.name}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price (₱)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            defaultValue={product.price}
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            required
                            defaultValue={product.category}
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                            <option value="New Arrival">New Arrival</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        defaultValue={product.image}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        defaultValue={product.description || ''}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

```

---

## File: app\category\[slug]\page.tsx

```typescript
import Header from '@/components/Header';
import { getProducts } from '@/app/actions';
import styles from '@/app/page.module.css';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '); 
    const allProducts = await getProducts();

    const categoryProducts = allProducts.filter(p =>
        p.category.toLowerCase() === categoryName.toLowerCase() ||
        p.category.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase() ||
        (slug.toLowerCase() === 'new-arrival' && p.isNewArrival)
    );

    return (
        <main className={styles.main}>
            <Header />

            <section className="container" style={{ paddingTop: '50px' }}>
                <div className={styles.sectionHeader}>
                    <h2>{categoryName}</h2>
                </div>

                {categoryProducts.length > 0 ? (
                    <div className={styles.productGrid}>
                        {categoryProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found in this category yet.</p>
                    </div>
                )}
            </section>
        </main>
    );
}

```

---

## File: app\checkout\page.module.css

```css
.main {
    min-height: 100vh;
    padding: var(--spacing-lg) 0;
    background-color: var(--color-gray-50);
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
}

.breadcrumb {
    display: block;
    margin-bottom: var(--spacing-md);
    color: var(--color-gray-500);
    font-size: 0.9rem;
}

.title {
    margin-bottom: var(--spacing-md);
    font-size: 2.5rem;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
}

@media(min-width: 1024px) {
    .grid {
        grid-template-columns: 2fr 1fr;
    }
}

.section {
    background: var(--color-white);
    padding: var(--spacing-md);
    border-radius: 8px;
    margin-bottom: var(--spacing-md);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section h2 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-gray-100);
    padding-bottom: 0.5rem;
}

.formGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
}

.field {
    display: flex;
    flex-direction: column;
}

.fieldFull {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
}

/* Row that holds the label + change icon side-by-side */
.fieldLabelRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.fieldLabelRow label {
    margin-bottom: 0 !important;
}

/* "Change Address / Change" pencil button */
.changeBtn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0;
    transition: color 0.2s;
}

.changeBtn:hover {
    color: var(--color-black);
}

/* Read-only (pre-filled) input styling */
.inputLocked {
    background-color: var(--color-gray-50);
    border-color: var(--color-gray-100) !important;
    color: var(--color-gray-700);
    cursor: default;
}

.field label,
.fieldFull label {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
}

.field input,
.fieldFull input {
    padding: 0.75rem;
    border: 1px solid var(--color-gray-200);
    border-radius: 4px;
    font-family: var(--font-body);
    transition: border-color 0.2s, background-color 0.2s;
}

.paymentOptions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.paymentOption {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border: 1px solid var(--color-gray-200);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.paymentOption.active {
    border-color: var(--color-black);
    background-color: var(--color-gray-50);
}

.paymentOption input {
    margin-top: 0.25rem;
    margin-right: 0.75rem;
}

.paymentOptionGroup {
    display: flex;
    flex-direction: column;
}

.cardDetails {
    margin-top: -5px;
    /* Pull up to connect with option above */
    padding: 1rem;
    border: 1px solid var(--color-gray-200);
    border-top: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: var(--color-gray-50);
    animation: slideDown 0.3s ease-out forwards;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Ensure the radio option has rounded corners handled correctly when group is active */
.paymentOptionGroup .paymentOption {
    border-radius: 6px;
}

.paymentOptionGroup.activeGroup .paymentOption {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: transparent;
    /* Seamless look */
}

.radioLabel {
    display: flex;
    flex-direction: column;
}

.smallText {
    font-size: 0.8rem;
    color: var(--color-gray-500);
    margin-top: 0.1rem;
}

.summaryCard {
    background: var(--color-white);
    padding: var(--spacing-md);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 2rem;
}

.summaryItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.summaryTotal {
    display: flex;
    justify-content: space-between;
    margin-top: var(--spacing-sm);
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--color-gray-200);
    font-weight: 700;
    font-size: 1.1rem;
}

.placeOrderBtn {
    width: 100%;
    margin-top: var(--spacing-md);
    padding: 1rem;
    background-color: var(--color-black);
    color: var(--color-white);
    border: none;
    font-family: var(--font-heading);
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
}

.placeOrderBtn:hover {
    background-color: var(--color-gray-800);
}

.successContainer,
.emptyContainer {
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-sm);
}

.backLink {
    display: inline-block;
    margin-top: var(--spacing-md);
    text-decoration: underline;
}
```

---

## File: app\checkout\page.tsx

```typescript
"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import styles from './page.module.css';
import Link from 'next/link';
import { processOrder } from '@/app/actions';

type Account = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
};

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('gcash');
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Shipping fields — pre-filled from saved account
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Which fields the user has unlocked for editing
    const [addressLocked, setAddressLocked] = useState(true);
    const [phoneLocked, setPhoneLocked] = useState(true);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) return;

        const accounts: Account[] = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        const account = accounts.find(
            (a) => a.firstName.toUpperCase() === loggedInUser
        );
        if (account) {
            setFirstName(account.firstName);
            setLastName(account.lastName);
            setAddress(account.address);
            setPhone(account.phone);
            setEmail(account.email || '');
        }
    }, []);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await processOrder(items, cartTotal, { email: email || 'No Email Provided' });
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setOrderPlaced(true);
            clearCart();
        }, 1500);
    };

    if (orderPlaced) {
        return (
            <main className={styles.main}>
                <div className={styles.successContainer}>
                    <h1>Thank you!</h1>
                    <p>Your order has been successfully placed.</p>
                    <p>Payment Method: {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</p>
                    <Link href="/" className={styles.backLink}>Continue Shopping</Link>
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className={styles.main}>
                <div className={styles.emptyContainer}>
                    <h1>Your cart is empty</h1>
                    <Link href="/" className={styles.backLink}>Go Back Shopping</Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/" className={styles.breadcrumb}>&larr; Back to Shop</Link>
                <h1 className={styles.title}>Checkout</h1>

                <div className={styles.grid}>
                    {/* Left Column: Shipping & Payment */}
                    <div className={styles.column}>
                        <form id="checkoutWrapper" onSubmit={handlePlaceOrder}>
                            <section className={styles.section}>
                                <h2>Shipping Details</h2>
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>

                                    {/* Address with Change icon */}
                                    <div className={styles.fieldFull}>
                                        <div className={styles.fieldLabelRow}>
                                            <label>Address</label>
                                            {addressLocked && (
                                                <button
                                                    type="button"
                                                    className={styles.changeBtn}
                                                    onClick={() => setAddressLocked(false)}
                                                    title="Change address"
                                                >
                                                    {/* Pencil icon */}
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Change Address
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={address}
                                            readOnly={addressLocked}
                                            className={addressLocked ? styles.inputLocked : ''}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    {/* Phone with Change icon */}
                                    <div className={styles.field}>
                                        <div className={styles.fieldLabelRow}>
                                            <label>Phone</label>
                                            {phoneLocked && (
                                                <button
                                                    type="button"
                                                    className={styles.changeBtn}
                                                    onClick={() => setPhoneLocked(false)}
                                                    title="Change phone number"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Change
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            readOnly={phoneLocked}
                                            className={phoneLocked ? styles.inputLocked : ''}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className={styles.section}>
                                <h2>Payment Method</h2>
                                <div className={styles.paymentOptions}>
                                    <label className={`${styles.paymentOption} ${paymentMethod === 'gcash' ? styles.active : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="gcash"
                                            checked={paymentMethod === 'gcash'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span className={styles.radioLabel}>
                                            <strong>GCash</strong>
                                            <span className={styles.smallText}>Pay securely with your GCash wallet</span>
                                        </span>
                                    </label>

                                    <div className={`${styles.paymentOptionGroup} ${paymentMethod === 'card' ? styles.activeGroup : ''}`}>
                                        <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.active : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span className={styles.radioLabel}>
                                                <strong>Credit / Debit Card</strong>
                                                <span className={styles.smallText}>Visa, Mastercard, JCB</span>
                                            </span>
                                        </label>

                                        {paymentMethod === 'card' && (
                                            <div className={styles.cardDetails}>
                                                <div className={styles.field}>
                                                    <label>Card Number</label>
                                                    <input type="text" placeholder="0000 0000 0000 0000" required pattern="\d{16}" maxLength={16} />
                                                </div>
                                                <div className={styles.formGrid}>
                                                    <div className={styles.field}>
                                                        <label>Expiry Date</label>
                                                        <input type="text" placeholder="MM/YY" required pattern="\d{2}/\d{2}" maxLength={5} />
                                                    </div>
                                                    <div className={styles.field}>
                                                        <label>CVC</label>
                                                        <input type="text" placeholder="123" required pattern="\d{3,4}" maxLength={4} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <label className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.active : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span className={styles.radioLabel}>
                                            <strong>Cash on Delivery (COD)</strong>
                                            <span className={styles.smallText}>Pay when you receive your order</span>
                                        </span>
                                    </label>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className={styles.column}>
                        <div className={styles.summaryCard}>
                            <h2>Order Summary</h2>
                            <div className={styles.summaryItems}>
                                {items.map(item => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className={styles.summaryItem}>
                                        <div className="flex justify-between w-full">
                                            <span>
                                                {item.name}
                                                <span className="text-gray-500 text-sm ml-1">
                                                    ({item.size}, {item.color})
                                                </span>
                                                <span className="ml-1">x {item.quantity}</span>
                                            </span>
                                            <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.summaryTotal}>
                                <div className="flex justify-between w-full mt-4 font-bold text-lg">
                                    <span>Total</span>
                                    <span>₱{cartTotal.toLocaleString()}</span>
                                </div>
                                <button type="submit" form="checkoutWrapper" className={styles.placeOrderBtn}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

```

---

## File: app\globals.css

```css
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-50: #f9f9f9;
  --color-gray-100: #f3f3f3;
  --color-gray-200: #e5e5e5;
  --color-gray-500: #737373;
  --color-gray-800: #262626;

  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;

  --container-width: 1440px;
  --header-height: 80px;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: var(--color-white);
  color: var(--color-black);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Utilities */
.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
}

.grid {
  display: grid;
  gap: var(--spacing-sm);
}

```

---

## File: app\layout.tsx

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "CurvyChiQ | Plus Size Fashion",
  description: "Premium plus size fashion for the modern woman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}


```

---

## File: app\login\page.module.css

```css
.main {
    min-height: calc(100vh - var(--header-height));
    padding: 4rem 0;
    display: flex;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 1000px;
}

.splitLayout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
}

@media (min-width: 768px) {
    .splitLayout {
        grid-template-columns: 1fr auto 1fr;
        gap: 5rem;
    }
}

.divider {
    height: 1px;
    background-color: var(--color-gray-200);
}

@media (min-width: 768px) {
    .divider {
        height: 100%;
        width: 1px;
    }
}

.column {
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2.5rem;
}

.description {
    font-size: 0.6875rem;
    line-height: 1.6;
    color: var(--color-gray-500);
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.form {
    display: flex;
    flex-direction: column;
}

.inputGroup {
    position: relative;
    margin-bottom: 2rem;
}

.input {
    width: 100%;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    border: none;
    border-bottom: 1px solid var(--color-black);
    background: transparent;
    outline: none;
    font-family: inherit;
    transition: border-color 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.input[type="password"],
.input#password {
    text-transform: none;
}

.input[type="password"] {
    letter-spacing: 0.2em;
    /* Spaced out bullets */
}

.input::placeholder {
    color: transparent;
}

.label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 0.75rem;
    color: var(--color-gray-500);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    pointer-events: none;
}

.input:focus {
    border-bottom-color: var(--color-black);
    border-bottom-width: 2px;
}

.input:focus+.label,
.input:not(:placeholder-shown)+.label {
    top: -0.5rem;
    font-size: 0.625rem;
    color: var(--color-black);
}

.forgotPassword {
    font-size: 0.625rem;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    text-decoration: none;
    transition: color 0.3s;
}

.forgotPassword:hover {
    color: var(--color-black);
    text-decoration: underline;
}

.actionBtn {
    width: 100%;
    padding: 1rem 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background-color: var(--color-black);
    color: var(--color-white);
    border: 1px solid var(--color-black);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    margin-top: auto;
}

.actionBtn:hover {
    background-color: var(--color-gray-800);
}

.actionBtnOutline {
    background-color: transparent;
    color: var(--color-black);
    border: 1px solid var(--color-black);
    margin-top: 3rem;
}

.actionBtnOutline:hover {
    background-color: var(--color-gray-50);
}
```

---

## File: app\login\page.tsx

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const router = useRouter();

    const handleGoogleSSO = () => {
        // Mock SSO logic: simulate logging in with Google
        localStorage.setItem('loggedInUser', 'GOOGLE USER');
        
        // Ensure "Google User" is in accounts if we ever look them up
        const accounts = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        if (!accounts.find((a: any) => a.email === 'googleuser@gmail.com')) {
            accounts.push({
                email: 'googleuser@gmail.com',
                password: 'SSO', // Not used for SSO users
                firstName: 'Google',
                lastName: 'User',
                phone: 'N/A',
                address: 'N/A'
            });
            localStorage.setItem('curvychiq_accounts', JSON.stringify(accounts));
        }

        window.dispatchEvent(new Event('authChange'));
        router.push('/');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError(null);

        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value.toLowerCase();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        if (!email || !password) {
            setLoginError("PLEASE ENTER BOTH EMAIL AND PASSWORD.");
            return;
        }

        // Look up the registered account by email
        const accounts: { email: string; password: string; firstName: string; lastName: string }[] =
            JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');

        const matchedAccount = accounts.find((a) => a.email === email);

        if (!matchedAccount) {
            setLoginError("NO ACCOUNT FOUND WITH THAT EMAIL. PLEASE REGISTER FIRST.");
            return;
        }

        if (matchedAccount.password !== password) {
            setLoginError("INCORRECT PASSWORD. PLEASE TRY AGAIN.");
            return;
        }

        // Use the firstName saved during registration
        localStorage.setItem('loggedInUser', matchedAccount.firstName.toUpperCase());
        window.dispatchEvent(new Event('authChange'));

        // Redirect to home page
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.splitLayout}>
                    {/* Log In Section */}
                    <div className={styles.column}>
                        <h1 className={styles.title}>Log In</h1>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="E-MAIL"
                                    required
                                />
                                <label htmlFor="email" className={styles.label}>E-MAIL</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={styles.input}
                                    placeholder="PASSWORD"
                                    required
                                />
                                <label htmlFor="password" className={styles.label}>PASSWORD</label>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-500)', zIndex: 2, padding: '0.25rem' }}>
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                            {loginError && (
                                <div style={{ marginTop: '-1.5rem', marginBottom: '1.5rem', color: '#e00000', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    {loginError}
                                </div>
                            )}
                            <Link href="#" className={styles.forgotPassword}>
                                HAVE YOU FORGOTTEN YOUR PASSWORD?
                            </Link>
                            <button type="submit" className={styles.actionBtn}>
                                LOG IN
                            </button>
                            
                            {/* SSO Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                                <span style={{ padding: '0 1rem' }}>OR</span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                            </div>
                            
                            {/* Google SSO Button */}
                            <button 
                                type="button" 
                                onClick={handleGoogleSSO} 
                                className={`${styles.actionBtn} ${styles.actionBtnOutline}`}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid var(--color-gray-300)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                </svg>
                                CONTINUE WITH GOOGLE
                            </button>
                        </form>
                    </div>

                    {/* Divider for mobile, subtle border for desktop */}
                    <div className={styles.divider}></div>

                    {/* Register Section */}
                    <div className={styles.column}>
                        <h1 className={styles.title}>Register</h1>
                        <p className={styles.description}>
                            IF YOU STILL DON'T HAVE A CURVYCHIQ.COM ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.
                        </p>
                        <p className={styles.description}>
                            BY GIVING US YOUR DETAILS, PURCHASING IN <b>CURVYCHIQ.COM</b> WILL BE FASTER AND AN ENJOYABLE EXPERIENCE.
                        </p>
                        <Link href="/register" className={`${styles.actionBtn} ${styles.actionBtnOutline}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                            CREATE ACCOUNT
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

```

---

## File: app\page.module.css

```css
.main {
  min-height: 100vh;
}

.hero {
  height: 80vh;
  background-color: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.heroTitle {
  font-size: 5rem;
  margin-bottom: var(--spacing-sm);
}

.heroSubtitle {
  font-size: 1.25rem;
  color: var(--color-gray-500);
}

.sectionHeader {
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.productGrid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* Mobile first */
  gap: var(--spacing-md);
  padding-bottom: var(--spacing-lg);
}

@media (min-width: 768px) {
  .productGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .productGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.productCard {
  display: flex;
  flex-direction: column;
}

.imagePlaceholder {
  aspect-ratio: 3/4;
  background-color: var(--color-gray-200);
  margin-bottom: var(--spacing-xs);
  position: relative;
  overflow: hidden;
}

.productInfo {
  text-align: left;
}

.productName {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.productPrice {
  font-size: 0.8rem;
  color: var(--color-gray-500);
}

.addToCartBtn {
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  background-color: var(--color-black);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

.addToCartBtn:hover {
  opacity: 0.8;
}
```

---

## File: app\page.tsx

```typescript
import Header from '@/components/Header';
import { getProducts } from './actions';
import styles from './page.module.css';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const allProducts = await getProducts();
  const newArrivals = allProducts.filter(p => p.isNewArrival || p.category === 'New Arrival' || p.category === 'Tops');

  return (
    <main className={styles.main}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>New Collection</h1>
          <p className={styles.heroSubtitle}>Effortless style for every curve.</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container">
        <div className={styles.sectionHeader}>
          <h2>New Arrival</h2>
        </div>
        <div className={styles.productGrid}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

```

---

## File: app\privacy\page.module.css

```css
.main {
    min-height: calc(100vh - var(--header-height));
    padding: 4rem 0;
    display: flex;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 800px;
    padding: 0 2rem;
}

.title {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    text-align: center;
}

.content {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: var(--color-gray-500);
    line-height: 1.8;
    letter-spacing: 0.02em;
}

.section {
    margin-bottom: 2.5rem;
}

.subTitle {
    font-size: 0.9rem;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--color-black);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.text {
    margin-bottom: 1rem;
}

.list {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.listItem {
    margin-bottom: 0.5rem;
}

.bold {
    font-weight: 600;
    color: var(--color-black);
}
```

---

## File: app\privacy\page.tsx

```typescript
import styles from './page.module.css';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Privacy Policy & Terms of Conditions</h1>

                <div className={styles.content}>
                    <p className={styles.text}>
                        Welcome to CurvyChiQ. This Privacy Policy outlines how we collect, use, and protect your
                        Personal Data when you use our website (curvychiq.com) and purchase our products. This privacy statement
                        is designed to ensure our compliance with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> of the Philippines.
                    </p>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>1. Personal Information We Collect</h2>
                        <p className={styles.text}>
                            When you register an account, make a purchase, or interact with our site, we may collect the following information:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><strong>Identity Data:</strong> First name, last name, and username.</li>
                            <li className={styles.listItem}><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
                            <li className={styles.listItem}><strong>Financial Data:</strong> Bank account and payment card details (processed securely via third-party gateways).</li>
                            <li className={styles.listItem}><strong>Profile Data:</strong> Purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>2. How We Use Your Information</h2>
                        <p className={styles.text}>
                            We use the collected information for the following purposes:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>To process and deliver your orders within the Philippines.</li>
                            <li className={styles.listItem}>To manage your account and provide customer support.</li>
                            <li className={styles.listItem}>To send you promotional offers, newsletters, and updates (only if you have opted in).</li>
                            <li className={styles.listItem}>To improve our website, products, and overall customer experience.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>3. Data Sharing and Disclosure</h2>
                        <p className={styles.text}>
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</li>
                            <li className={styles.listItem}>When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>4. Data Security</h2>
                        <p className={styles.text}>
                            We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>5. Your Rights as a Data Subject</h2>
                        <p className={styles.text}>
                            Under the Data Privacy Act of 2012, you have the right to:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Be informed about the processing of your personal data.</li>
                            <li className={styles.listItem}>Object to the processing of your personal data.</li>
                            <li className={styles.listItem}>Access your personal data.</li>
                            <li className={styles.listItem}>Rectify or correct inaccurate data.</li>
                            <li className={styles.listItem}>Erase or block your personal data from our system.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>6. Contacting Us</h2>
                        <p className={styles.text}>
                            If there are any questions regarding this privacy policy or if you wish to exercise any of your rights as a data subject, you may contact our Data Protection Officer at:
                        </p>
                        <p className={styles.text}>
                            <strong>Email:</strong> privacy@curvychiq.com<br />
                            <strong>Address:</strong> Manila, Philippines
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

```

---

## File: app\product\product.module.css

```css
.main {
    padding-top: 80px; /* Account for fixed header */
    min-height: 100vh;
    background-color: #fff;
}

.productLayout {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 100%;
}

/* Desktop layout: Side-by-side */
@media (min-width: 1024px) {
    .productLayout {
        grid-template-columns: 65% 35%;
    }
}

/* Image Gallery Section */
.gallery {
    display: flex;
    flex-direction: column;
    gap: 1px; /* Ultra-minimal gap */
    width: 100%;
}

.imageWrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    background-color: #f9f9f9;
    overflow: hidden;
}

/* Product Details Section */
.detailsContainer {
    padding: 2rem 1.5rem;
    position: relative;
    background: #fff;
    font-family: 'Inter', Helvetica, sans-serif;
}

@media (min-width: 1024px) {
    .detailsContainer {
        position: sticky;
        top: 80px;
        height: calc(100vh - 80px);
        overflow-y: auto;
        padding: 4rem 3rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
}

.productInfo {
    margin-bottom: 2rem;
}

.productName {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    color: #000;
    line-height: 1.2;
}

.productPrice {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    color: #000;
    margin-bottom: 1.5rem;
}

.productDescription {
    font-size: 0.8rem; /* 13px */
    line-height: 1.6;
    color: #333;
    margin-bottom: 2rem;
    max-width: 90%;
    font-weight: 300;
}

/* Options Selector */
.interactiveSection {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-top: 1px solid #eaeaea;
    padding-top: 1.5rem;
}

.optionGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.optionTitle {
    font-size: 0.75rem;
    font-weight: 400;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.optionTitle strong {
    color: #000;
    font-weight: 500;
}

/* Colors styling */
.colorList {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.colorBtn {
    border: 1px solid transparent;
    background: transparent;
    padding: 0;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #777;
    cursor: pointer;
    transition: color 0.2s ease;
    letter-spacing: 0.05em;
}

.colorBtn:hover {
    color: #000;
}

.colorActive {
    border: 1px solid transparent;
    background: transparent;
    padding: 0;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #000;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    letter-spacing: 0.05em;
}

/* Sizes styling - minimalist list */
.sizeList {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.sizeBtn {
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;
    font-size: 0.8rem;
    cursor: pointer;
    color: #000;
    position: relative;
    display: flex;
    justify-content: space-between;
    transition: all 0.2s ease;
}

.sizeBtn:hover {
    padding-left: 0.5rem;
}

.sizeActive {
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;
    font-size: 0.8rem;
    cursor: pointer;
    color: #000;
    font-weight: 600;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.sizeActive::after {
    content: "✓";
    font-weight: 400;
    font-size: 0.8rem;
}

/* Accessory pages: no size/color, just a divider before CTA */
.accessoryDivider {
    border-top: 1px solid #eaeaea;
    margin-top: 0.5rem;
}

/* Actions */
.addToCartBtn {
    width: 100%;
    background: #000;
    color: #fff;
    border: 1px solid #000;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 0;
    margin-top: 1rem;
}

.addToCartBtn:hover {
    background-color: #333;
    border-color: #333;
}

@media (max-width: 1023px) {
    .detailsContainer {
        padding-bottom: 120px;
    }
}

/* Reviews Styling */
.reviewsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eaeaea;
    font-family: 'Inter', Helvetica, sans-serif;
}

.reviewsHeader {
    margin-bottom: 2rem;
}

.reviewsTitle {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.averageRating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #000;
}

.starRating {
    display: flex;
    gap: 0.1rem;
}

.starFilled {
    color: #000;
}

.starEmpty {
    color: #e5e5e5;
}

.reviewsList {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.reviewCard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.reviewHeaderRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reviewerInfo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.reviewerAvatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: #555;
    text-transform: uppercase;
}

.reviewerName {
    font-size: 0.85rem;
    font-weight: 500;
}

.reviewDate {
    font-size: 0.75rem;
    color: #999;
}

.reviewMeta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.75rem;
    color: #555;
}

.sizePurchased strong {
    color: #000;
    font-weight: 500;
}

.reviewComment {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #333;
    margin-top: 0.25rem;
}
```

---

## File: app\product\[slug]\page.tsx

```typescript
import { getProducts } from '@/app/actions';
import Header from '@/components/Header';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '../product.module.css';
import ProductClient from './ProductClient';
import ProductReviews from './ProductReviews';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = await getProducts();

    const product = products.find(p =>
        p.name.toLowerCase().replace(/ /g, '-') === slug.toLowerCase()
    );

    if (!product) {
        notFound();
    }

    // Standard static gallery for all colors
    const galleryImages = [product.image, product.image, product.image, product.image];

    return (
        <main className={styles.main}>
            <Header />

            <div className={styles.productLayout}>
                <ProductClient product={product} />
                
                <div className={styles.detailsContainer}>
                    <div className={styles.productInfo}>
                        <h1 className={styles.productName}>{product.name}</h1>
                        <p className={styles.productPrice}>₱{product.price.toLocaleString()}</p>
                        <p className={styles.productDescription}>{product.description}</p>
                    </div>

                    <ProductReviews product={product} />
                </div>
            </div>
        </main>
    );
}

```

---

## File: app\product\[slug]\ProductClient.tsx

```typescript
'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import styles from '../product.module.css';
import Image from 'next/image';

// Local COLOR_MAP for just the swatches
const COLOR_MAP: Record<string, string> = {
    black: '#111111',
    white: '#ffffff',
    beige: '#e8d5b7',
    navy: '#1b2a4a',
    red: '#c0392b',
    pink: '#f4a7b9',
    grey: '#999999',
    gray: '#999999',
    brown: '#7b4f2e',
    camel: '#c19a6b',
    cream: '#fffdd0',
    green: '#3a7d44',
    blue: '#2980b9',
    yellow: '#f1c40f',
    orange: '#e67e22',
    purple: '#8e44ad',
};

function getColorHex(colorName: string): string {
    return COLOR_MAP[colorName.toLowerCase()] || '#cccccc';
}

export default function ProductClient({ product }: { product: any }) {
    const { addItem, setIsCartOpen } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Black');

    const isAccessory = product.category === 'Accessories';

    // Image logic: Support both single string or array of images for each color
    const colorEntry = product.colorImages?.[selectedColor];
    
    // Determine the primary image for this color
    const currentMainImage = Array.isArray(colorEntry) ? colorEntry[0] : (colorEntry || product.image);
    
    // Determine the gallery images — use color-specific array if available, else static repeat
    const galleryImages = Array.isArray(colorEntry) 
        ? colorEntry 
        : [currentMainImage, currentMainImage, currentMainImage, currentMainImage];

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: currentMainImage,
            size: isAccessory ? 'One Size' : selectedSize,
            color: isAccessory ? '' : selectedColor,
        });
        setIsCartOpen(true);
    };

    return (
        <>
            {/* Visuals - Gallery moved here from page.tsx */}
            <div className={styles.gallery}>
                {galleryImages.map((img, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.interactiveSection}>
                {!isAccessory && (
                    <div className={styles.options}>
                        {/* Color Swatches */}
                        <div className={styles.optionGroup}>
                            <p className={styles.optionTitle}>Color | <strong>{selectedColor}</strong></p>
                            <div className={styles.colorList}>
                                {(product.colors || []).map((color: string) => {
                                    const hex = getColorHex(color);
                                    const isSelected = selectedColor === color;
                                    const isLight = ['white', 'cream', 'beige', 'yellow'].includes(color.toLowerCase());
                                    return (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            title={color}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                backgroundColor: hex,
                                                border: isLight ? '1px solid #ccc' : '1px solid transparent',
                                                outline: isSelected ? `2px solid #000` : '2px solid transparent',
                                                outlineOffset: '2px',
                                                cursor: 'pointer',
                                                transition: 'outline 0.15s ease, transform 0.15s ease',
                                                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                                padding: 0,
                                                flexShrink: 0,
                                            }}
                                            aria-label={color}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className={styles.optionGroup} style={{ marginTop: '1rem' }}>
                            <p className={styles.optionTitle} style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                Size
                            </p>
                            <div className={styles.sizeList}>
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={selectedSize === size ? styles.sizeActive : styles.sizeBtn}
                                    >
                                        {size}
                                        {selectedSize !== size && <span style={{ opacity: 0.3 }}>+</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {isAccessory && (
                    <div className={styles.accessoryDivider} />
                )}

                <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                    ADD TO CART
                </button>
            </div>
        </>
    );
}

```

---

## File: app\product\[slug]\ProductReviews.tsx

```typescript
import styles from '../product.module.css';

export default function ProductReviews({ product }: { product: any }) {
    if (!product.reviews || product.reviews.length === 0) return null;

    const renderStars = (rating: number) => {
        return (
            <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= rating ? styles.starFilled : styles.starEmpty}>★</span>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.reviewsContainer}>
            <div className={styles.reviewsHeader}>
                <h3 className={styles.reviewsTitle}>Customer Reviews ({product.reviewCount || product.reviews.length})</h3>
                <div className={styles.averageRating}>
                    {renderStars(Math.round(parseFloat(product.rating || '5')))}
                    <span>{product.rating} / 5</span>
                </div>
            </div>

            <div className={styles.reviewsList}>
                {product.reviews.map((review: any) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeaderRow}>
                            <div className={styles.reviewerInfo}>
                                <div className={styles.reviewerAvatar}>{review.reviewer.charAt(0)}</div>
                                <span className={styles.reviewerName}>{review.reviewer}</span>
                            </div>
                            <span className={styles.reviewDate}>{review.date}</span>
                        </div>
                        <div className={styles.reviewMeta}>
                            {renderStars(review.rating)}
                            <span className={styles.sizePurchased}>Size: <strong>{review.sizePurchased}</strong></span>
                        </div>
                        <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

```

---

## File: app\profile\page.tsx

```typescript
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Profile.module.css';
import Header from '@/components/Header';

type Account = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
};

const PurchasesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const ReturnsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
    </svg>
);

const FavoritesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
);

const ContactIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [activeTab, setActiveTab] = useState('purchases');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            router.push('/login');
            return;
        }
        setUser(loggedInUser);

        // Load the full account record
        const accounts: Account[] = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        const found = accounts.find((a) => a.firstName.toUpperCase() === loggedInUser);
        if (found) setAccount(found);
    }, [router]);

    if (!user) return null;

    const tabs = [
        { id: 'purchases', label: 'Purchases', icon: <PurchasesIcon /> },
        { id: 'returns', label: 'Returns', icon: <ReturnsIcon /> },
        { id: 'favorites', label: 'Favorites', icon: <FavoritesIcon /> },
        { id: 'contact', label: 'Contact Info', icon: <ContactIcon /> },
        { id: 'location', label: 'Location', icon: <LocationIcon /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'purchases':
                return (
                    <div className={styles.tabContent}>
                        <h2>Your Purchases</h2>
                        <div className={styles.emptyState}>
                            <p>You haven't made any purchases yet.</p>
                            <button className={styles.primaryBtn} onClick={() => router.push('/')}>Start Shopping</button>
                        </div>
                    </div>
                );
            case 'returns':
                return (
                    <div className={styles.tabContent}>
                        <h2>Returns</h2>
                        <div className={styles.emptyState}>
                            <p>No active returns.</p>
                        </div>
                    </div>
                );
            case 'favorites':
                return (
                    <div className={styles.tabContent}>
                        <h2>Your Favorites</h2>
                        <div className={styles.emptyState}>
                            <p>Your wishlist is empty.</p>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className={styles.tabContent}>
                        <h2>Contact Info</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Full Name</label>
                                <p>{account ? `${account.firstName} ${account.lastName}` : user}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Email</label>
                                <p>{account?.email ?? '—'}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Phone</label>
                                <p>{account?.phone ?? '—'}</p>
                            </div>
                        </div>
                        <button className={styles.secondaryBtn}>Edit Profile</button>
                    </div>
                );
            case 'location':
                return (
                    <div className={styles.tabContent}>
                        <h2>Shipping Location</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Registered Address</label>
                                <p>{account?.address ?? 'No address saved yet.'}</p>
                            </div>
                        </div>
                        <button
                            className={styles.secondaryBtn}
                            onClick={() => router.push('/checkout')}
                        >
                            Change Address at Checkout
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className="container">
                <div className={styles.profileHeader}>
                    <h1>My Account</h1>
                    <p className={styles.welcomeMsg}>Welcome back, {user}</p>
                </div>

                <div className={styles.profileLayout}>
                    <aside className={styles.sidebar}>
                        <nav className={styles.sideNav}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                        <button 
                            className={styles.logoutBtn}
                            onClick={() => {
                                localStorage.removeItem('loggedInUser');
                                window.dispatchEvent(new Event('authChange'));
                                router.push('/');
                            }}
                        >
                            Log Out
                        </button>
                    </aside>

                    <section className={styles.content}>
                        {renderContent()}
                    </section>
                </div>
            </main>
        </div>
    );
}

```

---

## File: app\profile\Profile.module.css

```css
.pageWrapper {
    min-height: 100vh;
    background-color: var(--color-white);
}

.profileHeader {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-gray-100);
    margin-bottom: var(--spacing-lg);
}

.profileHeader h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.welcomeMsg {
    color: var(--color-gray-500);
    font-size: 1.1rem;
}

.profileLayout {
    display: flex;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-md);
    flex-direction: column;
}

@media (min-width: 768px) {
    .profileLayout {
        flex-direction: row;
    }
}

.sidebar {
    width: 100%;
    border-right: none;
    padding-right: 0;
}

@media (min-width: 768px) {
    .sidebar {
        width: 250px;
        border-right: 1px solid var(--color-gray-100);
        padding-right: var(--spacing-md);
    }
}

.sideNav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.navItem {
    background: none;
    border: none;
    text-align: left;
    padding: 1rem 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--color-gray-500);
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.navItem.active {
    color: var(--color-black);
    font-weight: 600;
    padding-left: 0.5rem;
    border-left: 2px solid var(--color-black);
}

.navItem:hover {
    color: var(--color-black);
}

.logoutBtn {
    margin-top: var(--spacing-md);
    background: none;
    border: none;
    padding: 1rem 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    color: #cc0000;
    text-align: left;
    width: 100%;
}

.content {
    flex: 1;
    padding-left: 0;
}

@media (min-width: 768px) {
    .content {
        padding-left: var(--spacing-md);
    }
}

.tabContent h2 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
}

.emptyState {
    padding: var(--spacing-xl) 0;
    text-align: center;
    border: 1px dashed var(--color-gray-200);
    background-color: var(--color-gray-50);
}

.emptyState p {
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-md);
}

.primaryBtn {
    background-color: var(--color-black);
    color: var(--color-white);
    border: none;
    padding: 1rem 2rem;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.1em;
    transition: background-color 0.2s;
}

.primaryBtn:hover {
    background-color: var(--color-gray-800);
}

.secondaryBtn {
    background-color: transparent;
    border: 1px solid var(--color-black);
    padding: 1rem 2rem;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.1em;
    transition: all 0.2s;
}

.secondaryBtn:hover {
    background-color: var(--color-black);
    color: var(--color-white);
}

.infoGrid {
    display: grid;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

@media (min-width: 768px) {
    .infoGrid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.infoItem label {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--color-gray-500);
    margin-bottom: 0.5rem;
}

.infoItem p {
    font-size: 1.1rem;
    font-weight: 500;
}

```

---

## File: app\register\page.module.css

```css
.main {
    min-height: calc(100vh - var(--header-height));
    padding: 4rem 0;
    display: flex;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 600px;
    /* narrowed for focused aesthetics */
}

.column {
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2.5rem;
}

.subtitle {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-black);
    padding-bottom: 0.5rem;
}

.form {
    display: flex;
    flex-direction: column;
}

/* We'll use a grid for multi-column inputs like first/last name */
.inputGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 2rem;
}

@media (min-width: 768px) {
    .inputGrid {
        grid-template-columns: 1fr 1fr;
    }
}

.inputGroup {
    position: relative;
    margin-bottom: 2.5rem;
}

.input {
    width: 100%;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    border: none;
    border-bottom: 1px solid var(--color-black);
    background: transparent;
    outline: none;
    font-family: inherit;
    transition: border-color 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.input[type="password"],
.input#password,
.input#repeatPassword {
    text-transform: none;
}

.input[type="password"] {
    letter-spacing: 0.2em;
    /* Spaced out bullets look chic */
}

.input::placeholder {
    color: transparent;
}

.label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 0.75rem;
    color: var(--color-gray-500);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    pointer-events: none;
}

.input:focus {
    border-bottom-color: var(--color-black);
    border-bottom-width: 2px;
}

.input:focus+.label,
.input:not(:placeholder-shown)+.label {
    top: -0.5rem;
    font-size: 0.625rem;
    color: var(--color-black);
}

.errorText {
    position: absolute;
    bottom: -1.25rem;
    left: 0;
    font-size: 0.625rem;
    color: #e00000;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.checkboxGroup {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
}

.checkbox {
    margin-top: 0.15rem;
    accent-color: var(--color-black);
    cursor: pointer;
    width: 1rem;
    height: 1rem;
}

.checkboxLabel {
    font-size: 0.625rem;
    color: var(--color-gray-500);
    line-height: 1.5;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.checkboxLabel a {
    color: var(--color-black);
    text-decoration: underline;
}

.actionBtn {
    width: 100%;
    padding: 1rem 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background-color: var(--color-black);
    color: var(--color-white);
    border: 1px solid var(--color-black);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    margin-top: 1rem;
}

.actionBtn:hover {
    background-color: var(--color-gray-800);
}
```

---

## File: app\register\page.tsx

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleGoogleSSO = () => {
        // Mock SSO logic: simulate logging in with Google
        localStorage.setItem('loggedInUser', 'GOOGLE USER');
        
        // Ensure "Google User" is in accounts if we ever look them up
        const accounts = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        if (!accounts.find((a: any) => a.email === 'googleuser@gmail.com')) {
            accounts.push({
                email: 'googleuser@gmail.com',
                password: 'SSO', // Not used for SSO users
                firstName: 'Google',
                lastName: 'User',
                phone: 'N/A',
                address: 'N/A'
            });
            localStorage.setItem('curvychiq_accounts', JSON.stringify(accounts));
        }

        window.dispatchEvent(new Event('authChange'));
        router.push('/');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError(null);

        const form = e.currentTarget;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const repeatPassword = (form.elements.namedItem('repeatPassword') as HTMLInputElement).value;

        // Validation Rules
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        if (!hasUpperCase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return;
        }

        if (!hasSymbol) {
            setPasswordError("Password must contain at least one symbol.");
            return;
        }

        if (password !== repeatPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const address = (form.elements.namedItem('address') as HTMLInputElement).value;

        // Save account details so login can look them up later
        const existingAccounts = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        const newAccount = { email: email.toLowerCase(), password, firstName, lastName, phone, address };
        // Replace if email already exists, otherwise add
        const updatedAccounts = existingAccounts.filter((a: { email: string }) => a.email !== email.toLowerCase());
        updatedAccounts.push(newAccount);
        localStorage.setItem('curvychiq_accounts', JSON.stringify(updatedAccounts));

        // Set session — use firstName so the header shows the name immediately
        localStorage.setItem('loggedInUser', firstName.toUpperCase());
        window.dispatchEvent(new Event('authChange'));

        // Simulate successful registration
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className={styles.main}>
                <div className={`container ${styles.container}`} style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <h1 className={styles.title}>Account Created</h1>
                    <p className={styles.description} style={{ marginBottom: '2rem' }}>
                        WELCOME TO CURVYCHIQ. YOUR ACCOUNT HAS BEEN SUCCESSFULLY CREATED.
                    </p>
                    <Link href="/" className={styles.actionBtn} style={{ maxWidth: '300px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                        RETURN TO SHOP
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h1 className={styles.title}>Personal details</h1>

                    {/* Google SSO Button */}
                    <button 
                        type="button" 
                        onClick={handleGoogleSSO} 
                        className={`${styles.actionBtn} ${styles.actionBtnOutline}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid var(--color-gray-300)', backgroundColor: 'transparent', color: 'var(--color-black)', width: '100%', marginBottom: '1.5rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        REGISTER WITH GOOGLE
                    </button>

                    {/* SSO Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                        <span style={{ padding: '0 1rem' }}>OR REGISTER WITH E-MAIL</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Access Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="E-MAIL"
                                    required
                                />
                                <label htmlFor="email" className={styles.label}>E-MAIL</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={styles.input}
                                    placeholder="PHONE / MOBILE"
                                    required
                                />
                                <label htmlFor="phone" className={styles.label}>PHONE / MOBILE</label>
                            </div>
                        </div>

                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={styles.input}
                                    placeholder="PASSWORD"
                                    required
                                />
                                <label htmlFor="password" className={styles.label}>PASSWORD</label>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-500)', zIndex: 2, padding: '0.25rem' }}>
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showRepeatPassword ? "text" : "password"}
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    className={styles.input}
                                    placeholder="REPEAT PASSWORD"
                                    required
                                />
                                <label htmlFor="repeatPassword" className={styles.label}>REPEAT PASSWORD</label>
                                <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-500)', zIndex: 2, padding: '0.25rem' }}>
                                    {showRepeatPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        {passwordError && (
                            <div style={{ marginTop: '-2rem', marginBottom: '2.5rem', color: '#e00000', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {passwordError}
                            </div>
                        )}

                        {/* Personal Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={styles.input}
                                    placeholder="NAME"
                                    required
                                />
                                <label htmlFor="firstName" className={styles.label}>NAME</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={styles.input}
                                    placeholder="SURNAME"
                                    required
                                />
                                <label htmlFor="lastName" className={styles.label}>SURNAME</label>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className={styles.input}
                                placeholder="ADDRESS"
                                required
                            />
                            <label htmlFor="address" className={styles.label}>ADDRESS</label>
                        </div>

                        {/* Opt-in / Terms */}
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="newsletter" name="newsletter" className={styles.checkbox} />
                            <label htmlFor="newsletter" className={styles.checkboxLabel}>
                                I wish to receive CurvyChiQ news on my e-mail.
                            </label>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="terms" name="terms" className={styles.checkbox} required />
                            <label htmlFor="terms" className={styles.checkboxLabel}>
                                I accept the <Link href="/privacy">privacy statement</Link>.
                            </label>
                        </div>

                        <button type="submit" className={styles.actionBtn}>
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

```

---

## File: auto_match_images.js

```js
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'generated');
const inventoryFile = path.join(__dirname, 'data', 'inventory.json');

const inventoryData = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));
const files = fs.readdirSync(publicDir);

function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

let updatedCount = 0;

inventoryData.forEach(item => {
    const itemNameNormalized = normalizeString(item.name);
    let bestMatch = null;

    // Try to find an exact match first
    for (const file of files) {
        if (file.endsWith('.svg') || file.startsWith('plus_') || file === 'classic_white_tee.png') {
            continue; // Skip the ones we generated earlier
        }
        
        const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const fileNameNormalized = normalizeString(fileNameWithoutExt);

        if (itemNameNormalized === fileNameNormalized || 
            itemNameNormalized.includes(fileNameNormalized) || 
            fileNameNormalized.includes(itemNameNormalized)) {
            bestMatch = file;
            break;
        }
    }

    // specific manual mapping fallbacks based on visual inspection of the list:
    if (!bestMatch) {
         if (item.name === "Gold Hoop Earrings") {
             bestMatch = "gold loop.jpeg";
         } else if (item.name === "Chunky Bracelets") {
             bestMatch = "chunky bracelet.jpeg";
         } else if (item.name === "Leather Crossbody Bag") {
             // did user upload one? "leather crossbody bag" wasn't listed, maybe skip
         } else if (item.name === "Classic White Tee") {
             bestMatch = "white tee.jpeg";
         } else if (item.name === "Pleated Midi Skirt") {
             bestMatch = "pleated mini skirt.jpeg";
         } else if (item.name === "Layered Chain Necklace") {
             bestMatch = "layered necklace.jpeg";
         } else if (item.name === "Silk Hair Scarf") {
             bestMatch = "hair scarf.jpeg";
         }
    }

    if (bestMatch) {
        item.image = `/generated/${bestMatch}`;
        console.log(`Matched "${item.name}" -> ${bestMatch}`);
        updatedCount++;
    } else {
        console.log(`No match found for: ${item.name}`);
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log(`Updated images for ${updatedCount} items based on your new files.`);

```

---

## File: components\AddToCartButton.module.css

```css
.container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.headerRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.6875rem;
  color: var(--color-black);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.colorSelection {
  color: var(--color-gray-500);
  margin-left: 0.25rem;
}

.colorsWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.colorButton {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0 0.25rem 0;
  border: none;
  background: transparent;
  color: var(--color-gray-500);
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
  font-family: inherit;
}

.colorButton:hover {
  color: var(--color-black);
}

.colorButtonSelected {
  color: var(--color-black);
  border-bottom: 1px solid var(--color-black);
  font-weight: 500;
}

.sizeGuideBtn {
  font-size: 0.6875rem;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
  padding: 0;
}

.sizeGuideBtn:hover {
  color: var(--color-black);
  text-decoration: underline;
}

.sizesGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.sizeButton {
  padding: 0.625rem 0;
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  background: transparent;
  color: var(--color-gray-800);
  border: 1px solid var(--color-gray-200);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sizeButton:hover {
  border-color: var(--color-black);
}

.sizeButtonSelected {
  background-color: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
  font-weight: 500;
}

.actionBtn {
  width: 100%;
  padding: 0.8rem 0;
  margin-top: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--color-black);
  font-family: inherit;
}

.actionBtnReady {
  background-color: var(--color-black);
  color: var(--color-white);
}

.actionBtnReady:hover {
  background-color: var(--color-gray-800);
}

.actionBtnDisabled {
  background-color: var(--color-gray-50);
  color: var(--color-gray-500);
  border-color: var(--color-gray-200);
  cursor: not-allowed;
}
```

---

## File: components\AddToCartButton.tsx

```typescript
'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import styles from './AddToCartButton.module.css';
import SizeChart from './SizeChart';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    colors?: string[];
    colorImages?: Record<string, string>;
}

const COLOR_MAP: Record<string, string> = {
    black: '#111111',
    white: '#ffffff',
    beige: '#e8d5b7',
    navy: '#1b2a4a',
    red: '#c0392b',
    pink: '#f4a7b9',
    grey: '#999999',
    gray: '#999999',
    brown: '#7b4f2e',
    camel: '#c19a6b',
    cream: '#fffdd0',
    green: '#3a7d44',
    blue: '#2980b9',
    yellow: '#f1c40f',
    orange: '#e67e22',
    purple: '#8e44ad',
};

function getColorHex(colorName: string): string {
    return COLOR_MAP[colorName.toLowerCase()] || '#cccccc';
}

export default function AddToCartButton({ 
    product,
    onColorChange 
}: { 
    product: Product,
    onColorChange?: (color: string) => void
}) {
    const { addItem, setIsCartOpen } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors = product.colors || ["Black", "White", "Beige"];

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
        if (onColorChange) onColorChange(color);
    };

    const isAccessory = product.category === 'Accessories';

    const handleAddToCart = () => {
        if (!isAccessory) {
            if (!selectedSize) {
                alert('Please select a size first!');
                return;
            }
            if (!selectedColor) {
                alert('Please select a color first!');
                return;
            }
        }

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: isAccessory ? 'One Size' : selectedSize,
            color: isAccessory ? '' : selectedColor,
        });

        if (!isAccessory) {
            setSelectedSize('');
            setSelectedColor('');
        }

        setIsCartOpen(true);
    };

    if (isAccessory) {
        return (
            <div className={styles.container}>
                <button
                    className={`${styles.actionBtn} ${styles.actionBtnReady}`}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Color Swatches - Reverting parent color sync logic */}
            <div>
                <div className={styles.headerRow}>
                    <span className={styles.label}>
                        Color {selectedColor && <span className={styles.colorSelection}>— {selectedColor}</span>}
                    </span>
                </div>
                <div className={styles.colorsWrapper}>
                    {colors.map((color) => {
                        const hex = getColorHex(color);
                        const isSelected = selectedColor === color;
                        const isLight = ['white', 'cream', 'beige', 'yellow'].includes(color.toLowerCase());
                        return (
                            <button
                                key={color}
                                onClick={() => handleColorClick(color)}
                                title={color}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: hex,
                                    border: isLight ? '1px solid #ccc' : '1px solid transparent',
                                    outline: isSelected ? '2px solid #000' : '2px solid transparent',
                                    outlineOffset: '2px',
                                    cursor: 'pointer',
                                    transition: 'outline 0.2s ease, transform 0.15s ease',
                                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                                    padding: 0,
                                    flexShrink: 0,
                                }}
                                aria-label={color}
                                aria-pressed={isSelected}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className={styles.headerRow}>
                    <span className={styles.label}>Size</span>
                    <button
                        onClick={() => setIsSizeChartOpen(true)}
                        className={styles.sizeGuideBtn}
                    >
                        Size Guide
                    </button>
                </div>

                <div className={styles.sizesGrid}>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeButtonSelected : ''}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className={`${styles.actionBtn} ${selectedSize && selectedColor ? styles.actionBtnReady : styles.actionBtnDisabled}`}
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
            >
                {selectedSize && selectedColor ? 'Add to Bag' : 'Select Options'}
            </button>

            <SizeChart isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
        </div>
    );
}

```

---

## File: components\CartContext.tsx

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, delta: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('curvychiq-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Basic migration/validation: filter out items without color if needed, or default them
                // For now, we'll just load them. If color is missing, it might break UI, so let's default to "N/A" if missing
                const migratedCart = parsedCart.map((item: any) => ({
                    ...item,
                    color: item.color || "N/A"
                }));
                setItems(migratedCart);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('curvychiq-cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((currentItems) => {
            // Find item with same ID AND same size AND same color
            const existingItem = currentItems.find((item) =>
                item.id === newItem.id &&
                item.size === newItem.size &&
                item.color === newItem.color
            );
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, size: string, color: string) => {
        setItems((currentItems) => currentItems.filter((item) => !(item.id === id && item.size === size && item.color === color)));
    };

    const updateQuantity = (id: string, size: string, color: string, delta: number) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id === id && item.size === size && item.color === color) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

```

---

## File: components\CartSidebar.module.css

```css
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.overlay.open {
    opacity: 1;
    pointer-events: auto;
}

.sidebar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 400px;
    height: 100vh;
    background-color: var(--color-white);
    z-index: 1001;
    transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
    right: 0;
}

.header {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--color-gray-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.closeBtn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.cartItems {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-sm);
}

.emptyCart {
    text-align: center;
    margin-top: var(--spacing-lg);
    color: var(--color-gray-500);
}

.cartItem {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-gray-100);
}

.itemImageContainer {
    position: relative;
    width: 80px;
    height: 106px;
    /* Aspect 3:4 roughly */
    background-color: var(--color-gray-100);
}

.itemDetails {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.itemName {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.itemPrice {
    font-size: 0.9rem;
    color: var(--color-gray-500);
}

.quantityControls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.qtyBtn {
    background: var(--color-gray-100);
    border: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
}

.footer {
    padding: var(--spacing-md);
    border-top: 1px solid var(--color-gray-200);
    background-color: var(--color-gray-50);
}

.totalRow {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
    font-size: 1.1rem;
}

.checkoutBtn {
    width: 100%;
    padding: 1rem;
    background-color: var(--color-black);
    color: var(--color-white);
    border: none;
    font-family: var(--font-heading);
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.checkoutBtn:hover {
    background-color: var(--color-gray-800);
}
```

---

## File: components\CartSidebar.tsx

```typescript
"use client";

import { useCart } from './CartContext';
import styles from './CartSidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();

    if (!isCartOpen) {
        // We render structure but hide it via CSS for transition usually, 
        // but here conditional rendering plus CSS 'open' class is fine.
        // Actually for transition to work we should render it always but change class.
    }

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h3>Shopping Cart</h3>
                    <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>×</button>
                </div>

                <div className={styles.cartItems}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>Your cart is empty.</div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItem}>
                                <div className={styles.itemImageContainer}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles.itemDetails}>
                                    <div>
                                        <div className={styles.itemName}>{item.name}</div>
                                        <div className={styles.itemSize}>Size: {item.size}</div>
                                        <div className={styles.itemSize}>Color: {item.color}</div>
                                        <div className={styles.itemPrice}>₱{item.price.toLocaleString()}</div>
                                    </div>
                                    <div className={styles.quantityControls}>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.size, item.color, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.size, item.color, 1)}>+</button>
                                        <button
                                            className={styles.qtyBtn}
                                            style={{ marginLeft: 'auto', background: 'none', color: 'red' }}
                                            onClick={() => removeItem(item.id, item.size, item.color)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>₱{cartTotal.toLocaleString()}</span>
                        </div>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <button className={styles.checkoutBtn}>Checkout</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

```

---

## File: components\Header.module.css

```css
.header {
    height: var(--header-height);
    border-bottom: 1px solid var(--color-gray-100);
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
}

.headerInner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.logo {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: var(--color-black);
}

.nav {
    display: none;
}

@media (min-width: 768px) {
    .nav {
        display: block;
    }
}

.navList {
    display: flex;
    list-style: none;
    gap: var(--spacing-md);
}

.navLink {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.2s;
    color: var(--color-black);
}

.navLink:hover {
    color: var(--color-gray-500);
}

.actions {
    display: flex;
    gap: var(--spacing-sm);
}

.actionBtn {
    background: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
    font-size: 0.9rem;
    text-transform: uppercase;
}

.userName {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: none;
}

.separator {
    color: var(--color-gray-200);
}
```

---

## File: components\Header.tsx

```typescript
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from './CartContext';
import CartSidebar from './CartSidebar';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('loggedInUser');
      setLoggedInUser(user);
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.logo}>
            CurvyChiQ
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {['About', 'New Arrival', 'Tops', 'Bottoms', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'About' ? '/about' : `/category/${item.toLowerCase().replace(' ', '-')}`} 
                    className={styles.navLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            {loggedInUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Link href="/profile" className={styles.actionBtn} title="Profile" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <UserIcon />
                  <span className={styles.userName}>{loggedInUser}</span>
                </Link>
                <span className={styles.separator}>|</span>
                <button className={styles.actionBtn} onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <Link href="/login" className={styles.actionBtn} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <UserIcon />
                Log In
              </Link>
            )}
            <button className={styles.actionBtn}>
              <SearchIcon />
            </button>
            <button className={styles.actionBtn} onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CartIcon />
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </header>
      <CartSidebar />
    </>
  );
}

```

---

## File: components\ProductCard.tsx

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import styles from '../app/page.module.css';

export default function ProductCard({ product }: { product: any }) {
    // Current display image starts with product.image
    const [currentImage, setCurrentImage] = useState(product.image);

    const handleColorChange = (color: string) => {
        // If product has colorImages mapping, switch the image
        if (product.colorImages && product.colorImages[color]) {
            setCurrentImage(product.colorImages[color]);
        }
    };

    const slug = product.name.toLowerCase().replace(/ /g, '-');

    return (
        <div className={styles.productCard}>
            <Link href={`/product/${slug}`} className={styles.imagePlaceholder}>
                <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </Link>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>₱{product.price.toLocaleString()}</p>
                <AddToCartButton 
                    product={product} 
                    onColorChange={handleColorChange} 
                />
            </div>
        </div>
    );
}

```

---

## File: components\SizeChart.module.css

```css
.overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal {
    background-color: var(--color-white);
    width: 100%;
    max-width: 700px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 3rem 2rem;
    font-family: var(--font-body);
}

.closeButton {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--color-gray-500);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    line-height: 1;
}

.closeButton:hover {
    color: var(--color-black);
}

.title {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    text-align: center;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.subtitle {
    font-size: 0.6875rem;
    color: var(--color-gray-500);
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 400;
}

.tableContainer {
    width: 100%;
}

.table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.th {
    padding: 1rem 0;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-black);
}

.td {
    padding: 1rem 0;
    font-size: 0.6875rem;
    color: var(--color-gray-500);
    border-bottom: 1px solid var(--color-gray-200);
}

.tdBold {
    font-weight: 500;
    color: var(--color-black);
    letter-spacing: 0.05em;
}

.actionButton {
    width: 100%;
    padding: 0.8rem 0;
    margin-top: 2rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    background-color: var(--color-black);
    color: var(--color-white);
    border: 1px solid var(--color-black);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
}

.actionButton:hover {
    background-color: var(--color-gray-800);
}
```

---

## File: components\SizeChart.tsx

```typescript
'use client';

import React from 'react';
import styles from './SizeChart.module.css';

interface SizeChartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    &times;
                </button>

                <div>
                    <h3 className={styles.title}>Size Guide</h3>
                    <p className={styles.subtitle}>Find your perfect fit with our US size conversion.</p>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Size</th>
                                    <th className={styles.th}>US Size</th>
                                    <th className={styles.th}>Bust (in)</th>
                                    <th className={styles.th}>Waist (in)</th>
                                    <th className={styles.th}>Hips (in)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>XL</td>
                                    <td className={styles.td}>12</td>
                                    <td className={styles.td}>40 - 42</td>
                                    <td className={styles.td}>33 - 35</td>
                                    <td className={styles.td}>42 - 44</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>2XL</td>
                                    <td className={styles.td}>14 - 16</td>
                                    <td className={styles.td}>42 - 46</td>
                                    <td className={styles.td}>35 - 39</td>
                                    <td className={styles.td}>44 - 48</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>3XL</td>
                                    <td className={styles.td}>18 - 20</td>
                                    <td className={styles.td}>46 - 50</td>
                                    <td className={styles.td}>39 - 43</td>
                                    <td className={styles.td}>48 - 52</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>4XL</td>
                                    <td className={styles.td}>22 - 24</td>
                                    <td className={styles.td}>50 - 54</td>
                                    <td className={styles.td}>43 - 47</td>
                                    <td className={styles.td}>52 - 56</td>
                                </tr>
                                <tr>
                                    <td className={`${styles.td} ${styles.tdBold}`}>5XL</td>
                                    <td className={styles.td}>26 - 28</td>
                                    <td className={styles.td}>54 - 58</td>
                                    <td className={styles.td}>47 - 51</td>
                                    <td className={styles.td}>56 - 60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={onClose}
                        className={styles.actionButton}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}

```

---

## File: data\inventory.json

```json
[
    {
        "id": "1",
        "name": "Classic White Tee",
        "price": 662,
        "category": "Tops",
        "image": "/generated/white tee.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.7",
        "reviewCount": 33,
        "reviews": [
            {
                "id": "qp7xvo99a",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Jan 13, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "M"
            },
            {
                "id": "379i20he5",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Dec 10, 2025",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "M"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/white_tee_black.jpeg",
                "/generated/white_tee_black_2.jpeg",
                "/generated/white_tee_black_3.jpeg",
                "/generated/white_tee_black_4.jpeg"
            ],
            "White": [
                "/generated/white_tee_white.jpeg",
                "/generated/white_tee_white_2.jpeg",
                "/generated/white_tee_white_3.jpeg",
                "/generated/white_tee_white_4.jpeg"
            ],
            "Beige": [
                "/generated/white_tee_beige.jpeg",
                "/generated/white_tee_beige_2.jpeg",
                "/generated/white_tee_beige_3.jpeg",
                "/generated/white_tee_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "2",
        "name": "Silk Camisole",
        "price": 598,
        "category": "Tops",
        "image": "/generated/silk camisole.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.9",
        "reviewCount": 57,
        "reviews": [
            {
                "id": "5f9iwgwzg",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Nov 30, 2025",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "L"
            },
            {
                "id": "xx1k52392",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Feb 28, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "L"
            },
            {
                "id": "5cpdl7e1d",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Mar 5, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "L"
            },
            {
                "id": "h99tce7ss",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Jan 28, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "L"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/silk_camisole_black.jpeg",
                "/generated/silk_camisole_black_2.jpeg",
                "/generated/silk_camisole_black_3.jpeg",
                "/generated/silk_camisole_black_4.jpeg"
            ],
            "White": [
                "/generated/silk_camisole_white.jpeg",
                "/generated/silk_camisole_white_2.jpeg",
                "/generated/silk_camisole_white_3.jpeg",
                "/generated/silk_camisole_white_4.jpeg"
            ],
            "Beige": [
                "/generated/silk_camisole_beige.jpeg",
                "/generated/silk_camisole_beige_2.jpeg",
                "/generated/silk_camisole_beige_3.jpeg",
                "/generated/silk_camisole_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "3",
        "name": "Ribbed Knit Sweater",
        "price": 727,
        "category": "Tops",
        "image": "/generated/ribbed knit sweater.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.7",
        "reviewCount": 41,
        "reviews": [
            {
                "id": "lxbn9j11x",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Jan 26, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XL"
            },
            {
                "id": "w776wrih5",
                "reviewer": "Emily W.",
                "rating": 4,
                "date": "Feb 15, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XXL"
            },
            {
                "id": "e4dhi032f",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Dec 3, 2025",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "M"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/ribbed_knit_sweater_black.jpeg",
                "/generated/ribbed_knit_sweater_black_2.jpeg",
                "/generated/ribbed_knit_sweater_black_3.jpeg",
                "/generated/ribbed_knit_sweater_black_4.jpeg"
            ],
            "White": [
                "/generated/ribbed_knit_sweater_white.jpeg",
                "/generated/ribbed_knit_sweater_white_2.jpeg",
                "/generated/ribbed_knit_sweater_white_3.jpeg",
                "/generated/ribbed_knit_sweater_white_4.jpeg"
            ],
            "Beige": [
                "/generated/ribbed_knit_sweater_beige.jpeg",
                "/generated/ribbed_knit_sweater_beige_2.jpeg",
                "/generated/ribbed_knit_sweater_beige_3.jpeg",
                "/generated/ribbed_knit_sweater_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "4",
        "name": "Oversized Poplin Shirt",
        "price": 776,
        "category": "Tops",
        "image": "/generated/oversized poplin.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 44,
        "reviews": [
            {
                "id": "xpscb2bm6",
                "reviewer": "Amanda R.",
                "rating": 4,
                "date": "Dec 11, 2025",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XXL"
            },
            {
                "id": "ols1gyfbd",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Jan 30, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XL"
            },
            {
                "id": "ce3ls2hs0",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Jan 15, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "S"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/oversized_poplin_black.jpeg",
                "/generated/oversized_poplin_black_2.jpeg",
                "/generated/oversized_poplin_black_3.jpeg",
                "/generated/oversized_poplin_black_4.jpeg"
            ],
            "White": [
                "/generated/oversized_poplin_white.jpeg",
                "/generated/oversized_poplin_white_2.jpeg",
                "/generated/oversized_poplin_white_3.jpeg",
                "/generated/oversized_poplin_white_4.jpeg"
            ],
            "Beige": [
                "/generated/oversized_poplin_beige.jpeg",
                "/generated/oversized_poplin_beige_2.jpeg",
                "/generated/oversized_poplin_beige_3.jpeg",
                "/generated/oversized_poplin_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "5",
        "name": "Off-the-Shoulder Blouse",
        "price": 776,
        "category": "Tops",
        "image": "/generated/off the shoulder.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 24,
        "reviews": [
            {
                "id": "ngq0j9g2t",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Nov 23, 2025",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XL"
            },
            {
                "id": "afubt9epn",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Dec 22, 2025",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "XXL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/off_the_shoulder_black.jpeg",
                "/generated/off_the_shoulder_black_2.jpeg",
                "/generated/off_the_shoulder_black_3.jpeg",
                "/generated/off_the_shoulder_black_4.jpeg"
            ],
            "White": [
                "/generated/off_the_shoulder_white.jpeg",
                "/generated/off_the_shoulder_white_2.jpeg",
                "/generated/off_the_shoulder_white_3.jpeg",
                "/generated/off_the_shoulder_white_4.jpeg"
            ],
            "Beige": [
                "/generated/off_the_shoulder_beige.jpeg",
                "/generated/off_the_shoulder_beige_2.jpeg",
                "/generated/off_the_shoulder_beige_3.jpeg",
                "/generated/off_the_shoulder_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "6",
        "name": "Cropped Cardigan",
        "price": 766,
        "category": "Tops",
        "image": "/generated/cropped cardigan.jpeg",
        "description": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 38,
        "reviews": [
            {
                "id": "vcd9c2vm8",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Feb 14, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            },
            {
                "id": "i1ufp314i",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Jan 16, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "M"
            },
            {
                "id": "utyxwduww",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Jan 24, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/cropped_cardigan_black.jpeg",
                "/generated/cropped_cardigan_black_2.jpeg",
                "/generated/cropped_cardigan_black_3.jpeg",
                "/generated/cropped_cardigan_black_4.jpeg"
            ],
            "White": [
                "/generated/cropped_cardigan_white.jpeg",
                "/generated/cropped_cardigan_white_2.jpeg",
                "/generated/cropped_cardigan_white_3.jpeg",
                "/generated/cropped_cardigan_white_4.jpeg"
            ],
            "Beige": [
                "/generated/cropped_cardigan_beige.jpeg",
                "/generated/cropped_cardigan_beige_2.jpeg",
                "/generated/cropped_cardigan_beige_3.jpeg",
                "/generated/cropped_cardigan_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "7",
        "name": "High-Waist Denim Jeans",
        "price": 817,
        "category": "Bottoms",
        "image": "/generated/highwaist denim jeans.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 55,
        "reviews": [
            {
                "id": "vby6iipw7",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Dec 27, 2025",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "S"
            },
            {
                "id": "e6z1antm1",
                "reviewer": "Amanda R.",
                "rating": 4,
                "date": "Nov 23, 2025",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XL"
            },
            {
                "id": "be7m0yyj5",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Mar 2, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "M"
            },
            {
                "id": "qafse1faw",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Feb 12, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/highwaist_denim_jeans_black.jpeg",
                "/generated/highwaist_denim_jeans_black_2.jpeg",
                "/generated/highwaist_denim_jeans_black_3.jpeg",
                "/generated/highwaist_denim_jeans_black_4.jpeg"
            ],
            "White": [
                "/generated/highwaist_denim_jeans_white.jpeg",
                "/generated/highwaist_denim_jeans_white_2.jpeg",
                "/generated/highwaist_denim_jeans_white_3.jpeg",
                "/generated/highwaist_denim_jeans_white_4.jpeg"
            ],
            "Beige": [
                "/generated/highwaist_denim_jeans_beige.jpeg",
                "/generated/highwaist_denim_jeans_beige_2.jpeg",
                "/generated/highwaist_denim_jeans_beige_3.jpeg",
                "/generated/highwaist_denim_jeans_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "8",
        "name": "Wide Leg Tailored Trousers",
        "price": 942,
        "category": "Bottoms",
        "image": "/generated/wide leg tailored trouser.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "5.0",
        "reviewCount": 69,
        "reviews": [
            {
                "id": "ipt78opw8",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Mar 8, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "L"
            },
            {
                "id": "vkm43nmwy",
                "reviewer": "Amanda R.",
                "rating": 4,
                "date": "Feb 15, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "M"
            },
            {
                "id": "jld75lebu",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Feb 9, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XXL"
            },
            {
                "id": "l8g28ap3v",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Dec 15, 2025",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XXL"
            },
            {
                "id": "xa66kimc8",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Jan 14, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "M"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/wide_leg_tailored_trouser_black.jpeg",
                "/generated/wide_leg_tailored_trouser_black_2.jpeg",
                "/generated/wide_leg_tailored_trouser_black_3.jpeg",
                "/generated/wide_leg_tailored_trouser_black_4.jpeg"
            ],
            "White": [
                "/generated/wide_leg_tailored_trouser_white.jpeg",
                "/generated/wide_leg_tailored_trouser_white_2.jpeg",
                "/generated/wide_leg_tailored_trouser_white_3.jpeg",
                "/generated/wide_leg_tailored_trouser_white_4.jpeg"
            ],
            "Beige": [
                "/generated/wide_leg_tailored_trouser_beige.jpeg",
                "/generated/wide_leg_tailored_trouser_beige_2.jpeg",
                "/generated/wide_leg_tailored_trouser_beige_3.jpeg",
                "/generated/wide_leg_tailored_trouser_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "9",
        "name": "Satin Slip Skirt",
        "price": 1312,
        "category": "Bottoms",
        "image": "/generated/satin slip skirt.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 38,
        "reviews": [
            {
                "id": "zkotav2qi",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Mar 3, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XL"
            },
            {
                "id": "0f18x9620",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Mar 17, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "S"
            },
            {
                "id": "f5gbd1d7b",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Jan 6, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "S"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/satin_slip_skirt_black.jpeg",
                "/generated/satin_slip_skirt_black_2.jpeg",
                "/generated/satin_slip_skirt_black_3.jpeg",
                "/generated/satin_slip_skirt_black_4.jpeg"
            ],
            "White": [
                "/generated/satin_slip_skirt_white.jpeg",
                "/generated/satin_slip_skirt_white_2.jpeg",
                "/generated/satin_slip_skirt_white_3.jpeg",
                "/generated/satin_slip_skirt_white_4.jpeg"
            ],
            "Beige": [
                "/generated/satin_slip_skirt_beige.jpeg",
                "/generated/satin_slip_skirt_beige_2.jpeg",
                "/generated/satin_slip_skirt_beige_3.jpeg",
                "/generated/satin_slip_skirt_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "10",
        "name": "Linen Blend Shorts",
        "price": 983,
        "category": "Bottoms",
        "image": "/generated/linen blend shorts.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 52,
        "reviews": [
            {
                "id": "jyngsskpl",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Feb 28, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "XL"
            },
            {
                "id": "qf8mixd6a",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Nov 26, 2025",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "S"
            },
            {
                "id": "mus5s49pj",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Jan 3, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "M"
            },
            {
                "id": "9i7cjfvdv",
                "reviewer": "Emily W.",
                "rating": 4,
                "date": "Jan 17, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "L"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/linen_blend_shorts_black.jpeg",
                "/generated/linen_blend_shorts_black_2.jpeg",
                "/generated/linen_blend_shorts_black_3.jpeg",
                "/generated/linen_blend_shorts_black_4.jpeg"
            ],
            "White": [
                "/generated/linen_blend_shorts_white.jpeg",
                "/generated/linen_blend_shorts_white_2.jpeg",
                "/generated/linen_blend_shorts_white_3.jpeg",
                "/generated/linen_blend_shorts_white_4.jpeg"
            ],
            "Beige": [
                "/generated/linen_blend_shorts_beige.jpeg",
                "/generated/linen_blend_shorts_beige_2.jpeg",
                "/generated/linen_blend_shorts_beige_3.jpeg",
                "/generated/linen_blend_shorts_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "11",
        "name": "Faux Leather Leggings",
        "price": 1464,
        "category": "Bottoms",
        "image": "/generated/faux leather leggings.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.5",
        "reviewCount": 40,
        "reviews": [
            {
                "id": "ga5de4atr",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Dec 4, 2025",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "XXL"
            },
            {
                "id": "wsxvt9bxj",
                "reviewer": "Chloe S.",
                "rating": 4,
                "date": "Mar 7, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "M"
            },
            {
                "id": "jptumpyjr",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Jan 21, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "L"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/faux_leather_leggings_black.jpeg",
                "/generated/faux_leather_leggings_black_2.jpeg",
                "/generated/faux_leather_leggings_black_3.jpeg",
                "/generated/faux_leather_leggings_black_4.jpeg"
            ],
            "White": [
                "/generated/faux_leather_leggings_white.jpeg",
                "/generated/faux_leather_leggings_white_2.jpeg",
                "/generated/faux_leather_leggings_white_3.jpeg",
                "/generated/faux_leather_leggings_white_4.jpeg"
            ],
            "Beige": [
                "/generated/faux_leather_leggings_beige.jpeg",
                "/generated/faux_leather_leggings_beige_2.jpeg",
                "/generated/faux_leather_leggings_beige_3.jpeg",
                "/generated/faux_leather_leggings_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "12",
        "name": "Pleated Midi Skirt",
        "price": 1472,
        "category": "Bottoms",
        "image": "/generated/pleated mini skirt.jpeg",
        "description": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 63,
        "reviews": [
            {
                "id": "p9n7woo7e",
                "reviewer": "Emily W.",
                "rating": 4,
                "date": "Jan 9, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "S"
            },
            {
                "id": "2uoolw2ky",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Feb 28, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "M"
            },
            {
                "id": "p2goipli6",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Dec 13, 2025",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "S"
            },
            {
                "id": "hxetkdss5",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 17, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XXL"
            },
            {
                "id": "uzhg31y8d",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Mar 10, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/pleated_mini_skirt_black.jpeg",
                "/generated/pleated_mini_skirt_black_2.jpeg",
                "/generated/pleated_mini_skirt_black_3.jpeg",
                "/generated/pleated_mini_skirt_black_4.jpeg"
            ],
            "White": [
                "/generated/pleated_mini_skirt_white.jpeg",
                "/generated/pleated_mini_skirt_white_2.jpeg",
                "/generated/pleated_mini_skirt_white_3.jpeg",
                "/generated/pleated_mini_skirt_white_4.jpeg"
            ],
            "Beige": [
                "/generated/pleated_mini_skirt_beige.jpeg",
                "/generated/pleated_mini_skirt_beige_2.jpeg",
                "/generated/pleated_mini_skirt_beige_3.jpeg",
                "/generated/pleated_mini_skirt_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "13",
        "name": "Linen Blend Dress",
        "price": 1006,
        "category": "Dresses",
        "image": "/generated/13_linen_blend_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.5",
        "reviewCount": 52,
        "reviews": [
            {
                "id": "t3aje2hsr",
                "reviewer": "Emily W.",
                "rating": 4,
                "date": "Jan 3, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XXL"
            },
            {
                "id": "e03zacgbf",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Jan 14, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "XL"
            },
            {
                "id": "7ebrb0jd8",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Dec 20, 2025",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "S"
            },
            {
                "id": "2op4bcdyw",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Jan 26, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XXL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/13_linen_blend_dress_black.jpeg",
                "/generated/13_linen_blend_dress_black_2.jpeg",
                "/generated/13_linen_blend_dress_black_3.jpeg",
                "/generated/13_linen_blend_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/13_linen_blend_dress_white.jpeg",
                "/generated/13_linen_blend_dress_white_2.jpeg",
                "/generated/13_linen_blend_dress_white_3.jpeg",
                "/generated/13_linen_blend_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/13_linen_blend_dress_beige.jpeg",
                "/generated/13_linen_blend_dress_beige_2.jpeg",
                "/generated/13_linen_blend_dress_beige_3.jpeg",
                "/generated/13_linen_blend_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "14",
        "name": "Floral Maxi Dress",
        "price": 1648,
        "category": "Dresses",
        "image": "/generated/14_floral_maxi_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 64,
        "reviews": [
            {
                "id": "braq667vn",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Mar 15, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XL"
            },
            {
                "id": "pusg6jac3",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Feb 8, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "L"
            },
            {
                "id": "4qrrtkcm5",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Dec 14, 2025",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "L"
            },
            {
                "id": "kn75e33yw",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Jan 12, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "L"
            },
            {
                "id": "czzlcbbys",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Jan 3, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "L"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/14_floral_maxi_dress_black.jpeg",
                "/generated/14_floral_maxi_dress_black_2.jpeg",
                "/generated/14_floral_maxi_dress_black_3.jpeg",
                "/generated/14_floral_maxi_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/14_floral_maxi_dress_white.jpeg",
                "/generated/14_floral_maxi_dress_white_2.jpeg",
                "/generated/14_floral_maxi_dress_white_3.jpeg",
                "/generated/14_floral_maxi_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/14_floral_maxi_dress_beige.jpeg",
                "/generated/14_floral_maxi_dress_beige_2.jpeg",
                "/generated/14_floral_maxi_dress_beige_3.jpeg",
                "/generated/14_floral_maxi_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "15",
        "name": "Ribbed Midi Knit Dress",
        "price": 1213,
        "category": "Dresses",
        "image": "/generated/15_ribbed_midi_knit_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 29,
        "reviews": [
            {
                "id": "odyagk7f6",
                "reviewer": "Amanda R.",
                "rating": 4,
                "date": "Mar 10, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "M"
            },
            {
                "id": "nteyt4nlg",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Feb 15, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XXL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/15_ribbed_midi_knit_dress_black.jpeg",
                "/generated/15_ribbed_midi_knit_dress_black_2.jpeg",
                "/generated/15_ribbed_midi_knit_dress_black_3.jpeg",
                "/generated/15_ribbed_midi_knit_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/15_ribbed_midi_knit_dress_white.jpeg",
                "/generated/15_ribbed_midi_knit_dress_white_2.jpeg",
                "/generated/15_ribbed_midi_knit_dress_white_3.jpeg",
                "/generated/15_ribbed_midi_knit_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/15_ribbed_midi_knit_dress_beige.jpeg",
                "/generated/15_ribbed_midi_knit_dress_beige_2.jpeg",
                "/generated/15_ribbed_midi_knit_dress_beige_3.jpeg",
                "/generated/15_ribbed_midi_knit_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "16",
        "name": "Satin Wrap Dress",
        "price": 1178,
        "category": "Dresses",
        "image": "/generated/16_satin_wrap_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 33,
        "reviews": [
            {
                "id": "bu5hp5w87",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Mar 10, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            },
            {
                "id": "uazn14hyf",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Dec 15, 2025",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "S"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/16_satin_wrap_dress_black.jpeg",
                "/generated/16_satin_wrap_dress_black_2.jpeg",
                "/generated/16_satin_wrap_dress_black_3.jpeg",
                "/generated/16_satin_wrap_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/16_satin_wrap_dress_white.jpeg",
                "/generated/16_satin_wrap_dress_white_2.jpeg",
                "/generated/16_satin_wrap_dress_white_3.jpeg",
                "/generated/16_satin_wrap_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/16_satin_wrap_dress_beige.jpeg",
                "/generated/16_satin_wrap_dress_beige_2.jpeg",
                "/generated/16_satin_wrap_dress_beige_3.jpeg",
                "/generated/16_satin_wrap_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "17",
        "name": "Halter Neck Mini Dress",
        "price": 1157,
        "category": "Dresses",
        "image": "/generated/17_halter_neck_mini_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.5",
        "reviewCount": 39,
        "reviews": [
            {
                "id": "fcosx3vli",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Jan 30, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "L"
            },
            {
                "id": "2af52zjyr",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Mar 5, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "L"
            },
            {
                "id": "a18he606e",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Mar 15, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "S"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/17_halter_neck_mini_dress_black.jpeg",
                "/generated/17_halter_neck_mini_dress_black_2.jpeg",
                "/generated/17_halter_neck_mini_dress_black_3.jpeg",
                "/generated/17_halter_neck_mini_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/17_halter_neck_mini_dress_white.jpeg",
                "/generated/17_halter_neck_mini_dress_white_2.jpeg",
                "/generated/17_halter_neck_mini_dress_white_3.jpeg",
                "/generated/17_halter_neck_mini_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/17_halter_neck_mini_dress_beige.jpeg",
                "/generated/17_halter_neck_mini_dress_beige_2.jpeg",
                "/generated/17_halter_neck_mini_dress_beige_3.jpeg",
                "/generated/17_halter_neck_mini_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "18",
        "name": "Long Sleeve Shift Dress",
        "price": 1768,
        "category": "Dresses",
        "image": "/generated/18_long_sleeve_shift_dress.svg",
        "description": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 52,
        "reviews": [
            {
                "id": "kucxpmh4x",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Dec 23, 2025",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "XL"
            },
            {
                "id": "0iq5vbvyo",
                "reviewer": "Chloe S.",
                "rating": 4,
                "date": "Feb 3, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XL"
            },
            {
                "id": "p6vyvh3kh",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 29, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XXL"
            },
            {
                "id": "590q1ld3v",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Dec 3, 2025",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XXL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/18_long_sleeve_shift_dress_black.jpeg",
                "/generated/18_long_sleeve_shift_dress_black_2.jpeg",
                "/generated/18_long_sleeve_shift_dress_black_3.jpeg",
                "/generated/18_long_sleeve_shift_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/18_long_sleeve_shift_dress_white.jpeg",
                "/generated/18_long_sleeve_shift_dress_white_2.jpeg",
                "/generated/18_long_sleeve_shift_dress_white_3.jpeg",
                "/generated/18_long_sleeve_shift_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/18_long_sleeve_shift_dress_beige.jpeg",
                "/generated/18_long_sleeve_shift_dress_beige_2.jpeg",
                "/generated/18_long_sleeve_shift_dress_beige_3.jpeg",
                "/generated/18_long_sleeve_shift_dress_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "19",
        "name": "Gold Hoop Earrings",
        "price": 281,
        "category": "Accessories",
        "image": "/generated/gold loop.jpeg",
        "description": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 50,
        "reviews": [
            {
                "id": "bwvyccel0",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Feb 20, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "S"
            },
            {
                "id": "7h2nk6zmo",
                "reviewer": "Amanda R.",
                "rating": 4,
                "date": "Feb 1, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "L"
            },
            {
                "id": "aei0qy9i7",
                "reviewer": "Jessica T.",
                "rating": 5,
                "date": "Jan 27, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "S"
            },
            {
                "id": "054ey4gpv",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 12, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "M"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/gold_loop_black.jpeg",
                "/generated/gold_loop_black_2.jpeg",
                "/generated/gold_loop_black_3.jpeg",
                "/generated/gold_loop_black_4.jpeg"
            ],
            "White": [
                "/generated/gold_loop_white.jpeg",
                "/generated/gold_loop_white_2.jpeg",
                "/generated/gold_loop_white_3.jpeg",
                "/generated/gold_loop_white_4.jpeg"
            ],
            "Beige": [
                "/generated/gold_loop_beige.jpeg",
                "/generated/gold_loop_beige_2.jpeg",
                "/generated/gold_loop_beige_3.jpeg",
                "/generated/gold_loop_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "20",
        "name": "Oversized Sunglasses",
        "price": 250,
        "category": "Accessories",
        "image": "/generated/oversized sunglasses.jpeg",
        "description": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.9",
        "reviewCount": 43,
        "reviews": [
            {
                "id": "484b9578a",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Feb 8, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            },
            {
                "id": "iz9f31hzx",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Dec 7, 2025",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "L"
            },
            {
                "id": "493koeqpt",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Jan 30, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XXL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/oversized_sunglasses_black.jpeg",
                "/generated/oversized_sunglasses_black_2.jpeg",
                "/generated/oversized_sunglasses_black_3.jpeg",
                "/generated/oversized_sunglasses_black_4.jpeg"
            ],
            "White": [
                "/generated/oversized_sunglasses_white.jpeg",
                "/generated/oversized_sunglasses_white_2.jpeg",
                "/generated/oversized_sunglasses_white_3.jpeg",
                "/generated/oversized_sunglasses_white_4.jpeg"
            ],
            "Beige": [
                "/generated/oversized_sunglasses_beige.jpeg",
                "/generated/oversized_sunglasses_beige_2.jpeg",
                "/generated/oversized_sunglasses_beige_3.jpeg",
                "/generated/oversized_sunglasses_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "21",
        "name": "Layered Chain Necklace",
        "price": 219,
        "category": "Accessories",
        "image": "/generated/layered necklace.jpeg",
        "description": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 57,
        "reviews": [
            {
                "id": "yawvqpldt",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Feb 10, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            },
            {
                "id": "1bu14dhzp",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Jan 22, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "M"
            },
            {
                "id": "kqvpgpnrj",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Jan 5, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "M"
            },
            {
                "id": "ipolmgzge",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Feb 6, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/layered_necklace_black.jpeg",
                "/generated/layered_necklace_black_2.jpeg",
                "/generated/layered_necklace_black_3.jpeg",
                "/generated/layered_necklace_black_4.jpeg"
            ],
            "White": [
                "/generated/layered_necklace_white.jpeg",
                "/generated/layered_necklace_white_2.jpeg",
                "/generated/layered_necklace_white_3.jpeg",
                "/generated/layered_necklace_white_4.jpeg"
            ],
            "Beige": [
                "/generated/layered_necklace_beige.jpeg",
                "/generated/layered_necklace_beige_2.jpeg",
                "/generated/layered_necklace_beige_3.jpeg",
                "/generated/layered_necklace_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "23",
        "name": "Silk Hair Scarf",
        "price": 273,
        "category": "Accessories",
        "image": "/generated/hair scarf.jpeg",
        "description": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.9",
        "reviewCount": 69,
        "reviews": [
            {
                "id": "vhx3vm7sg",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Feb 6, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XXL"
            },
            {
                "id": "yfsyiouj3",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Dec 6, 2025",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "XXL"
            },
            {
                "id": "4mvwsao31",
                "reviewer": "Nina K.",
                "rating": 5,
                "date": "Mar 10, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "S"
            },
            {
                "id": "a4ytu7vt7",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Feb 27, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "M"
            },
            {
                "id": "oducxewdr",
                "reviewer": "Emily W.",
                "rating": 5,
                "date": "Jan 14, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/hair_scarf_black.jpeg",
                "/generated/hair_scarf_black_2.jpeg",
                "/generated/hair_scarf_black_3.jpeg",
                "/generated/hair_scarf_black_4.jpeg"
            ],
            "White": [
                "/generated/hair_scarf_white.jpeg",
                "/generated/hair_scarf_white_2.jpeg",
                "/generated/hair_scarf_white_3.jpeg",
                "/generated/hair_scarf_white_4.jpeg"
            ],
            "Beige": [
                "/generated/hair_scarf_beige.jpeg",
                "/generated/hair_scarf_beige_2.jpeg",
                "/generated/hair_scarf_beige_3.jpeg",
                "/generated/hair_scarf_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "24",
        "name": "Chunky Bracelets",
        "price": 170,
        "category": "Accessories",
        "image": "/generated/chunky bracelet.jpeg",
        "description": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.6",
        "reviewCount": 33,
        "reviews": [
            {
                "id": "pr6l5octy",
                "reviewer": "Chloe S.",
                "rating": 4,
                "date": "Feb 22, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "M"
            },
            {
                "id": "od9tqayum",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Feb 1, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XL"
            }
        ],
        "colorImages": {
            "Black": [
                "/generated/chunky_bracelet_black.jpeg",
                "/generated/chunky_bracelet_black_2.jpeg",
                "/generated/chunky_bracelet_black_3.jpeg",
                "/generated/chunky_bracelet_black_4.jpeg"
            ],
            "White": [
                "/generated/chunky_bracelet_white.jpeg",
                "/generated/chunky_bracelet_white_2.jpeg",
                "/generated/chunky_bracelet_white_3.jpeg",
                "/generated/chunky_bracelet_white_4.jpeg"
            ],
            "Beige": [
                "/generated/chunky_bracelet_beige.jpeg",
                "/generated/chunky_bracelet_beige_2.jpeg",
                "/generated/chunky_bracelet_beige_3.jpeg",
                "/generated/chunky_bracelet_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "25",
        "name": "Tweed Cropped Blazer",
        "price": 946,
        "category": "New Arrival",
        "image": "/generated/tweed cropped blazer.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "5.0",
        "reviewCount": 60,
        "reviews": [
            {
                "id": "w5kxw1a3b",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Mar 16, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "L"
            },
            {
                "id": "r0jexkx5u",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Feb 2, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "L"
            },
            {
                "id": "3hk4bdlzf",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 26, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "M"
            },
            {
                "id": "kjmvg92eh",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Mar 4, 2026",
                "comment": "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!",
                "sizePurchased": "XL"
            },
            {
                "id": "xbobhcyng",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Feb 18, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            }
        ],
        "isNewArrival": true,
        "colorImages": {
            "Black": [
                "/generated/tweed_cropped_blazer_black.jpeg",
                "/generated/tweed_cropped_blazer_black_2.jpeg",
                "/generated/tweed_cropped_blazer_black_3.jpeg",
                "/generated/tweed_cropped_blazer_black_4.jpeg"
            ],
            "White": [
                "/generated/tweed_cropped_blazer_white.jpeg",
                "/generated/tweed_cropped_blazer_white_2.jpeg",
                "/generated/tweed_cropped_blazer_white_3.jpeg",
                "/generated/tweed_cropped_blazer_white_4.jpeg"
            ],
            "Beige": [
                "/generated/tweed_cropped_blazer_beige.jpeg",
                "/generated/tweed_cropped_blazer_beige_2.jpeg",
                "/generated/tweed_cropped_blazer_beige_3.jpeg",
                "/generated/tweed_cropped_blazer_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "26",
        "name": "Asymmetric Hem Skirt",
        "price": 1329,
        "category": "Bottoms",
        "image": "/generated/assymetric hem skirt.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "Beige",
            "Red"
        ],
        "colorImages": {
            "Black": [
                "/generated/assymetric_hem_skirt_black.jpeg",
                "/generated/assymetric_hem_skirt_black_2.jpeg",
                "/generated/assymetric_hem_skirt_black_3.jpeg",
                "/generated/assymetric_hem_skirt_black_4.jpeg"
            ],
            "Beige": [
                "/generated/assymetric_hem_skirt_beige.jpeg",
                "/generated/assymetric_hem_skirt_beige_2.jpeg",
                "/generated/assymetric_hem_skirt_beige_3.jpeg",
                "/generated/assymetric_hem_skirt_beige_4.jpeg"
            ],
            "Red": [
                "/generated/assymetric_hem_skirt_red.jpeg",
                "/generated/assymetric_hem_skirt_red_2.jpeg",
                "/generated/assymetric_hem_skirt_red_3.jpeg",
                "/generated/assymetric_hem_skirt_red_4.jpeg"
            ]
        },
        "rating": "4.9",
        "reviewCount": 48,
        "reviews": [
            {
                "id": "e49ipnljr",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Dec 7, 2025",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XXL"
            },
            {
                "id": "o8g8m17qr",
                "reviewer": "Sarah M.",
                "rating": 5,
                "date": "Feb 20, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "M"
            },
            {
                "id": "eb65v36hc",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Feb 10, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "XL"
            },
            {
                "id": "nlz2zyprm",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Jan 5, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "M"
            }
        ],
        "isNewArrival": true
    },
    {
        "id": "27",
        "name": "Velvet Evening Gown",
        "price": 1157,
        "category": "New Arrival",
        "image": "/generated/velvet evening gown.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.7",
        "reviewCount": 61,
        "reviews": [
            {
                "id": "79pj1g0qe",
                "reviewer": "Jessica T.",
                "rating": 4,
                "date": "Dec 12, 2025",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XL"
            },
            {
                "id": "53z96bw2n",
                "reviewer": "Sarah M.",
                "rating": 4,
                "date": "Feb 25, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XXL"
            },
            {
                "id": "7rf7mea9v",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Mar 4, 2026",
                "comment": "I've gotten so many compliments on this piece! It makes me feel so confident.",
                "sizePurchased": "M"
            },
            {
                "id": "q6ptz0888",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 14, 2026",
                "comment": "Love the fit! Super comfortable and stylish, perfect for daily wear.",
                "sizePurchased": "L"
            },
            {
                "id": "gj3akbbcw",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Feb 10, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XL"
            }
        ],
        "isNewArrival": true,
        "colorImages": {
            "Black": [
                "/generated/velvet_evening_gown_black.jpeg",
                "/generated/velvet_evening_gown_black_2.jpeg",
                "/generated/velvet_evening_gown_black_3.jpeg",
                "/generated/velvet_evening_gown_black_4.jpeg"
            ],
            "White": [
                "/generated/velvet_evening_gown_white.jpeg",
                "/generated/velvet_evening_gown_white_2.jpeg",
                "/generated/velvet_evening_gown_white_3.jpeg",
                "/generated/velvet_evening_gown_white_4.jpeg"
            ],
            "Beige": [
                "/generated/velvet_evening_gown_beige.jpeg",
                "/generated/velvet_evening_gown_beige_2.jpeg",
                "/generated/velvet_evening_gown_beige_3.jpeg",
                "/generated/velvet_evening_gown_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "28",
        "name": "Cashmere Blend Poncho",
        "price": 1860,
        "category": "New Arrival",
        "image": "/generated/cashmere blend poncho.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.8",
        "reviewCount": 25,
        "reviews": [
            {
                "id": "gjmt1v6wm",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Jan 16, 2026",
                "comment": "Material feels very premium. Highly recommend for the price.",
                "sizePurchased": "XXL"
            },
            {
                "id": "67simdqwp",
                "reviewer": "Jasmine L.",
                "rating": 4,
                "date": "Jan 8, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "XXL"
            }
        ],
        "isNewArrival": true,
        "colorImages": {
            "Black": [
                "/generated/cashmere_blend_poncho_black.jpeg",
                "/generated/cashmere_blend_poncho_black_2.jpeg",
                "/generated/cashmere_blend_poncho_black_3.jpeg",
                "/generated/cashmere_blend_poncho_black_4.jpeg"
            ],
            "White": [
                "/generated/cashmere_blend_poncho_white.jpeg",
                "/generated/cashmere_blend_poncho_white_2.jpeg",
                "/generated/cashmere_blend_poncho_white_3.jpeg",
                "/generated/cashmere_blend_poncho_white_4.jpeg"
            ],
            "Beige": [
                "/generated/cashmere_blend_poncho_beige.jpeg",
                "/generated/cashmere_blend_poncho_beige_2.jpeg",
                "/generated/cashmere_blend_poncho_beige_3.jpeg",
                "/generated/cashmere_blend_poncho_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "29",
        "name": "Distressed Denim Jacket",
        "price": 1887,
        "category": "New Arrival",
        "image": "/generated/distressed denim jacket.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "4.9",
        "reviewCount": 38,
        "reviews": [
            {
                "id": "2rf6g67hk",
                "reviewer": "Nina K.",
                "rating": 4,
                "date": "Feb 6, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "XL"
            },
            {
                "id": "cuhsze3i2",
                "reviewer": "Emily W.",
                "rating": 4,
                "date": "Feb 19, 2026",
                "comment": "A bit snug initially but stretched to fit perfectly. Great quality overall.",
                "sizePurchased": "L"
            },
            {
                "id": "25gyl11tb",
                "reviewer": "Jasmine L.",
                "rating": 5,
                "date": "Dec 22, 2025",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "M"
            }
        ],
        "isNewArrival": true,
        "colorImages": {
            "Black": [
                "/generated/distressed_denim_jacket_black.jpeg",
                "/generated/distressed_denim_jacket_black_2.jpeg",
                "/generated/distressed_denim_jacket_black_3.jpeg",
                "/generated/distressed_denim_jacket_black_4.jpeg"
            ],
            "White": [
                "/generated/distressed_denim_jacket_white.jpeg",
                "/generated/distressed_denim_jacket_white_2.jpeg",
                "/generated/distressed_denim_jacket_white_3.jpeg",
                "/generated/distressed_denim_jacket_white_4.jpeg"
            ],
            "Beige": [
                "/generated/distressed_denim_jacket_beige.jpeg",
                "/generated/distressed_denim_jacket_beige_2.jpeg",
                "/generated/distressed_denim_jacket_beige_3.jpeg",
                "/generated/distressed_denim_jacket_beige_4.jpeg"
            ]
        }
    },
    {
        "id": "30",
        "name": "Sequined Party Dress",
        "price": 1676,
        "category": "New Arrival",
        "image": "/generated/sequined party dress.jpeg",
        "description": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd.",
        "colors": [
            "Black",
            "White",
            "Beige"
        ],
        "rating": "5.0",
        "reviewCount": 24,
        "reviews": [
            {
                "id": "zoib0b8tk",
                "reviewer": "Amanda R.",
                "rating": 5,
                "date": "Jan 7, 2026",
                "comment": "True to size, the color is exactly like the picture. Very flattering on my curves!",
                "sizePurchased": "XXL"
            },
            {
                "id": "3r1zwu8dd",
                "reviewer": "Chloe S.",
                "rating": 5,
                "date": "Feb 9, 2026",
                "comment": "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
                "sizePurchased": "M"
            }
        ],
        "isNewArrival": true,
        "colorImages": {
            "Black": [
                "/generated/sequined_party_dress_black.jpeg",
                "/generated/sequined_party_dress_black_2.jpeg",
                "/generated/sequined_party_dress_black_3.jpeg",
                "/generated/sequined_party_dress_black_4.jpeg"
            ],
            "White": [
                "/generated/sequined_party_dress_white.jpeg",
                "/generated/sequined_party_dress_white_2.jpeg",
                "/generated/sequined_party_dress_white_3.jpeg",
                "/generated/sequined_party_dress_white_4.jpeg"
            ],
            "Beige": [
                "/generated/sequined_party_dress_beige.jpeg",
                "/generated/sequined_party_dress_beige_2.jpeg",
                "/generated/sequined_party_dress_beige_3.jpeg",
                "/generated/sequined_party_dress_beige_4.jpeg"
            ]
        }
    }
]
```

---

## File: eslint.config.mjs

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

---

## File: generate_inventory.js

```js
const fs = require('fs');
const path = require('path');

const images = [
  'https://i.imgur.com/QkIa5tT.jpeg',
  'https://i.imgur.com/1twoaDy.jpeg',
  'https://i.imgur.com/cHddUCu.jpeg',
  'https://i.imgur.com/R2PN9Wq.jpeg',
  'https://i.imgur.com/ZKGofuB.jpeg',
  'https://i.imgur.com/mp3rUty.jpeg',
  'https://i.imgur.com/9LFjwpI.jpeg',
  'https://i.imgur.com/R3iobJA.jpeg',
  'https://i.imgur.com/wXuQ7bm.jpeg',
  'https://i.imgur.com/cBuLvBi.jpeg',
  'https://i.imgur.com/KeqG6r4.jpeg',
  'https://i.imgur.com/UsFIvYs.jpeg',
  'https://i.imgur.com/eGOUveI.jpeg',
  'https://i.imgur.com/axsyGpD.jpeg',
  'https://i.imgur.com/Y54Bt8J.jpeg',
  'https://i.imgur.com/9DqEOV5.jpeg',
  'https://i.imgur.com/ZANVnHE.jpeg',
  'https://i.imgur.com/yVeIeDa.jpeg',
  'https://i.imgur.com/SolkFEB.jpeg',
  'https://i.imgur.com/keVCVIa.jpeg',
  'https://i.imgur.com/w3Y8NwQ.jpeg',
  'https://i.imgur.com/OKn1KFI.jpeg',
  'https://i.imgur.com/ItHcq7o.jpeg',
  'https://i.imgur.com/YaSqa06.jpeg',
  'https://i.imgur.com/yb9UQKL.jpeg',
  'https://i.imgur.com/LGk9Jn2.jpeg',
  'https://i.imgur.com/Qphac99.jpeg',
  'https://i.imgur.com/DMQHGA0.jpeg',
  'https://i.imgur.com/NWIJKUj.jpeg',
  'https://i.imgur.com/6wkyyIN.jpeg'
];

const categories = ["Tops", "Bottoms", "Dresses", "Accessories", "New Arrival"];

const descriptions = {
  "Tops": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
  "Bottoms": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
  "Dresses": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
  "Accessories": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
  "New Arrival": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd."
};

const names = {
  "Tops": ["Classic White Tee", "Silk Camisole", "Ribbed Knit Sweater", "Oversized Poplin Shirt", "Off-the-Shoulder Blouse", "Cropped Cardigan"],
  "Bottoms": ["High-Waist Denim Jeans", "Wide Leg Tailored Trousers", "Satin Slip Skirt", "Linen Blend Shorts", "Faux Leather Leggings", "Pleated Midi Skirt"],
  "Dresses": ["Linen Blend Dress", "Floral Maxi Dress", "Ribbed Midi Knit Dress", "Satin Wrap Dress", "Halter Neck Mini Dress", "Long Sleeve Shift Dress"],
  "Accessories": ["Gold Hoop Earrings", "Oversized Sunglasses", "Layered Chain Necklace", "Leather Crossbody Bag", "Silk Hair Scarf", "Chunky Bracelets"],
  "New Arrival": ["Tweed Cropped Blazer", "Asymmetric Hem Skirt", "Velvet Evening Gown", "Cashmere Blend Poncho", "Distressed Denim Jacket", "Sequined Party Dress"]
};

// Generate exactly 6 per category
const inventory = [];
let idCounter = 1;
let imageIndex = 0;

for (const cat of categories) {
  for (let i = 0; i < 6; i++) {
    inventory.push({
      id: idCounter.toString(),
      name: names[cat][i],
      price: Math.floor(Math.random() * (7990 - 1290 + 1)) + 1290,
      category: cat,
      image: images[imageIndex % images.length],
      description: descriptions[cat],
      colors: ["Black", "White", "Beige"]
    });
    idCounter++;
    imageIndex++;
  }
}

// Preserve the exact structure of the original file, just replace it entirely.
const inventoryFilePath = path.join(__dirname, 'data', 'inventory.json');
fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 4));

console.log('Successfully generated inventory with 30 items.');

```

---

## File: lib\db.ts

```ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'curvychiq',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

```

---

## File: next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

---

## File: next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

```

---

## File: package.json

```json
{
  "name": "curvychiq",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "mysql2": "^3.20.0",
    "next": "16.1.4",
    "nodemailer": "^8.0.2",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/nodemailer": "^7.0.11",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "typescript": "^5"
  }
}

```

---

## File: README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

---

## File: scripts\automate_all_color_images.js

```js
import fs from 'fs';
import path from 'path';

const inventoryPath = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

inventory.forEach(product => {
    if (!product.colors) return;

    // Get the base filename without extension
    // e.g. "/generated/white tee.jpeg" -> "white tee"
    const baseName = path.basename(product.image, path.extname(product.image));
    
    // Clean base name for consistent matching (remove spaces)
    const cleanBase = baseName.replace(/ /g, '_').toLowerCase();

    const colorImages = {};

    product.colors.forEach(color => {
        const colorLower = color.toLowerCase();
        
        // Define 4 angles for each color
        colorImages[color] = [
            `/generated/${cleanBase}_${colorLower}.jpeg`,   // Primary angle
            `/generated/${cleanBase}_${colorLower}_2.jpeg`, // Angle 2
            `/generated/${cleanBase}_${colorLower}_3.jpeg`, // Angle 3
            `/generated/${cleanBase}_${colorLower}_4.jpeg`  // Angle 4
        ];
    });

    product.colorImages = colorImages;
});

fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 4));
console.log('Automated colorImages mapping for all items in inventory.json.');

```

---

## File: scripts\generate_doc.js

```js
import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/Users/chiqu/capstone/curvychiq';
const outputFile = path.join(projectRoot, 'FULL_CODE_DOCUMENTATION.md');

const includedExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.md']);
const excludedDirs = new Set(['node_modules', '.next', '.vscode', '.git', 'public']);
const excludedFiles = new Set(['package-lock.json', 'tsconfig.tsbuildinfo', '.env', 'FULL_CODE_DOCUMENTATION.md']);

function getFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!excludedDirs.has(file)) {
        getFiles(fullPath, allFiles);
      }
    } else {
      const ext = path.extname(file);
      if (includedExtensions.has(ext) && !excludedFiles.has(file)) {
        allFiles.push(fullPath);
      }
    }
  });

  return allFiles;
}

function generateDocumentation() {
  const files = getFiles(projectRoot);
  let markdown = "# CurvyChiq Project - Source Code Documentation\n\n";
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
  markdown += "This document contains all source code files for the CurvyChiq project for school submission purposes.\n\n";

  files.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    const content = fs.readFileSync(file, 'utf8');
    const ext = path.extname(file).replace('.', '');
    
    // Determine language for syntax highlighting
    let lang = ext;
    if (ext === 'tsx' || ext === 'jsx') lang = 'typescript';
    if (ext === 'mjs') lang = 'javascript';

    markdown += `## File: ${relativePath}\n\n`;
    markdown += '```' + lang + '\n';
    markdown += content;
    markdown += '\n```\n\n---\n\n';
  });

  fs.writeFileSync(outputFile, markdown);
  console.log(`Documentation generated successfully: ${outputFile}`);
}

generateDocumentation();

```

---

## File: scripts\migrate.mjs

```javascript

import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

async function migrate() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    console.log('Connected to MySQL.');

    await connection.query('CREATE DATABASE IF NOT EXISTS curvychiq');
    await connection.query('USE curvychiq');

    console.log('Ensuring tables exist...');
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            category VARCHAR(100),
            image VARCHAR(255),
            description TEXT,
            colors TEXT, 
            rating VARCHAR(10),
            reviewCount INT DEFAULT 0
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id VARCHAR(50) PRIMARY KEY,
            product_id VARCHAR(50),
            reviewer VARCHAR(255),
            rating INT,
            date VARCHAR(50),
            comment TEXT,
            sizePurchased VARCHAR(20),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
    `);

    console.log('Loading inventory.json...');
    const inventoryPath = path.join(process.cwd(), 'data', 'inventory.json');
    const data = await fs.readFile(inventoryPath, 'utf-8');
    const products = JSON.parse(data);

    console.log(`Migrating ${products.length} products...`);

    for (const p of products) {
        // Insert product
        await connection.query(
            'INSERT IGNORE INTO products (id, name, price, category, image, description, colors, rating, reviewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                p.id,
                p.name,
                p.price,
                p.category,
                p.image,
                p.description || '',
                JSON.stringify(p.colors || []),
                p.rating || '0',
                p.reviewCount || 0
            ]
        );

        // Insert reviews if any
        if (p.reviews && p.reviews.length > 0) {
            for (const r of p.reviews) {
                await connection.query(
                    'INSERT IGNORE INTO reviews (id, product_id, reviewer, rating, date, comment, sizePurchased) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        r.id,
                        p.id,
                        r.reviewer,
                        r.rating,
                        r.date,
                        r.comment,
                        r.sizePurchased || ''
                    ]
                );
            }
        }
    }

    console.log('Migration complete!');
    await connection.end();
}

migrate().catch(console.error);

```

---

## File: scripts\revert_inventory.js

```js
import fs from 'fs';

const path = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(path, 'utf8'));

inventory.forEach(item => {
    delete item.images;
});

fs.writeFileSync(path, JSON.stringify(inventory, null, 4));
console.log('Restored original inventory structure (removed extra images).');

```

---

## File: scripts\update_categories.js

```js
import fs from 'fs';

const path = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(path, 'utf8'));

inventory.forEach(item => {
    // If category is "New Arrival", mark it and then assign its "real" category
    if (item.category === 'New Arrival') {
        item.isNewArrival = true;
        // Optionally, assign based on name/description, but for ID 26 we know it's a bottom
        if (item.id === '26') {
            item.category = 'Bottoms';
        }
    }
});

fs.writeFileSync(path, JSON.stringify(inventory, null, 4));
console.log('Updated inventory: Category for ID 26 set to "Bottoms" and tagged as isNewArrival.');

```

---

## File: scripts\update_inventory_images.js

```js
import fs from 'fs';
import path from 'path';

const inventoryPath = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Only update the first 3 items to show the effect
inventory[0].images = [
    "/generated/white tee.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/classic_white_tee.png",
    "/generated/white tee.jpeg"
];

inventory[1].images = [
    "/generated/silk camisole.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/silk camisole.jpeg",
    "/generated/silk camisole.jpeg"
];

inventory[2].images = [
    "/generated/ribbed knit sweater.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/ribbed knit sweater.jpeg",
    "/generated/ribbed knit sweater.jpeg"
];

fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 4));
console.log('Successfully added example images to first 3 items in inventory.json');

```

---

## File: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

---

## File: update_images.js

```js
const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\chiqu\\.gemini\\antigravity\\brain\\cde828bd-cd13-4950-9285-105188587e6e';
const destDir = path.join(__dirname, 'public', 'generated');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Ensure the local images map matches your latest generated file names exactly
const fileMap = {
  "Tops": "plus_top_1773806870130.png",
  "Bottoms": "plus_bottom_1773806885607.png",
  "Dresses": "plus_dress_1773806957456.png",
  "Accessories": "plus_accessory_1773806971398.png",
  "New Arrival": "plus_newarrival_1773807028771.png"
};

// Copy files over
for (const [cat, filename] of Object.entries(fileMap)) {
  const src = path.join(srcDir, filename);
  const dest = path.join(destDir, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  } else {
    console.error(`Missing file: ${src}`);
  }
}

// Update inventory
const inventoryFilePath = path.join(__dirname, 'data', 'inventory.json');
const inventoryData = JSON.parse(fs.readFileSync(inventoryFilePath, 'utf-8'));

for (let i = 0; i < inventoryData.length; i++) {
  const item = inventoryData[i];
  if (fileMap[item.category]) {
    item.image = '/generated/' + fileMap[item.category];
  }
}

fs.writeFileSync(inventoryFilePath, JSON.stringify(inventoryData, null, 4));
console.log('Successfully copied images and updated inventory to strictly use plus size clothing images.');

```

---

## File: update_prices.js

```js
const fs = require('fs');
const path = require('path');

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryPath = fs.readFileSync(inventoryFile, 'utf8');
const inventoryData = JSON.parse(inventoryPath);

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

inventoryData.forEach(item => {
    if (item.category === 'Tops') {
        item.price = getRandomPrice(500, 799);
    } else if (item.category === 'Bottoms') {
        item.price = getRandomPrice(750, 1500);
    } else if (item.category === 'Accessories') {
        item.price = getRandomPrice(150, 300);
    } else if (item.category === 'Dresses') {
        item.price = getRandomPrice(800, 1800); // Guessed a range since it wasn't specified
    } else if (item.category === 'New Arrival') {
        item.price = getRandomPrice(900, 2000); // Guessed a range since it wasn't specified
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully updated product prices based on category constraints.');

```

---

## File: update_to_product_shots.js

```js
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'generated');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryPath = fs.readFileSync(inventoryFile, 'utf8');
const inventoryData = JSON.parse(inventoryPath);

inventoryData.forEach(item => {
    // We successfully generated a real photo for the Classic White Tee!
    if (item.name === "Classic White Tee") {
        item.image = '/generated/classic_white_tee.png';
    } else {
        // Generate a high-fashion, minimalist placeholder SVG for the rest since models are removed
        const filename = `${item.id}_${item.name.replace(/\s+/g, '_').toLowerCase()}.svg`;
        const filepath = path.join(publicDir, filename);

        const svgContent = `
<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="800" fill="#f9f9f9" />
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e5e5e5" stroke-width="2" />
  <text x="50%" y="45%" font-family="sans-serif" font-size="14" fill="#737373" text-anchor="middle" letter-spacing="4">CURVYCHIQ EXCLUSIVE</text>
  <text x="50%" y="50%" font-family="serif" font-size="28" fill="#000000" text-anchor="middle" letter-spacing="2" font-weight="bold">${item.name.toUpperCase()}</text>
  <text x="50%" y="55%" font-family="sans-serif" font-size="14" fill="#737373" text-anchor="middle" letter-spacing="1">PREVIEW UNAVAILABLE</text>
</svg>`.trim();

        fs.writeFileSync(filepath, svgContent);
        item.image = `/generated/${filename}`;
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully updated images to isolated product placeholders.');

```

---

