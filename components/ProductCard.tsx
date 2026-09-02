import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import styles from '../app/page.module.css';
import type { Product } from '@/db/queries';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className={styles.productCard}>
            {/* Slug is stored, never derived from the name. */}
            <Link href={`/product/${product.slug}`} className={styles.imagePlaceholder}>
                {/* 6 products have no photo yet. The wrapper keeps the grid cell, no broken img. */}
                {product.image && (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                )}
                {/* The card stays clickable when sold out, the product page still renders. */}
                {product.soldOut && <span className={styles.soldOutBadge}>Sold out</span>}
            </Link>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>₱{product.price.toLocaleString()}</p>
                <AddToCartButton product={product} soldOut={product.soldOut} />
            </div>
        </div>
    );
}
