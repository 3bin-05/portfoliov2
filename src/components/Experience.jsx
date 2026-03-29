import React from 'react';
import '../assets/css/Experience.css';
import experiencesData from '../data/experience.json';

const RoleItem = ({ role }) => {
  return (
    <div className="exp-role-item">
      <div className="exp-role-node"></div>
      <h4 className="exp-role-title">{role.title}</h4>
      
      <div className="exp-role-meta">
        <span>{role.start} - {role.end}</span>
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
  );
};

const OrganizationBlock = ({ exp }) => {
  return (
    <div className="exp-org-group">
      <div className="exp-org-header">
        <div className="exp-org-node"></div>
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
  return (
    <section id="experience" className="experience-section target-section">
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
