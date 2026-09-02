import Link from 'next/link';
import styles from './AddToCartButton.module.css';

interface Product {
    name: string;
    slug: string;
}

// Listing cards no longer sell. Size and colour depend on variant stock, which only the
// product page loads, so the card sends you there instead of guessing.
export default function AddToCartButton({
    product,
    soldOut = false
}: {
    product: Product,
    soldOut?: boolean
}) {
    if (soldOut) {
        return (
            <div className={styles.container}>
                <button className={`${styles.actionBtn} ${styles.actionBtnDisabled}`} disabled>
                    Sold Out
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link
                href={`/product/${product.slug}`}
                className={`${styles.actionBtn} ${styles.actionBtnReady} ${styles.actionLink}`}
                aria-label={`View ${product.name}`}
            >
                View
            </Link>
        </div>
    );
}
