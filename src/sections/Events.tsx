import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  location: string;
  date: string;
}

const eventsList: EventItem[] = [
  {
    id: 'huddle-2025',
    title: 'Huddle Global 2025',
    category: 'STARTUP SUMMIT',
    role: 'Volunteer',
    description: "Volunteered at one of Asia's largest startup festivals, exploring emerging hardware innovations and AI trends.",
    location: 'Kovalam, India',
    date: 'DEC 2025'
  },
  {
    id: 'Hackathon',
    title: 'HACKBELLS 3.0',
    category: 'Hackathon',
    role: 'Volunteer',
    description: 'Hackbells is a 24-hour hackathon organized by Sree Buddha College of Engineering, attracting student teams from across the region. It fosters rapid prototyping, technical problem-solving, and cross-functional collaboration in a high-energy environment.',
    location: 'Alappuzha, Kerala',
    date: 'FEB 2026'
  },
  {
    id: 'IEEE Sub Execom Program Coordination Team Member',
    title: 'IEEE Student Branch SBCE',
    category: 'Technical Organization',
    role: 'Program Coordinator',
    description: 'Coordinated technical events like hackathons and tech talks.',
    location: 'SBCE',
    date: '2025 - 2026'
  },
  {
    id: 'UI/UX Core Team member',
    title: 'µLearn Foundation',
    category: 'UX Analysis',
    role: 'Core Team Member',
    description: 'Analyzing and improving the user interface and user experience of the µLearn platform, providing feedback and suggestions to the development team.',
    location: 'Remote',
    date: '2025 - On Going'
  },
  {
    id: 'UI/UX IG Lead',
    title: 'µLearn SBC',
    category: 'Community Learning',
    role: 'IG Lead',
    description: 'Mentored junior developers, coordinated peer-to-peer coding challenges, and established interest circles around React, Git, and UI/UX design.',
    location: 'SBCE',
    date: '2024 - 2025'
  },
  {
    id: 'Technical Cordinator',
    title: 'µLearn SBC',
    category: 'Technical Cordinator',
    role: 'Technical Cordinator',
    description: 'Leading the technical department of the µLearn Student Branch SBCE, organizing and coordinating technical events like hackathons and tech talks.',
    location: 'SBCE',
    date: '2025 - On Going'
  },
  {
    id: 'MDC',
    title: 'IEEE SB SBCE',
    category: 'MDC',
    role: 'Membership Developement Coordinator',
    description: 'Leading the Membership Developement department of the IEEE Student Branch SBCE, organizing and coordinating events like hackathons and tech talks.',
    location: 'SBCE',
    date: '2025 - On Going'
  },
  {
    id: 'Tech Team',
    title: 'Tinkerhub SBCE',
    category: 'Technical',
    role: 'Tech Team',
    description: 'Designing UI/UX for the website of the Tinkerhub Student Branch SBCE.',
    location: 'SBCE',
    date: '2025 - 2026'
  }
  
];

// Interactive 3D Tilt Card Component
function TiltCard({ event, playClick, playType }: { event: EventItem; playClick: () => void; playType: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tracking mouse relative coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation values
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  // Shine overlay coordinates
  const shineX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const shineY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Relative coordinates between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playType}
      onClick={playClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative flex flex-col justify-between h-[280px] p-6 rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden cursor-pointer select-none"
    >
      {/* Dynamic Shine Layer */}
      <motion.div
        style={{
          background: `radial-gradient(circle 120px at ${shineX} ${shineY}, rgba(255,255,255,0.06), transparent)`,
        }}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Card Header */}
      <div style={{ transform: 'translateZ(20px)' }} className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]">
            {event.category}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-secondary)] flex items-center gap-1">
            <Calendar size={11} />
            {event.date}
          </span>
        </div>
        <h4 className="font-serif text-lg md:text-xl font-medium text-[var(--text-primary)] mt-1.5">
          {event.title}
        </h4>
        <p className="text-xs font-mono text-indigo-400/80 tracking-tight">
          Role: {event.role}
        </p>
      </div>

      {/* Card Description */}
      <div style={{ transform: 'translateZ(10px)' }} className="text-left">
        <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light font-sans line-clamp-4">
          {event.description}
        </p>
      </div>

      {/* Card Footer */}
      <div style={{ transform: 'translateZ(15px)' }} className="flex items-center gap-1 text-[var(--text-secondary)] text-[11px] font-mono border-t border-[var(--border-color)] pt-3 mt-4">
        <MapPin size={11} className="text-rose-400" />
        <span>{event.location}</span>
      </div>
    </motion.div>
  );
}

export function Events({ playClick, playType }: { playClick: () => void; playType: () => void }) {
  return (
    <section id="events" className="w-full py-24 px-6 md:px-12 xl:px-16 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg-primary)]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-left">
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

      {/* Grid of tilt cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => (
          <TiltCard
            key={event.id}
            event={event}
            playClick={playClick}
            playType={playType}
          />
        ))}

        {/* Closing decorative card */}
        <div className="relative flex flex-col justify-center items-center h-[280px] p-6 rounded-[22px] border border-dashed border-[var(--border-color)] bg-[var(--bg-primary)] text-center text-[var(--text-secondary)]">
          <span className="text-3xl font-serif text-zinc-500 animate-pulse mb-3 select-none">?</span>
          <h4 className="font-sans font-medium text-sm text-[var(--text-primary)]">What's Next?</h4>
          <p className="text-xs max-w-[200px] mt-1 font-light leading-relaxed">
            Planning new developer circles and local prototyping workshops.
          </p>
        </div>
      </div>
    </section>
  );
}
