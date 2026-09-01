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
            const img = product.colorImages[color];
            setCurrentImage(Array.isArray(img) ? img[0] : img);
        }
    };

    return (
        <div className={styles.productCard}>
            {/* Slug is stored, never derived from the name. */}
            <Link href={`/product/${product.slug}`} className={styles.imagePlaceholder}>
                {/* 6 products have no photo yet. The wrapper keeps the grid cell, no broken img. */}
                {currentImage && (
                    <Image
                        src={currentImage}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                )}
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
