import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface NavbarProps {
  playClick: () => void;
  playType: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export function Navbar({ 
  playClick, 
  playType,
  isDark,
  toggleTheme,
  isMuted,
  toggleMute
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#works' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggle = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 w-full h-16 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/85 backdrop-blur-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 xl:px-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={playType}
          className="font-serif text-lg font-medium tracking-tight text-[var(--color-accent)] hover:opacity-85 transition-all cursor-pointer"
        >
          Ebin Reji<span className="font-sans text-xs text-neutral-500 font-bold ml-1">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              onMouseEnter={playType}
              className="text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors relative py-1 group cursor-pointer"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Socials & Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound Mute/Unmute */}
          <button
            onClick={() => {
              playClick();
              toggleMute();
            }}
            onMouseEnter={playType}
            className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-center"
            title={isMuted ? "Unmute custom sounds" : "Mute sounds"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Light/Dark Toggle */}
          <button
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            onMouseEnter={playType}
            className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-center"
            title="Toggle design mode"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <span className="w-px h-4 bg-[var(--border-color)] mx-1" />

          <a
            href="https://github.com/3bin-05"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playType}
            className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
            title="GitHub"
          >
            <GithubIcon size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/ebin-reji/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playType}
            className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
            title="LinkedIn"
          >
            <LinkedinIcon size={14} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleToggle}
          onMouseEnter={playType}
          className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--bg-elevated)] transition-all cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-16 left-0 w-full bg-[var(--bg-primary)] border-b border-[var(--border-color)] md:hidden overflow-hidden z-40 [will-change:transform]"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <m.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  onMouseEnter={playType}
                  className="font-mono text-sm tracking-widest text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors py-1 flex items-center justify-between group border-b border-[var(--border-color)]/20 pb-2 [will-change:transform]"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
                </m.a>
              ))}

              {/* Mobile Controls Section */}
              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-[var(--border-color)]/30">
                <span className="font-mono text-[10px] uppercase text-zinc-500 mr-2">Controls:</span>
                <button
                  onClick={() => {
                    playClick();
                    toggleMute();
                  }}
                  onMouseEnter={playType}
                  className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Sound"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={() => {
                    playClick();
                    toggleTheme();
                  }}
                  onMouseEnter={playType}
                  className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {/* Mobile Social Links Expanded inside menu */}
              <div className="flex items-center gap-4 pt-2">
                <span className="font-mono text-[10px] uppercase text-zinc-500 mr-2">Connect:</span>
                <a
                  href="https://github.com/3bin-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all flex items-center justify-center"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ebin-reji/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all flex items-center justify-center"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
