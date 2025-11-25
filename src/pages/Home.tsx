import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import AboutMe from '../components/AboutMe';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import SmoothScroll from '../components/SmoothScroll';
import FilmGrain from '../components/FilmGrain';
import Timecode from '../components/Timecode';

const Home: React.FC = () => {
    return (
        <>
            <CustomCursor />
            <SmoothScroll />
            <FilmGrain />
            <Timecode />
            <Navbar />
            <main>
                <Hero />
                <Portfolio />
                <AboutMe />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
