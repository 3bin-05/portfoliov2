import { useState, useEffect, useRef } from 'react';
import { CommitsGrid } from '@/components/ui/commits-grid';
import { Code, Compass, Zap, Users, Calendar, Heart } from 'lucide-react';

interface StatsProps {
  playClick: () => void;
  playType: () => void;
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export function CountUp({ end, duration = 2000, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress * (2 - progress); // Ease out quad
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats({ playClick, playType }: StatsProps) {
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/3bin-05')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user repositories');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.public_repos === 'number') {
          setRepoCount(data.public_repos);
        }
      })
      .catch((err) => {
        console.error('Error fetching repo count from GitHub:', err);
      });
  }, []);

  const repoText = `${repoCount ?? 81} REPOS`;

  return (
    <section id="stats" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Section Copy */}
          <div className="lg:col-span-5 text-left">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
                Metrics
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
                By the Numbers
              </h2>
            </div>

            <div className="space-y-6 font-sans text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light">
              <p>
                My campus life has been defined by a commitment to continuous learning and code craftsmanship. I track my active work, experiments, and university repositories as a way to visualize my daily engineering growth.
              </p>
              <p>
                This live grid displays commit activity, highlighting my public workspace progress. From core class assignments to complex full-stack web architectures, these contributions map my journey as a student developer.
              </p>

              {/* Dynamic stats row */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--border-color)] mt-8">
                {/* Public Repos */}
                <div onMouseEnter={playType} onClick={playClick} className="flex flex-col text-left group cursor-pointer">
                  <div className="text-[var(--color-accent)] mb-3">
                    <Code size={20} strokeWidth={1.5} />
                  </div>
                  <span className="block font-serif text-4xl text-[var(--text-primary)] font-light leading-none mb-2">
                    <CountUp end={repoCount ?? 81} />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Public Repos
                  </span>
                </div>
                
                {/* Open Source */}
                <div onMouseEnter={playType} onClick={playClick} className="flex flex-col text-left group cursor-pointer border-l border-[var(--border-color)] pl-8">
                  <div className="text-[var(--color-accent)] mb-3">
                    <Compass size={20} strokeWidth={1.5} />
                  </div>
                  <span className="block font-serif text-4xl text-[var(--text-primary)] font-light leading-none mb-2">
                    <CountUp end={100} suffix="%" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Open Source
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commits Grid & Stats Cards */}
          <div className="lg:col-span-7 w-full flex flex-col items-center gap-4">
            {/* Grid wrapped in card */}
            <div className="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 flex justify-center">
              <CommitsGrid text={repoText} />
            </div>

            {/* Stats Cards Box (3-column layout + full width wide card) */}
            <div className="flex flex-col gap-4 w-full max-w-xl mt-2">
              
              {/* Row 1: 3 vertical cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                
                {/* MuLearn Karma */}
                <div onMouseEnter={playType} onClick={playClick} className="flex flex-col text-left p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:scale-[1.01]">
                  <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Zap size={18} strokeWidth={1.5} />
                  </div>
                  <div className="font-serif text-3xl font-light text-[var(--text-primary)] mt-5 mb-1 leading-none">
                    <CountUp end={33} suffix="K+" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    MuLearn Karma
                  </span>
                </div>

                {/* Students Engaged */}
                <div onMouseEnter={playType} onClick={playClick} className="flex flex-col text-left p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:scale-[1.01]">
                  <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Users size={18} strokeWidth={1.5} />
                  </div>
                  <div className="font-serif text-3xl font-light text-[var(--text-primary)] mt-5 mb-1 leading-none">
                    <CountUp end={150} suffix="+" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Students Engaged
                  </span>
                </div>

                {/* Community Events */}
                <div onMouseEnter={playType} onClick={playClick} className="flex flex-col text-left p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:scale-[1.01]">
                  <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Calendar size={18} strokeWidth={1.5} />
                  </div>
                  <div className="font-serif text-3xl font-light text-[var(--text-primary)] mt-5 mb-1 leading-none">
                    <CountUp end={50} suffix="+" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Community Events
                  </span>
                </div>

              </div>

              {/* Row 2: Wide card */}
              <div onMouseEnter={playType} onClick={playClick} className="w-full flex items-center gap-5 p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:scale-[1.01]">
                <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--color-accent)] shrink-0">
                  <Heart size={18} strokeWidth={1.5} />
                </div>
                <span className="font-serif text-3xl font-light text-[var(--text-primary)] leading-none select-all shrink-0">
                  <CountUp end={10} suffix="+" />
                </span>
                <div className="flex flex-col text-left ml-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Volunteer Contributions
                  </span>
                  <span className="font-sans text-[10px] text-[var(--text-secondary)] font-light italic mt-0.5">
                    Huddle Global, Hackbells, etc.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
