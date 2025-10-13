import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

function Header({ isStylesPage }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isOffset, setIsOffset] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const headerRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const body = document.body;
        if (menuOpen) {
            body.classList.add('menu-is-open');
        } else {
            body.classList.remove('menu-is-open');
        }
    }, [menuOpen]);

    useEffect(() => {
        if (isStylesPage) return;

        const hero = document.querySelector('#intro');
        if (!hero) return;

        const triggerHeight = hero.offsetHeight - 170;

        const handleScroll = () => {
            const loc = window.scrollY;
            setIsSticky(loc > triggerHeight);
            setIsOffset(loc > triggerHeight + 20);
            setIsScrolling(loc > triggerHeight + 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isStylesPage]);

    const scrollToSection = (e, selector) => {
        e.preventDefault();
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.matchMedia('(max-width: 900px)').matches) {
            setMenuOpen(false);
        }
    };

    const headerClasses = `s-header
        ${isSticky ? 'sticky' : ''}
        ${isOffset ? 'offset' : ''}
        ${isScrolling ? 'scrolling' : ''}`;

    return (
        <header className={headerClasses} ref={headerRef}>
            <div className="row s-header__inner">
                <div className="s-header__block">
                    <div className="s-header__logo">
                        <Link className="logo" to="/">
                            <img src={logo} alt="Homepage" />
                        </Link>
                    </div>
                    <a className={`s-header__menu-toggle ${menuOpen ? 'is-clicked' : ''}`} href="#0" onClick={toggleMenu}><span>Menu</span></a>
                </div>

                <nav className="s-header__nav">
                    <ul className="s-header__menu-links">
                        {isStylesPage ? (
                            <>
                                <li className="current"><Link to="/">Intro</Link></li>
                                <li><Link to="/#about">About</Link></li>
                                <li><Link to="/#works">Works</Link></li>
                                <li><Link to="/#footer">Contact</Link></li>
                            </>
                        ) : (
                            <>
                                <li><a href="#intro" onClick={(e) => scrollToSection(e, '#intro')}>Intro</a></li>
                                <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>About</a></li>
                                <li><a href="#works" onClick={(e) => scrollToSection(e, '#works')}>Works</a></li>
                                <li><a href="#footer" onClick={(e) => scrollToSection(e, '#footer')}>Contact</a></li>
                            </>
                        )}
                         <li><Link to="/styles">Styles</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;