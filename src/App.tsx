import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Tracking from './pages/Tracking/Tracking';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          {/* Placeholder routes for other links */}
          <Route path="/about" element={<div className="container" style={{padding: '100px 0'}}><h1>About NexaCrude</h1><p>This is a placeholder for the About page.</p></div>} />
          <Route path="/units" element={<div className="container" style={{padding: '100px 0'}}><h1>NexaCrude Units</h1><p>This is a placeholder for the Business Units page.</p></div>} />
          <Route path="/logistics" element={<div className="container" style={{padding: '100px 0'}}><h1>Logistic Services</h1><p>This is a placeholder for the Logistics page.</p></div>} />
          <Route path="/investors" element={<div className="container" style={{padding: '100px 0'}}><h1>Investor Relations</h1><p>This is a placeholder for the Investors page.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
