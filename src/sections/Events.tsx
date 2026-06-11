import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceDetail {
  id: string;
  tabLabel: string;
  role: string;
  organization: string;
  duration: string;
  metrics: {
    label: string;
  }[];
  bullets: string[];
}

const experiencesList: ExperienceDetail[] = [
  {
    id: 'mulearn',
    tabLabel: 'MuLearn',
    role: 'UI/UX Core Team & Technical Coordinator',
    organization: 'MuLearn Foundation & SBC',
    duration: '2024 - PRESENT',
    metrics: [
      { label: '100+ Networking' },
      { label: 'UX Platform Reviews' },
      { label: 'Team Work' }
    ],
    bullets: [
      'Conducted UI/UX office hours, mentoring peers on design principles and workflows.',
      'Designed user interfaces and prototypes for community initiatives and collaborative projects.',
      'Fostered networking and knowledge-sharing opportunities within the design community.'
    ]
  },
  {
    id: 'tinkerhub SBCE',
    tabLabel: 'TinkerHub SBCE',
    role: 'Tech Team & UI/UX Designer',
    organization: 'TinkerHub SBCE',
    duration: '2025',
    metrics: [
      { label: 'Leadership' },
      { label: 'UI/UX Design' },
      { label: 'Team Work' }
    ],
    bullets: [
      'Designed user-friendly interfaces for community-driven digital products.',
      'Built interactive prototypes to validate and refine user experiences.',
      'Bridged design and development to deliver polished digital solutions.'
    ]
  },
  {
    id: 'ieee',
    tabLabel: 'IEEE SB SBCE',
    role: 'Membership Development & Program Coordinator',
    organization: 'IEEE SB SBCE',
    duration: '2025 - PRESENT',
    metrics: [
      { label: '20% Membership Increase' },
      { label: '10+ Events' },
      { label: 'Event Coordination' }
    ],
    bullets: [
      'Planned and executed technical and community-focused events in both virtual and physical formats.',
      'Drove member participation through engaging programs and collaborative initiatives.',
      'Supported the growth of the IEEE student community by fostering connections and active involvement.'
    ]
  },
  {
    id: 'Purple Movement',
    tabLabel: 'The Purple Movement',
    role: 'Designer & Developer',
    organization: 'The Purple Movement',
    duration: '2024 - PRESENT',
    metrics: [
      { label: 'UI Design' },
      { label: 'Networking' },
      { label: 'Team Work' }
    ],
    bullets: [
      'Designed intuitive user interfaces and digital assets for community initiatives.',
      'Supported the planning and execution of events, ensuring smooth participant experiences.',
      'Combined design thinking and event coordination to improve participant engagement.'
    ]
  },
  {
    id: 'KSUM x IEDC',
    tabLabel: 'KSUM x IEDC',
    role: 'Volunteer',
    organization: 'Huddle Global 2025',
    duration: 'DEC 2025',
    metrics: [
      { label: 'Networking' },
      { label: 'Managing' },
      { label: 'Leadership' }
    ],
    bullets: [
      'Volunteered at Huddle Global 2025, assisting with event coordination and execution.',
      'Networked with startup founders, entrepreneurs, and technology leaders.',
      'Gained insights into innovation, entrepreneurship, and community building through active participation.'
    ]
  },
  {
    id: 'SBCE',
    tabLabel: 'SBCE',
    role: 'Volunteer',
    organization: 'HACKBELLS 3.0 Hackathon',
    duration: 'FEB 2026',
    metrics: [
      { label: 'Event Coordination' },
      { label: 'Leadership' },
      { label: 'Team Work' }
    ],
    bullets: [
      'Volunteered to assist coordinate the 24-hour regional student hackathon at Sree Buddha College of Engineering.',
      'Connected with developers, designers, and tech enthusiasts, building valuable professional relationships.',
      'Gained practical exposure to event management, technical support, and community engagement within a high-energy environment.'
    ]
  }
];

export function Events({ playClick, playType }: { playClick: () => void; playType: () => void }) {
  const [selectedId, setSelectedId] = useState<string>(experiencesList[0]?.id || 'mulearn');

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedId((prevId) => {
        const currentIndex = experiencesList.findIndex((exp) => exp.id === prevId);
        const nextIndex = (currentIndex + 1) % experiencesList.length;
        return experiencesList[nextIndex].id;
      });
    }, 60000); // 1 minute auto-cycle

    return () => clearInterval(interval);
  }, [selectedId]);

  const selectedExp = experiencesList.find((e) => e.id === selectedId) || experiencesList[0];

  return (
    <section id="events" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] block mb-2">
            Offline Log
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] m-0">
            Beyond the IDE
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] mt-3 max-w-md">
            Workshops organized, student communities enabled, and networking experiences in regional tech hubs.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Navigation Column */}
          <div className="lg:col-span-3 flex lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-l border-[var(--border-color)] scrollbar-none pb-px lg:pb-0 relative z-10">
            <style>
              {`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-none::-webkit-scrollbar {
                  display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-none {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
              `}
            </style>
            
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
                  className={`relative px-5 py-3.5 text-left text-xs font-mono tracking-wider uppercase transition-all duration-300 outline-none cursor-pointer whitespace-nowrap select-none flex-grow lg:flex-grow-0 ${
                    active
                      ? 'text-teal-600 dark:text-[#64FFDA] font-semibold scale-102 lg:translate-x-1.5'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/20'
                  }`}
                >
                  {/* Sliding active bar */}
                  {active && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 right-0 bottom-0 top-auto h-[2.5px] w-full lg:left-0 lg:right-auto lg:top-0 lg:bottom-0 lg:w-[2.5px] lg:h-full bg-teal-500 dark:bg-[#64FFDA] shadow-[0_0_12px_rgba(20,184,166,0.4)] dark:shadow-[0_0_12px_rgba(100,255,218,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {exp.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-9 pl-0 lg:pl-6 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-left"
              >
                {/* Role and Organization */}
                <h3 className="font-sans text-xl md:text-2xl font-medium tracking-tight text-[var(--text-primary)] m-0 leading-tight">
                  {selectedExp.role}{' '}
                  <span className="text-teal-600 dark:text-[#64FFDA] font-semibold">
                    @ {selectedExp.organization}
                  </span>
                </h3>
                
                {/* Duration */}
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider block mt-2 mb-6">
                  {selectedExp.duration}
                </span>

                {/* Key Metrics Row */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {selectedExp.metrics.map((metric, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)]/40 border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] select-none hover:border-[var(--text-primary)]/10 transition-colors"
                    >
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Description Bullets */}
                <ul className="space-y-4 p-0 m-0 list-none">
                  {selectedExp.bullets.map((bullet, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light font-sans"
                    >
                      <span className="text-teal-500 dark:text-[#64FFDA] mt-1.5 shrink-0 select-none text-xs">
                        ▹
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
