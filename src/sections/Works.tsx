import { m } from 'framer-motion';
import { ExternalLink, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projects } from '../data/projects';

interface WorksProps {
  playClick: () => void;
  playType: () => void;
}

export function Works({ playClick, playType }: WorksProps) {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  return (
    <section id="works" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      
      {/* Editorial Title Header */}
      <div className="max-w-7xl mx-auto mb-16 text-left">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2">
          Portfolio
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
          Selected Work
        </h2>
        <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-md">
          A curated collection of digital interfaces, application models, and system wireframes designed and built from scratch.
        </p>
      </div>

      {/* Masonry Columns Layout */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {projects.map((project) => {
          if (project.isComingSoon) {
            return (
              <m.div
                key={project.id}
                variants={cardVariants}
                className="break-inside-avoid relative overflow-hidden rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] group p-6 flex flex-col justify-between transition-all duration-500 hover:border-[var(--color-accent)]/30 min-h-[320px] [will-change:transform]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  isolation: 'isolate',
                  transform: 'translateZ(0)',
                  contain: 'paint',
                  background: 'radial-gradient(circle at 50% 30%, rgba(220, 207, 179, 0.03), transparent 70%), var(--bg-card)'
                } as React.CSSProperties}
                onMouseEnter={playType}
              >
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[9px] uppercase text-[var(--color-accent)] tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25">
                        {project.category}
                      </span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-[var(--text-primary)] mt-2">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light font-sans mt-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[var(--border-color)] mt-auto">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[9px] font-mono text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </m.div>
            );
          }

          return (
            <m.div
              key={project.id}
              variants={cardVariants}
              className="break-inside-avoid relative overflow-hidden rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] group transition-colors duration-500 hover:border-[var(--text-secondary)]/30 [will-change:transform]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                isolation: 'isolate',
                transform: 'translateZ(0)',
                contain: 'paint'
              } as React.CSSProperties}
              onMouseEnter={playType}
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden w-full rounded-[inherit] ${
                project.id === 'flipzon' ? 'aspect-[4/3]' :
                project.id === 'cryptochat' ? 'aspect-[3/4]' :
                project.id === 'kia-3d' ? 'aspect-[1.2]' :
                project.id === 'purple-movement' ? 'aspect-[2/3]' :
                project.id === 'darknetra' ? 'aspect-[3/4]' :
                project.id === 'dino-dash' ? 'aspect-[4/3]' :
                project.id === 'mileage-undo' ? 'aspect-[3/4]' :
                project.id === 'mulearn-sbc' ? 'aspect-[2/3]' :
                'aspect-[4/3]'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  width={
                    project.id === 'flipzon' ? 400 :
                    project.id === 'cryptochat' ? 300 :
                    project.id === 'kia-3d' ? 480 :
                    project.id === 'purple-movement' ? 300 :
                    project.id === 'darknetra' ? 300 :
                    project.id === 'dino-dash' ? 400 :
                    project.id === 'mileage-undo' ? 300 :
                    project.id === 'mulearn-sbc' ? 300 :
                    400
                  }
                  height={
                    project.id === 'flipzon' ? 300 :
                    project.id === 'cryptochat' ? 400 :
                    project.id === 'kia-3d' ? 400 :
                    project.id === 'purple-movement' ? 450 :
                    project.id === 'darknetra' ? 400 :
                    project.id === 'dino-dash' ? 300 :
                    project.id === 'mileage-undo' ? 400 :
                    project.id === 'mulearn-sbc' ? 450 :
                    300
                  }
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-xs rounded-[inherit]"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                />
                
                {/* Default Subtle Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                
                {/* Title indicator overlay (visible before hover) */}
                <div className="absolute bottom-4 left-5 flex items-center justify-between right-5 group-hover:opacity-0 transition-opacity duration-300">
                  <div>
                    <p className="font-mono text-[10px] uppercase text-zinc-300 tracking-wider">
                      {project.category}
                    </p>
                    <h3 className="font-sans font-semibold text-white text-base mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Hover Content Panel - Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-[var(--bg-card)]/90 backdrop-blur-md flex flex-col justify-between p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-20 rounded-[inherit]"
                   style={{
                     backfaceVisibility: 'hidden',
                     WebkitBackfaceVisibility: 'hidden'
                   }}>
                
                {/* Top Text Details */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-secondary)] tracking-widest block">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tags and Links */}
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[9px] font-mono text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Action Links */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Primary Action: Case Study or Website */}
                    {project.caseStudyUrl ? (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] md:text-xs font-sans font-medium transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                      >
                        <FileText size={11} />
                        <span>View Case Study</span>
                      </a>
                    ) : project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] md:text-xs font-sans font-medium transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                      >
                        <ExternalLink size={11} />
                        <span>View Website</span>
                      </a>
                    ) : null}

                    {/* Secondary Action: GitHub (Code) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] text-[10px] md:text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer"
                      >
                        <GithubIcon size={11} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </m.div>
          );
        })}
      </m.div>
    </section>
  );
}
