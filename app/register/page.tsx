'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleGoogleSSO = () => {
        // Mock SSO logic: simulate logging in with Google
        localStorage.setItem('loggedInUser', 'GOOGLE USER');
        
        // Ensure "Google User" is in accounts if we ever look them up
        const accounts = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        if (!accounts.find((a: any) => a.email === 'googleuser@gmail.com')) {
            accounts.push({
                email: 'googleuser@gmail.com',
                password: 'SSO', // Not used for SSO users
                firstName: 'Google',
                lastName: 'User',
                phone: 'N/A',
                address: 'N/A'
            });
            localStorage.setItem('curvychiq_accounts', JSON.stringify(accounts));
        }

        window.dispatchEvent(new Event('authChange'));
        router.push('/');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError(null);

        const form = e.currentTarget;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const repeatPassword = (form.elements.namedItem('repeatPassword') as HTMLInputElement).value;

        // Validation Rules
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        if (!hasUpperCase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return;
        }

        if (!hasSymbol) {
            setPasswordError("Password must contain at least one symbol.");
            return;
        }

        if (password !== repeatPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const address = (form.elements.namedItem('address') as HTMLInputElement).value;

        // Save account details so login can look them up later
        const existingAccounts = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        const newAccount = { email: email.toLowerCase(), password, firstName, lastName, phone, address };
        // Replace if email already exists, otherwise add
        const updatedAccounts = existingAccounts.filter((a: { email: string }) => a.email !== email.toLowerCase());
        updatedAccounts.push(newAccount);
        localStorage.setItem('curvychiq_accounts', JSON.stringify(updatedAccounts));

        // Set session — use firstName so the header shows the name immediately
        localStorage.setItem('loggedInUser', firstName.toUpperCase());
        window.dispatchEvent(new Event('authChange'));

        // Simulate successful registration
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className={styles.main}>
                <div className={`container ${styles.container}`} style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <h1 className={styles.title}>Account Created</h1>
                    <p className={styles.description} style={{ marginBottom: '2rem' }}>
                        WELCOME TO CURVYCHIQ. YOUR ACCOUNT HAS BEEN SUCCESSFULLY CREATED.
                    </p>
                    <Link href="/" className={styles.actionBtn} style={{ maxWidth: '300px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                        RETURN TO SHOP
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h1 className={styles.title}>Personal details</h1>

                    {/* Google SSO Button */}
                    <button 
                        type="button" 
                        onClick={handleGoogleSSO} 
                        className={`${styles.actionBtn} ${styles.actionBtnOutline}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid var(--color-gray-300)', backgroundColor: 'transparent', color: 'var(--color-black)', width: '100%', marginBottom: '1.5rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        REGISTER WITH GOOGLE
                    </button>

                    {/* SSO Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                        <span style={{ padding: '0 1rem' }}>OR REGISTER WITH E-MAIL</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Access Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="E-MAIL"
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                        {passwordError && (
                            <div style={{ marginTop: '-2rem', marginBottom: '2.5rem', color: '#e00000', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {passwordError}
                            </div>
                        )}

                        {/* Personal Details */}
                        <div className={styles.inputGrid}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={styles.input}
                                    placeholder="NAME"
                                    required
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
                                    required
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
                                required
                            />
                            <label htmlFor="address" className={styles.label}>ADDRESS</label>
                        </div>

                        {/* Opt-in / Terms */}
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="newsletter" name="newsletter" className={styles.checkbox} />
                            <label htmlFor="newsletter" className={styles.checkboxLabel}>
                                I wish to receive CurvyChiQ news on my e-mail.
                            </label>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="terms" name="terms" className={styles.checkbox} required />
                            <label htmlFor="terms" className={styles.checkboxLabel}>
                                I accept the <Link href="/privacy">privacy statement</Link>.
                            </label>
                        </div>

                        <button type="submit" className={styles.actionBtn}>
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
