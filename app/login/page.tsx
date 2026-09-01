'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const router = useRouter();

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
        setLoginError(null);

        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value.toLowerCase();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        if (!email || !password) {
            setLoginError("PLEASE ENTER BOTH EMAIL AND PASSWORD.");
            return;
        }

        // Look up the registered account by email
        const accounts: { email: string; password: string; firstName: string; lastName: string }[] =
            JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');

        const matchedAccount = accounts.find((a) => a.email === email);

        if (!matchedAccount) {
            setLoginError("NO ACCOUNT FOUND WITH THAT EMAIL. PLEASE REGISTER FIRST.");
            return;
        }

        if (matchedAccount.password !== password) {
            setLoginError("INCORRECT PASSWORD. PLEASE TRY AGAIN.");
            return;
        }

        // Use the firstName saved during registration
        localStorage.setItem('loggedInUser', matchedAccount.firstName.toUpperCase());
        window.dispatchEvent(new Event('authChange'));

        // Redirect to home page
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.splitLayout}>
                    {/* Log In Section */}
                    <div className={styles.column}>
                        <h1 className={styles.title}>Log In</h1>
                        <form className={styles.form} onSubmit={handleSubmit}>
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
                            {loginError && (
                                <div style={{ marginTop: '-1.5rem', marginBottom: '1.5rem', color: '#e00000', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    {loginError}
                                </div>
                            )}
                            <Link href="#" className={styles.forgotPassword}>
                                HAVE YOU FORGOTTEN YOUR PASSWORD?
                            </Link>
                            <button type="submit" className={styles.actionBtn}>
                                LOG IN
                            </button>
                            
                            {/* SSO Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                                <span style={{ padding: '0 1rem' }}>OR</span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-gray-300)' }}></div>
                            </div>
                            
                            {/* Google SSO Button */}
                            <button 
                                type="button" 
                                onClick={handleGoogleSSO} 
                                className={`${styles.actionBtn} ${styles.actionBtnOutline}`}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid var(--color-gray-300)', backgroundColor: 'transparent', color: 'var(--color-black)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                </svg>
                                CONTINUE WITH GOOGLE
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
