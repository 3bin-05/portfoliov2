import React from 'react';
import { Link } from 'react-router-dom';
import gallery1 from '../assets/images/folio/caffeine_and_tulips.jpg';
import gallery2 from '../assets/images/folio/grayscale.jpg';
import gallery3 from '../assets/images/folio/lamp.jpg';
import gallery4 from '../assets/images/folio/tropical.jpg';
import gallery5 from '../assets/images/folio/white_turban.jpg';
import gallery6 from '../assets/images/folio/woodcraft.jpg';

function Works() {
    return (
        <section id="works" className="s-works">
            <div className="row">
                <div className="column lg-12">
                    <div className="section-header" data-num="02">
                        <h2 className="text-display-title">My Works.</h2>
                    </div>
                </div>
            </div>

            <div className="row s-works__content">
                <div className="column xl-12">
                    <p className="lead">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>

            <div className="row s-works__projects">
                <div className="column xl-12">
                    <div className="folio-list">
                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery1} srcSet={`${gallery1} 1x, ../assets/images/folio/caffeine_and_tulips@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Branding</div>
                                <h3 className="folio-list__item-title">Caffeine &amp; Tulips</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery2} srcSet={`${gallery2} 1x, ../assets/images/folio/grayscale@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Photography</div>
                                <h3 className="folio-list__item-title">Grayscale</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery3} srcSet={`${gallery3} 1x, ../assets/images/folio/lamp@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Product Design</div>
                                <h3 className="folio-list__item-title">Lamp</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery4} srcSet={`${gallery4} 1x, ../assets/images/folio/tropical@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Branding</div>
                                <h3 className="folio-list__item-title">Tropical</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery5} srcSet={`${gallery5} 1x, ../assets/images/folio/white_turban@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Photography</div>
                                <h3 className="folio-list__item-title">White Turban</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="folio-list__item">
                            <div className="folio-list__item-media">
                                <img src={gallery6} srcSet={`${gallery6} 1x, ../assets/images/folio/woodcraft@2x.jpg 2x`} alt="" />
                            </div>
                            <div className="folio-list__item-caption">
                                <div className="folio-list__item-cat">Product Design</div>
                                <h3 className="folio-list__item-title">Woodcraft</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row s-works__content">
                <div className="column xl-12">
                    <div className="s-works__btn">
                        <Link to="/styles" className="btn">View All Works</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Works;
