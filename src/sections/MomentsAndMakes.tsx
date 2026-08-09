import { Suspense, lazy } from 'react';

const StickyScroll = lazy(() => import('../components/ui/sticky-scroll'));

interface MomentsAndMakesProps {
  playClick: () => void;
  playType: () => void;
}

export function MomentsAndMakes({ playClick, playType }: MomentsAndMakesProps) {
  // Satisfy ESLint unused-vars rules
  void playClick;
  void playType;
  return (
    <section
      id="moments"
      className="w-full border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]"
    >
      {/* Editorial Title Header for the Section */}
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-6 md:px-12 xl:px-16 text-left">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
          Visual Archive
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
          Moments & Makes
        </h2>
        <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-md">
          A scrollable diary of captured lens frames, event snippets, and community assemblies.
        </p>
      </div>

      <Suspense fallback={
        <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
          <span className="font-mono text-xs text-[var(--text-secondary)] animate-pulse">Loading gallery...</span>
        </div>
      }>
        <StickyScroll />
      </Suspense>
    </section>
  );
}
