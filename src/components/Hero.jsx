import React from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';

const Hero = () => {
  const { lang } = useAppContext();
  const t = translations[lang].hero;

  return (
    <section className="hero">
      <div className="hero-background-image"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle">{t.subtitle}</p>
        <h1 className="hero-title">Maico Maceira</h1>
      </div>
    </section>
  );
};

export default Hero;
