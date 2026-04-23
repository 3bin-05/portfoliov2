import "../assets/css/SkillCard.css";
import BlurText from "./BlurText";
import { useEffect, useRef, useCallback } from "react";

// Local icon imports
import pythonIcon from "../assets/images/icons/python.svg";
import reactIcon from "../assets/images/icons/react.svg";
import jsIcon from "../assets/images/icons/javascript.svg";
import cssIcon from "../assets/images/icons/css.svg";
import htmlIcon from "../assets/images/icons/html.svg";
import tailwindIcon from "../assets/images/icons/tailwind.svg";
import nodeIcon from "../assets/images/icons/node.svg";
import figmaIcon from "../assets/images/icons/figma.svg";
import javaIcon from "../assets/images/icons/java.svg";
import githubIcon from "../assets/images/icons/github.svg";
import postmanIcon from "../assets/images/icons/postman.svg";
import openaiIcon from "../assets/images/icons/openai.svg";
import chromeIcon from "../assets/images/icons/googlechrome.svg";
import framerIcon from "../assets/images/icons/framer.svg";
import hotjarIcon from "../assets/images/icons/hotjar.svg";
import adobeXdIcon from "../assets/images/icons/adobexd.svg";
import canvaIcon from "../assets/images/icons/canva.svg";
import notionIcon from "../assets/images/icons/notion.svg";
import antigravityIcon from "../assets/images/icons/antigravity.png";

const iconMap = {
  Python: pythonIcon,
  React: reactIcon,
  JavaScript: jsIcon,
  CSS: cssIcon,
  HTML: htmlIcon,
  "Tailwind CSS": tailwindIcon,
  "Node.js": nodeIcon,
  Figma: figmaIcon,
  C: pythonIcon, // Defaulting to python or similar if C is missing
  Java: javaIcon,
  Antigravity: antigravityIcon,
  "Git/GitHub": githubIcon,
  "REST APIs": postmanIcon,
  "GenAI Tools (Lovable, Bolt, etc.)": openaiIcon,
  "Responsive Design": chromeIcon,
  "UI/UX Design": framerIcon,
  "User Research": hotjarIcon,
  "Wireframing & Prototyping": adobeXdIcon,
  "Design Thinking": canvaIcon,
  "Information Architecture": notionIcon,
};

const SkillCard = ({ title, percentage }) => {

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
            <img
              className="skill-icon"
              src={iconPath}
              alt={`${title} logo`}
            />
          )}
          <div className="header-content">
            <h2 className="skill-title">
              <BlurText
                text={title}
                delay={200}
                animateBy="words"
                direction="top"
              />
              <span className="title-underline"></span>
            </h2>
            <span className="skill-percentage">
              <BlurText
                text={`${percentage}%`}
                delay={200}
                animateBy="chars"
                direction="top"
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
