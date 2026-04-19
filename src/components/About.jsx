import resume from "../assets/images/resume/Resume.pdf";
import CircularText from "./CircularText";
import SpotlightCard from "./SpotlightCard";
import SkillCard from "./SkillCard";
import LogoStrip from "./LogoStrip";

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
        <div className="column xl-6 md-12 s-about__content-main">
          <CircularText
            text="EbinReji*EbinReji*EbinReji*EbinReji*EbinReji*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
          <h3
            className="s-about__content-title"
            style={{ textAlign: "left", marginBottom: "1rem" }}
          >
            Hi there, I'm{" "}
            <span style={{ color: "orange" }}>Ebin Reji</span>{" "}
          </h3>
          <p className="s-about__content-summary">
            An aspiring Computer Engineer and UI/UX enthusiast passionate about
            crafting meaningful and user-focused digital experiences. I'm
            currently pursuing my BTech in Computer Science at Sree Buddha
            College of Engineering, Patoor, where I've built a strong foundation
            in Python, React, and web development.
          </p>
          <div className="s-about__content-btn">
            <a
              href={resume}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="column xl-6 md-12 s-about__content-secondary">
          <h3
            className="s-about__content-title"
            style={{ textAlign: "left", marginBottom: "1rem" }}
          >
            Education & Qualifications
          </h3>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(255, 255, 255, 0.5)"
          >
            <p>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/1280px-CBSE_new_logo.svg.png"
                alt="CBSE Logo"
                style={{ width: "50px", marginBottom: "-30px" }}
              />
            </p>
            <p>
              <strong>Central Board of Secondary Education</strong>
              <br />
              (2021-2023)
              <br />I completed my 12th grade under the CBSE curriculum with a
              focus on Computer Science, which helped me build a strong
              foundation in programming and technology.
            </p>
            <p></p>
            <p>
              <img
                src="https://sbce.ac.in/assets/sbce_logo.png"
                alt="SBCE Logo"
                style={{ width: "50px", marginBottom: "-25px" }}
              />
            </p>
            <p>
              <strong>
                Bachelor of Technology in Computer Science and Engineering{" "}
              </strong>
              <br />
              (2023-2027)
              <br />I am currently pursuing a B.Tech in Computer Science and
              Engineering at Sree Buddha College of Engineering, Patoor. My
              studies focus on preparing myself for a successful career in the
              tech industry.
            </p>
          </SpotlightCard>
        </div>
      </div>
<h3
            className="title"
            style={{ textAlign: "center", margin: "5rem 0 2rem" }}
          >
            In Collaboration With Communities
          </h3>
      <LogoStrip />

      <div className="row s-about__content">
        <div className="column xl-12">
          {/* Technical Skills Sections */}
          <div className="row" style={{ marginTop: "1rem" }}>
            <div className="column xl-12">
              <div
                className="section-header"
                data-num="02"
                style={{ marginBottom: "5rem" }}
              >
                <h2 className="text-display-title">Technical Skills.</h2>
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">Development</h3>
            <div className="skills-grid">
              <div className="skills-grid__item">
                <SkillCard title="Python" percentage={75} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="JavaScript" percentage={65} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="React" percentage={75} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Node.js" percentage={60} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="C" percentage={55} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Java" percentage={45} />
              </div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">Web & Styling</h3>
            <div className="skills-grid">
              <div className="skills-grid__item">
                <SkillCard title="HTML" percentage={80} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="CSS" percentage={70} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Tailwind CSS" percentage={75} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Responsive Design" percentage={80} />
              </div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">UI/UX</h3>
            <div className="skills-grid">
              <div className="skills-grid__item">
                <SkillCard title="Figma" percentage={85} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="UI/UX Design" percentage={85} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="User Research" percentage={75} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Wireframing & Prototyping" percentage={80} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Design Thinking" percentage={80} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Information Architecture" percentage={70} />
              </div>
            </div>
          </div>

          <div className="skill-category" style={{ marginTop: "6rem" }}>
            <h3 className="skill-category-title">Tools & Technologies</h3>
            <div className="skills-grid">
              <div className="skills-grid__item">
                <SkillCard title="Git/GitHub" percentage={70} />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="REST APIs" percentage={65} />
              </div>
              <div className="skills-grid__item">
                <SkillCard
                  title="GenAI Tools (Lovable, Bolt, etc.)"
                  percentage={80}
                />
              </div>
              <div className="skills-grid__item">
                <SkillCard title="Antigravity" percentage={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
