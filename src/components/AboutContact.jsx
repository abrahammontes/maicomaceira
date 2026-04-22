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
        <div className="container about-content glass" style={{ padding: '60px', marginTop: '60px' }}>
          <div className="about-image">
            <img 
              src="/images/maico_maceira_portrait.jpg" 
              alt="Maico Maceira" 
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }} 
            />
          </div>
          <div className="about-text">
            <h2>{tAbout.title}</h2>
            <p>{tAbout.p1}</p>
            <p>{tAbout.p2}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="container" style={{ padding: '100px 0' }}>
        <div className="glass" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '80px 40px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '2rem' }}>{tContact.title}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>{tContact.subtitle}</p>
          <a 
            href="mailto:hola@maicomaceira.com" 
            className="contact-btn-glass"
            style={{ 
              display: 'inline-block', 
              padding: '20px 40px', 
              border: '1px solid var(--text)', 
              color: 'var(--text)', 
              textDecoration: 'none', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              borderRadius: '30px'
            }}
          >
            {tContact.button}
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutContact;
