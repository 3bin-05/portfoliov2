import React from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Download } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ThemePullCord } from '../components/ThemePullCord';

interface HeroProfileProps {
  isDark: boolean;
  toggleTheme: () => void;
  playClick: () => void;
  playType: () => void;
  onContactClick: () => void;
}

export function HeroProfile({
  playClick,
  playType,
  isDark,
  toggleTheme,
}: HeroProfileProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Progressive transparency on scroll: becomes a bit more transparent initially, and completely invisible after ~3 full scrolls
  const parallaxY = useTransform(scrollY, [0, 1500], [0, shouldReduceMotion ? 0 : 160]);
  const heroOpacity = useTransform(scrollY, [0, 450, 950, 1500], [1, 0.6, 0.2, 0]);
  const heroPointerEvents = useTransform(scrollY, (v) => v >= 1400 ? 'none' : 'auto');
  const heroVisibility = useTransform(scrollY, (v) => v >= 1500 ? 'hidden' : 'visible');

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Coordinated entrance animation variants (Phase 1 to Phase 7)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  };

  const navFade = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const badgeFade = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const introFade = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const headlineReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25, scale: shouldReduceMotion ? 1 : 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const portraitReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const, delay: shouldReduceMotion ? 0 : 0.25 }
    }
  };

  const contentFade = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const scrollIndicatorFade = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: shouldReduceMotion ? 0 : 0.35 }
    }
  };

  return (
    <section 
      id="hero"
      aria-label="Hero Introduction"
      className="relative w-full h-screen min-h-[660px] max-h-[1150px] bg-[var(--hero-bg)] text-[var(--hero-cream)] flex flex-col justify-between overflow-hidden select-none transition-colors duration-300"
    >
      {/* ===== SEO: Semantic heading for search crawlers & AI ===== */}
      <h1
        className="sr-only"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">Ebin Reji</span>{' '}
        — <span itemProp="jobTitle">Software Developer &amp; UI/UX Designer</span>{' '}
        based in <span itemProp="addressLocality">Kerala, India</span>.{' '}
        Computer Science student building modern digital experiences with React, TypeScript, and clean code.
      </h1>

      {/* Main Parallax Animated Wrapper (progressive fade, hidden after 3 full scrolls) */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: parallaxY,
          opacity: heroOpacity,
          pointerEvents: heroPointerEvents,
          visibility: heroVisibility,
          transform: 'translateZ(0)',
        }}
        className="relative w-full h-full flex flex-col justify-between flex-1"
      >
        {/* 1. Interactive Theme Pull-Cord Lamp Switch with Realistic Physics */}
        <ThemePullCord
          isDark={isDark}
          toggleTheme={toggleTheme}
          playClick={playClick}
          playType={playType}
        />
        {/* Phase 1: Navbar (Full width, cinematic margins, positioned upward) */}
        <m.header variants={navFade} className="w-full pt-1.5 sm:pt-2 md:pt-3 z-40 relative">
          <Navbar
            playClick={playClick}
            playType={playType}
            isDark={isDark}
            toggleTheme={toggleTheme}
            isHero={true}
          />
        </m.header>

        {/* Hero Middle Content Area — Full Viewport Width */}
        <div className="relative flex-1 w-full px-4 sm:px-6 md:px-8 flex flex-col justify-center my-auto z-20">
          
          {/* Top Intro Section (Badge + "Hello, I'm — UI/UX DESIGNER AND DEV") */}
          <div className="relative z-30 mb-2 sm:mb-4">
            
            {/* Phase 2: Availability Badge */}
            <m.div 
              variants={badgeFade} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--hero-cream-border)] bg-[var(--hero-cream-badge-bg)] backdrop-blur-xs mb-3 sm:mb-5 transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--hero-cream)] transition-colors duration-300" />
              <span className="text-[11px] sm:text-xs font-sans tracking-wide text-[var(--hero-cream)] transition-colors duration-300">
                Open to opportunities
              </span>
              <span className="text-[var(--hero-cream-muted)] text-xs mx-1">|</span>
              <span className="text-[11px] sm:text-xs font-sans tracking-wide text-[var(--hero-cream-muted)] transition-colors duration-300">
                UI/UX • Frontend • Product
              </span>
            </m.div>

            {/* Phase 3: Introduction Heading */}
            <m.div variants={introFade} className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl text-[var(--hero-cream)] tracking-tight transition-colors duration-300">
                Hello, I'm
              </span>
              <span className="inline-block w-8 sm:w-12 h-px bg-[var(--hero-cream-border)] align-middle transition-colors duration-300" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[var(--hero-cream-muted)] align-middle transition-colors duration-300">
                UI/UX DESIGNER AND DEV
              </span>
            </m.div>

          </div>

          {/* Phase 4: Main Oversized Headline (EBIN REJI) — Stretches from Left to Right Border */}
          <m.div 
            variants={headlineReveal} 
            className="relative z-10 w-full select-none pointer-events-none my-1 sm:my-2 lg:my-3"
          >
            <h2 className="w-full flex items-center justify-between font-sans font-black uppercase leading-[0.82] text-[clamp(4.2rem,19.8vw,30rem)] text-[var(--hero-headline)] transition-colors duration-300 select-none whitespace-nowrap">
              <span className="tracking-[-0.01em]">EBIN</span>
              <span className="tracking-[-0.01em]">REJI</span>
            </h2>
          </m.div>

          {/* Phase 6: Description & Call-to-Action Group + Scroll Down Indicator */}
          <m.div 
            variants={contentFade} 
            className="relative z-30 flex flex-col justify-between gap-4 sm:gap-6 pt-2 sm:pt-4 lg:pt-6"
          >
            <p className="font-sans text-xs sm:text-sm md:text-base text-[var(--hero-cream-muted)] leading-relaxed font-light transition-colors duration-300 max-w-[360px] sm:max-w-[440px] md:max-w-[480px]">
              I create digital experiences that blend thoughtful design, clean code, and real-world impact.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5 pt-1">
              {/* Primary Button: View Projects */}
              <a
                href="#works"
                onClick={(e) => handleScroll(e, '#works')}
                onMouseEnter={playType}
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--hero-btn-primary-bg)] text-[var(--hero-btn-primary-text)] font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer shrink-0"
              >
                <span>View Projects</span>
                <ArrowUpRight size={15} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary Button: Download Resume */}
              <a
                href="/Resume/Resume.pdf"
                download="Ebin_Reji_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playType}
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-[var(--hero-btn-secondary-border)] bg-transparent text-[var(--hero-btn-secondary-text)] font-sans text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[var(--hero-cream)]/10 hover:border-[var(--hero-cream)] active:scale-[0.98] cursor-pointer shrink-0"
              >
                <span>Download Resume</span>
                <Download size={15} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
              </a>
            </div>
          </m.div>

        </div>

        {/* Phase 5: Portrait of Ebin Reji */}
        {/* Shifted more to the left to hide the gap between EBIN and REJI */}
        <m.div
          variants={portraitReveal}
          className="absolute right-[8vw] sm:right-[14vw] md:right-[20vw] lg:right-[24vw] xl:right-[26vw] bottom-[46px] sm:bottom-[50px] md:bottom-[52px] z-15 sm:z-20 pointer-events-none flex items-end justify-end select-none opacity-45 sm:opacity-85 md:opacity-100 transition-opacity duration-500"
        >
          <picture>
            <source srcSet="/ebinreji.avif" type="image/avif" />
            <img
              src="/ebinreji.webp"
              alt="Ebin Reji — Software Developer & UI/UX Designer"
              width={1263}
              height={1246}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-[52vh] sm:h-[60vh] md:h-[68vh] lg:h-[75vh] xl:h-[79vh] max-h-[760px] w-auto object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] light:drop-shadow-none"
            />
          </picture>
        </m.div>

        {/* Phase 7: Animated Circular Scroll Indicator — Positioned on the Right Side */}
        <m.button
          variants={scrollIndicatorFade}
          onClick={(e) => handleScroll(e, '#about')}
          onMouseEnter={playType}
          className="absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 bottom-[70px] sm:bottom-[76px] md:bottom-[84px] lg:bottom-[90px] z-30 group flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          aria-label="Scroll down to About section"
        >
          {/* Rotating Circular Text (Continuous 360 deg) */}
          <svg
            viewBox="0 0 120 120"
            className="w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] md:w-[94px] md:h-[94px] animate-[spin_14s_linear_infinite] motion-reduce:animate-none origin-center pointer-events-none"
          >
            <defs>
              <path
                id="scrollTextCircle"
                d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
              />
            </defs>
            <text 
              className="text-[9.5px] font-mono uppercase tracking-[0.24em] fill-[var(--hero-cream)] transition-colors duration-300"
            >
              <textPath href="#scrollTextCircle" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>

          {/* Stationary Downward Center Arrow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ArrowDown 
              size={18} 
              className="text-[var(--hero-cream)] transition-transform duration-300 ease-out group-hover:translate-y-1" 
            />
          </div>
        </m.button>

        {/* Bottom Hero Divider and Footer Labels — Full Viewport Width */}
        <div className="w-full px-4 sm:px-6 md:px-8 z-30 relative shrink-0">
          <div className="w-full h-px bg-[var(--hero-divider)] transition-colors duration-300" />
          <div className="flex items-center justify-between py-3.5 sm:py-4 text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-[var(--hero-cream-muted)] transition-colors duration-300">
            {/* Bottom Left Label */}
            <div className="flex items-center gap-2.5">
              <span className="w-px h-3.5 bg-[var(--hero-cream-muted)] transition-colors duration-300" />
              <span>SCROLL TO EXPLORE</span>
            </div>

            {/* Bottom Right Label */}
            <div className="tracking-[0.25em]">
              <span>DESIGN • DEVELOP • CREATE</span>
            </div>
          </div>
        </div>

      </m.div>
    </section>
  );
}
