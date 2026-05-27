import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Droplet, Globe, Truck, CheckCircle } from 'lucide-react';
import styles from './Logistics.module.css';

const Logistics: React.FC = () => {
  return (
    <div className={styles.logisticsPage}>
      <section className={styles.hero} aria-label="Logistics overview">
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>#1 Global Shipping Network</span>
            <h1>NexaCrude moves the world — from packages to crude oil.</h1>
            <p>
              As the world’s leading maritime logistics company, NexaCrude delivers freight with precision, speed and sustainability.
              We handle containerized cargo, bulk shipments and critical crude oil flows through the busiest lands and seas.
            </p>
            <div className={styles.heroActions}>
              <Link to="/tracking" className="btn">Track a Shipment</Link>
              <button type="button" className="btn btn-outline">Explore Services <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.heroStats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>160+</span>
              <span className={styles.statLabel}>Global Vessels</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>220+</span>
              <span className={styles.statLabel}>Port Connections</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>1.8M</span>
              <span className={styles.statLabel}>Packages Delivered</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>12M</span>
              <span className={styles.statLabel}>Barrels of Oil Transported</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Integrated logistics for cargo and crude, powered by smart global operations.</h2>
            <p>
              Our specialized teams combine ocean freight, tank logistics and digital tracking to deliver every shipment safely and on time.
            </p>
          </div>

          <div className={styles.serviceCards}>
            <article className={styles.serviceCard} style={{ backgroundImage: 'linear-gradient(135deg, rgba(0, 34, 102, 0.85), rgba(0, 51, 153, 0.85)), url(/assets/images/logistics.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={styles.serviceIcon}><Package size={24} /></div>
              <h3>Package Logistics</h3>
              <p>End-to-end freight forwarding and distribution for retail, industrial and temperature-sensitive goods.</p>
              <ul>
                <li><CheckCircle size={14} /> Express parcel consolidation</li>
                <li><CheckCircle size={14} /> Seamless inland and ocean delivery</li>
                <li><CheckCircle size={14} /> 24/7 digital shipment visibility</li>
              </ul>
            </article>
            <article className={styles.serviceCard} style={{ backgroundImage: 'linear-gradient(135deg, rgba(0, 34, 102, 0.85), rgba(0, 51, 153, 0.85)), url(/assets/images/oil.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={styles.serviceIcon}><Droplet size={24} /></div>
              <h3>Crude Oil Shipping</h3>
              <p>Specialized VLCC and Suezmax tankers moving crude across major energy corridors with expert chartering and safety.</p>
              <ul>
                <li><CheckCircle size={14} /> High-capacity tanker fleet</li>
                <li><CheckCircle size={14} /> Chartering and voyage planning</li>
                <li><CheckCircle size={14} /> Compliance-driven operations</li>
              </ul>
            </article>
            <article className={styles.serviceCard} style={{ backgroundImage: 'linear-gradient(135deg, rgba(0, 34, 102, 0.85), rgba(0, 51, 153, 0.85)), url(/assets/images/ship-management.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={styles.serviceIcon}><Globe size={24} /></div>
              <h3>Global Reach</h3>
              <p>Trusted across continents with integrated terminals, shore-based logistics and local customs expertise.</p>
              <ul>
                <li><CheckCircle size={14} /> Worldwide port coverage</li>
                <li><CheckCircle size={14} /> Regional supply chain support</li>
                <li><CheckCircle size={14} /> Dedicated customer service hubs</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.animationSection}>
        <div className="container">
          <div className={styles.animationContent}>
            <div>
              <h2>Motion that tells our story.</h2>
              <p>
                The fleet glides across oceans, packages move through hubs, and crude flows through the world’s busiest energy highways.
                Every journey is tracked, secured and supported by NexaCrude’s digital command center.
              </p>
            </div>
            <div className={styles.animationCard}>
              <div className={styles.maritimeMap} role="img" aria-label="Animated map showing global shipping corridors">
                <div className={styles.shipPath} aria-hidden="true"></div>
                <div className={styles.shipIcon} aria-hidden="true"></div>
                <div className={styles.tankerIcon} aria-hidden="true"></div>
                <div className={styles.packagePulse} aria-hidden="true"></div>
                <div className={styles.oilPulse} aria-hidden="true"></div>
              </div>
              <div className={styles.animationStats}>
                <div>
                  <strong>95%</strong>
                  <span>On-time delivery</span>
                </div>
                <div>
                  <strong>4.7/5</strong>
                  <span>Customer satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className="container">
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3>Why NexaCrude?</h3>
              <p>
                We combine global scale with agile execution: one of the world's largest shipping fleets, advanced logistics hubs, and a trusted brand across energy and freight markets.
              </p>
              <ul>
                <li>Integrated package and oil transport under one global operator</li>
                <li>Advanced cargo monitoring and ETA management</li>
                <li>Committed to safety, sustainability and Saudi Vision 2030</li>
              </ul>
            </div>
            <div className={styles.detailCard}> 
              <h3>How we deliver value</h3>
              <div className={styles.detailFeature}>
                <Truck size={20} />
                <div>
                  <h4>Logistics as a service</h4>
                  <p>From last-mile handoff to terminal storage, we ensure cargo keeps moving across every border.</p>
                </div>
              </div>
              <div className={styles.detailFeature}>
                <Droplet size={20} />
                <div>
                  <h4>Energy corridor expertise</h4>
                  <p>Our oil shipping routes link producers and consumers with reliable tanker capacity and premium charter support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Logistics;
