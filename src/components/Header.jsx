import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const Header = () => {
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto', borderRadius: '4px' }} />
          <span>maicomaceira</span>
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.portfolio}</a>
            <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.bio}</a>
            <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.contact}</a>
          </nav>

          <div className="controls">
            <button className="control-btn" onClick={toggleLang} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={14} /> {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button className="control-btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
