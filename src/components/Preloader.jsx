import React, { useState, useEffect } from "react";

function Preloader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true);
      document.documentElement.classList.remove("ss-preload");
      document.documentElement.classList.add("ss-loaded");
      document.body.classList.add("ss-show");
    };

    // Check if the page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Cleanup the event listener
      return () => window.removeEventListener("load", handleLoad);
    }

    // Minimum visible time of 10 seconds
    const minTimeTimer = setTimeout(() => {
      setMinTimePassed(true);
    }, 10000);

    return () => clearTimeout(minTimeTimer);
  }, []);

  useEffect(() => {
    if (loaded && minTimePassed) {
      setFadeOut(true);
      setTimeout(() => setShow(false), 3000); // Corresponds to transition duration
    }
  }, [loaded, minTimePassed]);

  if (!show) return null;

  const css = `
    #preloader {
      transition: opacity 3s ease-out;
    }

    .loader {
      --path: #cccccc;
      --dot: #ff6b35;
      --duration: 3s;
      width: 44px;
      height: 44px;
      position: relative;
    }

    .loader:before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      display: block;
      background: var(--dot);
      top: 37px;
      left: 19px;
      transform: translate(-18px, -18px);
      animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    .loader svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .loader svg rect,
    .loader svg polygon,
    .loader svg circle {
      fill: none;
      stroke: var(--path);
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .loader svg polygon {
      stroke-dasharray: 145 76 145 76;
      stroke-dashoffset: 0;
      animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    .loader.triangle svg polygon {
      animation: pathTriangle var(--triangle-duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    .loader svg rect {
      stroke-dasharray: 192 64 192 64;
      stroke-dashoffset: 0;
      animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }

    .loader svg circle {
      stroke-dasharray: 150 50 150 50;
      stroke-dashoffset: 75;
      animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    .loader.triangle {
      width: 48px;
      --triangle-duration: 2s;
    }

    .loader.triangle:before {
      left: 21px;
      transform: translate(-10px, -18px);
      animation: dotTriangle var(--triangle-duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    @keyframes pathTriangle {
      33% {
        stroke-dashoffset: 74;
      }

      66% {
        stroke-dashoffset: 147;
      }

      100% {
        stroke-dashoffset: 221;
      }
    }

    @keyframes dotTriangle {
      33% {
        transform: translate(0, 0);
      }

      66% {
        transform: translate(10px, -18px);
      }

      100% {
        transform: translate(-10px, -18px);
      }
    }

    @keyframes pathRect {
      25% {
        stroke-dashoffset: 64;
      }

      50% {
        stroke-dashoffset: 128;
      }

      75% {
        stroke-dashoffset: 192;
      }

      100% {
        stroke-dashoffset: 256;
      }
    }

    @keyframes dotRect {
      25% {
        transform: translate(0, 0);
      }

      50% {
        transform: translate(18px, -18px);
      }

      75% {
        transform: translate(0, -36px);
      }

      100% {
        transform: translate(-18px, -18px);
      }
    }

    @keyframes pathCircle {
      25% {
        stroke-dashoffset: 125;
      }

      50% {
        stroke-dashoffset: 175;
      }

      75% {
        stroke-dashoffset: 225;
      }

      100% {
        stroke-dashoffset: 275;
      }
    }

    .loader {
      display: inline-block;
      margin: 0 16px;
    }

    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  `;

  return (
    <div id="preloader" style={{ opacity: fadeOut ? 0 : 1 }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="loader-container">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40" id="test"></circle>
          </svg>
        </div>

        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8"></rect>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
