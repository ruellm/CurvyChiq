import Header from '@/components/Header';
import { getCategoryBySlug, getNewArrivals, getProductsByCategory } from '@/db/queries';
import styles from '@/app/page.module.css';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

const NEW_ARRIVAL_SLUG = 'new-arrival';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // New Arrival is not a category, it is a flag on the product.
    if (slug === NEW_ARRIVAL_SLUG) {
        const products = await getNewArrivals();
        return <CategoryView title="New Arrival" products={products} />;
    }

    const category = await getCategoryBySlug(slug);
    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.slug);
    return <CategoryView title={category.name} products={products} />;
}

function CategoryView({
    title,
    products,
}: {
    title: string;
    products: Awaited<ReturnType<typeof getNewArrivals>>;
}) {
    return (
        <main className={styles.main}>
            <Header />

            <section className="container" style={{ paddingTop: '50px' }}>
                <div className={styles.sectionHeader}>
                    <h2>{title}</h2>
                </div>

                {products.length > 0 ? (
                    <div className={styles.productGrid}>
                        {products.map((product) => (
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
