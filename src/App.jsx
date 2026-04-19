import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import HomePage from './pages/HomePage';
import StylesPage from './pages/StylesPage';
import ClickSpark from './components/ClickSpark';
import Preloader from './components/Preloader';

import './assets/css/vendor.css';
import './assets/css/styles.css';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure the DOM is ready and match the Framer Motion transition
      const timer = setTimeout(() => {
        document.documentElement.classList.add('ss-show', 'ss-loaded');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} duration={2800} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ClickSpark
            sparkColor="#F97316"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/styles" element={<StylesPage />} />
            </Routes>
          </ClickSpark>
        </motion.div>
      )}
    </>
  );
}

export default App;