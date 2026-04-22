import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import AboutContact from './components/AboutContact';
import { Camera, Globe, Mail } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import { translations } from './constants/translations';

import Background from './components/Background';

function App() {
  const { lang, theme } = useAppContext();
  const t = translations[lang].footer;

  return (
    <div className={`App ${theme}`}>
      <Background />
      <Header />
      <main>
        <Hero />
        <Gallery />
        <AboutContact />
      </main>
      
      <footer className="footer">
        <div className="social-links">
          <a href="#" className="social-link"><Camera size={20} /> Instagram</a>
          <a href="#" className="social-link"><Globe size={20} /> Behance</a>
          <a href="mailto:hola@maicomaceira.com" className="social-link"><Mail size={20} /> {lang === 'es' ? 'Contacto' : 'Contact'}</a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} Maico Maceira. {t.rights}
        </p>
      </footer>
    </div>
  );
}

export default App;
