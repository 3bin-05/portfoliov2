import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, User, Briefcase, GraduationCap, Award, Camera, Mail } from 'lucide-react';
import { NavBar as TubelightNavBar, type NavItem } from './ui/tubelight-navbar';

interface NavbarProps {
  playClick: () => void;
  playType: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  isHero?: boolean;
  className?: string;
}

export function Navbar({ 
  playClick, 
  playType,
  isDark,
  toggleTheme,
  isHero = false,
  className = '',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#works' },
    { name: 'Learning', href: '#learning' },
    { name: 'Experience', href: '#events' },
    { name: 'Moments', href: '#moments' },
    { name: 'Contact', href: '#contact' },
  ];

  const tubelightItems: NavItem[] = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Projects', url: '#works', icon: Briefcase },
    { name: 'Learning', url: '#learning', icon: GraduationCap },
    { name: 'Experience', url: '#events', icon: Award },
    { name: 'Moments', url: '#moments', icon: Camera },
    { name: 'Contact', url: '#contact', icon: Mail },
  ];

  const activeTabName = tubelightItems.find(item => item.url.slice(1) === activeSection)?.name || 'About';

  // Active section scroll spy for the hero pill navbar
  useEffect(() => {
    if (!isHero) return;
    const sectionIds = ['about', 'works', 'learning', 'events', 'moments', 'contact'];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 280;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('about');
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHero]);

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

  // ==========================================
  // 1. HERO NAVBAR — Pill Navigation for Hero
  // ==========================================
  if (isHero) {
    return (
      <nav className={`w-full z-40 bg-transparent py-0 sm:py-0.5 transition-colors duration-300 ${className}`}>
        <div className="w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Hero Brand / Logo */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={playType}
            className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--hero-cream)] hover:opacity-90 transition-opacity cursor-pointer flex items-baseline"
          >
            <span>Ebin Reji</span>
            <span className="font-serif text-[var(--hero-cream)] text-2xl">.</span>
          </a>

          {/* Center Pill Navigation Container — Tubelight Glow Navbar */}
          <div className="hidden md:block">
            <TubelightNavBar
              items={tubelightItems}
              activeTab={activeTabName}
              onTabChange={(_name, url) => {
                const target = document.querySelector(url);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              playClick={playClick}
              playType={playType}
            />
          </div>

          {/* Right Controls in Hero (Mobile menu trigger; theme switch is handled by the pull cord) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              onMouseEnter={playType}
              className="md:hidden p-2 rounded-full border border-[var(--hero-cream-border)] text-[var(--hero-cream)] hover:bg-[var(--hero-cream)]/10 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Panel for Hero */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute top-full left-0 w-full bg-[var(--hero-bg)] border-b border-[var(--hero-cream-border)] md:hidden overflow-hidden z-50 shadow-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const sectionId = link.href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <m.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      onMouseEnter={playType}
                      className={`font-mono text-sm tracking-widest py-2 px-3 rounded-lg flex items-center justify-between border-b border-[var(--hero-cream-border)]/30 transition-colors ${
                        isActive 
                          ? 'bg-[var(--hero-cream)] text-[var(--hero-bg)] font-medium' 
                          : 'text-[var(--hero-cream-muted)] hover:text-[var(--hero-cream)]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight size={14} className="opacity-70" />
                    </m.a>
                  );
                })}

                {/* Mobile Controls Section with Theme Toggle */}
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-[var(--hero-cream-border)]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--hero-cream-muted)]">
                    Theme:
                  </span>
                  <button
                    onClick={() => {
                      playClick();
                      toggleTheme();
                    }}
                    onMouseEnter={playType}
                    className="px-3 py-1.5 rounded-full border border-[var(--hero-cream-border)] text-[var(--hero-cream)] hover:bg-[var(--hero-cream)]/10 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer no-gold-hover"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // ========================================================
  // 2. ORIGINAL NAVBAR — Preserved for all other sections
  // ========================================================
  return (
    <nav className={`hidden md:block sticky top-0 w-full h-16 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/85 backdrop-blur-md z-50 transition-all duration-300 ${className}`}>
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

        {/* Desktop Socials & Controls — Original theme button preserved */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            onMouseEnter={playType}
            className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-center no-gold-hover"
            title="Toggle design mode"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
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
                    toggleTheme();
                  }}
                  onMouseEnter={playType}
                  className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all flex items-center justify-center cursor-pointer no-gold-hover"
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
