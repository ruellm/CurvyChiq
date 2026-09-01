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
