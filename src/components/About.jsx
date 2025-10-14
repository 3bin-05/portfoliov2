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

            <div className="row s-about__content-stats">
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-about__content-stat">
                        <h3><span>127</span></h3>
                        <h5>Awards Received</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-about__content-stat">
                        <h3><span>1505</span></h3>
                        <h5>Cups of Coffee</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-about__content-stat">
                        <h3><span>109</span></h3>
                        <h5>Projects Completed</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-about__content-stat">
                        <h3><span>102</span></h3>
                        <h5>Happy Clients</h5>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
