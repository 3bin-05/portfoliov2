import React, { useState, useEffect } from 'react';

function Preloader() {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setFadeOut(true);
            setTimeout(() => setShow(false), 600); // Corresponds to transition duration
            document.documentElement.classList.remove('ss-preload');
            document.documentElement.classList.add('ss-loaded');
            document.body.classList.add('ss-show');
        };

        window.addEventListener('load', handleLoad);

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (!show) return null;

    return (
        <div id="preloader" style={{ opacity: fadeOut ? 0 : 1 }}>
            <div id="loader" className="dots-fade">
                <div></div><div></div><div></div>
            </div>
        </div>
    );
}

export default Preloader;