import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Lanyard } from '../components/Lanyard';

interface ExperienceDetail {
  id: string;
  tabLabel: string;
  hasArrow?: boolean;
  role: string;
  organization: string;
  duration: string;
  badgeFront: string;
  badgeBack?: string;
  strapImageOffwhite?: string;
  strapImageDark?: string;
  metrics: {
    label: string;
  }[];
  bullets: string[];
}

const experiencesList: ExperienceDetail[] = [
  {
    id: 'ieee',
    tabLabel: 'IEEE SB SBCE',
    role: 'Development Coordinator',
    organization: 'IEEE SB SBCE',
    duration: 'JUN 2025 - PRESENT · 1 YR 5 MOS',
    badgeFront: '/Id/ieee_id_card.webp',
    strapImageOffwhite: '/badges/lanyard-ieee-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-ieee-dark.webp?v=10',
    metrics: [
      { label: 'Program Coordination' },
      { label: 'Operations' },
      { label: 'Leadership' }
    ],
    bullets: [
      'Direct membership lifecycle operations and cross-functional event committees across the student branch.',
      'Coordinate multi-tier technical programs, developer workshops, and department initiatives.',
      'Collaborated on the IEEE Program Coordination Team, driving campus tech engagement.'
    ]
  },
  {
    id: 'mulearn-sbc',
    tabLabel: 'MULEARN SBC',
    role: 'Technical Associate',
    organization: 'MuLearn SBC',
    duration: 'AUG 2025 - PRESENT · 1 YR 3 MOS',
    badgeFront: '/Id/tcha.webp',
    badgeBack: '/Id/tchb.webp',
    strapImageOffwhite: '/badges/lanyard-mulearn-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-mulearn-dark.webp?v=10',
    metrics: [
      { label: 'Figma' },
      { label: 'UI/UX Design' },
      { label: 'Technical Pipelines' }
    ],
    bullets: [
      'Lead technical development pipelines and mentor peers campus-wide across Sree Buddha College of Engineering.',
      'Organized multiple UI/UX and front-end prototyping bootcamps in Figma, lifting technical literacy and engagement.',
      'Served as UI/UX IG Lead SBC, crafting intuitive digital experiences and leading user-centered design initiatives.'
    ]
  },
  {
    id: 'mulearn-foundation',
    tabLabel: 'MULEARN FOUNDATION',
    role: 'UI/UX Core Team Member',
    organization: 'MuLearn Foundation',
    duration: 'JUN 2023 - PRESENT · 3 YRS 5 MOS',
    badgeFront: '/Id/mulearn_foundation_card.webp',
    strapImageOffwhite: '/badges/lanyard-mulearn-foundation-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-mulearn-foundation-dark.webp?v=10',
    metrics: [
      { label: 'Figma' },
      { label: 'UX Design (UED)' },
      { label: 'Core Team' }
    ],
    bullets: [
      'Part of the UI/UX Core Team, designing intuitive digital platforms, prototypes, and scalable design systems.',
      'Conduct UX reviews and facilitate design workshops across statewide community chapters.',
      'Active community contributor since June 2023, fostering peer learning and creative problem-solving.'
    ]
  },
  {
    id: 'purple',
    tabLabel: 'THE PURPLE MOVEMENT',
    role: 'UI/UX Developer',
    organization: 'The Purple Movement',
    duration: 'AUG 2025 - PRESENT · 1 YR 3 MOS',
    badgeFront: '/Id/purple_card.webp',
    strapImageOffwhite: '/badges/lanyard-purple-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-purple-dark.webp?v=10',
    metrics: [
      { label: 'Figma' },
      { label: 'UI Design' },
      { label: 'Front-End' }
    ],
    bullets: [
      'Designing intuitive user interfaces, design assets, and digital touchpoints for community-driven initiatives.',
      'Bridging UI/UX design with front-end prototyping to build engaging digital products.',
      'Collaborating with creative teams in Thiruvananthapuram to elevate brand identity and digital outreach.'
    ]
  },
  {
    id: 'ieee-embs',
    tabLabel: 'IEEE EMBS PUNE',
    role: 'Research Intern',
    organization: 'IEEE EMBS Pune Chapter',
    duration: 'MAY 2026 - JUL 2026 · 3 MOS',
    badgeFront: '/Id/ieee_embs_card.webp',
    strapImageOffwhite: '/badges/lanyard-ieee-embs-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-ieee-embs-dark.webp?v=10',
    metrics: [
      { label: 'Predictive Analytics' },
      { label: 'Front-End Design' },
      { label: 'Vibe Coding' }
    ],
    bullets: [
      'Researched and built data-driven predictive models for the "Smart Pharmacy" healthcare project.',
      'Forecasted medicine demand patterns to prevent stock-outs of life-saving drugs through inventory solutions.',
      'Designed and developed front-end analytics dashboards to visualize real-time predictive insights.'
    ]
  },
  {
    id: 'tinkerhub',
    tabLabel: 'TINKERHUB SBCE',
    role: 'Tech Team Member',
    organization: 'TinkerHub SBCE',
    duration: 'SEP 2025 - JAN 2026 · 5 MOS',
    badgeFront: '/Id/tinkerhub_card.webp',
    strapImageOffwhite: '/badges/lanyard-tinkerhub-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-tinkerhub-dark.webp?v=10',
    metrics: [
      { label: 'Figma' },
      { label: 'UI Design' },
      { label: 'Community' }
    ],
    bullets: [
      'Core member of the TinkerHub SBCE Tech Team driving open maker culture and student developer initiatives.',
      'Crafted UI designs and interactive mockups in Figma for campus workshops and coding sprints.',
      'Mentored peers at Sree Buddha College of Engineering Pattoor on modern web tooling and UI design.'
    ]
  },
  {
    id: 'ksum',
    tabLabel: 'KSUM X IEDC',
    role: 'Volunteer',
    organization: 'Huddle Global 2025',
    duration: 'DEC 2025',
    badgeFront: '/Id/ksum_card.webp',
    strapImageOffwhite: '/badges/lanyard-ksum-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-ksum-dark.webp?v=10',
    metrics: [
      { label: 'Networking' },
      { label: 'Managing' },
      { label: 'Leadership' }
    ],
    bullets: [
      'Volunteered at Huddle Global 2025, assisting with event coordination and execution.',
      'Networked with startup founders, entrepreneurs, and technology leaders across Kerala.',
      'Gained insights into innovation, entrepreneurship, and community building through active participation.'
    ]
  },
  {
    id: 'sbce',
    tabLabel: 'SBCE',
    role: 'Volunteer',
    organization: 'HACKBELLS 3.0 Hackathon',
    duration: 'FEB 2026',
    badgeFront: '/Id/hackbells_card.webp',
    strapImageOffwhite: '/badges/lanyard-hackbells-offwhite.webp?v=10',
    strapImageDark: '/badges/lanyard-hackbells-dark.webp?v=10',
    metrics: [
      { label: 'Event Coordination' },
      { label: 'Leadership' },
      { label: 'Team Work' }
    ],
    bullets: [
      'Volunteered to coordinate the 24-hour regional student hackathon at Sree Buddha College of Engineering.',
      'Connected with developers, designers, and tech enthusiasts, building valuable professional relationships.',
      'Gained practical exposure to event management, technical support, and community engagement.'
    ]
  }
];

