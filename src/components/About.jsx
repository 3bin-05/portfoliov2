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
                    <h3 className="s-about__content-title">Hello, I'm Jonathan Doe.</h3>
                    <p className="s-about__content-summary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="s-about__content-btn">
                        <a href="#0" className="btn">Download CV</a>
                    </div>
                </div>

                <div className="column xl-6 md-12 s-about__content-secondary">
                    <p className="attention-getter">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
