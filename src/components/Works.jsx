import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import purpleImage from '../assets/images/folio/purple.jpg';
import bsImage from '../assets/images/folio/BS.jpg';
import tinkerImage from '../assets/images/folio/tinker.jpg';
import ckjImage from '../assets/images/folio/ckj.jpg';

function Works() {
    return (
        <section id="works" className="s-works target-section" style={{ position: 'relative' }}>
            <div className="snow-container">
                {Array.from({ length: 50 }, (_, i) => (
                    <span
                        key={i}
                        style={{
                            '--i': i,
                            '--j': Math.floor(Math.random() * 20)
                        }}
                    ></span>
                ))}
            </div>
            <div className="row">
                <div className="column xl-12">
                    <div className="section-header" data-num="02">
                        <h2 className="text-display-title">My Projects.</h2>
                    </div>
                </div>
            </div>

            <div className="row folio-entries">
                <div className="column entry">
                    <a href="https://purple-movement.com" target="_blank" rel="noopener noreferrer" className="entry__link glightbox" data-glightbox="title: White Knit Cap; description: .entry__desc-01">
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
                            Inventore ipsum iste soluta fugiat, impedit illum ducimus
                            deleniti facilis ab, tempora non! Nisi, tempora provident.
                            <a href="https://www.behance.net/">Project Link</a>.
                        </p>
                    </div>
                </div>
                <div className="column entry">
                    <a href="https://beyondsyllabus.in" target="_blank" rel="noopener noreferrer" className="entry__link glightbox" data-glightbox="title: WoodCraft; description: .entry__desc-02">
                        <div className="entry__thumb">
                            <img src={bsImage} srcSet={bsImage} alt="" />
                        </div>
                        <div className="entry__info">
                            <h4 className="entry__title">Development Under Work</h4>
                            <div className="entry__cat">UI/UX design</div>
                        </div>
                    </a>
                    <div className="glightbox-desc entry__desc-02">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Inventore ipsum iste soluta fugiat, impedit illum ducimus
                            deleniti facilis ab, tempora non! Nisi, tempora provident.
                            <a href="https://www.behance.net/">Project Link</a>.
                        </p>
                    </div>
                </div>
                <div className="column entry">
                    <a href={tinkerImage} target="_blank" rel="noopener noreferrer" className="entry__link glightbox" data-glightbox="title: Caffeine & Tulips; description: .entry__desc-03">
                        <div className="entry__thumb">
                            <img src={tinkerImage} srcSet={tinkerImage} alt="" />
                        </div>
                        <div className="entry__info">
                            <h4 className="entry__title">Development Under Work</h4>
                            <div className="entry__cat">UI/UX Design</div>
                        </div>
                    </a>
                    <div className="glightbox-desc entry__desc-03">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Inventore ipsum iste soluta fugiat, impedit illum ducimus
                            deleniti facilis ab, tempora non! Nisi, tempora provident.
                            <a href="https://www.behance.net/">Project Link</a>.
                        </p>
                    </div>
                </div>
                <div className="column entry">
                    <a href="https://github.com/3bin-05/clickjack" target="_blank" rel="noopener noreferrer" className="entry__link glightbox" data-glightbox="title: Grayscale; description: .entry__desc-04">
                        <div className="entry__thumb">
                            <img src={ckjImage} srcSet={ckjImage}alt="" />
                        </div>
                        <div className="entry__info">
                            <h4 className="entry__title">Clickjack testing on SBCE website</h4>
                            <div className="entry__cat">Cyber Security</div>
                        </div>
                    </a>
                    <div className="glightbox-desc entry__desc-04">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Inventore ipsum iste soluta fugiat, impedit illum ducimus
                            deleniti facilis ab, tempora non! Nisi, tempora provident.
                            <a href="https://www.behance.net/">Project Link</a>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row s-testimonials">
                <div className="column xl-12">
                    <h3 className="s-testimonials__header">Communities</h3>
                    <div className="swiper-container s-testimonials__slider">
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                401: { slidesPerView: 1, spaceBetween: 20 },
                                801: { slidesPerView: 2, spaceBetween: 50 },
                                1181: { slidesPerView: 3, spaceBetween: 48 }
                            }}
                        >
                            <SwiperSlide>
                                <div className="s-testimonials__slide swiper-slide">
                                    <div className="s-testimonials__author">
                                        <img src="https://media.licdn.com/dms/image/v2/D560BAQG6raXCDhNeyQ/company-logo_200_200/B56ZfWj23rHQAI-/0/1751651414732/the_purple_movement_logo?e=2147483647&v=beta&t=Zy4QCD3yZ-ow0hzYP1olWN-9Xfuk3N6E7TQOql4D3SY" alt="Avatar" className="s-testimonials__avatar" />
                                        <cite className="s-testimonials__cite">
                                            <strong>The Purple Movement</strong>
                                            <span>UI/UX Developer</span>
                                        </cite>
                                    </div>
                                    <p>
                                        As a passionate UI/UX Developer in the Purple Movement, I’ve contributed to creating intuitive, user-focused digital experiences that align with the movement’s vision of innovation and accessibility. I played a key role in designing clean, modern interfaces, improving user flows, and enhancing overall usability.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="s-testimonials__slide swiper-slide">
                                    <div className="s-testimonials__author">
                                        <img src="https://avatars.githubusercontent.com/u/92638585?s=280&v=4" alt="Avatar" className="s-testimonials__avatar" />
                                        <cite className="s-testimonials__cite">
                                            <strong>Tinkerhub SBCE</strong>
                                            <span>Tech Team</span>
                                        </cite>
                                    </div>
                                    <p>
                                        As a Tech Team UI/UX Developer at TinkerHub SBCE, I contribute to building user-centered digital experiences that align with TinkerHub’s mission of fostering innovation and learning. My role focuses on designing intuitive interfaces, improving user interaction flows, and collaborating closely with developers to bring ideas to life.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="s-testimonials__slide swiper-slide">
                                    <div className="s-testimonials__author">
                                        <img src="https://media.licdn.com/dms/image/v2/D560BAQGELCB6XhdFHQ/company-logo_200_200/B56ZhvEYS1G0AI-/0/1754210076342/mulearnsbc_logo?e=1763596800&v=beta&t=8JEqE6AZ5UrXQBh8Unb3AElhx2F_jUw_rbiOhBs-tss" alt="Author image" className="s-testimonials__avatar" />
                                        <cite className="s-testimonials__cite">
                                            <strong>Mulearn SBC</strong>
                                            <span>UI/UX Lead</span>
                                        </cite>
                                    </div>
                                    <p>
                                        As the UI/UX Lead at μLearn SBC, I guide and mentor a team of passionate designers in creating user-friendly digital experiences. My role involves leading design initiatives, setting clear design standards, and ensuring user experiences across platforms.
