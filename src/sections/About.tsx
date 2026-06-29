import { memo } from 'react';
import { FileText } from 'lucide-react';
import { KineticProfile } from '../components/KineticProfile';

interface AboutProps {
  playClick: () => void;
  playType: () => void;
}

function AboutComponent({ playClick, playType }: AboutProps) {
  return (
    <section id="about" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Bio Copy */}
          <div className="lg:col-span-7 text-left">
            {/* Editorial Title Header */}
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
                Identity
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
                About Me
              </h2>
              <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-md">
                Bridging the gap between technical logic and human-centered aesthetic design.
              </p>
            </div>

            {/* Story / Bio Copy */}
            <div className="space-y-6 font-sans text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light">
              <p>
                I am a <strong className="font-semibold text-[var(--text-primary)]">Computer Science student</strong> based in Kerala, India, focusing on building interactive frontends, clean digital products, and robust logic flows. My journey thrives at the intersection of UI/UX design principles and software engineering.
              </p>
              <p>
                I believe software shouldn't just be functional; it should feel <span className="italic font-serif text-[var(--text-primary)]">alive</span>. By combining modern front-end frameworks like React and Next.js with fine-tuned design systems, subtle micro-interactions, and detailed typographic hierarchies, I build interfaces that leave a lasting impression.
              </p>
              <p>
                When I'm not writing code, I spend my time organizing student workshops, hosting community design marathons, and collaborating with developers to build meaningful products from scratch.
              </p>

              <div className="pt-4">
                <a
                  href="/Resume/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playType}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 font-sans font-medium text-xs md:text-sm active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <FileText size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                  <span>View Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Kinetic Typography Profile */}
          <div className="lg:col-span-5 w-full flex justify-center items-center pt-8 lg:pt-0 lg:translate-y-6">
            <KineticProfile playClick={playClick} playType={playType} />
          </div>

        </div>
      </div>
    </section>
  );
}

export const About = memo(AboutComponent);
