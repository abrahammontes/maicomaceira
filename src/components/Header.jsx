import React from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';
import { Sun, Moon, Globe } from 'lucide-react';

const Header = () => {
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();
  const t = translations[lang].nav;

  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <a href="/" className="logo">maicomaceira</a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <nav className="nav-links">
            <a href="#gallery" className="nav-link">{t.portfolio}</a>
            <a href="#about" className="nav-link">{t.bio}</a>
            <a href="#contact" className="nav-link">{t.contact}</a>
          </nav>

          <div className="controls">
            <button className="control-btn" onClick={toggleLang} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={14} /> {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button className="control-btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
