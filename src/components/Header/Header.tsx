import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.utilityLinks}>
              <Link to="/careers">Careers</Link>
              <Link to="/isupplier">iSupplier</Link>
              <Link to="/faqs">FAQs</Link>
            </div>
            <div className={styles.topBarRight}>
              <button className={styles.langToggle}>
                <Globe size={16} />
                <span>العربية</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mainHeader}>
        <div className="container">
          <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoBox}>
                <span className={styles.logoText}>NEXACRUDE</span>
              </div>
            </Link>

            <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About NexaCrude</Link>
              <Link to="/units" onClick={() => setIsMenuOpen(false)}>NexaCrude Units</Link>
              <Link to="/logistics" onClick={() => setIsMenuOpen(false)}>Logistic Services</Link>
              <Link to="/investors" onClick={() => setIsMenuOpen(false)}>Investor Relations</Link>
              <Link to="/tracking" className={styles.trackingLink} onClick={() => setIsMenuOpen(false)}>Track Shipment</Link>
            </div>

            <div className={styles.navActions}>
              <button className={styles.iconBtn}><Search size={20} /></button>
              <button className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
