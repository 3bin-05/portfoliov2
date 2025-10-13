import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StylesPage from './pages/StylesPage';

import './assets/css/vendor.css';
import './assets/css/styles.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/styles" element={<StylesPage />} />
      </Routes>
  );
}

export default App;