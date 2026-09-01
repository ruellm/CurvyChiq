import Header from '@/components/Header';
import { getProducts } from '@/app/actions';
import styles from '@/app/page.module.css';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '); 
    const allProducts = await getProducts();

    const categoryProducts = allProducts.filter(p =>
        p.category.toLowerCase() === categoryName.toLowerCase() ||
        p.category.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase() ||
        (slug.toLowerCase() === 'new-arrival' && p.isNewArrival)
    );

    return (
        <main className={styles.main}>
            <Header />

            <section className="container" style={{ paddingTop: '50px' }}>
                <div className={styles.sectionHeader}>
                    <h2>{categoryName}</h2>
                </div>

                {categoryProducts.length > 0 ? (
                    <div className={styles.productGrid}>
                        {categoryProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found in this category yet.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
