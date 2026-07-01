import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from '../components/SocialIcons';

interface FooterProps {
  playClick: () => void;
  playType: () => void;
  onContactClick?: () => void;
}

export function Footer({ playClick, playType, onContactClick }: FooterProps) {
  
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-12 pb-6 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] bg-[var(--bg-card)] relative z-10 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Logo / Subtext */}
          <div className="space-y-5">
            <div>
              <h3 
                className="font-semibold text-[54px] md:text-[64px] lg:text-[72px] leading-none text-[var(--color-accent)] tracking-[-0.03em] m-0"
                style={{ fontFamily: '"Noto Serif JP", var(--font-serif), serif' }}
              >
                エビン・レジ
              </h3>
              <div 
                className="font-mono text-[16px] uppercase mt-2.5"
                style={{ color: '#D7D7D7', letterSpacing: '0.35em' }}
              >
                EBIN REJI
              </div>
              <p className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mt-[22px] mb-0">
                Computer Science Student • UI/UX • Web Development
              </p>
            </div>
            
            {/* Socials Section */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] block">
                Socials
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/3bin-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="flex items-center justify-center p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GithubIcon size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ebin-reji/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="flex items-center justify-center p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={14} />
                </a>
                <a
                  href="https://x.com/simply_ebin05"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="flex items-center justify-center p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <XIcon size={14} />
                </a>
                <a
                  href="https://www.instagram.com/_simply._.ebin_?igsh=MWZkOTdoZnJvOG1pdw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="flex items-center justify-center p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Nav / Social Links Columns */}
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            
            {/* Navigation Column */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] block">
                Index
              </span>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-[var(--color-accent)] transition-colors">
                    Top
                  </a>
                </li>
                <li>
                  <a href="#works" onMouseEnter={playType} className="hover:text-[var(--color-accent)] transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#about" onMouseEnter={playType} className="hover:text-[var(--color-accent)] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#events" onMouseEnter={playType} className="hover:text-[var(--color-accent)] transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" onMouseEnter={playType} className="hover:text-[var(--color-accent)] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Connect Column */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] block">
                Connect
              </span>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <button
                    onClick={() => {
                      playClick();
                      onContactClick?.();
                    }}
                    onMouseEnter={playType}
                    className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-[inherit]"
                  >
                    <Mail size={14} />
                    <span>Email</span>
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/3bin-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ebin-reji/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/_simply._.ebin_?igsh=MWZkOTdoZnJvOG1pdw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
                  >
                    <InstagramIcon size={14} />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Section (Credits + Top Button) */}
        <div className="border-t border-[var(--border-color)] pt-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono tracking-tight text-center sm:text-left">
          
          {/* Main Copyright & Tech Stack Credits */}
          <div className="space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-x-2 sm:gap-y-1 text-[var(--text-secondary)]">
            <span className="flex items-center flex-wrap gap-1 justify-center sm:justify-start">
              <span>© 2026 Ebin Reji — Designed with </span>
              <span className="inline-flex items-center text-[var(--text-primary)] font-semibold gap-1">
                <svg viewBox="13 18 85 78" width="15" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M89.6992 93.695C94.3659 97.195 101.366 94.8617 94.9492 88.445C75.6992 69.7783 79.7825 18.445 55.8659 18.445C31.9492 18.445 36.0325 69.7783 16.7825 88.445C9.78251 95.445 17.3658 97.195 22.0325 93.695C40.1159 81.445 38.9492 59.8617 55.8659 59.8617C72.7825 59.8617 71.6159 81.445 89.6992 93.695Z" fill="#3186FF" />
                  <mask id="antigravity-mask" maskUnits="userSpaceOnUse" x="13" y="18" width="85" height="78" style={{ maskType: 'alpha' }}>
                    <path d="M89.6992 93.695C94.3659 97.195 101.366 94.8617 94.9492 88.445C75.6992 69.7783 79.7825 18.445 55.8659 18.445C31.9492 18.445 36.0325 69.7783 16.7825 88.445C9.78251 95.445 17.3658 97.195 22.0325 93.695C40.1159 81.445 38.9492 59.8617 55.8659 59.8617C72.7825 59.8617 71.6159 81.445 89.6992 93.695Z" fill="black" />
                  </mask>
                  <g mask="url(#antigravity-mask)">
                    <g filter="url(#ag-filter0)"><ellipse cx="22.7873" cy="26.8098" rx="22.7873" ry="26.8098" transform="matrix(-0.112784 0.99362 -0.99362 -0.112781 66.2473 -15.5344)" fill="#FFE432" /></g>
                    <g filter="url(#ag-filter1)"><ellipse cx="96.491" cy="35.1231" rx="29.5007" ry="30.1492" transform="rotate(76.9243 96.491 35.1231)" fill="#FC413D" /></g>
                    <g filter="url(#ag-filter2)"><ellipse cx="9.02988" cy="41.6647" rx="30.832" ry="39.9417" transform="rotate(74.1257 9.02988 41.6647)" fill="#00B95C" /></g>
                    <g filter="url(#ag-filter3)"><ellipse cx="9.02988" cy="41.6647" rx="30.832" ry="39.9417" transform="rotate(74.1257 9.02988 41.6647)" fill="#00B95C" /></g>
                    <g filter="url(#ag-filter4)"><ellipse cx="11.2212" cy="42.8915" rx="30.22" ry="33.2695" transform="rotate(45.6065 11.2212 42.8915)" fill="#00B95C" /></g>
                    <g filter="url(#ag-filter5)"><ellipse cx="75.7546" cy="104.822" rx="29.0177" ry="27.943" transform="rotate(76.9243 75.7546 104.822)" fill="#3186FF" /></g>
                    <g filter="url(#ag-filter6)"><ellipse cx="33.5661" cy="35.4043" rx="33.5661" ry="35.4043" transform="matrix(-0.409539 0.912293 -0.912294 -0.409537 101.25 -15.1674)" fill="#FBBC04" /></g>
                    <g filter="url(#ag-filter7)"><path d="M2.56802 149.695C-15.8116 142.48 15.5987 83.1163 23.4093 63.2203C31.22 43.3244 52.4514 33.0447 70.831 40.26C89.2107 47.4753 110.996 87.2162 103.185 107.112C95.3742 127.008 20.9477 156.91 2.56802 149.695Z" fill="#3186FF" /></g>
                    <g filter="url(#ag-filter8)"><path d="M113.934 75.8079C109.013 81.5509 96.1724 78.6224 85.253 69.2667C74.3335 59.911 69.4704 47.6711 74.391 41.928C79.3116 36.185 92.1525 39.1136 103.072 48.4692C113.991 57.8249 118.855 70.0648 113.934 75.8079Z" fill="#749BFF" /></g>
                    <g filter="url(#ag-filter9)"><ellipse cx="92.611" cy="23.7962" rx="44.2411" ry="27.5016" transform="rotate(34.0763 92.611 23.7962)" fill="#FC413D" /></g>
                    <g filter="url(#ag-filter10)"><ellipse cx="23.4949" cy="29.5887" rx="23.7071" ry="13.7869" transform="rotate(112.516 23.4949 29.5887)" fill="#FFEE48" /></g>
                  </g>
                  <defs>
                    <filter id="ag-filter0" x="2.49348" y="-26.5423" width="69.0899" height="61.2525" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="3.89034" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter1" x="28.7524" y="-32.0333" width="135.477" height="134.313" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="18.8078" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter2" x="-62.2884" y="-21.9253" width="142.637" height="127.18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="15.9884" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter3" x="-62.2884" y="-21.9253" width="142.637" height="127.18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="15.9884" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter4" x="-52.5697" y="-20.8346" width="127.582" height="127.452" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="15.9884" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter5" x="17.3619" y="45.4646" width="116.786" height="118.715" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="15.1937" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter6" x="-7.44765" y="-60.4737" width="125.303" height="122.858" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="13.7698" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter7" x="-27.7086" y="13.3597" width="157.119" height="162.029" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="12.297" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter8" x="50.4638" y="16.981" width="87.3973" height="83.7738" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="11.0036" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter9" x="34.2604" y="-28.457" width="116.701" height="104.506" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="9.29385" result="effect1_foregroundBlur" /></filter>
                    <filter id="ag-filter10" x="-15.1522" y="-15.9493" width="77.2941" height="91.076" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation="11.5027" result="effect1_foregroundBlur" /></filter>
                  </defs>
                </svg>
                Antigravity
              </span>
              <span>and Powered by</span>
              <span className="inline-flex items-center text-[var(--text-primary)] font-semibold gap-0.5">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" className="shrink-0 text-[var(--text-primary)]">
                  <path d="M24 22.525H0L12 1.475L24 22.525Z" />
                </svg>
                Vercel
              </span>
            </span>
          </div>
          {/* Scroll to Top Trigger */}
          <button
            onClick={scrollToTop}
            onMouseEnter={playType}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
}
