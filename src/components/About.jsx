import React from 'react';

function About() {
    return (
        <section id="about" className="s-about">
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
                            Spotify
                            <span>Product Designer</span>
                        </li>
                        <li>
                            Dropbox
                            <span>Interface Developer</span>
                        </li>
                        <li>
                            Google
                            <span>Lead UI Designer</span>
                        </li>
                        <li>
                            Figma
                            <span>UI Designer</span>
                        </li>
                        <li>
                            Microsoft
                            <span>UI Designer</span>
                        </li>
                        <li>
                            Adobe
                            <span>Creative Designer</span>
                        </li>
                    </ul>
                </div>
                <div className="grid-list-items__item s-about__block">
                    <h4 className="s-about__block-title">Awards</h4>
                    <ul className="s-about__list">
                        <li>
                            <a href="#0">
                                Site Of The Month
                                <span>Awwwards — 2023</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Site Of The Day
                                <span>Awwwards — 2023</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Agency of The Year
                                <span>Awwwards — 2022</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                FWA of The Month
                                <span>FWA — 2022</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Site Of The Month
                                <span>Awwwards — 2022</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0">
                                Developer of The Year
                                <span>Awwwards — 2021</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="grid-list-items__item s-about__block">
                    <h4 className="s-about__block-title">Skills</h4>
                    <ul className="s-about__list">
                        <li>
                            Product Design
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
                            Illustration
                        </li>
                        <li>
                            Visual Design
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