I’ve successfully organized  mentored members in UI/UX fundamentals, and collaborated to turn ideas into functional prototypes.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="s-testimonials__slide swiper-slide">
                                    <div className="s-testimonials__author">
                                        <img src="data:image/jpeg;base64,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" alt="Author image" className="s-testimonials__avatar" />
                                        <cite className="s-testimonials__cite">
                                            <strong>Mulearn Foundation</strong>
                                            <span>Member</span>
                                        </cite>
                                    </div>
                                    <p>
                                        “Proud to be a member of the µLearn Foundation with 30,000+ karma points! Grateful for the journey of learning, growth, and community.  #muLearn #KarmaPoints #LearningCommunity #GrowthMindset”
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="s-testimonials__slide swiper-slide">
                                    <div className="s-testimonials__author">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggNB_uNazKerQB1VrUcV8AtanngWDhyaKcQ&s" alt="Author image" className="s-testimonials__avatar" />
                                        <cite className="s-testimonials__cite">
                                            <strong>IEEE SB SBCE</strong>
                                            <span>Sub-Execom Program Coordination</span>
                                        </cite>
                                    </div>
                                    <p>
                                        The Program Coordination team is responsible for planning, organizing, and managing various events and activities under IEEE. The team ensures smooth execution of programs by coordinating with different committees, scheduling sessions, and handling event logistics. Their goal is to deliver well-structured, impactful events that enhance member engagement and learning.
                                    </p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Works;