import React from 'react';
import Preloader from './Preloader';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, isStylesPage = false }) {
    return (
        <>
            <Preloader />
            <div id="page" className="s-pagewrap">
                <Header isStylesPage={isStylesPage} />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;