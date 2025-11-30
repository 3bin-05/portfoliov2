import React from "react";
import CountUp from "./CountUp.jsx";
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
            Over the course of my academic and personal learning journey, I’ve
            had the opportunity to work on a variety of projects that have
            strengthened my technical knowledge, problem-solving abilities, and
            creative thinking. So far, I have contributed to and completed over
            5 projects, each focused on different aspects of technology, ranging
            from web development and UI/UX design to software prototyping and
            data-driven applications.
          </p>
        </div>
      </div>

      <div className="row s-numbers__stats">
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <span>
                <CountUp
                  from={0}
                  to={1}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </span>
            </h3>
            <h5>Open Source Contributions</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <span>
                <CountUp
                  from={0}
                  to={2}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </span>
            </h3>
            <h5>Professional UI</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <span>
                <CountUp
                  from={0}
                  to={5}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </span>
            </h3>
            <h5>Projects Completed</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <span>
                <CountUp
                  from={0}
                  to={102}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </span>
            </h3>
            <h5>Cup of Coffee</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Numbers;
