import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>About CurvyChiQ</h1>
        <p className={styles.subtitle}>
          Because fashion comes in all sizes.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/generated/plus_dress_1773806957456.png" 
            alt="Beautiful plus size model in a floral dress"
            fill
            className={styles.image}
            priority
          />
        </div>
        
        <div className={styles.textContent}>
          <div>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.textBlock + ' ' + styles.text}>
              I founded CurvyChiQ out of a deep personal frustration. For too long, finding affordable, chic, and genuinely stylish clothing for plus-size women felt like an impossible treasure hunt. The fashion industry often treated inclusive sizing as an afterthought, offering limited options that sacrificed trendiness for scale. 
            </p>
            <p className={styles.text}>
              I decided it was time to change that narrative. CurvyChiQ was born from the belief that style has no size limit. We meticulously curate and design pieces that celebrate your curves rather than hiding them, bringing high-fashion looks directly to your wardrobe.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              To empower women of all sizes by providing accessible, premium, and on-trend fashion. We strive to make shopping an exciting and inclusive experience where every woman can discover clothing that makes her feel confident, beautiful, and unapologetically herself.
            </p>
          </div>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.text}>
              We envision a world where "plus-size fashion" is simply known as "fashion." A world where every trend, style, and silhouette is available to everyone, completely eliminating the divide in the retail industry.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to find your new favorite outfit?</h2>
        <p className={styles.ctaText}>
          Explore our latest collections and experience the CurvyChiQ difference.
        </p>
        <Link href="/category/new-arrival" className={styles.button}>
          Shop New Arrivals
        </Link>
      </div>
    </main>
  );
}
