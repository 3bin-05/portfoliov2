import React from 'react';

function Numbers() {
    return (
        <section id="numbers" className="s-numbers">
            <div className="row">
                <div className="column lg-12">
                    <div className="section-header" data-num="03">
                        <h2 className="text-display-title">Numbers.</h2>
                    </div>
                </div>
            </div>

            <div className="row s-numbers__content">
                <div className="column xl-12">
                    <p className="lead">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>

            <div className="row s-numbers__stats">
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-numbers__stat">
                        <h3><span>127</span></h3>
                        <h5>Awards Received</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-numbers__stat">
                        <h3><span>1505</span></h3>
                        <h5>Cups of Coffee</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-numbers__stat">
                        <h3><span>109</span></h3>
                        <h5>Projects Completed</h5>
                    </div>
                </div>
                <div className="column xl-3 md-6 tab-12">
                    <div className="s-numbers__stat">
                        <h3><span>102</span></h3>
                        <h5>Happy Clients</h5>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Numbers;
