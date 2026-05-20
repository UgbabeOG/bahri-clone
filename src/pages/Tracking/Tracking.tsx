import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Tracking.module.css';

const Tracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      setShowStatus(true);
      setProgress(0);
    }
  };

  useEffect(() => {
    let interval: number;
    if (showStatus && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.5, 100));
      }, 50); // Simulates 5 days in ~10 seconds
    }
    return () => clearInterval(interval);
  }, [showStatus, progress]);

  // Coordinates for the ports in the SVG (viewBox="0 0 800 400")
  const busan = { x: 600, y: 150 };
  const qingdao = { x: 400, y: 180 };
  const shanghai = { x: 420, y: 300 };

  // Calculate current ship position based on progress
  const getShipPos = () => {
    if (progress <= 50) {
      // Leg 1: Busan -> Qingdao (Days 1-2.5 approx)
      const factor = progress / 50;
      return {
        x: busan.x + (qingdao.x - busan.x) * factor,
        y: busan.y + (qingdao.y - busan.y) * factor
      };
    } else {
      // Leg 2: Qingdao -> Shanghai (Days 2.5-5 approx)
      const factor = (progress - 50) / 50;
      return {
        x: qingdao.x + (shanghai.x - qingdao.x) * factor,
        y: qingdao.y + (shanghai.y - qingdao.y) * factor
      };
    }
  };

  const shipPos = getShipPos();
  const currentDay = Math.floor((progress / 100) * 5) + 1;

  return (
    <div className={styles.trackingPage}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>{t('tracking.title')}</h1>
            <p>{t('tracking.desc')}</p>
            
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.inputGroup}>
                <Search className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder={t('tracking.placeholder')} 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">{t('tracking.btn')}</button>
            </form>
          </div>
        </div>
      </section>

      {showStatus && (
        <section className={styles.statusSection}>
          <div className="container">
            <div className={styles.mapContainer}>
              <div className={styles.mapHeader}>
                  <div>
                    <h3>{t('tracking.live_simulation')}: {trackingId}</h3>
                    <p>{t('tracking.current_day', { day: currentDay > 5 ? 5 : currentDay })}</p>
                  </div>
                </div>
              <div className={styles.mapWrapper}>
                <svg viewBox="0 0 800 400" className={styles.svgMap}>
                  {/* Water Background */}
                  <rect width="800" height="400" fill="#f0f9ff" />
                  
                  {/* Landmass Mockup */}
                  <path d="M550,0 L800,0 L800,400 L500,400 Q520,300 580,250 T620,100 Z" fill="#e2e8f0" />
                  <path d="M0,0 L450,0 Q400,100 350,150 T300,300 L0,400 Z" fill="#e2e8f0" />

                  {/* Route Paths */}
                  <line x1={busan.x} y1={busan.y} x2={qingdao.x} y2={qingdao.y} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1={qingdao.x} y1={qingdao.y} x2={shanghai.x} y2={shanghai.y} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Ports */}
                  <circle cx={busan.x} cy={busan.y} r="6" fill="#003366" />
                  <text x={busan.x + 10} y={busan.y} className={styles.portLabel}>{t('tracking.busan')}</text>
                  
                  <circle cx={qingdao.x} cy={qingdao.y} r="6" fill="#003366" />
                  <text x={qingdao.x - 60} y={qingdao.y + 5} className={styles.portLabel}>{t('tracking.qingdao')}</text>

                  <circle cx={shanghai.x} cy={shanghai.y} r="6" fill="#10b981" />
                  <text x={shanghai.x + 10} y={shanghai.y + 5} className={styles.portLabel}>{t('tracking.shanghai')}</text>

                  {/* Animated Ship */}
                  <g transform={`translate(${shipPos.x - 15}, ${shipPos.y - 10})`}>
                    <rect width="30" height="12" rx="2" fill="#003366" />
                    <path d="M5,0 L10,-5 L20,-5 L25,0" fill="#003366" />
                    <circle cx="15" cy="6" r="2" fill="white" opacity="0.5" />
                  </g>
                </svg>

                <div className={styles.voyageInfo}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}><MapPin size={20} /></div>
                    <div>
                      <p className={styles.infoLabel}>{t('tracking.current_leg')}</p>
                      <p className={styles.infoValue}>
                        {progress === 0 ? t('tracking.at_port_busan') : 
                         progress < 50 ? t('tracking.busan_qingdao') : 
                         progress === 50 ? t('tracking.at_port_qingdao') :
                         progress < 100 ? t('tracking.qingdao_shanghai') : t('tracking.arrived_shanghai')}
                      </p>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}><Clock size={20} /></div>
                    <div>
                      <p className={styles.infoLabel}>{t('tracking.estimated_eta')}</p>
                      <p className={styles.infoValue}>{progress < 100 ? 'May 25, 2026' : t('tracking.delivered')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statusTimeline}>
              <div className={`${styles.step} ${progress >= 0 ? styles.completed : ''}`}>
                <div className={styles.stepIcon}><CheckCircle size={20} /></div>
                <p>{t('tracking.departure_busan')}</p>
              </div>
              <div className={`${styles.step} ${progress >= 50 ? styles.completed : ''}`}>
                <div className={styles.stepIcon}><Package size={20} /></div>
                <p>{t('tracking.stop_qingdao')}</p>
              </div>
              <div className={`${styles.step} ${progress >= 100 ? styles.completed : ''}`}>
                <div className={styles.stepIcon}><Truck size={20} /></div>
                <p>{t('tracking.arrival_shanghai')}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tracking;
