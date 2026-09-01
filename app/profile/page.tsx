"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Profile.module.css';
import Header from '@/components/Header';

type Account = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
};

const PurchasesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const ReturnsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
    </svg>
);

const FavoritesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
);

const ContactIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [activeTab, setActiveTab] = useState('purchases');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            router.push('/login');
            return;
        }
        setUser(loggedInUser);

        // Load the full account record
        const accounts: Account[] = JSON.parse(localStorage.getItem('curvychiq_accounts') || '[]');
        const found = accounts.find((a) => a.firstName.toUpperCase() === loggedInUser);
        if (found) setAccount(found);
    }, [router]);

    if (!user) return null;

    const tabs = [
        { id: 'purchases', label: 'Purchases', icon: <PurchasesIcon /> },
        { id: 'returns', label: 'Returns', icon: <ReturnsIcon /> },
        { id: 'favorites', label: 'Favorites', icon: <FavoritesIcon /> },
        { id: 'contact', label: 'Contact Info', icon: <ContactIcon /> },
        { id: 'location', label: 'Location', icon: <LocationIcon /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'purchases':
                return (
                    <div className={styles.tabContent}>
                        <h2>Your Purchases</h2>
                        <div className={styles.emptyState}>
                            <p>You haven't made any purchases yet.</p>
                            <button className={styles.primaryBtn} onClick={() => router.push('/')}>Start Shopping</button>
                        </div>
                    </div>
                );
            case 'returns':
                return (
                    <div className={styles.tabContent}>
                        <h2>Returns</h2>
                        <div className={styles.emptyState}>
                            <p>No active returns.</p>
                        </div>
                    </div>
                );
            case 'favorites':
                return (
                    <div className={styles.tabContent}>
                        <h2>Your Favorites</h2>
                        <div className={styles.emptyState}>
                            <p>Your wishlist is empty.</p>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className={styles.tabContent}>
                        <h2>Contact Info</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Full Name</label>
                                <p>{account ? `${account.firstName} ${account.lastName}` : user}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Email</label>
                                <p>{account?.email ?? '—'}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Phone</label>
                                <p>{account?.phone ?? '—'}</p>
                            </div>
                        </div>
                        <button className={styles.secondaryBtn}>Edit Profile</button>
                    </div>
                );
            case 'location':
                return (
                    <div className={styles.tabContent}>
                        <h2>Shipping Location</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Registered Address</label>
                                <p>{account?.address ?? 'No address saved yet.'}</p>
                            </div>
                        </div>
                        <button
                            className={styles.secondaryBtn}
                            onClick={() => router.push('/checkout')}
                        >
                            Change Address at Checkout
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className="container">
                <div className={styles.profileHeader}>
                    <h1>My Account</h1>
                    <p className={styles.welcomeMsg}>Welcome back, {user}</p>
                </div>

                <div className={styles.profileLayout}>
                    <aside className={styles.sidebar}>
                        <nav className={styles.sideNav}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                        <button 
                            className={styles.logoutBtn}
                            onClick={() => {
                                localStorage.removeItem('loggedInUser');
                                window.dispatchEvent(new Event('authChange'));
                                router.push('/');
                            }}
                        >
                            Log Out
                        </button>
                    </aside>

                    <section className={styles.content}>
                        {renderContent()}
                    </section>
                </div>
            </main>
        </div>
    );
}
