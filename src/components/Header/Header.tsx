import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.utilityLinks}>
              <Link to="/careers">{t('header.careers')}</Link>
              <Link to="/isupplier">{t('header.isupplier')}</Link>
              <Link to="/faqs">{t('header.faqs')}</Link>
            </div>
            <div className={styles.topBarRight}>
              <button type="button" className={styles.langToggle} onClick={toggleLanguage} aria-label="Toggle language">
                <Globe size={16} />
                <span>{i18n.language === 'en' ? '中文' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mainHeader}>
        <div className="container">
          <nav className={styles.nav} aria-label="Primary navigation">
            <Link to="/" className={styles.logo}>
              <div className={styles.logoBox}>
                <span className={styles.logoText}>NEXACRUDE</span>
              </div>
            </Link>

            <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('header.about')}</Link>
              <Link to="/units" onClick={() => setIsMenuOpen(false)}>{t('header.units')}</Link>
              <Link to="/logistics" onClick={() => setIsMenuOpen(false)}>{t('header.logistics')}</Link>
              <Link to="/investors" onClick={() => setIsMenuOpen(false)}>{t('header.investors')}</Link>
              <Link to="/tracking" className={styles.trackingLink} onClick={() => setIsMenuOpen(false)}>{t('header.track')}</Link>
            </div>

            <div className={styles.navActions}>
              <button type="button" className={styles.iconBtn} aria-label="Search site"><Search size={20} /></button>
              <button
                type="button"
                className={styles.menuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
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
