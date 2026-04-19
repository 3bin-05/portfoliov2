import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import musbcLogo from "../assets/images/icons/musbc.png";
import tinkerLogo from "../assets/images/icons/tinkerhub.png";
import purpleLogo from "../assets/images/icons/the_purple_movement_logo.jpg";
import ieeeLogo from "../assets/images/icons/ieee.jpeg";
import ksumLogo from "../assets/images/icons/ksum.jpg";
import "../assets/css/Experience.css";
import experiencesData from "../data/experience.json";

const logoMap = {
  "IEEE SB SBCE": ieeeLogo,
  "MuLearn Foundation": musbcLogo,
  "TinkerHub SBCE": tinkerLogo,
  "MuLearn SBC": musbcLogo,
  "The Purple Movement": purpleLogo,
  IEEE: ieeeLogo,
  "Kerala Startup Mission": ksumLogo,
};

const RoleItem = ({ role }) => {
  return (
    <div className="exp-role-item">
      <div className="exp-role-node"></div>
      <div className="exp-role-content">
        <h4 className="exp-role-title">{role.title}</h4>
        <div className="exp-role-meta">
          <span>
            {role.start} - {role.end}
          </span>
          <span className="bullet">&#8226;</span>
          <span>{role.duration}</span>
          {role.type && (
            <>
              <span className="bullet">&#8226;</span>
              <span>{role.type}</span>
            </>
          )}
          {(role.location || role.mode) && (
            <>
              <span className="bullet">&#8226;</span>
              <span>
                {role.location && `${role.location} `}
                {role.mode && `(${role.mode})`}
              </span>
            </>
          )}
        </div>
        {role.description && (
          <p className="exp-role-desc">{role.description}</p>
        )}
        {role.skills && role.skills.length > 0 && (
          <div className="exp-role-skills">
            {role.skills.map((skill, index) => (
              <span key={index} className="exp-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrganizationBlock = ({ exp }) => {
  const logo = logoMap[exp.organization];
  return (
    <div className="exp-org-group">
      <div className="exp-org-header">
        <div className="exp-org-node"></div>
        <div className="exp-org-logo-wrapper">
          {logo && (
            <img
              src={logo}
              alt={`${exp.organization} logo`}
              className="exp-org-logo"
              loading="lazy"
            />
          )}
        </div>
        <div className="exp-org-info">
          <h3>{exp.organization}</h3>
          <p className="exp-org-duration">{exp.totalDuration}</p>
        </div>
      </div>
      <div className="exp-roles-list">
        {exp.roles.map((role, rIndex) => (
          <RoleItem key={rIndex} role={role} />
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section target-section"
    >
      <div className="row">
        <div className="column xl-12">
          <div className="section-header" data-num="04">
            <h2 className="text-display-title">Experience.</h2>
          </div>
        </div>
      </div>

      <div className="experience-container">
        <div className="exp-master-card">
          <div className="exp-timeline-wrapper">
            <div className="exp-timeline-line"></div>
            <motion.div
              className="exp-timeline-progress"
              style={{ scaleY, originY: 0 }}
            ></motion.div>

            {experiencesData.map((exp, index) => (
              <OrganizationBlock key={index} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
