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
