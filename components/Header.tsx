"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from './CartContext';
import CartSidebar from './CartSidebar';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

// Signed-in state returns in Phase 3 (task 3.1) from an httpOnly session cookie, not from
// localStorage.
export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.logo}>
            CurvyChiQ
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {['About', 'New Arrival', 'Tops', 'Bottoms', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'About' ? '/about' : `/category/${item.toLowerCase().replace(' ', '-')}`} 
                    className={styles.navLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <Link href="/login" className={styles.actionBtn} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <UserIcon />
              Log In
            </Link>
            <button className={styles.actionBtn}>
              <SearchIcon />
            </button>
            <button className={styles.actionBtn} onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CartIcon />
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </header>
      <CartSidebar />
    </>
  );
}
