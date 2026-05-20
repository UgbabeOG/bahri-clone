import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

const slides = [
  {
    title: 'Connecting Economies',
    subtitle: 'Driving Global Trade with Innovative Logistics',
    image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1600',
    color: '#003366'
  },
  {
    title: 'Sharing Prosperity',
    subtitle: 'A Strategic Partner in Saudi Vision 2030',
    image: 'https://images.unsplash.com/photo-1494412574743-0194852939cf?auto=format&fit=crop&q=80&w=1600',
    color: '#004488'
  },
  {
    title: 'Global Logistics Solutions',
    subtitle: 'End-to-End Excellence Across All Borders',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600',
    color: '#002244'
  }
];

const units = [
  { id: 'oil', name: 'NexaCrude Oil', desc: 'World leader in VLCC ownership and operation.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600' },
  { id: 'logistics', name: 'NexaCrude Logistics', desc: 'Comprehensive freight forwarding and warehousing.', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=600' },
  { id: 'chemicals', name: 'NexaCrude Chemicals', desc: 'Safe transport of high-value chemical products.', image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=600' },
  { id: 'drybulk', name: 'NexaCrude Dry Bulk', desc: 'Reliable shipment of agricultural and mineral bulk.', image: 'https://images.unsplash.com/photo-1454165833069-111d816276d1?auto=format&fit=crop&q=80&w=600' },
  { id: 'ship-mgmt', name: 'Ship Management', desc: 'Expert technical and crew management services.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600' },
  { id: 'marine', name: 'NexaCrude Marine', desc: 'Specialized offshore and subsea support services.', image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600' }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button className="btn btn-outline">About NexaCrude</button>
              </div>
            </div>
          </div>
        ))}
        <button className={styles.sliderBtnPrev} onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
          <ChevronLeft size={30} />
        </button>
        <button className={styles.sliderBtnNext} onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
          <ChevronRight size={30} />
        </button>
      </section>

      {/* Business Units */}
      <section className={styles.unitsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Business Units</h2>
            <p>Diverse maritime services tailored to global needs.</p>
          </div>
          <div className={styles.unitsGrid}>
            {units.map((unit) => (
              <div key={unit.id} className={styles.unitCard}>
                <div className={styles.unitImage} style={{ backgroundImage: `url(${unit.image})` }}></div>
                <div className={styles.unitContent}>
                  <h3>{unit.name}</h3>
                  <p>{unit.desc}</p>
                  <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={16} /></a>
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
              <span className={styles.statLabel}>Years of Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>104</span>
              <span className={styles.statLabel}>Global Vessels</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>Port Connections</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Live Monitoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Hub */}
      <section className={styles.investorSection}>
        <div className="container">
          <div className={styles.investorBox}>
            <div className={styles.investorText}>
              <h2>Investor Relations</h2>
              <p>Transparent and accurate financial reporting for our global stakeholders.</p>
              <div className={styles.investorLinks}>
                <button className="btn">Annual Reports</button>
                <button className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Stock Info</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
