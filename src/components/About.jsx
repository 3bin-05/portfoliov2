import resume from "../assets/images/resume/Resume.pdf";
import ebinreji from "../assets/images/gallery/ebinreji.jpg";
import SpotlightCard from "./SpotlightCard";
import SkillCard from "./SkillCard";
import LogoStrip from "./LogoStrip";
import "../assets/css/AboutProfile.css";

function About() {
  return (
    <section id="about" className="s-about" style={{ position: "relative" }}>
      <div className="snow-container">
        {Array.from({ length: 50 }, (_, i) => (
          <span
            key={i}
            style={{
              "--i": i,
              "--j": Math.floor(Math.random() * 20),
            }}
          ></span>
        ))}
      </div>
      <div className="row">
        <div className="column lg-12">
          <div className="section-header" data-num="01">
            <h2 className="text-display-title">About Me.</h2>
          </div>
        </div>
      </div>

      <div className="row s-about__content">
        {/* Left Column: Bio and Button */}
        <div className="column xl-7 lg-12 s-about__content-main">
          <h3
            className="s-about__content-title"
            style={{ 
              textAlign: "left", 
              margin: "0 0 2rem 0", 
              fontSize: "4.8rem", 
              fontWeight: "700",
              lineHeight: "1.2"
            }}
          >
            Hi there, I'm{" "}
            <span style={{ color: "#F97316" }}>Ebin Reji</span>{" "}
          </h3>
          <p 
            className="s-about__content-summary" 
            style={{ 
              fontSize: "1.8rem", 
              lineHeight: "1.8", 
              color: "rgba(0,0,0,0.7)",
              maxWidth: "600px",
              marginBottom: "4rem",
              textAlign: "justify"
            }}
          >
            I’m a Computer Science student at Sree Buddha College of Engineering who enjoys building digital products that actually make sense to users. I work with Python, React, and modern web technologies to create responsive, functional applications. Alongside development, I’m deeply interested in UI/UX focusing on clean design, usability, and meaningful user experiences. I like working at the intersection of design and code, where ideas turn into real, interactive products. Constantly learning and experimenting, I aim to create solutions that are not just technically strong, but also intuitive and engaging to use.
          </p>
          <div className="s-about__content-btn">
            <a
              href={resume}
              className="about-cv-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image */}
        <div className="column xl-5 lg-12 s-about__content-image-column" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div className="about-profile-wrapper">
            <img 
              src={ebinreji} 
              alt="Ebin Reji" 
              className="about-profile-img"
            />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "10rem", marginBottom: "6rem", overflow: "hidden" }}>
        <div className="column lg-12" style={{ maxWidth: "100%", position: "relative" }}>
          <h3
            className="title"
            style={{ 
              textAlign: "center", 
              margin: "0 auto 6rem", 
              fontSize: "3.2rem", 
              fontWeight: "400",
              fontFamily: "var(--font-2)",
              color: "#111111",
              maxWidth: "100%",
              width: "100%",
              position: "relative",
              zIndex: 10
            }}
          >
            In Collaboration With Communities
          </h3>
          <LogoStrip />
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="row s-about__extra-content" style={{ marginTop: "12rem" }}>
        <div className="column xl-12 lg-12">
          <div
            className="section-header"
            data-num="02"
            style={{ marginBottom: "5rem" }}
          >
            <h2 className="text-display-title">Technical Skills.</h2>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Development</h3>
            <div className="skills-grid">
              <div className="skills-grid__item"><SkillCard title="Python" percentage={75} /></div>
              <div className="skills-grid__item"><SkillCard title="JavaScript" percentage={65} /></div>
              <div className="skills-grid__item"><SkillCard title="React" percentage={75} /></div>
              <div className="skills-grid__item"><SkillCard title="Node.js" percentage={60} /></div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">Web & Styling</h3>
            <div className="skills-grid">
              <div className="skills-grid__item"><SkillCard title="HTML" percentage={80} /></div>
              <div className="skills-grid__item"><SkillCard title="CSS" percentage={70} /></div>
              <div className="skills-grid__item"><SkillCard title="Tailwind CSS" percentage={75} /></div>
              <div className="skills-grid__item"><SkillCard title="Responsive Design" percentage={80} /></div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">UI/UX</h3>
            <div className="skills-grid">
              <div className="skills-grid__item"><SkillCard title="Figma" percentage={85} /></div>
              <div className="skills-grid__item"><SkillCard title="UI/UX Design" percentage={85} /></div>
              <div className="skills-grid__item"><SkillCard title="User Research" percentage={75} /></div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">Tools & Technologies</h3>
            <div className="skills-grid">
              <div className="skills-grid__item"><SkillCard title="Git/GitHub" percentage={70} /></div>
              <div className="skills-grid__item"><SkillCard title="REST APIs" percentage={65} /></div>
              <div className="skills-grid__item"><SkillCard title="Antigravity" percentage={80} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
