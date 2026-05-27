import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';

const slides = [
  {
    titleKey: 'home.slide1_title',
    subtitleKey: 'home.slide1_subtitle',
    image: '/assets/images/banner-01.jpg',
    color: '#003366'
  },
  {
    titleKey: 'home.slide2_title',
    subtitleKey: 'home.slide2_subtitle',
    image: '/assets/images/banner-02.jpg',
    color: '#004488'
  },
  {
    titleKey: 'home.slide3_title',
    subtitleKey: 'home.slide3_subtitle',
    image: '/assets/images/banner-03.jpg',
    color: '#002244'
  }
];

const units = [
  { id: 'oil', nameKey: 'home.oil_name', descKey: 'home.oil_desc', image: '/assets/images/oil.jpg' },
  { id: 'logistics', nameKey: 'home.logistics_name', descKey: 'home.logistics_desc', image: '/assets/images/logistics.jpg' },
  { id: 'chemicals', nameKey: 'home.chemicals_name', descKey: 'home.chemicals_desc', image: '/assets/images/chemicals.jpg' },
  { id: 'drybulk', nameKey: 'home.drybulk_name', descKey: 'home.drybulk_desc', image: '/assets/images/dry-bulk.jpg' },
  { id: 'ship-mgmt', nameKey: 'home.ship_mgmt_name', descKey: 'home.ship_mgmt_desc', image: '/assets/images/ship-management.jpg' },
  { id: 'marine', nameKey: 'home.marine_name', descKey: 'home.marine_desc', image: '/assets/images/marine.jpg' }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Slider */}
      <section className={styles.hero}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})` }}
          >
            <div className="container">
              <div className={styles.slideContent}>
                <span className={styles.slideCounter}>0{index + 1}/0{slides.length}</span>
                <h1>{t(slide.titleKey)}</h1>
                <p>{t(slide.subtitleKey)}</p>
                <button type="button" className="btn btn-outline">{t('home.about_btn')}</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Business Units */}
      <section className={styles.unitsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{t('home.units_title')}</h2>
            <p>{t('home.units_subtitle')}</p>
          </div>
          <div className={styles.unitsGrid}>
            {units.map((unit) => (
              <div key={unit.id} className={styles.unitCard}>
                <div className={styles.unitImage} style={{ backgroundImage: `url(${unit.image})` }}></div>
                <div className={styles.unitContent}>
                  <h3>{t(unit.nameKey)}</h3>
                  <p>{t(unit.descKey)}</p>
                  <a href="#" className={styles.learnMore}>{t('home.learn_more')} <ArrowRight size={16} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>45+</span>
              <span className={styles.statLabel}>{t('home.exp_stat')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>104</span>
              <span className={styles.statLabel}>{t('home.vessels_stat')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>{t('home.ports_stat')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>{t('home.monitoring_stat')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Hub */}
      <section className={styles.investorSection}>
        <div className="container">
          <div className={styles.investorBox}>
            <div className={styles.investorText}>
              <h2>{t('home.investor_title')}</h2>
              <p>{t('home.investor_desc')}</p>
              <div className={styles.investorLinks}>
                <button className="btn">{t('home.annual_reports')}</button>
                <button className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>{t('home.stock_info')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
