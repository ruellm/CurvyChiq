import styles from './page.module.css';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Privacy Policy & Terms of Conditions</h1>

                <div className={styles.content}>
                    <p className={styles.text}>
                        Welcome to CurvyChiQ. This Privacy Policy outlines how we collect, use, and protect your
                        Personal Data when you use our website (curvychiq.com) and purchase our products. This privacy statement
                        is designed to ensure our compliance with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> of the Philippines.
                    </p>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>1. Personal Information We Collect</h2>
                        <p className={styles.text}>
                            When you register an account, make a purchase, or interact with our site, we may collect the following information:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><strong>Identity Data:</strong> First name, last name, and username.</li>
                            <li className={styles.listItem}><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
                            <li className={styles.listItem}><strong>Financial Data:</strong> Bank account and payment card details (processed securely via third-party gateways).</li>
                            <li className={styles.listItem}><strong>Profile Data:</strong> Purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>2. How We Use Your Information</h2>
                        <p className={styles.text}>
                            We use the collected information for the following purposes:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>To process and deliver your orders within the Philippines.</li>
                            <li className={styles.listItem}>To manage your account and provide customer support.</li>
                            <li className={styles.listItem}>To send you promotional offers, newsletters, and updates (only if you have opted in).</li>
                            <li className={styles.listItem}>To improve our website, products, and overall customer experience.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>3. Data Sharing and Disclosure</h2>
                        <p className={styles.text}>
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</li>
                            <li className={styles.listItem}>When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>4. Data Security</h2>
                        <p className={styles.text}>
                            We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>5. Your Rights as a Data Subject</h2>
                        <p className={styles.text}>
                            Under the Data Privacy Act of 2012, you have the right to:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Be informed about the processing of your personal data.</li>
                            <li className={styles.listItem}>Object to the processing of your personal data.</li>
                            <li className={styles.listItem}>Access your personal data.</li>
                            <li className={styles.listItem}>Rectify or correct inaccurate data.</li>
                            <li className={styles.listItem}>Erase or block your personal data from our system.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.subTitle}>6. Contacting Us</h2>
                        <p className={styles.text}>
                            If there are any questions regarding this privacy policy or if you wish to exercise any of your rights as a data subject, you may contact our Data Protection Officer at:
                        </p>
                        <p className={styles.text}>
                            <strong>Email:</strong> privacy@curvychiq.com<br />
                            <strong>Address:</strong> Manila, Philippines
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
