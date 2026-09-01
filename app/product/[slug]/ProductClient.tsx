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
    
    // Determine the gallery images — use color-specific array if available, else static repeat.
    // A product with no photo yet renders no gallery rather than a broken image.
    const galleryImages: string[] = Array.isArray(colorEntry)
        ? colorEntry
        : currentMainImage
            ? [currentMainImage, currentMainImage, currentMainImage, currentMainImage]
            : [];

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
