import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Image, Film, BarChart2, Smile, Calendar, MapPin } from 'lucide-react';
import ebinAvatar from '../assets/ebinreji.jpg';

interface PreloaderProps {
  onComplete: () => void;
  isDark: boolean;
  playType?: (isKeystroke?: boolean) => void;
}

export function Preloader({ onComplete, isDark, playType }: PreloaderProps) {
  const words = ["Designer.", "Developer.", "Creator.", "Building experiences."];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  // 1. Preload key assets while the preloader runs
  useEffect(() => {
    const imagesToPreload = [ebinAvatar];
    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // 2. Typing animation state machine
  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // Erase character
      if (currentText === "") {
        // Finished erasing a word
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 100); // pause before typing the next word
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
          if (playType) playType(true);
        }, 20); // standard backspacing speed
      }
    } else {
      // Type character
      if (currentText === currentWord) {
        // Finished typing the current word
        if (wordIndex === words.length - 1) {
          // Last word is done typing
          setIsDoneTyping(true);
          return;
        } else {
          // Pause and then start deleting
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 300); // pause showing the typed word (easy to read)
        }
      } else {
        timer = setTimeout(() => {
          setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
          if (playType) playType(true);
        }, 40); // natural deliberate typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, playType]);

  // Constant 5.0s duration to guarantee a premium visual load
  const progressDuration = 5.0;

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-16 relative z-10">
      
      {/* Decorative background grid/glow to match HeroProfile */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(140,140,140,0.04),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.015),transparent)] pointer-events-none" />

      {/* Repeating Stroke Text Background (Loading Portfolio) */}
      <div className="absolute -inset-y-32 inset-x-0 overflow-hidden select-none pointer-events-none flex flex-col justify-around z-0">
        {Array.from({ length: 24 }).map((_, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          return (
            <motion.div 
              key={i} 
              initial={{ x: direction === 1 ? '-15%' : '0%' }}
              animate={{ x: direction === 1 ? '0%' : '-15%' }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 28 + i * 2,
                ease: 'linear'
              }}
              className="whitespace-nowrap text-[8vw] md:text-[5vw] font-black font-sans uppercase tracking-widest leading-none opacity-15 dark:opacity-[0.08]"
              style={{
                WebkitTextStroke: `1px ${isDark ? '#ffffff' : '#4a5568'}`,
                color: 'transparent',
              }}
            >
              Loading Portfolio • Loading Portfolio • Loading Portfolio • Loading Portfolio • Loading Portfolio
            </motion.div>
          );
        })}
      </div>

      {/* Floating Tweet Composer Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl min-h-[380px] md:min-h-[350px] flex flex-col justify-between bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-6 md:p-8 relative backdrop-blur-md select-none -mt-20 md:-mt-40 overflow-hidden"
      >
        <div>
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-3.5">
              
              {/* Profile Avatar Frame */}
              <div className="relative w-[58px] h-[58px] md:w-[70px] md:h-[70px] rounded-full overflow-hidden border border-[var(--border-color)] shrink-0 bg-[var(--bg-elevated)]">
                <img
                  src={ebinAvatar}
                  alt="Ebin Reji"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Identity Details */}
              <div className="flex flex-col mt-1">
                <div className="flex items-center gap-1">
                  <h1 className="text-lg md:text-xl font-bold tracking-tight font-sans m-0 text-[var(--text-primary)]">
                    Ebin Reji
                  </h1>
                  <BadgeCheck size={18} className="text-sky-500 fill-sky-500/10 dark:fill-sky-500/20" />
                </div>
                <p className="text-xs md:text-sm font-mono text-[var(--text-secondary)] tracking-tight">
                  @3bin_05 • Drafting Portfolio
                </p>
              </div>

            </div>

            {/* Composer Title Pill */}
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-color)] px-2.5 py-1 rounded-full">
              Draft
            </span>
          </div>

          {/* Typing Area */}
          <div className="space-y-4 text-left pr-2 mb-6">
            <div className="text-base md:text-lg leading-relaxed text-[var(--text-primary)] font-mono min-h-[50px] flex items-center">
              <span>{currentText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-1.5 h-5 ml-1 bg-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Action Panel & Bottom loading */}
        <div>
          {/* Simulated Composer Action Icons */}
          <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-5 pb-2">
            <div className="flex items-center gap-3.5 text-sky-500 opacity-60">
              <Image size={17} className="cursor-not-allowed" />
              <Film size={17} className="cursor-not-allowed" />
              <BarChart2 size={17} className="cursor-not-allowed" />
              <Smile size={17} className="cursor-not-allowed" />
              <Calendar size={17} className="cursor-not-allowed" />
              <MapPin size={17} className="cursor-not-allowed" />
            </div>

            {/* Simulated Post/Publish Button */}
            <motion.button
              disabled
              animate={{
                opacity: isDoneTyping ? 1 : 0.4,
                scale: isDoneTyping ? [1, 1.03, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              className="px-5 py-2 rounded-full bg-sky-500 text-white font-sans font-medium text-xs md:text-sm cursor-not-allowed shadow-md"
            >
              Post
            </motion.button>
          </div>

          {/* Premium Loading Progress Bar (Absolute Bottom Inside Card) */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--border-color)] overflow-hidden rounded-b-[22px]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: progressDuration, ease: "easeInOut" }}
              onAnimationComplete={onComplete}
              className="h-full bg-sky-500 rounded-r-full"
              style={{
                boxShadow: isDark ? '0 0 8px #0ea5e9' : 'none'
              }}
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
