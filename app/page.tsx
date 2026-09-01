import Header from '@/components/Header';
import { getProducts } from './actions';
import styles from './page.module.css';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const allProducts = await getProducts();
  const newArrivals = allProducts.filter(p => p.isNewArrival || p.category === 'New Arrival' || p.category === 'Tops');

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
