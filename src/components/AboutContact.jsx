import React from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';

const AboutContact = () => {
  const { lang } = useAppContext();
  const tAbout = translations[lang].about;
  const tContact = translations[lang].contact;

  return (
    <>
      <section id="about" className="about-section">
        <div className="container about-content glass">
          <div className="about-image">
            <img 
              src="/images/maico_maceira_portrait.jpg" 
              alt="Maico Maceira" 
              className="about-portrait"
            />
          </div>
          <div className="about-text">
            <h2>{tAbout.title}</h2>
            <p>{tAbout.p1}</p>
            <p>{tAbout.p2}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="container contact-section">
        <div className="glass contact-card">
          <h2 className="contact-title">{tContact.title}</h2>
          <p className="contact-subtitle">{tContact.subtitle}</p>
          <a 
            href="mailto:hola@maicomaceira.com" 
            className="contact-btn-glass"
          >
            {tContact.button}
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutContact;
