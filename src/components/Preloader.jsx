import React, { useEffect } from "react";
import { motion } from "motion/react";
import "../assets/css/Preloader.css";

const Preloader = ({ onComplete, duration = 2500 }) => {
  const onCompleteRef = React.useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const particles = Array.from({ length: 8 });

  // Logo constants
  const LOGO_SIZE = 120; // px desktop
  const OUTER_RING_SIZE = 240;
  const INNER_RING_SIZE = 180;
  const HALO_SIZE = 300;

  return (
    <motion.div
      id="preloader"
      className="fixed inset-0 z-[9999] flex items-center justify-center preloader-bg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Main Content Box - Strict Central Anchor */}
      <div className="relative flex items-center justify-center" style={{ width: 1, height: 1 }}>
        
        {/* Layer 1: Ambient Fog Halo */}
        <motion.div
          className="absolute aura-halo rounded-full"
          style={{ width: HALO_SIZE, height: HALO_SIZE, filter: "blur(40px)", top: '50%', left: '50%', marginLeft: -HALO_SIZE/2, marginTop: -HALO_SIZE/2 }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 0.12, 
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Layer 4: Pulse Rings (Energy Ripples) */}
        {[0, 1.25].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-[#FF6B00] rounded-full"
            style={{ width: 120, height: 120, top: '50%', left: '50%', marginLeft: -60, marginTop: -60 }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: [1, 1.6],
              opacity: [0, 0.7, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: delay + 0.9, 
              ease: "easeOut" 
            }}
          />
        ))}

        {/* Layer 2: Outer Rotation Ring */}
        <motion.div
          className="absolute animate-rotate-linear"
          style={{ width: OUTER_RING_SIZE, height: OUTER_RING_SIZE, top: '50%', left: '50%', marginLeft: -OUTER_RING_SIZE/2, marginTop: -OUTER_RING_SIZE/2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 240 240">
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="50%" stopColor="#FF9A3C" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="url(#orangeGradient)"
              strokeWidth="2"
              strokeDasharray="460 230"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(255, 107, 0, 0.6))" }}
            />
          </svg>
        </motion.div>

        {/* Layer 3: Counter-Rotating Inner Ring */}
        <motion.div
          className="absolute animate-rotate-counter"
          style={{ width: INNER_RING_SIZE, height: INNER_RING_SIZE, top: '50%', left: '50%', marginLeft: -INNER_RING_SIZE/2, marginTop: -INNER_RING_SIZE/2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="#FFD4A8"
              strokeWidth="1.5"
              strokeDasharray="160 340"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Particle Embers (Orbiting the center) */}
        <div className="absolute hidden md:block" style={{ width: 1, height: 1, top: '50%', left: '50%' }}>
          {particles.map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                animation: `particle-orbit ${10 + i * 1.2}s linear infinite, shimmer ${2 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `-${i * 1.5}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Layer 5: Inlined Logo Breathing */}
        <motion.div
          className="relative z-10"
          style={{ width: LOGO_SIZE, height: LOGO_SIZE, top: '50%', left: '50%', marginLeft: -LOGO_SIZE/2, marginTop: -LOGO_SIZE/2, position: 'absolute' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.2 },
            scale: { 
              duration: 3.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clipLogo)">
              <rect width="350" height="350" rx="175" fill="#EE6F00"/>
              <path d="M187.766 214H-1.93164V-8.65625H184.689V45.9824H65.8906V74.2539H170.627V126.695H65.8906V159.361H187.766V214Z" fill="white"/>
              <path d="M342.631 315.936C342.631 338.494 335.746 354.607 321.977 364.275C310.355 372.479 296.342 377.703 279.936 379.949L259.574 381.707L252.982 382H141.068V159.344H258.988C280.57 159.344 296.537 163.104 306.889 170.623C317.338 178.045 324.76 186.785 329.154 196.844L331.352 208.855L332.23 214.568L332.816 219.109C332.816 230.633 329.691 240.252 323.441 247.967C322.562 249.92 320.17 252.41 316.264 255.438L307.328 261.736L319.047 268.621C323.051 271.16 326.713 274.432 330.033 278.436C338.432 287.615 342.631 300.115 342.631 315.936ZM263.529 226.287C263.529 222.186 261.918 218.67 258.695 215.74C255.375 213.201 251.078 211.932 245.805 211.932H209.184V241.668H245.805C248.148 241.668 250.639 241.229 253.275 240.35C255.521 239.764 257.768 238.299 260.014 235.955C262.357 233.514 263.529 230.291 263.529 226.287ZM272.172 310.369C272.172 304.412 270.17 300.408 266.166 298.357C260.99 295.525 254.203 294.109 245.805 294.109H209.184V329.559H251.518C253.959 329.559 255.766 329.363 256.938 328.973L261.332 327.068C262.992 326.482 265.531 324.578 268.949 321.355C271.098 319.207 272.172 315.545 272.172 310.369Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clipLogo">
                <rect width="350" height="350" rx="175" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Preloader;
