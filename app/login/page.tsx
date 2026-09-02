'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Real authentication is Phase 3 (tasks 3.1 and 3.2): hashed passwords and httpOnly session
// cookies. Until then the form is disabled rather than storing accounts in localStorage.
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.splitLayout}>
                    {/* Log In Section */}
                    <div className={styles.column}>
                        <h1 className={styles.title}>Log In</h1>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                            <div style={{ marginTop: '-1.5rem', marginBottom: '1.5rem', color: 'var(--color-gray-500)', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                ACCOUNTS ARE COMING SOON. LOG IN IS NOT AVAILABLE YET.
                            </div>
                            <button type="submit" className={styles.actionBtn} disabled>
                                LOG IN &mdash; COMING SOON
                            </button>
                            
                        </form>
                    </div>

                    {/* Divider for mobile, subtle border for desktop */}
                    <div className={styles.divider}></div>

                    {/* Register Section */}
                    <div className={styles.column}>
                        <h1 className={styles.title}>Register</h1>
                        <p className={styles.description}>
                            IF YOU STILL DON'T HAVE A CURVYCHIQ.COM ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.
                        </p>
                        <p className={styles.description}>
                            BY GIVING US YOUR DETAILS, PURCHASING IN <b>CURVYCHIQ.COM</b> WILL BE FASTER AND AN ENJOYABLE EXPERIENCE.
                        </p>
                        <Link href="/register" className={`${styles.actionBtn} ${styles.actionBtnOutline}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                            CREATE ACCOUNT
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
