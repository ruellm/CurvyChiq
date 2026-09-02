'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/components/CartContext';
import styles from '../product.module.css';
// The size guide button reuses the styling it already had on the listing card.
import btnStyles from '@/components/AddToCartButton.module.css';
import SizeChart from '@/components/SizeChart';
import Image from 'next/image';
import type { Product, Variant } from '@/db/queries';

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

function isSellable(v: Variant): boolean {
    return v.isActive && v.stockQty > 0;
}

// Renders both grid columns so that .productLayout gets exactly two children and
// .interactiveSection sits inside .detailsContainer, which is the tree product.module.css
// was written for. The gallery stays in here because it reacts to the selected colour.
// info and reviews stay server components and arrive as separate slots, because they sit
// either side of the interactive section: .options and .reviewsContainer each carry a
// border-top that has to divide real content.
export default function ProductClient({
    product,
    info,
    reviews,
}: {
    product: Product;
    info: React.ReactNode;
    reviews: React.ReactNode;
}) {
    const { addItem, setIsCartOpen } = useCart();

    const variants = product.variants ?? [];

    // Colours come from the variants, not the images. Order is the order they were seeded.
    const colors = useMemo(() => [...new Set(variants.map((v) => v.colour))], [variants]);

    const soldOutColors = useMemo(() => {
        const out = new Set<string>();
        for (const colour of colors) {
            if (!variants.some((v) => v.colour === colour && isSellable(v))) out.add(colour);
        }
        return out;
    }, [colors, variants]);

    // Open on the first colour that can actually be bought.
    const [selectedColor, setSelectedColor] = useState(
        () => colors.find((c) => !soldOutColors.has(c)) ?? colors[0] ?? '',
    );

    const sizesForColor = useMemo(
        () => variants.filter((v) => v.colour === selectedColor),
        [variants, selectedColor],
    );

    const [selectedSize, setSelectedSize] = useState(
        () => sizesForColor.find(isSellable)?.size ?? '',
    );

    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

    const isAccessory = product.category === 'Accessories';

    const handleColorSelect = (colour: string) => {
        setSelectedColor(colour);
        // The chosen size may not exist or may be gone in the new colour.
        const next = variants.filter((v) => v.colour === colour);
        const keep = next.find((v) => v.size === selectedSize && isSellable(v));
        setSelectedSize(keep?.size ?? next.find(isSellable)?.size ?? '');
    };

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

    const canAddToCart = isAccessory
        ? !product.soldOut
        : sizesForColor.some((v) => v.size === selectedSize && isSellable(v));

    const handleAddToCart = () => {
        if (!canAddToCart) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: currentMainImage ?? '',
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

            <div className={styles.detailsContainer}>
                {info}

                <div className={styles.interactiveSection}>
                    {!isAccessory && (
                        <div className={styles.options}>
                            {/* Color Swatches */}
                            <div className={styles.optionGroup}>
                                <p className={styles.optionTitle}>
                                    Color | <strong>{selectedColor}</strong>
                                    {soldOutColors.has(selectedColor) && (
                                        <span className={styles.soldOutNote}> Sold out</span>
                                    )}
                                </p>
                                <div className={styles.colorList}>
                                    {colors.map((color: string) => {
                                        const hex = getColorHex(color);
                                        const isSelected = selectedColor === color;
                                        const isLight = ['white', 'cream', 'beige', 'yellow'].includes(color.toLowerCase());
                                        const isSoldOut = soldOutColors.has(color);
                                        return (
                                            <button
                                                key={color}
                                                onClick={() => handleColorSelect(color)}
                                                title={isSoldOut ? `${color} — sold out` : color}
                                                className={isSoldOut ? styles.colorSoldOut : undefined}
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
                                                aria-label={isSoldOut ? `${color}, sold out` : color}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div className={styles.optionGroup} style={{ marginTop: '1rem' }}>
                                <p className={styles.optionTitle} style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Size
                                    <button
                                        type="button"
                                        onClick={() => setIsSizeChartOpen(true)}
                                        className={btnStyles.sizeGuideBtn}
                                    >
                                        Size Guide
                                    </button>
                                </p>
                                <div className={styles.sizeList}>
                                    {sizesForColor.map((variant) => {
                                        const available = isSellable(variant);
                                        const isSelected = selectedSize === variant.size;
                                        return (
                                            <button
                                                key={variant.size}
                                                onClick={() => setSelectedSize(variant.size)}
                                                disabled={!available}
                                                aria-disabled={!available}
                                                className={
                                                    !available
                                                        ? styles.sizeSoldOut
                                                        : isSelected
                                                            ? styles.sizeActive
                                                            : styles.sizeBtn
                                                }
                                            >
                                                {variant.size}
                                                {!available && <span className={styles.soldOutNote}>Sold out</span>}
                                                {available && !isSelected && <span style={{ opacity: 0.3 }}>+</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {isAccessory && (
                        <div className={styles.accessoryDivider} />
                    )}

                    <button
                        className={canAddToCart ? styles.addToCartBtn : styles.addToCartBtnDisabled}
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                    >
                        {product.soldOut ? 'SOLD OUT' : canAddToCart ? 'ADD TO CART' : 'SELECT A SIZE'}
                    </button>
                </div>

                {reviews}
            </div>

            <SizeChart isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
        </>
    );
}
