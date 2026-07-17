import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import { BrowserShell } from './components/BrowserShell';
import { Navbar } from './components/Navbar';
import { StaggeredMenu } from './components/StaggeredMenu';
import { CustomCursor } from './components/CustomCursor';
import { ContactModal } from './components/ContactModal';
import { CopyrightModal } from './components/CopyrightModal';
import { HeroProfile } from './sections/HeroProfile';
import { MinimalLoader } from './components/MinimalLoader';

const Works = lazy(() => import('./sections/Works').then(mod => ({ default: mod.Works })));
const LearningArchive = lazy(() => import('./sections/LearningArchive').then(mod => ({ default: mod.LearningArchive })));
const About = lazy(() => import('./sections/About').then(mod => ({ default: mod.About })));
const StackBelt = lazy(() => import('./sections/StackBelt').then(mod => ({ default: mod.StackBelt })));
const Stats = lazy(() => import('./sections/Stats').then(mod => ({ default: mod.Stats })));
const Events = lazy(() => import('./sections/Events').then(mod => ({ default: mod.Events })));
const Contact = lazy(() => import('./sections/Contact').then(mod => ({ default: mod.Contact })));
const Footer = lazy(() => import('./sections/Footer').then(mod => ({ default: mod.Footer })));


function App() {
  const { toggleTheme, isDark } = useTheme();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCopyrightOpen, setIsCopyrightOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { playClick, playType } = useSound(isLoaded);
  const lenisRef = useRef<Lenis | null>(null);

  const handleMobileScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Projects', link: '#works', onClick: (e: any) => handleMobileScroll(e, '#works') },
    { label: 'About', link: '#about', onClick: (e: any) => handleMobileScroll(e, '#about') },
    { label: 'Learning', link: '#learning', onClick: (e: any) => handleMobileScroll(e, '#learning') },
    { label: 'Experience', link: '#events', onClick: (e: any) => handleMobileScroll(e, '#events') },
    { label: 'Contact', link: '#contact', onClick: (e: any) => handleMobileScroll(e, '#contact') },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/3bin-05' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/ebin-reji/' }
  ];

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

      {/* Minimal Loader Overlay */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <MinimalLoader onComplete={() => setIsLoaded(true)} />
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
          />
          
          <StaggeredMenu
            className="md:hidden"
            isFixed={true}
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="var(--text-primary)"
            openMenuButtonColor="var(--text-primary)"
            changeMenuColorOnOpen={false}
            colors={['var(--bg-elevated)', 'var(--color-accent)']}
            accentColor="var(--color-accent)"
            isDark={isDark}
            onThemeToggle={toggleTheme}
          />
          
          {/* New Hero Section */}
          <div className="relative w-full overflow-hidden">
            <HeroProfile
              isDark={isDark}
              toggleTheme={toggleTheme}
              playClick={playClick}
              playType={playType}
              onContactClick={() => setIsContactOpen(true)}
            />
          </div>

          {/* Portfolio Body Sections (Phase 4, 5, 6, 7) */}
          <div className="relative z-30 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
            <Suspense fallback={null}>
              <About playClick={playClick} playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <StackBelt playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <Stats playClick={playClick} playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <Works playClick={playClick} playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <LearningArchive playClick={playClick} playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <Events playClick={playClick} playType={playType} />
            </Suspense>
            <Suspense fallback={null}>
              <Contact playClick={playClick} playType={playType} onContactClick={() => setIsContactOpen(true)} />
            </Suspense>
            <Suspense fallback={null}>
              <Footer playClick={playClick} playType={playType} onContactClick={() => setIsContactOpen(true)} onCopyrightClick={() => setIsCopyrightOpen(true)} />
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
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Copyright & Usage Policy Modal */}
      <CopyrightModal
        isOpen={isCopyrightOpen}
        onClose={() => setIsCopyrightOpen(false)}
        playClick={playClick}
        playType={playType}
      />
    </div>
  );
}

export default App;
