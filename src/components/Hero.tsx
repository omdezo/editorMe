import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-line">Creative</span>
          <span className="hero-line">Vision</span>
        </h1>

        <p className="hero-description">
          Designer & Developer crafting digital experiences
        </p>

        <a href="#portfolio" className="hero-button">
          <span>View Work</span>
          <span className="arrow">→</span>
        </a>
      </div>

      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
