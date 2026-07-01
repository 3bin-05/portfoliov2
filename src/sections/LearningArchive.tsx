import { m } from 'framer-motion';
import { Lock } from 'lucide-react';
import courseraLogo from '../assets/coursera.png';
import nptelLogo from '../assets/nptel.png';

interface LearningCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  rotation: string;
  tapeRotation: string;
  folds: string[];
  logoUrl?: string;
  illustration?: React.ReactNode;
  isResearch?: boolean;
  isComingSoon?: boolean;
  link?: string;
}

const learningCards: LearningCardData[] = [
  {
    id: 'nptel',
    title: 'NPTEL',
    subtitle: 'Joy of Computing with Python',
    description: 'Python programming, computational thinking, and problem-solving fundamentals.',
    status: 'Completed',
    rotation: 'hover:rotate-0 -rotate-1.5',
    tapeRotation: 'rotate-1',
    logoUrl: nptelLogo,
    folds: ['bottom-right'],
    link: '/Certificates/The Joy of Computing using Python.pdf',
  },
  {
    id: 'coursera',
    title: 'Coursera',
    subtitle: 'Professional Certifications',
    description: 'Software engineering, AI, cloud technologies, and modern development practices.',
    status: 'Completed',
    rotation: 'hover:rotate-0 rotate-1',
    tapeRotation: '-rotate-2',
    logoUrl: courseraLogo,
    folds: ['bottom-right', 'top-left'],
    link: '/Certificates/Coursera.pdf',
  },
  {
    id: 'ieee-embs',
    title: 'IEEE EMBS',
    subtitle: 'Research Project',
    description: 'Engineering in Medicine and Biology research initiative for healthcare technology.',
    status: 'In Progress',
    rotation: 'hover:rotate-0 -rotate-1',
    tapeRotation: 'rotate-3',
    isResearch: true,
    folds: ['bottom-left'],
    illustration: (
      <svg className="w-full h-full text-[var(--color-accent)] opacity-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 50 H30 L38 30 L46 70 L54 45 L60 55 L65 50 H85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="25" width="30" height="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    ),
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    subtitle: 'More Learning Ahead',
    description: 'New certifications, publications, and future achievements in development.',
    status: 'Coming Soon',
    rotation: 'hover:rotate-0 rotate-2',
    tapeRotation: '-rotate-1',
    isComingSoon: true,
    folds: ['bottom-right', 'bottom-left'],
    illustration: (
      <svg className="w-full h-full text-[var(--color-accent)] opacity-30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="35" cy="35" r="1.5" fill="currentColor" />
        <circle cx="65" cy="65" r="1.5" fill="currentColor" />
        <circle cx="35" cy="65" r="1.5" fill="currentColor" />
        <circle cx="65" cy="35" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

interface LearningArchiveProps {
  playClick: () => void;
  playType: () => void;
}

// Detailed Tape Component with gold accent themes
function Tape({ className }: { className?: string }) {
  return (
    <div 
      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-[var(--color-accent)]/15 border-y border-[var(--color-accent)]/30 backdrop-blur-[2px] shadow-[0_1px_3px_rgba(220,207,179,0.2)] pointer-events-none z-30 transition-all duration-500 group-hover:bg-[var(--color-accent)]/25 ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 0%, 100% 25%, 98% 50%, 100% 75%, 97% 100%, 3% 100%, 0% 75%, 2% 50%, 1% 25%)',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(220, 207, 179, 0.08) 0px, rgba(220, 207, 179, 0.08) 1px, transparent 1px, transparent 4px)',
      }}
    />
  );
}

// Generates dynamic card clip-path polygon based on selected folds
function getCardClipPath(folds: string[]) {
  const points = [];
  
  if (folds.includes('top-left')) {
    points.push('0 14px', '14px 0');
  } else {
    points.push('0 0');
  }
  
  if (folds.includes('top-right')) {
    points.push('calc(100% - 14px) 0', '100% 14px');
  } else {
    points.push('100% 0');
  }
  
  if (folds.includes('bottom-right')) {
    points.push('100% calc(100% - 14px)', 'calc(100% - 14px) 100%');
  } else {
    points.push('100% 100%');
  }
  
  if (folds.includes('bottom-left')) {
    points.push('14px 100%', '0 calc(100% - 14px)');
  } else {
    points.push('0 100%');
  }
  
  return `polygon(${points.join(', ')})`;
}

