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
  { src: purpleMovementLogo, name: "Purple Movement", color: "#9B59B6" },
  { src: iedcLogo, name: "IEDC", color: "#1E90FF" },
  { src: tinkerhubStripLogo, name: "Tinkerhub", color: "#00C853" },
  { src: huddleLogo, name: "Huddle Global", color: "#FF6B35" },
  { src: mulsbcLogo, name: "MulSBC", color: "#3498DB" },
  { src: ieeeLogoStrip, name: "IEEE", color: "#00629B" },
  { src: mulearnLogo, name: "MuLearn", color: "#8E44AD" },
];

const LogoStrip = () => {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);

  // Physics-based speed control
  const speed = useSpring(1, { stiffness: 100, damping: 20 });

  // Duplicate logos multiple times to ensure seamless loop
  const duplicatedLogos = useMemo(() => [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS], []);

  // Wrap the X position based on the width of one set of logos (25% of the total track with 4 sets)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (isHovered) {
      speed.set(0.1); 
    } else {
      speed.set(1); 
    }

    const moveBy = speed.get() * 0.005 * delta;
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div className="logo-strip-belt">
      <div
        className="logo-strip-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="logo-strip-track"
          style={{ x }}
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

  return (
    <motion.div
      className="logo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0.5, filter: "grayscale(100%)", scale: 0.9 }}
      animate={{
        opacity: isHovered ? 1 : 0.5,
        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        scale: isHovered ? 1.05 : 0.9,
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        style={{
          width: "120px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo.src}
          alt={logo.name}
          className="logo-img"
          style={{
            filter: isHovered ? `drop-shadow(0 0 15px ${logo.color}44)` : "none",
          }}
        />
      </div>
      <span className="logo-name">{logo.name}</span>
    </motion.div>
  );
};

export default LogoStrip;
