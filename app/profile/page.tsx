"use client";

import Link from 'next/link';
import styles from './Profile.module.css';
import Header from '@/components/Header';

// The account panels read their data from localStorage, which held plaintext passwords and
// was not a session. They come back in Phase 3 once there is a real signed-in user
// (task 3.1) and real order history (task 4.4).
export default function ProfilePage() {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className="container">
                <div className={styles.profileHeader}>
                    <h1>My Account</h1>
                    <p className={styles.welcomeMsg}>Accounts are coming soon</p>
                </div>

                <div className={styles.tabContent}>
                    <h2>Not available yet</h2>
                    <div className={styles.emptyState}>
                        <p>
                            Accounts, order history and saved details are being built. You can
                            still browse and check out as a guest.
                        </p>
                        <Link href="/" className={styles.primaryBtn}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
