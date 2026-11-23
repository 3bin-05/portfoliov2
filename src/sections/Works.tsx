import { useState, useEffect, useCallback, useMemo } from 'react';
import { m } from 'framer-motion';
import { ExternalLink, FileText, ArrowUpRight, Trophy, Play, RefreshCw, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { fetchProjectsFromSheet, COMING_SOON_PROJECT } from '../data/projects';
import type { Project } from '../data/projects';

interface WorksProps {
  playClick: () => void;
  playType: () => void;
}

const CACHE_KEY = 'portfolio_dynamic_projects';

const SKELETON_ASPECTS = ['3/4', '4/3', '4/3', '4/3', '3/4', '4/3'];

/**
 * Distributes projects across CSS multi-columns so that portrait (3/4, 4/5)
 * and landscape (4/3) cards are staggered diagonally, with Coming Soon card pinned at the end.
 */
function balanceMasonry(items: Project[], numCols = 3): Project[] {
  const normalItems = items.filter((p) => !p.isComingSoon);
  const comingSoonItem = items.find((p) => p.isComingSoon) || COMING_SOON_PROJECT;

  if (normalItems.length === 0) {
    return [comingSoonItem];
  }

  const portraits = normalItems.filter((p) => ['3/4', '4/5', '2/3'].includes(p.aspectRatio));
  const landscapes = normalItems.filter((p) => !portraits.includes(p));

  const cols: Project[][] = Array.from({ length: numCols }, () => []);

  // Interleave items so adjacent columns don't receive identical heights
  const ordered: Project[] = [];
  const maxLen = Math.max(portraits.length, landscapes.length);
  for (let i = 0; i < maxLen; i++) {
    if (i % 2 === 0) {
      if (portraits[i]) ordered.push(portraits[i]);
      if (landscapes[i]) ordered.push(landscapes[i]);
    } else {
      if (landscapes[i]) ordered.push(landscapes[i]);
      if (portraits[i]) ordered.push(portraits[i]);
    }
  }

  for (const item of normalItems) {
    if (!ordered.includes(item)) ordered.push(item);
  }

  // Round-robin into columns
  ordered.forEach((item, idx) => {
    cols[idx % numCols].push(item);
  });

  // Always append the Coming Soon card to the last column
  cols[numCols - 1].push(comingSoonItem);

  // Flatten column-by-column so CSS columns flow them top-to-bottom per column
  return cols.flat();
}

export function Works({ playClick, playType }: WorksProps) {
  // Read cached projects for instant initial paint (0 layout shift)
  const [rawProjects, setRawProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to empty
      }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => rawProjects.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProjectsFromSheet();
      if (data && data.length > 0) {
        setRawProjects(data);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          // Ignore localStorage quota errors
        }
      } else if (rawProjects.length === 0) {
        setError('No projects found in the spreadsheet.');
      }
    } catch (err) {
      console.error('Error fetching projects from Google Sheets:', err);
      if (rawProjects.length === 0) {
        setError(err instanceof Error ? err.message : 'Unable to connect to Google Sheets.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [rawProjects.length]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Dynamically stagger the masonry column heights with Coming Soon at the end
  const projectsList = useMemo(() => {
    return balanceMasonry(rawProjects, 3);
  }, [rawProjects]);

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
      {projectsList.length > 0 ? (
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {projectsList.map((project) => {
            // Coming Soon Card
            if (project.isComingSoon) {
              return (
                <m.div
                  key={project.id}
                  variants={cardVariants}
                  className="break-inside-avoid relative overflow-hidden rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] group p-5 sm:p-6 transition-all duration-500 hover:border-[var(--color-accent)]/30 [will-change:transform]"
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
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] uppercase text-[var(--color-accent)] tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25">
                        {project.category}
                      </span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-[var(--text-primary)] mt-1">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light font-sans mt-2.5">
                      {project.description}
                    </p>
                  </div>
                </m.div>
              );
            }

            const aspect = project.aspectRatio || '4/3';

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
                {/* Project Image Container with exact native aspect ratio */}
                <div
                  className="relative overflow-hidden w-full rounded-[inherit] bg-[var(--bg-elevated)]/40"
                  style={{ aspectRatio: aspect }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const driveMatch = img.src.match(/[-\w]{25,}/);
                      if (driveMatch && !img.dataset.fallback) {
                        img.dataset.fallback = 'true';
                        img.src = `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w1200`;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-xs rounded-[inherit]"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />
                  
                  {/* Default Subtle Vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Title indicator overlay (visible before hover) */}
                  <div className="absolute bottom-4 left-5 flex items-center justify-between right-5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                    <div className="pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono text-[10px] uppercase text-zinc-300 tracking-wider">
                          {project.category}
                        </p>
                        {project.award && (
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/35 font-medium tracking-wide">
                            <Trophy size={9} />
                            <span>{project.awardLabel || project.award}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-sans font-semibold text-white text-base mt-0.5">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shrink-0">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Hover Content Panel - Glassmorphism Overlay */}
                <div
                  className="absolute inset-0 bg-[var(--bg-card)]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-20 rounded-[inherit] overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {/* Top Text Details */}
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-1.5">
                      <span className="font-mono text-[10px] uppercase text-[var(--text-secondary)] tracking-widest block">
                        {project.category}
                      </span>
                      {project.award && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[10px] font-mono font-medium">
                          <Trophy size={10} />
                          <span>{project.award}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tags and Links */}
                  <div className="space-y-3 pt-3 border-t border-[var(--border-color)] shrink-0 mt-3 sm:mt-auto">
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

                    {/* External Action Links (Coexisting Side-by-Side) */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 shrink-0">
                      {/* Case Study */}
                      {project.caseStudyUrl && (
                        <a
                          href={project.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] md:text-xs font-sans font-medium transition-all hover:opacity-90 active:scale-95 cursor-pointer shrink-0"
                        >
                          <FileText size={11} />
                          <span>View Case Study</span>
                        </a>
                      )}

                      {/* Live Website / Demo */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer shrink-0 ${
                            !project.caseStudyUrl
                              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90'
                              : 'border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                          }`}
                        >
                          <ExternalLink size={11} />
                          <span>View Website</span>
                        </a>
                      )}

                      {/* GitHub (Code) */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] text-[10px] md:text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer shrink-0"
                        >
                          <GithubIcon size={11} />
                          <span>GitHub</span>
                        </a>
                      )}

                      {/* Video Demo */}
                      {project.videoUrl && (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] text-[10px] md:text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer shrink-0"
                        >
                          <Play size={10} className="fill-current" />
                          <span>Watch Demo</span>
                        </a>
                      )}

                      {/* Hackathon / Award Link */}
                      {project.awardUrl && (
                        <a
                          href={project.awardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 text-[10px] md:text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer shrink-0"
                          title={project.award ? `View ${project.award}` : undefined}
                        >
                          <Trophy size={11} />
                          <span>{project.awardLabel || 'Award'}</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </m.div>
            );
          })}
        </m.div>
      ) : isLoading ? (
        /* Subtle Masonry Skeleton Loading Grid */
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {SKELETON_ASPECTS.map((aspectRatio, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="break-inside-avoid relative overflow-hidden rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] p-5 animate-pulse flex flex-col justify-between"
            >
              <div
                className="w-full rounded-[14px] bg-[var(--bg-elevated)]/60 mb-4"
                style={{ aspectRatio }}
              />
              <div className="space-y-3">
                <div className="h-3 w-1/4 rounded bg-[var(--bg-elevated)]" />
                <div className="h-5 w-3/4 rounded bg-[var(--bg-elevated)]" />
                <div className="h-3 w-full rounded bg-[var(--bg-elevated)]/60" />
                <div className="h-3 w-4/5 rounded bg-[var(--bg-elevated)]/60" />
              </div>
              <div className="flex gap-2 pt-4 mt-4 border-t border-[var(--border-color)]/60">
                <div className="h-4 w-12 rounded-full bg-[var(--bg-elevated)]" />
                <div className="h-4 w-16 rounded-full bg-[var(--bg-elevated)]" />
                <div className="h-4 w-14 rounded-full bg-[var(--bg-elevated)]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Minimal Error / Fallback State */
        <div className="max-w-md mx-auto my-12 p-8 rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 mx-auto flex items-center justify-center">
            <AlertCircle size={22} />
          </div>
          <h3 className="font-serif text-lg text-[var(--text-primary)]">Unable to load projects</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {error || 'Failed to sync with the project database. Please try again.'}
          </p>
          <button
            onClick={() => {
              playClick();
              loadProjects();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-sans font-medium hover:opacity-90 transition-all cursor-pointer"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
            <span>Retry</span>
          </button>
        </div>
      )}
    </section>
  );
}
