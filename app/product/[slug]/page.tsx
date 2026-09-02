import { getProductBySlug } from '@/db/queries';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import styles from '../product.module.css';
import ProductClient from './ProductClient';
import ProductReviews from './ProductReviews';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className={styles.main}>
            <Header />

            {/* Two grid children: .gallery and .detailsContainer. ProductClient renders both
                so the interactive section sits inside .detailsContainer. */}
            <div className={styles.productLayout}>
                <ProductClient
                    product={product}
                    info={
                        <div className={styles.productInfo}>
                            <h1 className={styles.productName}>{product.name}</h1>
                            <p className={styles.productPrice}>₱{product.price.toLocaleString()}</p>
                            <p className={styles.productDescription}>{product.description}</p>
                        </div>
                    }
                    reviews={<ProductReviews product={product} />}
                />
            </div>
        </main>
    );
}
