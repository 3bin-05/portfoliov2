import React from 'react';

function About() {
    return (
        <section id="about" className="s-about" style={{ position: 'relative' }}>
            <div className="snow-container">
                {Array.from({ length: 50 }, (_, i) => (
                    <span
                        key={i}
                        style={{
                            '--i': i,
                            '--j': Math.floor(Math.random() * 20)
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
                    <h3 className="s-about__content-title">Hi there, I’m <span style={{ color: 'orange' }}>Ebin Reji</span> </h3>
                    <p className="s-about__content-summary">
                        An aspiring Computer Engineer and UI/UX enthusiast passionate about crafting meaningful and user-focused digital experiences. I’m currently pursuing my BTech in Computer Science at Sree Buddha College of Engineering, Patoor, where I’ve built a strong foundation in Python, React, and web development.
                    </p>
                    <div className="s-about__content-btn">
                        <a href="/cv.pdf" download className="btn">Download CV</a>
                    </div>
                </div>

                <div className="column xl-6 md-12 s-about__content-secondary">
                    <h3 className="s-about__content-title">Education & Qualifications</h3>
                    <p>
                        <strong>Central Board of Secondary Education</strong><br />
                        (2021-2023)<br />
                        I completed my 12th grade under the CBSE curriculum with a focus on Computer Science, which helped me build a strong foundation in programming and technology.
                    </p>
                    <p>
                        <strong>Bachelor of Technology in Computer Science and Engineering </strong><br />
                        (2023-2027)<br />
                        I am currently pursuing a B.Tech in Computer Science and Engineering at Sree Buddha College of Engineering, Patoor. My studies focus on preparing myself for a successful career in the tech industry.
                    </p>
                </div>
            </div>

            <div className="row s-about__content">
                <div className="column xl-12">
            <div className="grid-list-items s-about__blocks">
                <div className="grid-list-items__item s-about__block">
                    <h4 className="s-about__block-title">Experience</h4>
                    <ul className="s-about__list">
                        <li>
                            The Purple Movement
                            <span>UI/UX Developer</span>
                        </li>
                        <li>
                            Tinkerhub
                            <span>Tech Team UI Developer</span>
                        </li>
                    </ul>
                </div>
                <div className="grid-list-items__item s-about__block">
                    <h4 className="s-about__block-title">Current Jobs</h4>
                    <ul className="s-about__list">
                        <li>
                            <a href="#0">
                                The Purple Movement UI/UX Developer
                                <span>2025 — Present</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Mulearn SBC UI/UX Lead
                                <span>2025 — Present</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Tinkerhub SBCE Tech Team UI Developer
                                <span>2025 — Present</span>
                            </a>
                        </li>
                         <li>
                            <a href="#0">
                                IEEE SB SBCE Sub-Execom Program Co ordination Team
                                <span>2025 — Present</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="grid-list-items__item s-about__block">
                    <h4 className="s-about__block-title">Skills</h4>
                    <ul className="s-about__list">
                        <li>
                            Figma Design
                        </li>
                        <li>
                            UI/UX Design
                        </li>
                        <li>
                            Prototyping
                        </li>
                        <li>
                            Frontend Development
                        </li>
                        <li>
                            React and JavaScript
                        </li>
                        <li>
                            Vibe Coder
                        </li>
                    </ul>
                </div>
                </div>
        </div>
            </div>
        </section>
        
    );
}

export default About;
