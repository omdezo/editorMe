import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized position from center (-1 to 1)
      const xNorm = (clientX / innerWidth - 0.5) * 2;
      const yNorm = (clientY / innerHeight - 0.5) * 2;

      // Calculate distance from center (0 to ~1.4)
      const distance = Math.sqrt(xNorm * xNorm + yNorm * yNorm);

      // Max separation in pixels
      const maxOffset = 40;

      // Apply offset based on distance (further = more split)
      const xOffset = xNorm * maxOffset * distance;
      const yOffset = yNorm * maxOffset * distance;

      container.style.setProperty('--red-x', `${xOffset * -1}px`);
      container.style.setProperty('--red-y', `${yOffset * -1}px`);

      container.style.setProperty('--blue-x', `${xOffset}px`);
      container.style.setProperty('--blue-y', `${yOffset}px`);

      // Green stays relatively stable or moves slightly
      container.style.setProperty('--green-x', `${xOffset * 0.2}px`);
      container.style.setProperty('--green-y', `${yOffset * 0.2}px`);

      // Parallax for text (moves opposite to mouse)
      container.style.setProperty('--text-x', `${xNorm * -20}px`);
      container.style.setProperty('--text-y', `${yNorm * -20}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-prism-container" ref={containerRef}>

      <div className="prism-wrapper">
        {/* Red Channel */}
        <div className="prism-layer layer-red"></div>

        {/* Green Channel */}
        <div className="prism-layer layer-green"></div>

        {/* Blue Channel */}
        <div className="prism-layer layer-blue"></div>
      </div>

      {/* Film Grain Overlay */}
      <div className="film-grain"></div>

      <div className="prism-content">
        <h1 className="prism-title">
          {t('hero.title').split(' ').slice(0, 2).join(' ')}<br />
          {t('hero.title').split(' ').slice(2).join(' ')}
        </h1>
        <p className="prism-subtitle">
          {t('hero.subtitle')}
        </p>
      </div>

      <div className="vignette"></div>

      <div className="scroll-indicator">
        <span>{t('hero.scroll')}</span>
      </div>

    </section>
  );
};

export default Hero;