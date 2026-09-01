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
