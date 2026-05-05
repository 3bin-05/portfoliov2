import React from "react";
import Snow from "./Snow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import purpleImage from "../assets/images/folio/purple.jpg";
import bsImage from "../assets/images/folio/BS.jpg";
import tinkerImage from "../assets/images/folio/tinker.jpg";
import ckjImage from "../assets/images/folio/ckj.jpg";
import chadImage from "../assets/images/folio/chad.jpg";
import nptelImage from "../assets/images/folio/nptel.jpg";
import cryptoImage from "../assets/images/folio/CryptoChat.png";
import notionImage from "../assets/images/folio/notion.jpg";
import nptelpy from "../assets/images/certificate/nptelpy.pdf";
import darkImage from "../assets/images/folio/dark.jpg";
import seltosImage from "../assets/images/folio/Seltos.jpg";
import FZImage from "../assets/images/folio/flipzon.png";
import darkdoc from "../assets/images/resume/darkdoc.pdf";

const PROJECTS = [
  {
    title: "The Purple Movement",
    category: "UI/UX Design",
    link: "https://sturdy-snail-3ee.notion.site/Purple-Movement-Website-35779bf218cc8018b325e7cca767c62a?source=copy_link",
    image: purpleImage,
    description: "A community-focused design project for a local initiative.",
  },
  {
    title: "Beyond syllabus",
    category: "UI/UX design",
    link: "https://beyondsyllabus.in",
    image: bsImage,
    description:
      "Educational platform for students to learn beyond their curriculum.",
  },
  {
    title: "Tinkerhub SBCE",
    category: "UI/UX Design",
    link: "https://tinkerhub.org",
    image: tinkerImage,
    description: "Official community website for Tinkerhub SBCE chapter.",
  },
  {
    title: "Clickjack testing on SBCE website",
    category: "Cyber Security",
    link: "https://github.com/3bin-05/clickjack",
    image: ckjImage,
    description: "Vulnerability assessment and security testing.",
  },
  {
    title: "A Chating Platform",
    category: "Crypto Chat",
    link: "https://sturdy-snail-3ee.notion.site/CryptoChat-35579bf218cc80b2a36ced0b1022c281?source=copy_link",
    image: cryptoImage,
    description: "Real-time chat platform built with React and Firebase.",
  },
  {
    title: "Joy of computing with python",
    category: "NPTEL certificate",
    link: nptelpy,
    image: nptelImage,
    description: "Certification for Python programming excellence.",
  },
  {
    title: "Project planner schedule",
    category: "Notion Hub",
    link: "https://cotton-light-6fe.notion.site/28ae88508ec48155b4b6dde03a96e1da?v=28ae88508ec481708570000cc2b1ec4c&source=copy_link",
    image: notionImage,
    description: "Detailed roadmap and project management hub.",
  },
  {
    title: "Dark Netra",
    category: "Developement",
    link: darkdoc,
    image: darkImage,
    description: "Software development project focusing on accessibility.",
  },
  {
    title: "3D-Web Developement",
    category: "KIA SELTOS",
    link: "https://sturdy-snail-3ee.notion.site/KIA-Seltos-3D-Website-Interactive-Product-Experience-35779bf218cc8091a529c29f8921de63?source=copy_link",
    image: seltosImage,
    description: "Dynamic animated website showcasing product details.",
  },
  {
    title: "FlipZon",
    category: "E-Commerce",
    link: "https://sturdy-snail-3ee.notion.site/FlipZon-35579bf218cc80cca424fe9edb040a73",
    image: FZImage,
    description: "E-commerce platform for buying and selling products online.",
  },
];

