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
