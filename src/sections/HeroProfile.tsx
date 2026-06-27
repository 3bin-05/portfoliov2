import { m } from 'framer-motion';

interface HeroProfileProps {
  isMuted: boolean;
  toggleMute: () => void;
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
}: HeroProfileProps) {
  
  // Light Mode Adaptability Colors
  const heroBg = isDark ? '#0A0A0A' : '#F4F4F4';
  const vignetteGradient = isDark 
    ? 'radial-gradient(circle at center, rgba(10, 10, 10, 0) 30%, rgba(10, 10, 10, 0.85) 100%)'
    : 'radial-gradient(circle at center, rgba(244, 244, 244, 0) 30%, rgba(244, 244, 244, 0.85) 100%)';

  // Framer Motion Animation Variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const labelVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const typoVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const portraitVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div 
      className="relative w-full h-[calc(100vh-120px)] md:h-[calc(100vh-145px)] lg:h-[calc(100vh-175px)] min-h-[520px] overflow-hidden flex items-center justify-center select-none font-sans transition-colors duration-500"
      style={{ backgroundColor: heroBg }}
    >
      
      {/* 1. Subtle Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-2 transition-all duration-500" 
        style={{
          background: vignetteGradient
        }}
      />

      {/* 2. Background Layer 1: Solid Typography (z-index 1) */}
      <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none overflow-hidden px-4">
        <m.h1 
          variants={typoVariants}
          initial="initial"
          animate="animate"
          className="font-black leading-[0.85] text-[var(--color-accent)] text-[70px] sm:text-[110px] md:text-[clamp(130px,13vw,240px)] tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.08em] lg:tracking-[0.1em] text-center w-full uppercase transition-colors duration-500"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          PORTFOLIO
        </m.h1>
      </div>

      {/* 3. Middle Layer: Center Portrait (z-index 10) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none select-none">
        <m.img
          src="/ebineb.png"
          alt="Ebin Reji Portrait"
          variants={portraitVariants}
          initial="initial"
          animate="animate"
          className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[520px] h-auto object-contain"
          style={{
            filter: 'drop-shadow(0 20px 80px rgba(0,0,0,0.7))'
          }}
        />
      </div>

      {/* 4. Foreground Layer 3: Outline Typography (z-index 20) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none overflow-hidden px-4">
        <m.h1 
          variants={typoVariants}
          initial="initial"
          animate="animate"
          className="font-black leading-[0.85] text-[70px] sm:text-[110px] md:text-[clamp(130px,13vw,240px)] tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.08em] lg:tracking-[0.1em] text-center w-full uppercase transition-colors duration-500"
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif",
            WebkitTextStroke: "0.5px var(--color-accent)",
            color: "transparent",
            opacity: 0.8
          }}
        >
          PORTFOLIO
        </m.h1>
      </div>

      {/* 5. Staggered Labels Container (z-index 25) */}
      <m.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 w-full h-full pointer-events-none z-25"
      >
        {/* Top Left Label */}
        <m.div 
          variants={labelVariants}
          className="absolute top-4 md:top-6 lg:top-10 left-6 md:left-12 lg:left-20 flex flex-col items-start"
        >
          <span 
            className="text-[10px] md:text-xs lg:text-[14px] uppercase font-semibold text-[var(--color-accent)] tracking-[2px] transition-colors duration-500"
          >
            UI/UX DESIGNER AND DEV
          </span>
        </m.div>

        {/* Top Right Arrow Link */}
        <m.div 
          variants={labelVariants}
          className="absolute top-4 md:top-6 lg:top-10 right-6 md:right-12 lg:right-20 pointer-events-auto"
        >
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              playClick();
              const el = document.getElementById('works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={playType}
            className="group flex items-center justify-center p-2 cursor-pointer transition-opacity duration-300 hover:opacity-80"
            aria-label="Scroll to Projects"
          >
            <svg 
              className="w-10 h-5 md:w-14 md:h-6 text-[var(--color-accent)] transition-transform duration-300 ease-out group-hover:translate-x-2" 
              viewBox="0 0 60 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <line x1="0" y1="12" x2="54" y2="12" />
              <polyline points="46,5 54,12 46,19" />
            </svg>
          </a>
        </m.div>

        {/* Bottom Left Label */}
        <m.div 
          variants={labelVariants}
          className="absolute bottom-4 md:bottom-6 lg:bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-start"
        >
          <span 
            className="text-sm md:text-base lg:text-[18px] font-medium text-[var(--color-accent)] tracking-wide transition-colors duration-500"
          >
            EBIN REJI
          </span>
        </m.div>

        {/* Bottom Right Label */}
        <m.div 
          variants={labelVariants}
          className="absolute bottom-4 md:bottom-6 lg:bottom-10 right-6 md:right-12 lg:right-20 flex flex-col items-end"
        >
          <span 
            className="text-sm md:text-base lg:text-[18px] font-medium text-[var(--color-accent)] tracking-wide transition-colors duration-500"
          >
            ebin-reji.vercel.app
          </span>
        </m.div>
      </m.div>
    </div>
  );
}
