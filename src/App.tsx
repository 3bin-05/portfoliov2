import { useEffect, useState, useRef, Suspense, lazy, useCallback, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import { BrowserShell } from './components/BrowserShell';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ContactModal } from './components/ContactModal';
import { HeroProfile } from './sections/HeroProfile';
import { MinimalLoader } from './components/MinimalLoader';

// All below-the-fold sections are lazy — the preloader acts as the loading
// shield while these chunks resolve on first visit
const Works = lazy(() => import('./sections/Works').then(mod => ({ default: mod.Works })));
const LearningArchive = lazy(() => import('./sections/LearningArchive').then(mod => ({ default: mod.LearningArchive })));
const About = lazy(() => import('./sections/About').then(mod => ({ default: mod.About })));
const StackBelt = lazy(() => import('./sections/StackBelt').then(mod => ({ default: mod.StackBelt })));
const Events = lazy(() => import('./sections/Events').then(mod => ({ default: mod.Events })));
const Contact = lazy(() => import('./sections/Contact').then(mod => ({ default: mod.Contact })));
const Footer = lazy(() => import('./sections/Footer').then(mod => ({ default: mod.Footer })));

function App() {
  const { toggleTheme, isDark } = useTheme();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMuted, toggleMute, playClick, playType } = useSound(isLoaded);
  const lenisRef = useRef<Lenis | null>(null);

  // Memoised callbacks — stable references across re-renders so child props
  // don't cause unnecessary reconciliation
  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
    // Unlock scroll-based CSS animations and smooth-scroll after preloader exits
    document.documentElement.classList.add('loaded');
  }, []);

  // Initialize Lenis globally on window once
  useEffect(() => {
    if (!isLoaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoaded]);

  // Start Lenis immediately once ref is set
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.start();
  }, [lenisRef.current]);

  return (
    <div className="relative min-h-screen select-none overflow-x-hidden">
      {/* High-fidelity Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Dynamic Ambient Spotlight */}
      <div className="spotlight" />

      {/* Aesthetic Custom Cursor */}
      <CustomCursor />

      {/* Minimal Loader Overlay — stays visible while lazy chunks load */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <MinimalLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Mock Operating System Desktop Container */}
      <div className="w-full h-full">
        <BrowserShell playClick={playClick} playType={playType}>
          <Navbar 
            playClick={playClick} 
            playType={playType} 
            isDark={isDark}
            toggleTheme={toggleTheme}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
          
          {/* Hero Section — eagerly imported, above the fold */}
          <div className="relative w-full overflow-hidden">
            <HeroProfile
              isMuted={isMuted}
              toggleMute={toggleMute}
              isDark={isDark}
              toggleTheme={toggleTheme}
              playClick={playClick}
              playType={playType}
              onContactClick={openContact}
            />
          </div>

          {/* Portfolio Body Sections — single Suspense boundary so the
              preloader stays until all section chunks are ready */}
          <div className="relative z-30 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
            <Suspense fallback={null}>
              <About playClick={playClick} playType={playType} />
              <StackBelt playType={playType} />
              <Works playClick={playClick} playType={playType} />
              <LearningArchive playClick={playClick} playType={playType} />
              <Events playClick={playClick} playType={playType} />
              <Contact playClick={playClick} playType={playType} onContactClick={openContact} />
              <Footer playClick={playClick} playType={playType} onContactClick={openContact} />
            </Suspense>
          </div>

        </BrowserShell>
      </div>

      {/* Global Contact Form Modal Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            playClick={playClick}
            playType={playType}
            onClose={closeContact}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(App);
