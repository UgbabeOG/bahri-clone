import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
            <h2 className={styles.logoText}>NEXACRUDE</h2>
            <p>A global leader in logistics and shipping, driving the maritime industry forward with innovation and excellence.</p>
            <div className={styles.socials}>
              <Mail size={20} />
              <Phone size={20} />
              <MapPin size={20} />
              <Globe size={20} />
            </div>
          </div>
          
          <div className={styles.linksSection}>
            <h3>About</h3>
            <ul>
              <li><a href="#">Company Profile</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Awards</a></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3>Services</h3>
            <ul>
              <li><a href="#">NexaCrude Oil</a></li>
              <li><a href="#">NexaCrude Logistics</a></li>
              <li><a href="#">NexaCrude Chemicals</a></li>
              <li><a href="#">Ship Management</a></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3>Support</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Global Network</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; 2026 NexaCrude. All rights reserved. Saudi Vision 2030</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
