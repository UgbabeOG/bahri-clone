import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Tracking from "./pages/Tracking/Tracking";
import Logistics from "./pages/Logistics/Logistics";

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          {/* Placeholder routes for other links */}
          <Route
            path="/about"
            element={
              <div className="container" style={{ padding: "100px 0" }}>
                <div
                  style={{
                    maxWidth: 980,
                    margin: "0 auto",
                    display: "grid",
                    gap: 32,
                  }}
                >
                  <div
                    style={{
                      borderRadius: 24,
                      overflow: "hidden",
                      boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
                    }}
                  >
                    <img
                      src="/assets/images/banner-04.jpg"
                      alt="NexaCrude global shipping network"
                      style={{
                        width: "100%",
                        height: 420,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ display: "grid", gap: 20 }}>
                    <h1>{t("about.title")}</h1>
                    <p style={{ margin: "20px 0 0", lineHeight: 1.8 }}>
                      {t("about.intro")}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: 24,
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                  >
                    {[
                      {
                        img: "/assets/images/ship-management.jpg",
                        alt: "Advanced ship management",
                        title: t("about.mission_title"),
                        text: t("about.mission_text"),
                      },
                      {
                        img: "/assets/images/logistics.jpg",
                        alt: "Global logistics operations",
                        title: t("about.vision_title"),
                        text: t("about.vision_text"),
                      },
                      {
                        img: "/assets/images/oil.jpg",
                        alt: "Sustainable energy transport",
                        title: t("about.values_title"),
                        text: t("about.values_text"),
                      },
                      {
                        img: "/assets/images/marine.jpg",
                        alt: "Marine excellence and sustainability",
                        title: t("about.sustainability_title"),
                        text: t("about.sustainability_text"),
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        style={{
                          background: "#ffffff",
                          borderRadius: 20,
                          overflow: "hidden",
                          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.06)",
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.alt}
                          style={{
                            width: "100%",
                            height: 180,
                            objectFit: "cover",
                          }}
                        />
                        <div style={{ padding: 28 }}>
                          <h2>{item.title}</h2>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/units"
            element={
              <div className="container" style={{ padding: "100px 0" }}>
                <div style={{ maxWidth: 980, margin: "0 auto" }}>
                  <h1>{t("units.title")}</h1>
                  <p style={{ margin: "20px 0 40px", lineHeight: 1.8 }}>
                    {t("units.intro")}
                  </p>
                  <div style={{ display: "grid", gap: 24 }}>
                    {[
                      {
                        title: t("home.oil_name"),
                        desc: t("units.oil_desc"),
                      },
                      {
                        title: t("home.logistics_name"),
                        desc: t("units.logistics_desc"),
                      },
                      {
                        title: t("home.chemicals_name"),
                        desc: t("units.chemicals_desc"),
                      },
                      {
                        title: t("home.drybulk_name"),
                        desc: t("units.drybulk_desc"),
                      },
                      {
                        title: t("home.ship_mgmt_name"),
                        desc: t("units.ship_mgmt_desc"),
                      },
                      {
                        title: t("home.marine_name"),
                        desc: t("units.marine_desc"),
                      },
                    ].map((unit) => (
                      <div
                        key={unit.title}
                        style={{
                          background: "#ffffff",
                          borderRadius: 20,
                          padding: 28,
                          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.06)",
                        }}
                      >
                        <h3>{unit.title}</h3>
                        <p>{unit.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/logistics" element={<Logistics />} />
          <Route
            path="/investors"
            element={
              <div className="container" style={{ padding: "100px 0" }}>
                <h1>{t("placeholders.investors_title")}</h1>
                <p>{t("placeholders.investors_desc")}</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
