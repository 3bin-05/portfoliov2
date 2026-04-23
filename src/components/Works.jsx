import React from "react";
import Snow from "./Snow";

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
    link: "https://purple-movement.com",
    image: purpleImage,
    descId: "01",
    description: "A community-focused design project for a local initiative."
  },
  {
    title: "Beyond syllabus",
    category: "UI/UX design",
    link: "https://beyondsyllabus.in",
    image: bsImage,
    descId: "02",
    description: "Educational platform for students to learn beyond their curriculum."
  },
  {
    title: "Tinkerhub SBCE",
    category: "UI/UX Design",
    link: "",
    image: tinkerImage,
    descId: "03",
    description: "Official community website for Tinkerhub SBCE chapter."
  },
  {
    title: "Clickjack testing on SBCE website",
    category: "Cyber Security",
    link: "https://github.com/3bin-05/clickjack",
    image: ckjImage,
    descId: "04",
    description: "Vulnerability assessment and security testing."
  },
  {
    title: "A Chating Platform",
    category: "Crypto Chat",
    link: "https://crypto-chat-org.vercel.app",
    image: cryptoImage,
    descId: "04",
    description: "Real-time chat platform built with React and Firebase."
  },
  {
    title: "Joy of computing with python",
    category: "NPTEL certificate",
    link: nptelpy,
    image: nptelImage,
    descId: "04",
    description: "Certification for Python programming excellence."
  },
  {
    title: "Project planner schedule",
    category: "Refer all my endevours",
    link: "https://cotton-light-6fe.notion.site/28ae88508ec48155b4b6dde03a96e1da?v=28ae88508ec481708570000cc2b1ec4c&source=copy_link",
    image: notionImage,
    descId: "04",
    description: "Detailed roadmap and project management hub."
  },
  {
    title: "Dark Netra",
    category: "Developement",
    link: darkdoc,
    image: darkImage,
    descId: "01",
    description: "Software development project focusing on accessibility."
  },
  {
    title: "3D-Web Developement",
    category: "KIA SELTOS",
    link: "https://kia-seltos.vercel.app",
    image: seltosImage,
    descId: "01",
    description: "Dynamic animated website showcasing product details."
  },
  {
    title: "FlipZon",
    category: "E-Commerce",
    link: "https://flopzon.netlify.app",
    image: FZImage,
    descId: "01",
    description: "E-commerce platform for buying and selling products online."
  }
];

function ProjectEntry({ project }) {
  return (
    <div className="column entry">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="entry__link glightbox"
        data-glightbox={`title: ${project.title}; description: .entry__desc-${project.descId}`}
      >
        <div className="entry__thumb">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>
        <div className="entry__info">
          <h4 className="entry__title">{project.title}</h4>
          <div className="entry__cat">{project.category}</div>
        </div>
      </a>
      <div className={`glightbox-desc entry__desc-${project.descId}`}>
        <p>
          {project.description}
          <a href={project.link || "#"}>Project Link</a>.
        </p>
      </div>
    </div>
  );
}

function Works() {
  return (
    <section
      id="works"
      className="s-works target-section"
      style={{ position: "relative", marginTop: "0rem" }}
    >
      <Snow count={50} />
      
      <div className="row">
        <div className="column xl-12">
          <div
            className="section-header"
            data-num="03"
            style={{ marginBottom: "18rem" }}
          >
            <h2 className="text-display-title">My Projects.</h2>
          </div>
        </div>
      </div>

      <div className="row folio-entries">
        {PROJECTS.map((project, index) => (
          <ProjectEntry key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Works;
