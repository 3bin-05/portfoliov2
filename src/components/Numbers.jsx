import React, { useState, useEffect } from "react";
import CountUp from "./CountUp.jsx";

function Numbers() {
  const [stats, setStats] = useState({
    commits: 960, // Fallback values
    repos: 35,
    projects: 15,
    uiProjects: 20
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const [userRes, commitRes] = await Promise.all([
          fetch("https://api.github.com/users/3bin-05"),
          fetch("https://api.github.com/search/commits?q=author:3bin-05", {
            headers: { "Accept": "application/vnd.github.cloak-preview" }
          })
        ]);

        if (!userRes.ok || !commitRes.ok) throw new Error("GitHub API limit reached or error");

        const userData = await userRes.json();
        const commitData = await commitRes.json();

        if (isMounted) {
          setStats({
            commits: commitData.total_count || 960,
            repos: userData.public_repos || 35,
            projects: userData.public_repos || 15,
            uiProjects: 22
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="numbers" className="s-numbers">
      <div className="row">
        <div className="column lg-12">
          <div className="section-header" data-num="05">
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
            creative thinking. Using real-time data from my GitHub, here is a 
            snapshot of my technical footprint and creative output.
          </p>
        </div>
      </div>

      <div className="row s-numbers__stats">
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <CountUp
                from={0}
                to={stats.commits}
                separator=","
                direction="up"
                duration={1.5}
                className="count-up-text"
              />
            </h3>
            <h5>Git Commits</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <CountUp
                from={0}
                to={stats.uiProjects}
                separator=","
                direction="up"
                duration={1.5}
                className="count-up-text"
              />
            </h3>
            <h5>UI Projects</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <CountUp
                from={0}
                to={stats.projects}
                separator=","
                direction="up"
                duration={1.5}
                className="count-up-text"
              />
            </h3>
            <h5>Projects Completed</h5>
          </div>
        </div>
        <div className="column xl-3 md-6 tab-12">
          <div className="s-numbers__stat">
            <h3>
              <CountUp
                from={0}
                to={stats.repos}
                separator=","
                direction="up"
                duration={1.5}
                className="count-up-text"
              />
            </h3>
            <h5>Git Repositories</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Numbers;
