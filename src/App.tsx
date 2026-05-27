import { useEffect, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import { BrowserShell } from './components/BrowserShell';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ContactModal } from './components/ContactModal';
import { HeroProfile } from './sections/HeroProfile';
import { Preloader } from './components/Preloader';
import { Works } from './sections/Works';
import { About } from './sections/About';
import { StackBelt } from './sections/StackBelt';
import { Events } from './sections/Events';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const { toggleTheme, isDark } = useTheme();
  const { isMuted, toggleMute, playClick, playType } = useSound();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  // Initialize Lenis globally on window
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    if (!isLoaded) {
      lenis.stop();
    } else {
      lenis.start();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [playType, isLoaded]);


  // Framer motion scroll analytics relative to viewport scroll progress
  const { scrollYProgress } = useScroll();

  // Dynamic Scroll Exit values mapping (Phase 3: exit tweet)
  // 0% -> 15% constant, 15% -> 40% exit transition, 40%+ fully exited
  const y = useTransform(scrollYProgress, [0.0, 0.25], [0, -120]);
  const scale = useTransform(scrollYProgress, [0.0, 0.25], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0.0, 0.2, 0.3], [1, 0.35, 0]);
  const blurVal = useTransform(scrollYProgress, [0.0, 0.3], [0, 16]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <div className="relative min-h-screen select-none overflow-x-hidden">
      {/* High-fidelity Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Dynamic Ambient Spotlight */}
      <div className="spotlight" />

      {/* Aesthetic Custom Cursor */}
      <CustomCursor />


      {/* Mock Operating System Desktop Container */}
      <div className="w-full h-full">
        <BrowserShell playClick={playClick} playType={playType}>
          <Navbar playClick={playClick} playType={playType} />
          
          {/* Hero Section Scroll Wrapper (Phase 2 & Phase 3) */}
          <div className="relative h-[130vh] w-full shrink-0">
            
            {/* Sticky target container representing the active viewer */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
              <motion.div
                style={{
                  y,
                  scale,
                  opacity,
                  filter,
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {!isLoaded ? (
                    <motion.div
                      key="preloader"
                      initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Preloader
                        onComplete={() => {
                          setIsLoaded(true);
                          localStorage.setItem('portfolio_preloader_played', 'true');
                        }}
                        isDark={isDark}
                        playType={playType}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hero"
                      initial={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <HeroProfile
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                        isDark={isDark}
                        toggleTheme={toggleTheme}
                        playClick={playClick}
                        playType={playType}
                        onContactClick={() => setIsContactOpen(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>

          {/* Portfolio Body Sections (Phase 4, 5, 6, 7) */}
          <div className="relative z-30 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
            <About playClick={playClick} playType={playType} />
            <StackBelt playType={playType} />
            <Works playClick={playClick} playType={playType} />
            <Events playClick={playClick} playType={playType} />
            <Contact playClick={playClick} playType={playType} />
            <Footer playClick={playClick} playType={playType} />
          </div>

        </BrowserShell>
      </div>

      {/* Global Contact Form Modal Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            playClick={playClick}
            playType={playType}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
