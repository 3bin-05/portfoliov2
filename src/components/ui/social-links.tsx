"use client";

import * as React from "react";
import { Share2, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaDribbble,
  FaXTwitter,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa6";

type Platform =
  | "linkedin"
  | "instagram"
  | "github"
  | "mail"
  | "facebook"
  | "x"
  | "dribbble"
  | "website";

export interface SocialLink {
  platform: Platform;
  href: string;
}

export interface SocialLinksProps {
  links: SocialLink[];
  showOnMobile?: boolean;
  floatingButtonColor?: string;
}

interface PlatformStyle {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PLATFORM_STYLES: Record<Platform, PlatformStyle> = {
  linkedin: {
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
  },
  github: {
    label: "GitHub",
    icon: FaGithub,
  },
  mail: {
    label: "Mail",
    icon: FaEnvelope,
  },
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
  },
  x: {
    label: "X",
    icon: FaXTwitter,
  },
  dribbble: {
    label: "Dribbble",
    icon: FaDribbble,
  },
  website: {
    label: "Website",
    icon: FaGlobe,
  },
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  showOnMobile = true,
  floatingButtonColor = "bg-[var(--bg-elevated)]",
}) => {
  const [mobileDockOpen, setMobileDockOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  // Track scroll position to show/hide the social drawer between About and Contact sections
  React.useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");
      
      if (!aboutEl || !contactEl) {
        // Fallback: show if scroll > 400px
        setIsVisible(window.scrollY > 400);
        return;
      }
      
      const aboutRect = aboutEl.getBoundingClientRect();
      const contactRect = contactEl.getBoundingClientRect();
      
      // Visible if About has entered the viewport and Contact ("Let's Collaborate") has not yet entered
      const isPastAbout = aboutRect.top <= window.innerHeight * 0.6;
      const isBeforeContact = contactRect.top >= window.innerHeight * 0.85;
      
      setIsVisible(isPastAbout && isBeforeContact);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== Desktop View (Floating on the Right Edge) ===== */}
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-[35%] right-0 z-40 flex-col items-end gap-3 ${
              showOnMobile ? "hidden lg:flex" : "hidden md:flex"
            }`}
          >
            <ul className="flex flex-col items-end gap-3">
              {links.map(({ platform, href }) => {
                const style = PLATFORM_STYLES[platform];
                if (!style) return null;
                const Icon = style.icon;

                return (
                  <li key={platform} className="group">
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between w-44 h-14 px-4 mr-[-120px]
                                 group-hover:mr-[-10px] transition-all duration-500 ease-out
                                 rounded-l-xl relative overflow-hidden border border-[var(--border-color)]
                                 bg-[var(--bg-card)]/90 backdrop-blur-md shadow-md hover:shadow-xl
                                 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
                    >
                      {/* Icon (Left side when collapsed) */}
                      <Icon
                        size={20}
                        className="relative z-10 text-[var(--text-secondary)] group-hover:text-[var(--bg-primary)]
                                   group-hover:scale-125 transition-all duration-300"
                      />

                      {/* Label (Right side, hidden when collapsed) */}
                      <span className="relative z-10 font-mono text-xs uppercase tracking-wider
                                       text-[var(--text-primary)] group-hover:text-[var(--bg-primary)]
                                       group-hover:tracking-widest transition-all duration-300 pr-2">
                        {style.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>

      {/* ===== Mobile Floating Dock (Bottom Right) ===== */}
      {showOnMobile && isVisible && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <AnimatePresence>
            {mobileDockOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setMobileDockOpen(false)}
              />
            )}
          </AnimatePresence>

          <div className="relative">
            {/* Floating Icons */}
            <div
              className={`absolute bottom-20 right-0 flex flex-col-reverse gap-3 transition-all duration-500 ${
                mobileDockOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              {links.map(({ platform, href }, index) => {
                const style = PLATFORM_STYLES[platform];
                if (!style) return null;
                const Icon = style.icon;
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative ml-auto"
                    style={{
                      transitionDelay: mobileDockOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg 
                                 bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-color)]
                                 hover:scale-110 active:scale-95 transition-all duration-300
                                 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
                    >
                      <Icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-16
                                    bg-[var(--bg-elevated)] border border-[var(--border-color)] 
                                    text-[var(--text-primary)] text-xs font-mono uppercase tracking-wider
                                    px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {style.label}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[var(--bg-elevated)] border-r border-b border-[var(--border-color)] rotate-[-135deg]" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Floating Button */}
            <button
              onClick={() => setMobileDockOpen(!mobileDockOpen)}
              className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl active:scale-95
                         transition-all duration-300 border border-[var(--border-color)] overflow-hidden ${floatingButtonColor}
                         hover:border-[var(--color-accent)] text-[var(--text-primary)] hover:text-[var(--color-accent)] no-gold-hover`}
              aria-label="Toggle social links"
            >
              <div className="relative z-10">
                {mobileDockOpen ? (
                  <X size={24} />
                ) : (
                  <Share2 size={24} />
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialLinks;
