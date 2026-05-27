import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Tracking.module.css";

const Tracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [startTime, setStartTime] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeInfo, setActiveInfo] = useState<
    "ship" | "busan" | "qingdao" | "shanghai"
  >("ship");
  const [showMapOverlay, setShowMapOverlay] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);
  const { t } = useTranslation();

  const totalSimulatedDuration = 5 * 24 * 60 * 60 * 1000; // 5 days real time
  const tickInterval = 1000;
  const minZoom = 1;
  const maxZoom = 2.2;
  const validTrackingCode = "NXC-VLCC-3328";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedId = trackingId.trim().toUpperCase();
    if (!normalizedId) {
      return;
    }

    if (normalizedId === validTrackingCode) {
      setTrackingId(normalizedId);
      setShowStatus(true);
      setNotFound(false);
      setProgress(0);
      setStartTime(Date.now());
      setActiveInfo("ship");
      setZoomLevel(1);
      setShowMapOverlay(true);
      return;
    }

    setShowStatus(false);
    setNotFound(true);
    setStartTime(null);
    setProgress(0);
  };

  const handleZoom = (direction: "in" | "out" | "reset") => {
    if (direction === "reset") {
      setZoomLevel(1);
      return;
    }
    setZoomLevel((current) => {
      const next = direction === "in" ? current + 0.25 : current - 0.25;
      return Math.min(maxZoom, Math.max(minZoom, next));
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showStatus && startTime !== null) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const nextProgress = Math.min(
          (elapsed / totalSimulatedDuration) * 100,
          100,
        );
        setProgress(nextProgress);
      }, tickInterval);
    }
    return () => clearInterval(interval);
  }, [showStatus, startTime]);

  useEffect(() => {
    if (showMapOverlay) {
      const timer = setTimeout(() => {
        setShowMapOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMapOverlay]);

  // Coordinates for the ports in the SVG (viewBox="0 0 800 400")
  const busan = { x: 600, y: 150 };
  const qingdao = { x: 400, y: 180 };
  const shanghai = { x: 420, y: 300 };

  // Calculate current ship position based on progress
  const getShipPos = () => {
    if (progress <= 50) {
      const factor = progress / 50;
      return {
        x: busan.x + (qingdao.x - busan.x) * factor,
        y: busan.y + (qingdao.y - busan.y) * factor,
      };
    }
    const factor = (progress - 50) / 50;
    return {
      x: qingdao.x + (shanghai.x - qingdao.x) * factor,
      y: qingdao.y + (shanghai.y - qingdao.y) * factor,
    };
  };

  const shipPos = getShipPos();
  const currentDay = Math.min(Math.max(1, Math.ceil((progress / 100) * 5)), 5);
  const progressPercent = Math.round(progress);
  const departureDate = new Date(startTime ?? Date.now());
  const etaDate = new Date(departureDate.getTime() + 5 * 24 * 60 * 60 * 1000);
  const formattedEta = etaDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  type LocationDetail = {
    title: string;
    status: string;
    cargo?: string;
    destination?: string;
    eta?: string;
    detail?: string;
    arrival?: string;
    notes: string;
  };

  const locationDetails: Record<
    "ship" | "busan" | "qingdao" | "shanghai",
    LocationDetail
  > = {
    ship: {
      title: "Nexa Voyager",
      status: progress < 100 ? "Underway, 18 knots" : "Docked in Shanghai",
      cargo: "11,200 TEU | Crude Oil & Other Minerals",
      destination: progress < 100 ? "Shanghai Port" : "Shanghai Port - Arrived",
      eta: formattedEta,
      notes: "Route tracking updated every second.",
    },
    busan: {
      title: "Port of Busan",
      status: "Origin terminal",
      detail: "120+ berths, open 24/7",
      arrival: "Departed on schedule",
      notes: "Major container hub in South Korea.",
    },
    qingdao: {
      title: "Port of Qingdao",
      status: "Mid-voyage waypoint",
      detail: "Customs clearance point",
      arrival: "ETA in 1.5 days",
      notes: "Busy passage through the Yellow Sea.",
    },
    shanghai: {
      title: "Port of Shanghai",
      status: "Destination port",
      detail: "Terminal 8 assigned",
      arrival: progress < 100 ? "ETA on arrival" : "Arrived today",
      notes: "World's busiest container port.",
    },
  };

  const activeLocation = locationDetails[activeInfo];

  // Calculate 3D perspective transform based on mouse position
  const getPerspectiveTransform = () => {
    if (!showStatus) return {};
    const centerX = 400;
    const centerY = 200;
    const maxRotate = 2;
    const rotateX = ((mousePos.y - centerY) / 200) * maxRotate;
    const rotateY = ((mousePos.x - centerX) / 400) * maxRotate;
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    };
  };

  return (
    <div className={styles.trackingPage}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>{t("tracking.title")}</h1>
            <p>{t("tracking.desc")}</p>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.inputGroup}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={t("tracking.placeholder")}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">
                {t("tracking.btn")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {notFound && (
        <section className={styles.notFoundBanner}>
          <div className="container">
            <div className={styles.notFoundCard}>
              <p>{t("tracking.not_found")}</p>
            </div>
          </div>
        </section>
      )}

      {showStatus && (
        <section className={styles.statusSection}>
          <div className="container">
            <div className={styles.mapContainer}>
              <div className={styles.mapHeader}>
                <div>
                  <h3>
                    {t("tracking.live_simulation")}: {trackingId}
                  </h3>
                  <p>
                    {t("tracking.current_day", {
                      day: currentDay > 5 ? 5 : currentDay,
                    })}
                  </p>
                </div>
                <div className={styles.mapHeaderRight}>
                  <div className={styles.mapStatus}>
                    <span
                      className={styles.progressText}
                    >{`Progress: ${progressPercent}%`}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.mapControls}>
                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={() => handleZoom("out")}
                      disabled={zoomLevel <= minZoom}
                    >
                      <ZoomOut size={16} /> Zoom out
                    </button>
                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={() => handleZoom("in")}
                      disabled={zoomLevel >= maxZoom}
                    >
                      <ZoomIn size={16} /> Zoom in
                    </button>
                    <button
                      type="button"
                      className={styles.controlBtn}
                      onClick={() => handleZoom("reset")}
                    >
                      <RefreshCcw size={16} /> Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.mapWrapper}>
                <div
                  className={styles.svgViewport}
                  onMouseMove={handleMouseMove}
                  style={getPerspectiveTransform()}
                >
                  <div
                    className={styles.zoomTarget}
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg viewBox="0 0 800 400" className={styles.svgMap}>
                      <defs>
                        <linearGradient
                          id="seaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#84c5ff" />
                          <stop offset="100%" stopColor="#0f4ea8" />
                        </linearGradient>
                        <linearGradient
                          id="landGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#eef2d3" />
                          <stop offset="100%" stopColor="#c9c191" />
                        </linearGradient>
                        <filter
                          id="shipShadow"
                          x="-30%"
                          y="-30%"
                          width="160%"
                          height="160%"
                        >
                          <feDropShadow
                            dx="0"
                            dy="6"
                            stdDeviation="6"
                            floodColor="#0f172a"
                            floodOpacity="0.18"
                          />
                        </filter>
                        <filter
                          id="glowEffect"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            stdDeviation="3"
                            result="coloredBlur"
                          />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <marker
                          id="arrowTip"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M0,0 L10,5 L0,10 Z" fill="#ffffff" />
                        </marker>
                        <pattern
                          id="seaTexture"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0,20 L40,20 M20,0 L20,40"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="800" height="400" fill="url(#seaGradient)" />
                      <rect
                        width="800"
                        height="400"
                        fill="url(#seaTexture)"
                        opacity="0.75"
                      />
                      <g opacity="0.92">
                        <path
                          d="M550,0 L800,0 L800,400 L500,400 Q520,300 580,250 T620,100 Z"
                          fill="url(#landGradient)"
                        />
                        <path
                          d="M0,0 L450,0 Q400,100 350,150 T300,300 L0,400 Z"
                          fill="url(#landGradient)"
                        />
                      </g>
                      <g className={styles.waveLines}>
                        <path d="M40,70 C110,60 170,100 240,90" />
                        <path d="M120,140 C190,130 250,170 320,160" />
                        <path d="M200,220 C270,210 330,250 400,240" />
                        <path d="M330,90 C400,80 460,120 530,110" />
                      </g>
                      <path
                        d={`M${busan.x},${busan.y} L${qingdao.x},${qingdao.y} L${shanghai.x},${shanghai.y}`}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="4"
                        strokeDasharray="12,12"
                        strokeLinecap="round"
                        markerEnd="url(#arrowTip)"
                        opacity="0.9"
                        className={styles.routePath}
                      />
                      <g>
                        <circle
                          onClick={() => setActiveInfo("busan")}
                          onMouseEnter={() => setHoveredPort("busan")}
                          onMouseLeave={() => setHoveredPort(null)}
                          className={`${styles.portMarker} ${hoveredPort === "busan" ? styles.portMarkerHovered : ""}`}
                          cx={busan.x}
                          cy={busan.y}
                          r="14"
                        />
                        <circle
                          className={styles.portDot}
                          cx={busan.x}
                          cy={busan.y}
                          r="6"
                        />
                        <text
                          x={busan.x + 10}
                          y={busan.y - 12}
                          className={styles.portLabel}
                        >
                          {t("tracking.busan")}
                        </text>
                      </g>
                      <g>
                        <circle
                          onClick={() => setActiveInfo("qingdao")}
                          onMouseEnter={() => setHoveredPort("qingdao")}
                          onMouseLeave={() => setHoveredPort(null)}
                          className={`${styles.portMarker} ${hoveredPort === "qingdao" ? styles.portMarkerHovered : ""}`}
                          cx={qingdao.x}
                          cy={qingdao.y}
                          r="14"
                        />
                        <circle
                          className={styles.portDot}
                          cx={qingdao.x}
                          cy={qingdao.y}
                          r="6"
                        />
                        <text
                          x={qingdao.x - 60}
                          y={qingdao.y - 12}
                          className={styles.portLabel}
                        >
                          {t("tracking.qingdao")}
                        </text>
                      </g>
                      <g>
                        <circle
                          onClick={() => setActiveInfo("shanghai")}
                          onMouseEnter={() => setHoveredPort("shanghai")}
                          onMouseLeave={() => setHoveredPort(null)}
                          className={`${styles.portMarkerActive} ${hoveredPort === "shanghai" ? styles.portMarkerHovered : ""}`}
                          cx={shanghai.x}
                          cy={shanghai.y}
                          r="16"
                        />
                        <circle
                          className={styles.portDotActive}
                          cx={shanghai.x}
                          cy={shanghai.y}
                          r="7"
                        />
                        <text
                          x={shanghai.x + 10}
                          y={shanghai.y - 12}
                          className={styles.portLabel}
                        >
                          {t("tracking.shanghai")}
                        </text>
                      </g>
                      <g transform={`translate(${shipPos.x}, ${shipPos.y})`}>
                        <g
                          filter="url(#shipShadow)"
                          className={styles.shipGroup}
                          onClick={() => setActiveInfo("ship")}
                        >
                          <path
                            d="M-16,8 Q-8,2 0,2 Q8,2 16,8 L14,12 Q0,18 -14,12 Z"
                            fill="#0f172a"
                            stroke="#60a5fa"
                            strokeWidth="0.7"
                            className={styles.shipBody}
                          />
                          <line
                            x1="0"
                            y1="1"
                            x2="0"
                            y2="-24"
                            stroke="#60a5fa"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M0,-24 L10,-14 L0,-14 Z"
                            fill="#38bdf8"
                            opacity="0.95"
                          />
                          <path
                            d="M0,-24 L-10,-14 L0,-14 Z"
                            fill="#0f172a"
                            opacity="0.18"
                          />
                          <path
                            d="M-16,10 C-8,4 0,10 8,4 S24,10 32,4"
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="2"
                            className={styles.shipWave}
                          />
                          <circle
                            cx="0"
                            cy="-2"
                            r="8"
                            fill="rgba(56, 189, 248, 0.2)"
                            className={styles.shipGlow}
                          />
                          <circle cx="0" cy="-2" r="3" fill="#38bdf8" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  {showMapOverlay && (
                    <div className={styles.mapOverlay}>
                      <p>
                        Click the ship or port dots to see live voyage details.
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.shipInfoPanel}>
                  <h4>Live Tracking Details</h4>
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>Name</span>
                    <span className={styles.detailValue}>
                      {activeLocation.title}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>Status</span>
                    <span className={styles.detailValue}>
                      {activeLocation.status}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>
                      {activeInfo === "ship" ? "Cargo" : "Details"}
                    </span>
                    <span className={styles.detailValue}>
                      {activeLocation.cargo ?? activeLocation.detail}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>
                      {activeInfo === "ship" ? "Destination" : "Arrival"}
                    </span>
                    <span className={styles.detailValue}>
                      {activeLocation.destination ?? activeLocation.arrival}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>ETA</span>
                    <span className={styles.detailValue}>
                      {activeLocation.eta ?? ""}
                    </span>
                  </div>
                  <div className={styles.detailNote}>
                    {activeLocation.notes}
                  </div>
                </div>

                <div className={styles.voyageInfo}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className={styles.infoLabel}>
                        {t("tracking.current_leg")}
                      </p>
                      <p className={styles.infoValue}>
                        {progress === 0
                          ? t("tracking.at_port_busan")
                          : progress < 50
                            ? t("tracking.busan_qingdao")
                            : progress === 50
                              ? t("tracking.at_port_qingdao")
                              : progress < 100
                                ? t("tracking.qingdao_shanghai")
                                : t("tracking.arrived_shanghai")}
                      </p>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className={styles.infoLabel}>
                        {t("tracking.estimated_eta")}
                      </p>
                      <p className={styles.infoValue}>
                        {progress < 100
                          ? formattedEta
                          : t("tracking.delivered")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statusTimeline}>
              <div
                className={`${styles.step} ${progress >= 0 ? styles.completed : ""}`}
              >
                <div className={styles.stepIcon}>
                  <CheckCircle size={20} />
                </div>
                <p>{t("tracking.departure_busan")}</p>
              </div>
              <div
                className={`${styles.step} ${progress >= 50 ? styles.completed : ""}`}
              >
                <div className={styles.stepIcon}>
                  <Package size={20} />
                </div>
                <p>{t("tracking.stop_qingdao")}</p>
              </div>
              <div
                className={`${styles.step} ${progress >= 100 ? styles.completed : ""}`}
              >
                <div className={styles.stepIcon}>
                  <Truck size={20} />
                </div>
                <p>{t("tracking.arrival_shanghai")}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tracking;
