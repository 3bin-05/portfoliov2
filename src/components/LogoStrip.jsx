import React, { useRef, useState, useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { wrap } from "motion";

// Import strip logos only
import huddleLogo from "../assets/images/strip/Huddle-Global_Logo.jpeg";
import iedcLogo from "../assets/images/strip/iedc.jpg";
import ieeeLogoStrip from "../assets/images/strip/ieeenobg.png";
import mulearnLogo from "../assets/images/strip/mulearnf.png";
import mulsbcLogo from "../assets/images/strip/mulsbc.png";
import purpleMovementLogo from "../assets/images/strip/the_purple_movement_logo.jpg";
import tinkerLogo from "../assets/images/strip/tinker.png";
import tinkerhubStripLogo from "../assets/images/strip/tinkerhub.png";

import "../assets/css/LogoStrip.css";

const LOGOS = [
  { src: huddleLogo, name: "Huddle Global", color: "#FF6B35" },
  { src: iedcLogo, name: "IEDC", color: "#1E90FF" },
  { src: ieeeLogoStrip, name: "IEEE", color: "#00629B" },
  { src: mulearnLogo, name: "MuLearn", color: "#8E44AD" },
  { src: mulsbcLogo, name: "MulSBC", color: "#3498DB" },
  { src: purpleMovementLogo, name: "Purple Movement", color: "#9B59B6" },
  { src: tinkerLogo, name: "Tinker", color: "#E74C3C" },
  { src: tinkerhubStripLogo, name: "Tinkerhub", color: "#00C853" },
];

const LogoStrip = () => {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  // Physics-based speed control
  const speed = useSpring(1, { stiffness: 100, damping: 20 });

  // Infinite scroll logic
  // Duplicate logos multiple times to ensure seamless loop and smooth drag
  const duplicatedLogos = useMemo(() => [...LOGOS, ...LOGOS, ...LOGOS], []);

  // Wrap the X position based on the width of one set of logos (1/3 of the track)
  const x = useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (isHovered) {
      speed.set(0.1); // Slow down significantly on hover
    } else {
      speed.set(1); // Normal speed
    }

    // Move left. Adjust the constant (0.008) to change base speed.
    const moveBy = speed.get() * 0.008 * delta;
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div className="logo-strip-container">
      <div
        className="logo-strip-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="logo-strip-track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsHovered(true)}
          onDragEnd={() => setIsHovered(false)}
          onDrag={(e, info) => {
            // Allow manual drag to influence the position
            // We divide by a factor to make the drag feel natural relative to the track width
            baseX.set(baseX.get() + (info.delta.x / window.innerWidth) * 100);
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const LogoItem = ({ logo, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use index to create "random" but deterministic oscillation offsets
  const floatDuration = 3 + (index % 3);
  const floatDelay = (index % 4) * 0.5;
  const rotateDuration = 4 + (index % 2);

  return (
    <motion.div
      className="logo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0.5, filter: "grayscale(100%)", scale: 0.9 }}
      animate={{
        opacity: isHovered ? 1 : 0.5,
        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        scale: isHovered ? 1.1 : 0.9,
      }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        animate={{
          translateY: [-10, 10, -10],
          rotate: [-3, 3, -3],
        }}
        transition={{
          translateY: {
            duration: floatDuration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatDelay,
          },
          rotate: {
            duration: rotateDuration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatDelay,
          },
        }}
        style={{
          width: "120px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
        }}
      >
        <img
          src={logo.src}
          alt={logo.name}
          className="logo-img"
          style={{
            filter: isHovered ? `drop-shadow(0 0 15px ${logo.color})` : "none",
          }}
        />
      </motion.div>
      <span className="logo-name">{logo.name}</span>
    </motion.div>
  );
};

export default LogoStrip;
