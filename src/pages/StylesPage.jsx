import React from 'react';
import Layout from '../components/Layout';
import introBg from '../assets/images/intro-bg.jpg';
import sampleImage from '../assets/images/sample-image.jpg';
import wheel500 from '../assets/images/wheel-500.jpg';
import wheel1000 from '../assets/images/wheel-1000.jpg';

function StylesPage() {
    return (
        <Layout isStylesPage={true}>
            <section id="intro" className="s-intro">
                <div className="row s-intro__content width-sixteen-col">
                    <div className="column lg-12 s-intro__content-inner grid-block grid-16">
                        <div className="s-intro__content-text">
                            <div className="s-intro__content-pretitle text-pretitle">Hello</div>
                        <h1 className="s-intro__content-title">
                            I'm Ebin Reji <br />
                            a UI/UX Designer <br />
                            based in Kerala, India.
                        </h1>
                            <div className="s-intro__content-btns">
                                <a className="btn" href="/#about">More About Me</a>
                                <a className="btn btn--stroke" href="/#footer">Get In Touch</a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="s-intro__social social-list">
                    <li><a href="#0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325,1.42-3.592,3.5-3.592 c0.699-0.002,1.399,0.034,2.095,0.107v2.42h-1.435c-1.128,0-1.348,0.538-1.348,1.325v1.735h2.697l-0.35,2.725h-2.348V21H20 c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z"></path></svg><span className="u-screen-reader-text">Facebook</span></a></li>
                    <li><a href="#0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"></path></svg><span className="u-screen-reader-text">Twitter</span></a></li>
                    <li><a href="#0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M11.999,7.377c-2.554,0-4.623,2.07-4.623,4.623c0,2.554,2.069,4.624,4.623,4.624c2.552,0,4.623-2.07,4.623-4.624 C16.622,9.447,14.551,7.377,11.999,7.377L11.999,7.377z M11.999,15.004c-1.659,0-3.004-1.345-3.004-3.003 c0-1.659,1.345-3.003,3.004-3.003s3.002,1.344,3.002,3.003C15.001,13.659,13.658,15.004,11.999,15.004L11.999,15.004z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533,6.111c-0.469-1.209-1.424-2.165-2.633-2.632c-0.699-0.263-1.438-0.404-2.186-0.42 c-0.963-0.042-1.268-0.054-3.71-0.054s-2.755,0-3.71,0.054C7.548,3.074,6.809,3.215,6.11,3.479C4.9,3.946,3.945,4.902,3.477,6.111 c-0.263,0.7-0.404,1.438-0.419,2.186c-0.043,0.962-0.056,1.267-0.056,3.71c0,2.442,0,2.753,0.056,3.71 c0.015,0.748,0.156,1.486,0.419,2.187c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45 c0.963,0.042,1.268,0.055,3.71,0.055s2.755,0,3.71-0.055c0.747-0.015,1.486-0.157,2.186-0.419c1.209-0.469,2.164-1.424,2.633-2.633 c0.263-0.7,0.404-1.438,0.419,2.186c0.043-0.962,0.056-1.267,0.056-3.71s0-2.753-0.056-3.71C20.941,7.57,20.801,6.819,20.533,6.111z M19.315,15.643c-0.007,0.576-0.111,1.147-0.311,1.688c-0.305,0.787-0.926,1.409-1.712,1.711c-0.535,0.199-1.099,0.303-1.67,0.311 c-0.95,0.044-1.218,0.055-3.654,0.055c-2.438,0-2.687,0-3.655-0.055c-0.569-0.007-1.135-0.112-1.669-0.311 c-0.789-0.301-1.414-0.923-1.719-1.711c-0.196-0.534-0.302-1.099-0.311-1.669c-0.043-0.95-0.053-1.218-0.053-3.654 c0-2.437,0-2.686,0.053-3.655c0.007-0.576,0.111-1.146,0.311-1.687c0.305-0.789,0.93-1.41,1.719-1.712 c0.534-0.198,1.1-0.303,1.669-0.311c0.951-0.043,1.218-0.055,3.655-0.055c2.437,0,2.687,0,3.654,0.055 c0.571,0.007,1.135,0.112,1.67,0.311c0.786,0.303,1.407,0.925,1.712,1.712c0.196,0.534,0.302,1.099,0.311,1.669 c0.043,0.951,0.054,1.218,0.054,3.655c0,2.436,0,2.698-0.043,3.654H19.315z"></path></svg><span className="u-screen-reader-text">Instagram</span></a></li>
                    <li><a href="#0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M20.66 6.98a9.932 9.932 0 0 0-3.641-3.64C15.486 2.447 13.813 2 12 2s-3.486.447-5.02 1.34c-1.533.893-2.747 2.107-3.64 3.64S2 10.187 2 12s.446 3.487 1.34 5.02a9.924 9.924 0 0 0 3.641 3.64C8.514 21.553 10.187 22 12 22s3.486-.447 5.02-1.34a9.932 9.932 0 0 0 3.641-3.64C21.554 15.487 22 13.813 22 12s-.446-3.487-1.34-5.02zM12 3.66c2 0 3.772.64 5.32 1.919-.92 1.174-2.286 2.14-4.1 2.9-1.002-1.813-2.088-3.327-3.261-4.54A7.715 7.715 0 0 1 12 3.66zM5.51 6.8a8.116 8.116 0 0 1 2.711-2.22c1.212 1.201 2.325 2.7 3.34 4.5-2 .6-4.114.9-6.341.9-.573 0-1.006-.013-1.3-.04A8.549 8.549 0 0 1 5.51 6.8zM3.66 12c0-.054.003-.12.01-.2.007-.08.01-.146.01-.2.254.014.641.02 1.161.02 2.666 0 5.146-.367 7.439-1.1.187.373.381.793.58 1.26-1.32.293-2.674 1.006-4.061 2.14S6.4 16.247 5.76 17.5c-1.4-1.587-2.1-3.42-2.1-5.5zM12 20.34c-1.894 0-3.594-.587-5.101-1.759.601-1.187 1.524-2.322 2.771-3.401 1.246-1.08 2.483-1.753 3.71-2.02a29.441 29.441 0 0 1 1.56 6.62 8.166 8.166 0 0 1-2.94.56zm7.08-3.96a8.351 8.351 0 0 1-2.58 2.621c-.24-2.08-.7-4.107-1.379-6.081.932-.066 1.765-.1 2.5-.1.799 0 1.686.034 2.659.1a8.098 8.098 0 0 1-1.2 3.46zm-1.24-5c-1.16 0-2.233.047-3.22.14a27.053 27.053 0 0 0-.68-1.62c2.066-.906 3.532-2.006 4.399-3.3 1.2 1.414 1.854 3.027 1.96 4.84-.812-.04-1.632-.06-2.459-.06z"></path></svg><span className="u-screen-reader-text">Dribbble</span></a></li>
                    <li><a href="#0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M11.99 2C6.472 2 2 6.473 2 11.99c0 4.232 2.633 7.85 6.35 9.306-.088-.79-.166-2.006.034-2.868.182-.78 1.172-4.966 1.172-4.966s-.299-.599-.299-1.484c0-1.388.805-2.425 1.808-2.425.853 0 1.264.64 1.264 1.407 0 .858-.546 2.139-.827 3.327-.235.994.499 1.805 1.479 1.805 1.775 0 3.141-1.872 3.141-4.575 0-2.392-1.719-4.064-4.173-4.064-2.843 0-4.512 2.132-4.512 4.335 0 .858.331 1.779.744 2.28a.3.3 0 0 1 .069.286c-.076.315-.245.994-.277 1.133-.044.183-.145.222-.335.134-1.247-.581-2.027-2.405-2.027-3.871 0-3.151 2.289-6.045 6.601-6.045 3.466 0 6.159 2.469 6.159 5.77 0 3.444-2.171 6.213-5.184 6.213-1.013 0-1.964-.525-2.29-1.146l-.623 2.374c-.225.868-.834 1.956-1.241 2.62a10 10 0 0 0 2.958.445c5.517 0 9.99-4.473 9.99-9.99S17.507 2 11.99 2"></path></svg><span className="u-screen-reader-text">Pinterest</span></a></li>
                </ul>
                <div className="s-intro__content-media">
                    <img src={introBg} srcSet={`${introBg} 1x, ${introBg} 2x`} alt="" />
                </div>
                <div className="s-intro__btn-download">
                    <a className="btn btn--stroke" href="/cv.pdf" download>Download CV</a>
                </div>
                <div className="s-intro__scroll-down">
                    <a href="#styles" className="smoothscroll">
                        <div className="scroll-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
                        </div>
                        <span className="scroll-text u-screen-reader-text">Scroll Down</span>
                    </a>
                </div>
            </section>

            <section id="styles" className="s-styles">
                <div className="row">
                    <div className="column xl-12 intro">
                        <h1>Style Guide.</h1>
                        <p className="lead">Lorem ipsum Officia elit ad tempor dolore est ex incididunt incididunt occaecat culpa deserunt
                            sunt labore in cillum ullamco magna in Excepteur consequat in reprehenderit proident mollit incididunt officia commodo.
                            Duis ea officia sed dolor pariatur enim dolore dolore quis incididunt nulla exercitation commodo veniam et ea incididunt.
                        </p>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="column mob-12 md-6 stack-on-900">
                        <h3>Paragraph and Image</h3>
                        <p><a href="#"><img width="120" height="120" className="u-pull-left" alt="sample-image" src={sampleImage} /></a>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec libero. Suspendisse bibendum.Cras id urna. Morbi
                            tincidunt, orci ac convallis aliquam, lectus turpis varius lorem, eu posuere nunc justo tempus leo. Donec mattis,
                            purus nec placerat bibendum, dui pede condimentum odio, ac blandit ante orci ut diam. Cras fringilla magna.
                            Phasellus suscipit, leo a pharetra condimentum, lorem tellus eleifend magna, eget fringilla velit magna id
                            neque posuere nunc justo tempus leo. </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec libero. Suspendisse bibendum. Cras id urna.
                            Morbi tincidunt, orci ac convallis aliquam, lectus turpis varius lorem, eu posuere nunc justo tempus leo.
                            Donec mattis, purus nec placerat bibendum, dui pede condimentumodio, ac blandit ante orci ut diam.
                        </p>
                        <p>A <a href="#">link</a>,
                            <abbr title="this really isn't a very good description">abbrebation</abbr>,
                            <strong>strong text</strong>,
                            <em>em text</em>,
                            <del>deleted text</del>, and
                            <mark>this is a mark text.</mark>
                            <code>.code</code>
                        </p>
                    </div>
                    <div className="column mob-12 md-6">
                        <h3>Drop Caps</h3>
                        <p className="drop-cap">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
                            Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the
                            necessary regelialia. Morbi tincidunt, orci ac convallis aliquam, lectus turpis varius lorem,
                            euposuere nunc justo tempus leo. Donec mattis, purus nec placerat bibendum, dui pede condimentum odio,
                            ac blandit ante orci ut diam. Cras fringilla magna. Phasellus suscipit, leo a pharetra condimentum,
                            lorem tellus eleifend magna, eget fringilla velit magna id neque.
                        </p>
                        <h3>Small Print</h3>
                        <p><small>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec libero.</small></p>
                    </div>
                </div>

                <div className="row">
                    <div className="column xl-6 md-12">
                        <h3 className="u-add-bottom">Pull Quotes</h3>
                        <p>
                            Perspiciatis nemo unde et nobis modi consequatur officia amet. Ut enim
                            tenetur provident maiores. Perspiciatis asperiores incidunt sequi
                            quisquam. Enim aut.
                        </p>
                        <figure className="pull-quote">
                            <blockquote>
                                <p>
                                    When you look in the eyes of grace, when you meet grace,
                                    when you embrace grace, when you see the nail prints in
                                    grace’s hands and the fire in his eyes, when you feel his
                                    relentless love for you - it will not motivate you to sin.
                                    It will motivate you to righteousness.
                                </p>
                                <footer>
                                    <cite>Judah Smith</cite>
                                </footer>
                            </blockquote>
                        </figure>
                    </div>
                    <div className="column xl-6 md-12">
                        <h3 className="h-add-bottom">Block Quotes</h3>
                        <blockquote cite="http://where-i-got-my-info-from.com">
                            <p>
                                For God so loved the world, that he gave his only Son, that whoever believes in
                                him should not perish but have eternal life. For God did not send his Son into
                                the world to condemn the world, but in order that the world might be
                                saved through him.
                            </p>
                            <footer>
                                <cite>
                                    <a href="#0">John 3:16-17 ESV</a>
                                </cite>
                            </footer>
                        </blockquote>
                        <blockquote>
                            <p>There is a God-shaped vacuum in the heart of each man which cannot be satisfied
                                by any created thing but only by God the Creator.</p>
                            <footer>
                                <cite>Blaise Pascal</cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>

                <div className="row u-add-half-bottom">
                    <div className="column xl-6 md-12">
                        <h3>Example Lists</h3>
                        <ol>
                            <li>Here is an example</li>
                            <li>of an ordered list.</li>
                            <li>A parent list item.
                                <ul>
                                    <li>one</li>
                                    <li>two</li>
                                    <li>three</li>
                                </ul>
                            </li>
                            <li>A list item.</li>
                        </ol>
                        <ul className="disc">
                            <li>Here is an example</li>
                            <li>of an unordered list.</li>
                        </ul>
                        <h3>Definition Lists</h3>
                        <h5>a) Multi-line Definitions (default) </h5>
                        <dl className="dictionary-style">
                            <dt><strong>This is a term</strong></dt>
                            <dd>this is the definition of that term, which both live in a <code>dl</code>.</dd>
                            <dt><strong>Another Term</strong></dt>
                            <dd>And it gets a definition too, which is this line</dd>
                            <dd>This is a 2<sup>nd</sup> definition for a single term. A Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </dd>
                        </dl>
                        <h3 className="u-add-bottom">Skill Bars</h3>
                        <ul className="skill-bars">
                            <li>
                                <div className="progress percent90"><span>90%</span></div>
                                <strong>HTML</strong>
                            </li>
                            <li>
                                <div className="progress percent85"><span>85%</span></div>
                                <strong>CSS</strong>
                            </li>
                            <li>
                                <div className="progress percent70"><span>70%</span></div>
                                <strong>Javascript</strong>
                            </li>
                            <li>
                                <div className="progress percent95"><span>95%</span></div>
                                <strong>PHP</strong>
                            </li>
                            <li>
                                <div className="progress percent75"><span>75%</span></div>
                                <strong>Illustrator</strong>
                            </li>
                            <li>
                                <div className="progress percent90"><span>90%</span></div>
                                <strong>Figma</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="column xl-6 md-12">
                        <h3 className="u-add-bottom">Buttons</h3>
                        <p>
                            <a className="btn btn--primary u-fullwidth" href="#0">Primary Button</a>
                            <a className="btn u-fullwidth" href="#0">Default Button</a>
                            <a className="btn btn--stroke u-fullwidth" href="#0">Stroke Button</a>
                        </p>
                        <h3>Stats Tabs</h3>
                        <ul className="stats-tabs">
                            <li><a href="#0">1,234 <em>Peter</em></a></li>
                            <li><a href="#0">567 <em>James</em></a></li>
                            <li><a href="#0">23,456 <em>John</em></a></li>
                            <li><a href="#0">3,456 <em>Andrew</em></a></li>
                            <li><a href="#0">456 <em>Philip</em></a></li>
                            <li><a href="#0">26 <em>Matthew</em></a></li>
                        </ul>
                        <h3 className="u-add-bottom">Code</h3>
                        <pre><code className="language-css">
                            {`code {
    font-size: 1.4rem;
    margin: 0 .2rem;
    padding: .2rem .6rem;
    white-space: nowrap;
    background: #F1F1F1;
    border: 1px solid #E1E1E1;	
    border-radius: 3px;
}`}
                        </code></pre>
                    </div>
                </div>

                <div className="row u-add-half-bottom">
                    <div className="column xl-6 md-12">
                        <h1>H1 Heading Doloremque dolor voluptas est sequi omnis.</h1>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                        <h2>H2 Heading Doloremque dolor voluptas est sequi omnis.</h2>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                        <h3>H3 Heading Doloremque dolor voluptas est sequi omnis.</h3>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                    </div>
                    <div className="column xl-6 md-12">
                        <h4>H4 Heading Doloremque dolor voluptas est sequi omnis.</h4>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                        <h5>H5 Heading Doloremque dolor voluptas est sequi omnis.</h5>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                        <h6>H6 Heading Doloremque dolor voluptas est sequi omnis.</h6>
                        <p>Doloremque dolor voluptas est sequi omnis. Pariatur ut aut. Sed enim tempora qui veniam qui cum vel.
                            Voluptas odit at vitae minima. In assumenda ut. Voluptatem totam impedit accusantium reiciendis excepturi aut qui accusamus praesentium.</p>
                    </div>
                </div>

                <div className="row u-add-half-bottom">
                    <div className="column xl-6 md-12">
                        <h3 className="u-add-bottom">Responsive Image</h3>
                        <figure>
                            <img src={wheel500}
                                srcSet={`${wheel1000} 1000w, ${wheel500} 500w`}
                                sizes="(max-width: 1000px) 100vw, 1000px" alt="" />
                            <figcaption>
                                Here is some random picture.
                            </figcaption>
                        </figure>
                    </div>
                    <div className="column xl-6 md-12">
                        <h3 className="u-add-bottom">Responsive video</h3>
                        <div className="video-container">
                            <iframe src="https://player.vimeo.com/video/14592941?color=00a650&title=0&byline=0&portrait=0" width="500" height="281" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>

                <div className="row u-add-bottom">
                    <div className="column xl-12">
                        <h3>Tables</h3>
                        <p>Be sure to use properly formed table markup with <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> when building a <code>table</code>.</p>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Sex</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>William J. Seymour</td>
                                        <td>34</td>
                                        <td>Male</td>
                                        <td>Azusa Street</td>
                                    </tr>
                                    <tr>
                                        <td>Jennie Evans Moore</td>
                                        <td>30</td>
                                        <td>Female</td>
                                        <td>Azusa Street</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="column xl-12">
                        <h3>Pagination</h3>
                        <nav className="pgn">
                            <ul>
                                <li>
                                    <a className="pgn__prev" href="#0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" /></svg>
                                    </a>
                                </li>
                                <li><a className="pgn__num" href="#0">1</a></li>
                                <li><span className="pgn__num current">2</span></li>
                                <li><a className="pgn__num" href="#0">3</a></li>
                                <li><a className="pgn__num" href="#0">4</a></li>
                                <li><a className="pgn__num" href="#0">5</a></li>
                                <li><span className="pgn__num dots">…</span></li>
                                <li><a className="pgn__num" href="#0">8</a></li>
                                <li>
                                    <a className="pgn__next" href="#0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" /></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="column xl-6 md-12">
                        <h3 className="u-add-bottom">Form Styles</h3>
                        <form>
                            <div>
                                <label htmlFor="sampleInput">Your email</label>
                                <input className="u-fullwidth" type="email" placeholder="test@mailbox.com" id="sampleInput" />
                            </div>
                            <div>
                                <label htmlFor="sampleRecipientInput">Reason for contacting</label>
                                <div className="ss-custom-select">
                                    <select className="u-fullwidth" id="sampleRecipientInput">
                                        <option value="Option 1">Questions</option>
                                        <option value="Option 2">Report</option>
                                        <option value="Option 3">Others</option>
                                    </select>
                                </div>
                            </div>
                            <label htmlFor="exampleMessage">Message</label>
                            <textarea className="u-fullwidth" placeholder="Your message" id="exampleMessage"></textarea>
                            <label className="u-add-bottom">
                                <input type="checkbox" />
                                <span className="label-text">Send a copy to yourself</span>
                            </label>
                            <input className="btn--primary u-fullwidth" type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className="column xl-6 md-12">
                        <h3>Alert Boxes</h3>
                        <br />
                        <div className="alert-box alert-box--error">
                            <p>Error Message. Your Message Goes Here.</p>
                            <span className="alert-box__close"></span>
                        </div>
                        <div className="alert-box alert-box--success">
                            <p>Success Message. Your Message Goes Here.</p>
                            <span className="alert-box__close"></span>
                        </div>
                        <div className="alert-box alert-box--info">
                            <p>Info Message. Your Message Goes Here.</p>
                            <span className="alert-box__close"></span>
                        </div>
                        <div className="alert-box alert-box--notice">
                            <p>Notice Message. Your Message Goes Here.</p>
                            <span className="alert-box__close"></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-12 column">
                        <h3 className="half-bottom">Grid Columns</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-4 md-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-4 md-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-4 md-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-3 md-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-3 md-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-3 md-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-3 md-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-6 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-8 md-7 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                    <div className="xl-4 md-5 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="xl-3 md-5 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at.
                        </p>
                    </div>
                    <div className="xl-9 md-7 tab-12 column">
                        <p>
                            Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
                            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
                            faucibus at, tincidunt eget, porttitor non, dolor.
                        </p>
                    </div>
                </div>
                <hr className="fancy" />
            </section>
        </Layout>
    );
}

export default StylesPage;