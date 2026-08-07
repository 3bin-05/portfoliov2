import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import { BrowserShell } from './components/BrowserShell';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HeroProfile } from './sections/HeroProfile';
import { MinimalLoader } from './components/MinimalLoader';
import { SocialLinks } from './components/ui/social-links';

const StaggeredMenu = lazy(() => import('./components/StaggeredMenu').then(mod => ({ default: mod.StaggeredMenu })));
const ContactModal = lazy(() => import('./components/ContactModal').then(mod => ({ default: mod.ContactModal })));
const CopyrightModal = lazy(() => import('./components/CopyrightModal').then(mod => ({ default: mod.CopyrightModal })));

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
    { label: 'About', link: '#about', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleMobileScroll(e, '#about') },
    { label: 'Projects', link: '#works', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleMobileScroll(e, '#works') },
    { label: 'Learning', link: '#learning', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleMobileScroll(e, '#learning') },
    { label: 'Experience', link: '#events', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleMobileScroll(e, '#events') },
    { label: 'Contact', link: '#contact', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleMobileScroll(e, '#contact') },
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
    lenis.start();

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

  return (
    <div className="relative min-h-screen select-none overflow-x-clip">
      {/* High-fidelity Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Dynamic Ambient Spotlight */}
      <div className="spotlight" />

      {/* Aesthetic Custom Cursor */}
      <CustomCursor />

      {/* Social Links widget on the right */}
      <SocialLinks
        links={[
          { platform: "linkedin", href: "https://www.linkedin.com/in/ebin-reji/" },
          { platform: "github", href: "https://github.com/3bin-05" },
          { platform: "instagram", href: "https://www.instagram.com/_simply._.ebin_?igsh=MWZkOTdoZnJvOG1pdw==" },
          { platform: "mail", href: "mailto:ebin05reji@gmail.com" },
        ]}
      />

      {/* Minimal Loader Overlay */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <MinimalLoader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Mock Operating System Desktop Container */}
      <div className="w-full h-full flex flex-col">
        {/* Sticky Hero Section */}
        <div className="sticky top-0 w-full h-screen z-0 overflow-hidden">
          <HeroProfile
            isDark={isDark}
            toggleTheme={toggleTheme}
            playClick={playClick}
            playType={playType}
            onContactClick={() => setIsContactOpen(true)}
          />
        </div>

        {/* Portfolio Body and Browser Shell (scrolls over hero) */}
        <div className="relative z-10 w-full">
          <BrowserShell playClick={playClick} playType={playType}>
            <Navbar 
              playClick={playClick} 
              playType={playType} 
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
            
            <Suspense fallback={null}>
              <StaggeredMenu
                className="md:hidden"
                isFixed={true}
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={false}
                displayItemNumbering={true}
                menuButtonColor="var(--text-primary)"
                openMenuButtonColor="var(--text-primary)"
                changeMenuColorOnOpen={false}
                colors={['var(--bg-elevated)', 'var(--color-accent)']}
                accentColor="var(--color-accent)"
                isDark={isDark}
                onThemeToggle={toggleTheme}
              />
            </Suspense>

            {/* Portfolio Body Sections */}
            <div className="relative z-10 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
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
            </div>

          </BrowserShell>

          {/* Footer outside BrowserShell */}
          <Suspense fallback={null}>
            <Footer playClick={playClick} playType={playType} onContactClick={() => setIsContactOpen(true)} onCopyrightClick={() => setIsCopyrightOpen(true)} />
          </Suspense>
        </div>
      </div>

      {/* Global Contact Form Modal Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <Suspense fallback={null}>
            <ContactModal
              playClick={playClick}
              playType={playType}
              onClose={() => setIsContactOpen(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Copyright & Usage Policy Modal */}
      <Suspense fallback={null}>
        <CopyrightModal
          isOpen={isCopyrightOpen}
          onClose={() => setIsCopyrightOpen(false)}
          playClick={playClick}
          playType={playType}
        />
      </Suspense>
    </div>
  );
}

export default App;
