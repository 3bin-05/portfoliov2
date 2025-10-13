import React from 'react';
import Layout from '../components/Layout';
import Intro from '../components/Intro';
import About from '../components/About';
import Works from '../components/Works';
import Numbers from '../components/Numbers';

function HomePage() {
    return (
        <Layout>
            <Intro />
            <About />
            <Works />
            <Numbers />
        </Layout>
    );
}

export default HomePage;