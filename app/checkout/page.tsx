"use client";

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import styles from './page.module.css';
import Link from 'next/link';

// Placing an order is Phase 3: task 3.7 writes orders and order_items and decrements stock
// in one transaction, 3.8 records the payment. Until then the form does not submit, because
// a confirmation screen that saves nothing is worse than no button.
export default function CheckoutPage() {
    const { items, cartTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('gcash');

    // Shipping fields. Pre-filling from the signed-in account is Phase 3 (task 3.6).
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    // Nothing pre-fills these any more, so they start editable.
    const [addressLocked, setAddressLocked] = useState(false);
    const [phoneLocked, setPhoneLocked] = useState(false);

    if (items.length === 0) {
        return (
            <main className={styles.main}>
                <div className={styles.emptyContainer}>
                    <h1>Your cart is empty</h1>
                    <Link href="/" className={styles.backLink}>Go Back Shopping</Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/" className={styles.breadcrumb}>&larr; Back to Shop</Link>
                <h1 className={styles.title}>Checkout</h1>

                <div className={styles.grid}>
                    {/* Left Column: Shipping & Payment */}
                    <div className={styles.column}>
                        <form id="checkoutWrapper" onSubmit={(e) => e.preventDefault()}>
                            <section className={styles.section}>
                                <h2>Shipping Details</h2>
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>

                                    {/* Address with Change icon */}
                                    <div className={styles.fieldFull}>
                                        <div className={styles.fieldLabelRow}>
                                            <label>Address</label>
                                            {addressLocked && (
                                                <button
                                                    type="button"
                                                    className={styles.changeBtn}
                                                    onClick={() => setAddressLocked(false)}
                                                    title="Change address"
                                                >
                                                    {/* Pencil icon */}
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Change Address
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={address}
                                            readOnly={addressLocked}
                                            className={addressLocked ? styles.inputLocked : ''}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    {/* Phone with Change icon */}
                                    <div className={styles.field}>
                                        <div className={styles.fieldLabelRow}>
                                            <label>Phone</label>
                                            {phoneLocked && (
                                                <button
                                                    type="button"
                                                    className={styles.changeBtn}
                                                    onClick={() => setPhoneLocked(false)}
                                                    title="Change phone number"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Change
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            readOnly={phoneLocked}
                                            className={phoneLocked ? styles.inputLocked : ''}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className={styles.section}>
                                <h2>Payment Method</h2>
                                <div className={styles.paymentOptions}>
                                    <label className={`${styles.paymentOption} ${paymentMethod === 'gcash' ? styles.active : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="gcash"
                                            checked={paymentMethod === 'gcash'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span className={styles.radioLabel}>
                                            <strong>GCash</strong>
                                            <span className={styles.smallText}>Pay securely with your GCash wallet</span>
                                        </span>
                                    </label>

                                    <div className={`${styles.paymentOptionGroup} ${paymentMethod === 'card' ? styles.activeGroup : ''}`}>
                                        <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.active : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span className={styles.radioLabel}>
                                                <strong>Credit / Debit Card</strong>
                                                <span className={styles.smallText}>Visa, Mastercard, JCB</span>
                                            </span>
                                        </label>

                                        {/* Demonstration mode. No card details are collected,
                                            so there is nothing to store or leak. */}
                                        {paymentMethod === 'card' && (
                                            <div className={styles.cardDetails}>
                                                <span className={styles.smallText}>
                                                    Demonstration mode. No card details are collected
                                                    and no payment is taken.
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <label className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.active : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span className={styles.radioLabel}>
                                            <strong>Cash on Delivery (COD)</strong>
                                            <span className={styles.smallText}>Pay when you receive your order</span>
                                        </span>
                                    </label>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className={styles.column}>
                        <div className={styles.summaryCard}>
                            <h2>Order Summary</h2>
                            <div className={styles.summaryItems}>
                                {items.map(item => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className={styles.summaryItem}>
                                        <div className="flex justify-between w-full">
                                            <span>
                                                {item.name}
                                                <span className="text-gray-500 text-sm ml-1">
                                                    ({item.size}, {item.color})
                                                </span>
                                                <span className="ml-1">x {item.quantity}</span>
                                            </span>
                                            <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.summaryTotal}>
                                <div className="flex justify-between w-full mt-4 font-bold text-lg">
                                    <span>Total</span>
                                    <span>₱{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className={styles.smallText} style={{ marginTop: '1rem' }}>
                                    Checkout is coming soon. Orders cannot be placed yet, so
                                    nothing you enter here is submitted or stored.
                                </p>
                                <button
                                    type="submit"
                                    form="checkoutWrapper"
                                    className={styles.placeOrderBtn}
                                    disabled
                                >
                                    Place Order &mdash; Coming Soon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
