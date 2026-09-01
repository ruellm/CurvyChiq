import Header from '@/components/Header';
import { getNewArrivals } from '@/db/queries';
import styles from './page.module.css';
import ProductCard from '@/components/ProductCard';

// Stock and prices change in the database, so the homepage is never baked at build time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const newArrivals = await getNewArrivals();

  return (
    <main className={styles.main}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>New Collection</h1>
          <p className={styles.heroSubtitle}>Effortless style for every curve.</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container">
        <div className={styles.sectionHeader}>
          <h2>New Arrival</h2>
        </div>
        <div className={styles.productGrid}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