// Render fold overlays dynamically (using gold borders)
function RenderFolds({ folds }: { folds: string[] }) {
  return (
    <>
      {folds.map((fold) => {
        if (fold === 'bottom-right') {
          return (
            <div 
              key={fold}
              className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[var(--bg-elevated)] border-l border-t border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)] z-20 pointer-events-none transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            />
          );
        }
        if (fold === 'bottom-left') {
          return (
            <div 
              key={fold}
              className="absolute bottom-0 left-0 w-[14px] h-[14px] bg-[var(--bg-elevated)] border-r border-t border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)] z-20 pointer-events-none transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
            />
          );
        }
        if (fold === 'top-left') {
          return (
            <div 
              key={fold}
              className="absolute top-0 left-0 w-[14px] h-[14px] bg-[var(--bg-elevated)] border-r border-b border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)] z-20 pointer-events-none transition-colors duration-500"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
          );
        }
        if (fold === 'top-right') {
          return (
            <div 
              key={fold}
              className="absolute top-0 right-0 w-[14px] h-[14px] bg-[var(--bg-elevated)] border-l border-b border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)] z-20 pointer-events-none transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export function LearningArchive({ playClick, playType }: LearningArchiveProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="learning" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)] overflow-visible">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
            LEARNING ARCHIVE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
            Learning never stops.
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            A collection of certifications, ongoing research, and future milestones that document my continuous journey as a developer and researcher.
          </p>
        </div>

        {/* Tactile Card Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pt-6"
        >
          {learningCards.map((card) => {
            const currentClipPath = getCardClipPath(card.folds);

            // Research Card (Tactile Locked Sticky Note)
            if (card.isResearch) {
              return (
                <m.div
                  key={card.id}
                  variants={cardVariants}
                  className={`w-full min-h-[340px] relative select-none cursor-default group transition-all duration-500 ease-out ${card.rotation}`}
                >
                  <Tape className={card.tapeRotation} />
                  
                  {/* Clipped Card Body */}
                  <div 
                    className="w-full h-full relative rounded-none bg-[var(--bg-card)]/40 border border-[var(--border-color)] group-hover:border-[var(--color-accent)]/30 p-6 flex flex-col justify-between opacity-50 transition-colors duration-500 z-10"
                    style={{ 
                      clipPath: currentClipPath,
                      background: 'radial-gradient(circle at 50% 30%, rgba(220, 207, 179, 0.015), transparent 70%), var(--bg-card)'
                    }}
                  >
                    <RenderFolds folds={card.folds} />

                    {/* Top Header */}
                    <div className="flex items-center justify-between z-10">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)]/50">
                        SECURE NOTE
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/20 border border-red-900/30 text-red-400 font-mono text-[8px] uppercase tracking-wider">
                        <Lock size={8} />
                        <span>Closed</span>
                      </div>
                    </div>

                    {/* Clean SVG Illustration */}
                    <div className="w-24 h-24 mx-auto my-3 flex items-center justify-center relative">
                      {card.illustration}
                    </div>

                    {/* Content Info */}
                    <div className="z-10 text-center">
                      <h3 className="font-serif text-lg font-light text-[var(--text-secondary)] m-0">
                        {card.title}
                      </h3>
                      <p className="font-mono text-[9px] uppercase text-[var(--text-secondary)]/50 tracking-wider mt-0.5 mb-1.5">
                        {card.subtitle}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]/60 leading-relaxed font-sans max-w-[90%] mx-auto m-0">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Status Indicator */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-color)]/30 text-center font-mono text-[9px] text-[var(--text-secondary)]/40 uppercase tracking-widest">
                      {card.status}
                    </div>
                  </div>
                </m.div>
              );
            }

            // Coming Soon Card (Tactile Pulsing Sticky Note)
            if (card.isComingSoon) {
              return (
                <m.div
                  key={card.id}
                  variants={cardVariants}
                  className={`w-full min-h-[340px] relative cursor-pointer group transition-all duration-500 ease-out ${card.rotation}`}
                  onClick={playClick}
                  onMouseEnter={playType}
                >
                  <Tape className={card.tapeRotation} />
                  
                  {/* Clipped Card Body */}
                  <div
                    className="w-full h-full relative rounded-none bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(220,207,179,0.08),_0_15px_30px_rgba(0,0,0,0.3)] hover:border-[var(--color-accent)]/30 transition-all duration-500 z-10"
                    style={{ 
                      clipPath: currentClipPath,
                      background: 'radial-gradient(circle at 50% 30%, rgba(220, 207, 179, 0.02), transparent 70%), var(--bg-card)'
                    }}
                  >
                    <RenderFolds folds={card.folds} />

                    {/* Top Header */}
                    <div className="flex items-center justify-between z-10">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)]/50">
                        DRAFT
                      </span>
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]"></span>
                      </span>
                    </div>

                    {/* Clean SVG Illustration */}
                    <div className="w-24 h-24 mx-auto my-3 flex items-center justify-center relative">
                      {card.illustration}
                    </div>

                    {/* Content Info */}
                    <div className="z-10 text-center">
                      <h3 className="font-serif text-lg font-light text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)] transition-colors duration-300 m-0">
                        {card.title}
                      </h3>
                      <p className="font-mono text-[9px] uppercase text-[var(--text-secondary)] tracking-wider mt-0.5 mb-1.5">
                        {card.subtitle}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]/80 leading-relaxed font-sans max-w-[90%] mx-auto m-0">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Status Indicator */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-color)]/30 text-center font-mono text-[9px] text-[var(--text-secondary)]/40 uppercase tracking-widest group-hover:text-[var(--text-secondary)]/60 transition-colors">
                      {card.status}
                    </div>
                  </div>
                </m.div>
              );
            }

            // Normal Completed Card (Tactile Sticky Note)
            return (
              <m.div
                key={card.id}
                variants={cardVariants}
                className={`w-full min-h-[340px] relative cursor-pointer group transition-all duration-500 ease-out ${card.rotation}`}
                onClick={() => {
                  playClick();
                  if (card.link) {
                    window.open(card.link, '_blank', 'noopener,noreferrer');
                  }
                }}
                onMouseEnter={playType}
              >
                <Tape className={card.tapeRotation} />
                
                {/* Clipped Card Body */}
                <div 
                  className="w-full h-full relative rounded-none bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between hover:shadow-[0_0_40px_rgba(220,207,179,0.15),_0_15px_30px_rgba(0,0,0,0.4)] hover:border-[var(--color-accent)]/40 transition-all duration-500 z-10"
                  style={{ 
                    clipPath: currentClipPath,
                    background: 'radial-gradient(circle at 50% 30%, rgba(220, 207, 179, 0.03), transparent 70%), var(--bg-card)'
                  }}
                >
                  <RenderFolds folds={card.folds} />

                  {/* Top Header */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)]/50">
                      CERTIFICATE
                    </span>
                    <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      card.id === 'nptel' 
                        ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium'
                        : 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] font-normal'
                    }`}>
                      {card.status}
                    </span>
                  </div>

                  {/* Larger Logo Image */}
                  <div className="w-full h-24 mx-auto my-3 flex items-center justify-center relative">
                    {card.logoUrl ? (
                      <img 
                        src={card.logoUrl} 
                        alt={card.title} 
                        className="max-w-[85%] max-h-[85%] object-contain select-none pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-105"
                      />
                    ) : (
                      card.illustration
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="z-10 text-center">
                    <h3 className="font-serif text-lg font-light text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)] transition-colors duration-300 m-0">
                      {card.title}
                    </h3>
                    <p className="font-mono text-[9px] uppercase text-[var(--text-secondary)] tracking-wider mt-0.5 mb-1.5">
                      {card.subtitle}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]/80 leading-relaxed font-sans max-w-[90%] mx-auto m-0">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Status Indicator */}
                  <div className="mt-4 pt-3 border-t border-[var(--border-color)]/30 text-center font-mono text-[9px] text-[var(--text-secondary)]/40 uppercase tracking-widest group-hover:text-[var(--color-accent)] transition-colors">
                    VERIFY ↗
                  </div>
                </div>
              </m.div>
            );
          })}
        </m.div>

      </div>
    </section>
  );
}
