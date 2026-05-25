import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Tracking from './pages/Tracking/Tracking';
import Logistics from './pages/Logistics/Logistics';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          {/* Placeholder routes for other links */}
          <Route path="/about" element={<div className="container" style={{padding: '100px 0'}}><h1>{t('placeholders.about_title')}</h1><p>{t('placeholders.about_desc')}</p></div>} />
          <Route path="/units" element={<div className="container" style={{padding: '100px 0'}}><h1>{t('placeholders.units_title')}</h1><p>{t('placeholders.units_desc')}</p></div>} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/investors" element={<div className="container" style={{padding: '100px 0'}}><h1>{t('placeholders.investors_title')}</h1><p>{t('placeholders.investors_desc')}</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
