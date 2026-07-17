import { useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClick: () => void;
  playType: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

// Section heading — consistent monospaced label style used throughout the portfolio
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] block mb-1">
      {children}
    </span>
  );
}

// Subtle divider matching the portfolio's border token
function Divider() {
  return <div className="border-t border-[var(--border-color)] my-5" />;
}

export function CopyrightModal({ isOpen, onClose, playClick, playType }: CopyrightModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[60] p-4"
          onClick={() => { playClick(); onClose(); }}
          aria-modal="true"
          role="dialog"
          aria-label="Copyright and Usage Policy"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] relative shadow-2xl flex flex-col [will-change:transform] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Sticky Header ── */}
            <div className="flex items-start justify-between px-8 md:px-10 pt-8 pb-5 border-b border-[var(--border-color)] shrink-0">
              <div>
                <SectionLabel>Legal</SectionLabel>
                <h2 className="font-serif text-2xl font-light tracking-tight text-[var(--text-primary)] m-0 leading-snug">
                  Copyright & Usage
                </h2>
              </div>
              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={playType}
                className="p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all cursor-pointer shrink-0 ml-4"
                aria-label="Close modal"
              >
                <X size={13} />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="overflow-y-auto px-8 md:px-10 py-6 space-y-0 text-sm font-sans text-[var(--text-secondary)] leading-relaxed">

              {/* Copyright Notice */}
              <div>
                <SectionLabel>Copyright Notice</SectionLabel>
                <p className="text-[var(--text-primary)] font-mono text-xs">
                  © {CURRENT_YEAR} Ebin Reji. All rights reserved.
                </p>
                <p className="mt-2 text-xs">
                  This portfolio — including its original written content, case-study presentations, original
                  graphics, custom branding elements, and original UI/UX design work — is the original creative
                  work of Ebin Reji.
                </p>
              </div>

              <Divider />

              {/* Personal Brand */}
              <div>
                <SectionLabel>Personal Brand</SectionLabel>
                <p className="text-xs">
                  <span className="text-[var(--text-primary)] font-medium">Ebin Reji</span> is the personal name
                  and professional identity represented by this portfolio. The visual identity and original branding
                  materials of this portfolio should not be reused in a way that falsely implies endorsement,
                  affiliation, or identity with Ebin Reji.
                </p>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  "Ebin Reji" is not a registered trademark.
                </p>
              </div>

              <Divider />

              {/* Permitted Uses */}
              <div>
                <SectionLabel>Permitted Uses</SectionLabel>
                <ul className="space-y-1.5 text-xs">
                  {[
                    'View this website for personal and professional evaluation.',
                    'Share links to this website and its public pages.',
                    'Reference this portfolio for legitimate educational or professional discussion, with appropriate attribution to Ebin Reji.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)] shrink-0 mt-0.5 font-mono">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Restricted Uses */}
              <div>
                <SectionLabel>Restricted Uses (Without Permission)</SectionLabel>
                <ul className="space-y-1.5 text-xs">
                  {[
                    'Copy or republish substantial original portfolio content as your own.',
                    'Clone this website and present it as your own personal portfolio.',
                    'Remove or falsely claim ownership of copyright notices or branding.',
                    'Reuse original case studies, written content, or custom graphics for commercial purposes.',
                    'Impersonate Ebin Reji or create misleading copies of the personal brand.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[var(--text-secondary)] shrink-0 mt-0.5 font-mono">−</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Third-Party Content */}
              <div>
                <SectionLabel>Third-Party Assets & Libraries</SectionLabel>
                <p className="text-xs mb-2">
                  Third-party trademarks, logos, fonts, open-source libraries, icons, and services used in
                  this portfolio remain the property of their respective owners and are subject to their own
                  licenses. No ownership is claimed over any third-party material.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                  {[
                    ['React, Vite, Tailwind CSS', 'MIT License'],
                    ['Framer Motion', 'MIT License'],
                    ['GSAP (GreenSock)', 'GreenSock Standard License'],
                    ['Lenis, Lucide React', 'MIT / ISC License'],
                    ['Google Fonts', 'OFL / Apache 2.0'],
                    ['Vercel', 'Hosting platform'],
                  ].map(([lib, lic]) => (
                    <div key={lib} className="flex justify-between gap-2 py-0.5 border-b border-[var(--border-color)]">
                      <span className="truncate">{lib}</span>
                      <span className="text-[var(--text-secondary)] shrink-0">{lic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Source Code */}
              <div>
                <SectionLabel>Source Code</SectionLabel>
                <p className="text-xs">
                  The original source code written for this portfolio is the work of Ebin Reji. It is not
                  published under an open-source license and may not be copied or reused as the basis for
                  another personal portfolio without permission. Open-source libraries used within the project
                  retain their own respective licenses.
                </p>
              </div>

              <Divider />

              {/* Disclaimer + Contact */}
              <div className="space-y-3">
                <div>
                  <SectionLabel>Disclaimer</SectionLabel>
                  <p className="text-xs text-[var(--text-secondary)]">
                    This policy communicates the website owner's intended usage terms and is not a substitute
                    for professional legal advice. Applicable law may permit certain uses not explicitly
                    authorised here.
                  </p>
                </div>
                <div>
                  <SectionLabel>Contact</SectionLabel>
                  <a
                    href="mailto:ebin05reji@gmail.com"
                    onMouseEnter={playType}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-accent)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>ebin05reji@gmail.com</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

            </div>

            {/* ── Sticky Footer ── */}
            <div className="px-8 md:px-10 py-4 border-t border-[var(--border-color)] shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                ebinreji.online — {CURRENT_YEAR}
              </p>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