interface EventsProps {
  playClick: () => void;
  playType: () => void;
  isDark?: boolean;
}

export function Events({ playClick, playType, isDark }: EventsProps) {
  // Default to IEEE SB SBCE to immediately match the reference screenshot perfectly
  const [selectedId, setSelectedId] = useState<string>('ieee');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof isDark === 'boolean') return isDark;
    return typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light')
      : true;
  });

  useEffect(() => {
    if (typeof isDark === 'boolean') {
      setIsDarkMode(isDark);
      return;
    }
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      setSelectedId((prevId) => {
        const currentIndex = experiencesList.findIndex((exp) => exp.id === prevId);
        const nextIndex = (currentIndex + 1) % experiencesList.length;
        return experiencesList[nextIndex].id;
      });
    }, 45000); // 45 seconds subtle cycle

    return () => clearInterval(interval);
  }, []);

  const selectedExp = experiencesList.find((e) => e.id === selectedId) || experiencesList[1];

  return (
    <section 
      id="events" 
      className="w-full relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] overflow-visible z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 pt-16 pb-12 relative overflow-visible">
        
        {/* Main Grid: Left Area for Header & Details, Right Area for Hanging Lanyard Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Area (Cols 1-7 or 8): Editorial Heading + Sidebar + Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col z-10">
            
            {/* Header */}
            <div className="mb-14 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-3 font-semibold">
                OFFLINE LOG
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0 leading-[1.08]">
                Beyond the IDE
              </h2>
              <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] mt-4 max-w-lg leading-relaxed font-light">
                Workshops organized, student communities enabled, and networking experiences in regional tech hubs.
              </p>
            </div>

            {/* Inner Sub-grid: Communities Sidebar (col-span-4) + Experience Details (col-span-8) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
              
              {/* Vertical Community Sidebar on Left */}
              <div className="sm:col-span-4 flex sm:flex-col overflow-x-auto sm:overflow-x-visible border-b sm:border-b-0 sm:border-l border-[var(--border-color)] scrollbar-none pb-2 sm:pb-0 relative">
                {experiencesList.map((exp) => {
                  const active = exp.id === selectedId;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => {
                        setSelectedId(exp.id);
                        playClick();
                      }}
                      onMouseEnter={playType}
                      className={`relative px-4 sm:px-5 py-3.5 text-left text-xs font-mono tracking-wider uppercase transition-all duration-300 outline-none cursor-pointer whitespace-nowrap select-none flex items-center justify-between group ${
                        active
                          ? 'text-[var(--color-accent)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/20'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <m.div
                          layoutId="communityActiveTab"
                          className="absolute left-0 right-0 bottom-0 sm:bottom-auto sm:top-0 sm:w-[2.5px] sm:h-full h-[2.5px] w-full bg-[var(--color-accent)]"
                          style={{ boxShadow: '0 0 12px var(--color-accent)' }}
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="flex items-center gap-1.5">
                        {exp.tabLabel}
                        {exp.hasArrow && (
                          <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            ↗
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Experience Details */}
              <div className="sm:col-span-8 pl-0 sm:pl-2 min-h-[280px]">
                <AnimatePresence mode="wait">
                  <m.div
                    key={selectedId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="text-left"
                  >
                    {/* Role / Position */}
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] m-0 leading-tight">
                      {selectedExp.role}
                    </h3>
                    
                    {/* Organization with @ prefix below position */}
                    <div className="text-base sm:text-lg text-[var(--color-accent)] font-semibold mt-1.5 flex items-center gap-1.5 font-sans">
                      <span>@</span>
                      <span>{selectedExp.organization}</span>
                    </div>
                    
                    {/* Duration */}
                    <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider block mt-2 mb-6 font-medium">
                      {selectedExp.duration}
                    </span>

                    {/* Skill/Metric Tags */}
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {selectedExp.metrics.map((metric, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center px-4 py-1.5 rounded-full bg-[var(--bg-elevated)]/60 border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] select-none hover:border-[var(--text-primary)]/20 transition-colors"
                        >
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Description Bullets with gold hashtag marker */}
                    <ul className="space-y-4 p-0 m-0 list-none">
                      {selectedExp.bullets.map((bullet, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light font-sans"
                        >
                          <span className="text-[var(--color-accent)] font-mono font-bold text-sm sm:text-base shrink-0 select-none mt-[2px] leading-none">
                            #
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Right Area (Cols 8-12): Single Hanging Realistic ID Card on Fabric Lanyard */}
          <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center relative w-full">
            <div className="w-full h-[580px] sm:h-[640px] lg:h-[700px] xl:h-[720px] -mt-16 relative flex items-center justify-center select-none overflow-visible pointer-events-auto">
              <Lanyard
                frontImage={selectedExp.badgeFront}
                backImage={selectedExp.badgeBack || '/badges/badge-back.webp'}
                strapImage={
                  isDarkMode
                    ? (selectedExp.strapImageOffwhite || '/badges/lanyard-strap-offwhite.webp?v=7')
                    : (selectedExp.strapImageDark || '/badges/lanyard-strap.webp?v=7')
                }
                strapColor={isDarkMode ? '#f3f1ec' : '#111215'}
                cardColor="#fdfdfe"
                finish="matte"
                orientation="portrait"
                cornerRadius={0.28}
                size={0.55}
                anchor="center"
                strapLength={0.65}
                strapWidth={0.65}
                metal={isDarkMode ? 'gold' : 'silver'}
                gravity={0.9}
                damping={0.55}
                elasticity={0.45}
                breeze={0.22}
                interactive={true}
                intro={true}
                className="w-full h-full overflow-visible"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
