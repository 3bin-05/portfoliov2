import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Volume2, VolumeX, Sun, Moon, BadgeCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import ebinAvatar from '../assets/ebinreji.jpg';

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
  isMuted,
  toggleMute,
  isDark,
  toggleTheme,
  playClick,
  playType,
  onContactClick,
}: HeroProfileProps) {

  const getKeralaDateTime = () => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(now);
    
    const dateStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(now);
    
    return { timeStr, dateStr };
  };

  const initialDateTime = getKeralaDateTime();
  const [currentTime, setCurrentTime] = useState(initialDateTime.timeStr);
  const [currentDate, setCurrentDate] = useState(initialDateTime.dateStr);

  useEffect(() => {
    const timer = setInterval(() => {
      const { timeStr, dateStr } = getKeralaDateTime();
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleInteraction = () => {
    playType();
  };

  const handleButtonClick = () => {
    playClick();
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-16 relative z-10">
      
      {/* Decorative background grid and glow behind card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(140,140,140,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.02),transparent)] pointer-events-none"
      />

      {/* Repeating Stroke Text Background (Ebin Reji UI/UX & Dev) */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none flex flex-col justify-between py-6 z-0"
      >
        {Array.from({ length: 14 }).map((_, i) => {
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
              Ebin Reji UI/UX & Dev • Ebin Reji UI/UX & Dev • Ebin Reji UI/UX & Dev • Ebin Reji UI/UX & Dev • Ebin Reji UI/UX & Dev
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating Tweet Card Container */}
      <motion.div
        layoutId="tweet-card"
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 15 }}
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
        className="w-full max-w-2xl min-h-[380px] md:min-h-[350px] flex flex-col justify-between bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-6 md:p-8 relative backdrop-blur-md transition-all duration-300 select-none group -mt-20 md:-mt-40"
      >
        
        {/* Tweet Top Section (Avatar + Bio Metadata + Controls) */}
        <div className="flex items-start justify-between gap-4 mb-6">
          
          {/* User Bio Details */}
          <div className="flex items-start gap-3.5">
            {/* Profile Pic with Instagram Story-style ring */}
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/avatar cursor-pointer flex items-center justify-center w-[58px] h-[58px] md:w-[70px] md:h-[70px] shrink-0"
              onClick={handleButtonClick}
              onMouseEnter={handleInteraction}
            >
              {/* Dynamic SVG Story Ring */}
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="instaStoryGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#instaStoryGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, rotate: 0 }}
                  animate={{ pathLength: 1, rotate: 360 }}
                  transition={{ 
                    pathLength: { duration: 1.8, ease: "easeOut", delay: 0.3 },
                    rotate: { duration: 2.2, ease: "easeInOut", delay: 0.3 }
                  }}
                />
              </svg>

              {/* Avatar Image (with small padding gap) */}
              <div className="absolute inset-[3px] rounded-full bg-[var(--bg-card)] overflow-hidden border border-[var(--border-color)]">
                <img
                  src={ebinAvatar}
                  alt="Ebin Reji"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                />
              </div>

              {/* Subtle hover pulse overlay */}
              <div className="absolute inset-0 rounded-full border border-pink-500/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 scale-105 pointer-events-none" />
            </a>
            
            {/* Names & Role */}
            <div className="flex flex-col mt-1">
              <div className="flex items-center gap-1">
                <h1 className="text-lg md:text-xl font-bold tracking-tight font-sans m-0 text-[var(--text-primary)]">
                  Ebin Reji
                </h1>
                <BadgeCheck size={18} className="text-sky-500 fill-sky-500/10 dark:fill-sky-500/20" />
              </div>
              <p className="text-xs md:text-sm font-mono text-[var(--text-secondary)] tracking-tight">
                @3bin_05 • UI/UX & DEV
              </p>
            </div>
          </div>

          {/* Top Right Controls (Theme + Sound) */}
          <div className="flex items-center gap-2">
            {/* Sound Mute/Unmute */}
            <button
              onClick={() => {
                handleButtonClick();
                toggleMute();
              }}
              onMouseEnter={handleInteraction}
              className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all cursor-pointer"
              title={isMuted ? "Unmute custom sounds" : "Mute sounds"}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Light/Dark Toggle */}
            <button
              onClick={() => {
                handleButtonClick();
                toggleTheme();
              }}
              onMouseEnter={handleInteraction}
              className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all cursor-pointer"
              title="Toggle design mode"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Center Tweet Body (Bio Text) */}
        <div className="space-y-4 text-left pr-2 mb-6">
          <p 
            onMouseEnter={handleInteraction}
            className="text-base md:text-lg leading-relaxed text-[var(--text-primary)] font-light tracking-wide font-serif"
          >
            Hi, I’m <strong className="font-semibold text-[var(--text-hover)]">Ebin</strong>.
          </p>
          <p 
            onMouseEnter={handleInteraction}
            className="text-sm md:text-base leading-relaxed text-[var(--text-primary)] font-sans font-light"
          >
            I enjoy designing interfaces that feel <span className="italic font-serif text-[var(--text-hover)]">intentional</span> and <span className="italic font-serif text-[var(--text-hover)]">memorable</span>.
          </p>
          <p 
            onMouseEnter={handleInteraction}
            className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)] font-sans"
          >
            Currently exploring frontend engineering, interaction design, and digital experiences. I work with React, Python, Figma, and modern product development workflows to turn concepts into fully functional systems.
          </p>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              handleButtonClick();
              const el = document.getElementById('works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={handleInteraction}
            className="px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-sans font-medium text-xs md:text-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            View Projects
          </a>
          <button
            onClick={() => {
              handleButtonClick();
              onContactClick();
            }}
            onMouseEnter={handleInteraction}
            className="px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] font-sans font-medium text-xs md:text-sm active:scale-95 transition-all cursor-pointer"
          >
            Contact Me
          </button>
        </div>



        {/* Footer / Social Connections (X Style Bottom) */}
        <div className="border-t border-[var(--border-color)] pt-4 flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
          {/* Timestamp details */}
          <div className="flex gap-2">
            <span>{currentTime}</span>
            <span>•</span>
            <span>{currentDate}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/3bin-05"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleButtonClick}
              onMouseEnter={handleInteraction}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all"
              title="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/ebin-reji/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleButtonClick}
              onMouseEnter={handleInteraction}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:ebin05reji@gmail.com"
              onClick={handleButtonClick}
              onMouseEnter={handleInteraction}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all"
              title="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="/Resume/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleButtonClick}
              onMouseEnter={handleInteraction}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all flex items-center gap-1 border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-elevated)] px-2 py-0.5 rounded-md"
              title="View Resume"
            >
              <FileText size={13} />
              <span className="text-[10px]">CV</span>
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
