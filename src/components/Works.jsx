import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
import musbc from "../assets/images/icons/musbc.png";
import darkImage from "../assets/images/folio/dark.jpg";
import seltosImage from "../assets/images/folio/Seltos.jpg";
import atherImage from "../assets/images/folio/athermind.png";
import darkdoc from "../assets/images/resume/darkdoc.pdf";

function Works() {
  return (
    <section
      id="works"
      className="s-works target-section"
      style={{ position: "relative", marginTop: "0rem" }}
    >
      <div className="snow-container">
        {Array.from({ length: 50 }, (_, i) => (
          <span
            key={i}
            style={{
              "--i": i,
              "--j": Math.floor(Math.random() * 20),
            }}
          ></span>
        ))}
      </div>
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
        <div className="column entry">
          <a
            href="https://purple-movement.com"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: White Knit Cap; description: .entry__desc-01"
          >
            <div className="entry__thumb">
              <img src={purpleImage} srcSet={purpleImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">The Purple Movement</h4>
              <div className="entry__cat">UI/UX Design</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-01">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://beyondsyllabus.in"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: WoodCraft; description: .entry__desc-02"
          >
            <div className="entry__thumb">
              <img src={bsImage} srcSet={bsImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">Beyond syllabus</h4>
              <div className="entry__cat">UI/UX design</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-02">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: Caffeine & Tulips; description: .entry__desc-03"
          >
            <div className="entry__thumb">
              <img src={tinkerImage} srcSet={tinkerImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">Tinkerhub SBCE</h4>
              <div className="entry__cat">UI/UX Design</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-03">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://github.com/3bin-05/clickjack"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: Grayscale; description: .entry__desc-04"
          >
            <div className="entry__thumb">
              <img src={ckjImage} srcSet={ckjImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">
                Clickjack testing on SBCE website
              </h4>
              <div className="entry__cat">Cyber Security</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-04">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://crypto-chat-org.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: Grayscale; description: .entry__desc-04"
          >
            <div className="entry__thumb">
              <img src={cryptoImage} srcSet={cryptoImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">
                A Chating Platform using React and Firebase
              </h4>
              <div className="entry__cat">Crypto Chat</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-04">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href={nptelpy}
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: Grayscale; description: .entry__desc-04"
          >
            <div className="entry__thumb">
              <img src={nptelImage} srcSet={nptelImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">Joy of computing with python</h4>
              <div className="entry__cat">NPTEL certificate</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-04">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://cotton-light-6fe.notion.site/28ae88508ec48155b4b6dde03a96e1da?v=28ae88508ec481708570000cc2b1ec4c&source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: Grayscale; description: .entry__desc-04"
          >
            <div className="entry__thumb">
              <img src={notionImage} srcSet={notionImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">Project planner schedule</h4>
              <div className="entry__cat">Refer all my endevours</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-04">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href={darkdoc}
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: White Knit Cap; description: .entry__desc-01"
          >
            <div className="entry__thumb">
              <img src={darkImage} srcSet={darkImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">Dark Netra</h4>
              <div className="entry__cat">Developement</div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-01">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://kia-seltos.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: White Knit Cap; description: .entry__desc-01"
          >
            <div className="entry__thumb">
              <img src={seltosImage} srcSet={seltosImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">3D-Web Developement</h4>
              <div className="entry__cat">
                A dynamic animated website based on product KIA SELTOS
              </div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-01">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
        <div className="column entry">
          <a
            href="https://ather-mind.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="entry__link glightbox"
            data-glightbox="title: White Knit Cap; description: .entry__desc-01"
          >
            <div className="entry__thumb">
              <img src={atherImage} srcSet={atherImage} alt="" />
            </div>
            <div className="entry__info">
              <h4 className="entry__title">AtherMind</h4>
              <div className="entry__cat">
                A UI for chatbot integrated with both local and AI API's With
                network search feature local only works when deployes locally
              </div>
            </div>
          </a>
          <div className="glightbox-desc entry__desc-01">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore ipsum iste soluta fugiat, impedit illum ducimus deleniti
              facilis ab, tempora non! Nisi, tempora provident.
              <a href="https://www.behance.net/">Project Link</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Works;
