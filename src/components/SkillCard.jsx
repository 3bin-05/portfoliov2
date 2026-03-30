import "../assets/css/SkillCard.css";
import BlurText from "./BlurText";
import { useEffect, useRef, useCallback } from "react";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const SkillCard = ({ title, percentage }) => {
  const iconMap = {
    Python: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg",
    React: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg",
    CSS: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg",
    Tailwind:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg",
    "Node.js":
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg",
    Figma: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg",
    C: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/c.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    Antigravity: "/antigravity.png",
    Notion: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg",
  };

  const iconPath = iconMap[title] || "";
  const progressTrackRef = useRef(null);
  const isVisibleRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!progressTrackRef.current) return;
    const rect = progressTrackRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !isVisibleRef.current) {
      isVisibleRef.current = true;
      progressTrackRef.current.classList.add("animate");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="card-container">
      <div className="skill-card">
        {/* Header: Title and Percentage */}
        <div className="card-header">
          {iconPath && (
            <img className={`skill-icon ${title === "Java" ? "bw-icon" : ""}`} src={iconPath} alt={`${title} logo`} />
          )}
          <div className="header-content">
            <h2 className="skill-title">
              <BlurText
                text={title}
                delay={200}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
              />
              <span className="title-underline"></span>
            </h2>
            <span className="skill-percentage">
              <BlurText
                text={`${percentage}%`}
                delay={200}
                animateBy="chars"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
              />
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-track" ref={progressTrackRef}>
          <div
            className="progress-fill"
            style={{ "--target-width": `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