function Works() {
  return (
    <section
      id="works"
      className="s-works target-section"
      style={{
        position: "relative",
        marginTop: "0rem",
        paddingBottom: "10rem",
        backgroundColor: "white",
      }}
    >
      <Snow count={50} />

      {/* Header */}
      <div className="row">
        <div className="column xl-12">
          <div
            className="section-header"
            data-num="03"
            style={{ marginBottom: "8rem" }}
          >
            <h2 className="text-display-title">My Projects.</h2>
          </div>
        </div>
      </div>

      {/* Improved Carousel UI */}
      <div className="projects-carousel-container">
        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".custom-nav-prev",
              nextEl: ".custom-nav-next",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.8,
                centeredSlides: true,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 60,
              },
              1400: {
                slidesPerView: 3.5,
                centeredSlides: true,
                spaceBetween: 80,
              },
            }}
            className="projects-swiper"
          >
            {PROJECTS.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="slide-inner">
                  <a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-dunes"
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="card-bg-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <div className="title-pill">{project.title}</div>
                        <div className="category-subtitle">{project.category}</div>
                      </div>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Side Fade Gradients */}
          <div className="side-fade fade-left"></div>
          <div className="side-fade fade-right"></div>

          {/* Navigation Controls */}
          <button className="custom-nav-prev" aria-label="Previous">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="custom-nav-next" aria-label="Next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Custom Pagination Container */}
        <div className="custom-pagination"></div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .projects-carousel-container {
          position: relative;
          width: 100%;
          max-width: 1900px;
          margin: 0 auto;
          padding: 0 100px;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .projects-swiper {
          width: 100%;
          padding: 40px 0 !important;
          overflow: visible !important;
        }

        .slide-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .swiper-slide-active .slide-inner {
          transform: scale(1.15);
          z-index: 10;
        }

        .project-card-dunes {
          position: relative;
          display: block;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 4 / 5;
          border-radius: 40px;
          overflow: hidden;
          text-decoration: none;
          background: #f5f5f5;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;
        }

        .project-card-dunes:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
        }

        .swiper-slide-active .project-card-dunes {
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
        }

        .card-image-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .card-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-card-dunes:hover .card-overlay {
          opacity: 1;
        }

        .project-card-dunes:hover .card-bg-image {
          transform: scale(1.05);
        }

        .overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .project-card-dunes:hover .overlay-content {
          opacity: 1;
          transform: translateY(0);
        }

        .title-pill {
          background: #F2994A;
          color: white;
          padding: 10px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 1.25rem;
          font-family: var(--font-1, sans-serif);
          text-align: center;
          margin: 0;
        }

        .category-subtitle {
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          text-align: center;
          margin-top: 12px;
          font-size: 1.1rem;
          font-family: var(--font-1, sans-serif);
        }

        /* Navigation Controls - Forced Circles */
        .custom-nav-prev, .custom-nav-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          width: 64px !important;
          height: 64px !important;
          border-radius: 50% !important;
          background: white !important;
          border: none !important;
          color: #1a1a1a !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease !important;
          padding: 0 !important;
          min-width: 0 !important;
          flex: 0 0 64px !important;
        }

        .custom-nav-prev { left: -60px; }
        .custom-nav-next { right: -60px; }

        .custom-nav-prev:hover, .custom-nav-next:hover {
          background: white !important;
          color: #f05423 !important;
          transform: translateY(-50%) scale(1.1) !important;
          box-shadow: 0 15px 35px rgba(240, 84, 35, 0.2) !important;
        }

        /* Side Fades - Proper Gradients */
        .side-fade {
          position: absolute;
          top: 0;
          height: 100%;
          width: 400px;
          z-index: 25;
          pointer-events: none;
        }

        .fade-left {
          left: -100px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
        }

        .fade-right {
          right: -100px;
          background: linear-gradient(-90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
        }

        /* Pagination */
        .custom-pagination {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #1a1a1a;
          opacity: 0.1;
          margin: 0 !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #f05423 !important;
          width: 30px;
          border-radius: 5px;
        }

        @media (max-width: 1200px) {
          .side-fade { width: 150px; }
          .custom-nav-prev { left: 0; }
          .custom-nav-next { right: 0; }
        }

        @media (max-width: 768px) {
          .side-fade { display: none; }
          .custom-nav-prev, .custom-nav-next { display: none !important; }
          .projects-carousel-container { padding: 0 20px; }
          .project-card-dunes { border-radius: 30px; }
        }
      `,
        }}
      />
    </section>
  );
}

export default Works;
