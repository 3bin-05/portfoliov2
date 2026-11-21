import { useRef } from 'react';
import { m, useMotionValue, useTransform, animate } from 'framer-motion';

interface ThemePullCordProps {
  isDark: boolean;
  toggleTheme: () => void;
  playClick: () => void;
  playType: () => void;
  className?: string;
}

export function ThemePullCord({
  isDark,
  toggleTheme,
  playClick,
  playType,
  className = '',
}: ThemePullCordProps) {
  const y = useMotionValue(0);
  const isDragging = useRef(false);
  const hasTriggered = useRef(false);

  // Default cord length before pull
  const defaultHeight = 135;
  const cordHeight = useTransform(y, (v) => defaultHeight + Math.max(0, v));

  const triggerToggle = () => {
    playClick();
    toggleTheme();
  };

  return (
    <div
      className={`absolute top-0 right-4 sm:right-6 md:right-8 z-40 select-none flex flex-col items-center ${className}`}
    >
      {/* 1. Stretching Cord Line */}
      <m.div
        style={{ height: cordHeight }}
        className="w-[1.5px] bg-[var(--hero-cream)]/40 transition-colors duration-300 origin-top shadow-[0_0_2px_rgba(0,0,0,0.15)] pointer-events-none"
      />

      {/* 2. Draggable Droplet Holder Handle with Physics */}
      <m.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 75 }}
        dragElastic={0.25}
        dragSnapToOrigin={true}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 18 }}
        style={{ y }}
        onMouseEnter={playType}
        onDragStart={() => {
          isDragging.current = true;
          hasTriggered.current = false;
        }}
        onDrag={(_, info) => {
          // If pulled past threshold (40px)
          if (info.offset.y > 40 && !hasTriggered.current) {
            hasTriggered.current = true;
            triggerToggle();
          }
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDragging.current = false;
            hasTriggered.current = false;
          }, 80);
        }}
        onClick={() => {
          // If clicked or tapped directly without a full drag
          if (!isDragging.current) {
            triggerToggle();
            animate(y, [0, 48, -12, 6, -2, 0], {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerToggle();
            animate(y, [0, 48, -12, 6, -2, 0], {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            });
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={isDark ? "Pull cord to activate light theme" : "Pull cord to activate dark theme"}
        title="Pull or click cord to switch theme"
        className="relative -mt-1 cursor-grab active:cursor-grabbing p-2.5 -m-2.5 group flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-cream)] rounded-full transition-transform active:scale-95"
      >
        <svg 
          width="16" 
          height="20" 
          viewBox="0 0 14 18" 
          fill="currentColor" 
          className="text-[var(--hero-cream)] transition-transform duration-200 group-hover:scale-115 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
        >
          <path d="M7 0 C7 4, 14 9, 14 13 A7 7 0 1 1 0 13 C0 9, 7 4, 7 0 Z" />
        </svg>
      </m.div>
    </div>
  );
}
