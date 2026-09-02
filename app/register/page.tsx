'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Registration is Phase 3 (task 3.2): server-side validation, duplicate email checks and a
// hashed password. Nothing here reads or stores a password.
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h1 className={styles.title}>Personal details</h1>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        {/* Access Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="E-MAIL"
                                    disabled
                                />
                                <label htmlFor="email" className={styles.label}>E-MAIL</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={styles.input}
                                    placeholder="PHONE / MOBILE"
                                    disabled
                                />
                                <label htmlFor="phone" className={styles.label}>PHONE / MOBILE</label>
                            </div>
                        </div>

                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={styles.input}
                                    placeholder="PASSWORD"
                                    disabled
                                />
                                <label htmlFor="password" className={styles.label}>PASSWORD</label>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-500)', zIndex: 2, padding: '0.25rem' }}>
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showRepeatPassword ? "text" : "password"}
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    className={styles.input}
                                    placeholder="REPEAT PASSWORD"
                                    disabled
                                />
                                <label htmlFor="repeatPassword" className={styles.label}>REPEAT PASSWORD</label>
                                <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-500)', zIndex: 2, padding: '0.25rem' }}>
                                    {showRepeatPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div style={{ marginTop: '-2rem', marginBottom: '2.5rem', color: 'var(--color-gray-500)', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            ACCOUNTS ARE COMING SOON. REGISTRATION IS NOT AVAILABLE YET.
                        </div>

                        {/* Personal Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={styles.input}
                                    placeholder="NAME"
                                    disabled
                                />
                                <label htmlFor="firstName" className={styles.label}>NAME</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={styles.input}
                                    placeholder="SURNAME"
                                    disabled
                                />
                                <label htmlFor="lastName" className={styles.label}>SURNAME</label>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className={styles.input}
                                placeholder="ADDRESS"
                                disabled
                            />
                            <label htmlFor="address" className={styles.label}>ADDRESS</label>
                        </div>

                        {/* Opt-in / Terms */}
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="newsletter" name="newsletter" className={styles.checkbox} disabled />
                            <label htmlFor="newsletter" className={styles.checkboxLabel}>
                                I wish to receive CurvyChiQ news on my e-mail.
                            </label>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="terms" name="terms" className={styles.checkbox} disabled />
                            <label htmlFor="terms" className={styles.checkboxLabel}>
                                I accept the <Link href="/privacy">privacy statement</Link>.
                            </label>
                        </div>

                        <button type="submit" className={styles.actionBtn} disabled>
                            CREATE ACCOUNT &mdash; COMING SOON
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
