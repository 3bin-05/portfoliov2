interface StackBeltProps {
  playType: () => void;
}

export function StackBelt({ playType }: StackBeltProps) {
  const row1 = [
    'React',
    'JavaScript',
    'TypeScript',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'Framer Motion',
    'Postman',
    'REST API',
    'React',
    'JavaScript',
    'TypeScript',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'Framer Motion',
    'Postman',
    'REST API',
  ];

  const row2 = [
    'Python',
    'Python Flask',
    'C',
    'Vercel',
    'Figma',
    'Notion',
    'Antigravity',
    'Google Stitch',
    'Python',
    'Python Flask',
    'C',
    'Vercel',
    'Figma',
    'Notion',
    'Antigravity',
    'Google Stitch',
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Small Section Header */}
      <div className="max-w-7xl mx-auto mb-10 text-left">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] m-0">
          Tools & Ecosystem
        </h2>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--text-primary)] mt-1">
          Things I Build With
        </h3>
      </div>

      {/* Looping Tracks */}
      <div className="flex flex-col gap-5 w-full">
        
        {/* Row 1 - Left to Right scrolling */}
        <div className="relative flex w-full overflow-hidden py-1">
          {/* Gradient Fades on edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 shrink-0 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
            {row1.map((item, idx) => (
              <span
                key={`r1-${item}-${idx}`}
                onMouseEnter={playType}
                className="px-6 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--text-secondary)] text-xs md:text-sm font-mono text-[var(--text-primary)] transition-colors whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left scrolling */}
        <div className="relative flex w-full overflow-hidden py-1">
          {/* Gradient Fades on edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 shrink-0 animate-[marquee-reverse_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
            {row2.map((item, idx) => (
              <span
                key={`r2-${item}-${idx}`}
                onMouseEnter={playType}
                className="px-6 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--text-secondary)] text-xs md:text-sm font-mono text-[var(--text-primary)] transition-colors whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

