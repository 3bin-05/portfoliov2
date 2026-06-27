import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { DinoGame } from '../components/DinoGame';

interface ContactProps {
  playClick: () => void;
  playType: () => void;
}

export function Contact({ playClick, playType }: ContactProps) {
  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-12">
            {/* Editorial Title Header */}
            <div className="text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
                Get in Touch
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
                Let's Collaborate
              </h2>
              <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-md">
                Have a project in mind, want to discuss design workflows, or simply say hello? Drop a line.
              </p>
            </div>

            {/* Content Link Channels */}
            <div className="space-y-8 text-left">
              <style>
                {`
                  @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}
              </style>
              
              <div className="space-y-4">
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider block">
                  Primary Channel
                </span>
                <a
                  href="mailto:ebin05reji@gmail.com"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[var(--text-primary)] hover:text-indigo-400 transition-colors block break-all"
                >
                  ebin05reji@gmail.com
                  <span 
                    className="inline-block w-[2px] md:w-[3px] h-[0.75em] ml-1.5 bg-current align-middle" 
                    style={{ animation: 'cursor-blink 1s step-end infinite' }}
                  />
                </a>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="space-y-3.5 pt-4">
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider block">
                  Direct Actions
                </span>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:ebin05reji@gmail.com"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-mono tracking-wider uppercase font-semibold transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-md w-full sm:w-auto"
                  >
                    <Mail size={13} />
                    <span>Send Email</span>
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/ebin-reji/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] text-xs font-mono tracking-wider uppercase font-semibold transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <LinkedinIcon size={13} className="text-sky-400 group-hover:text-[var(--color-accent)] transition-colors" />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a
                    href="https://github.com/3bin-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playType}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] text-xs font-mono tracking-wider uppercase font-semibold transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <GithubIcon size={13} className="text-zinc-400 group-hover:text-[var(--color-accent)] transition-colors" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chrome Dinosaur Game */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 w-full flex flex-col justify-center">
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] block mb-1">
                Local Status Check
              </span>
              <h3 className="font-serif text-xl font-light text-[var(--text-primary)]">
                Connection Status: <span className="text-[var(--color-accent)] font-mono font-medium">offline_mode</span>
              </h3>
            </div>
            <DinoGame />
          </div>

        </div>
      </div>
    </section>
  );
}
