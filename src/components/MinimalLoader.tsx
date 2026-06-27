import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

interface MinimalLoaderProps {
  onComplete: () => void;
}

export function MinimalLoader({ onComplete }: MinimalLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Standard duration of 3.5 seconds (3500ms) for high speed load under the 8-second limit
    const duration = 3500;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        // Add a tiny delay at 100% to feel deliberate and complete
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <m.div
      initial={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 w-full h-full bg-[var(--bg-primary)] z-[9999] flex flex-col items-center justify-center select-none font-mono transition-colors duration-500"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Loader Subtitle */}
        <m.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-[var(--color-accent)] font-medium transition-colors duration-500"
        >
          Initializing Portfolio
        </m.span>

        {/* Large Playfair Serif Numbers */}
        <div className="relative flex flex-col items-center">
          <span
            className="text-5xl md:text-7xl font-light text-[var(--color-accent)] tracking-tight font-serif transition-colors duration-500"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {progress.toString().padStart(3, '0')}%
          </span>
          
          {/* Accent-colored expanding timeline line */}
          <div className="w-[120px] h-[1px] bg-[var(--border-color)] mt-4 relative overflow-hidden transition-colors duration-500">
            <m.div
              className="absolute left-0 top-0 h-full bg-[var(--color-accent)] transition-colors duration-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </m.div>
  );
}
