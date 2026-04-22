import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Background from './components/Background';
import { useAppContext } from './context/AppContext';
import { translations } from './constants/translations';
import { Camera, Globe, Mail } from 'lucide-react';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const { lang, theme } = useAppContext();
  const t = translations[lang].footer;

  return (
    <div className={`App ${theme}`}>
      <Background />
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="social-links">
          <a href="#" className="social-link"><Camera size={20} /> Instagram</a>
          <a href="#" className="social-link"><Globe size={20} /> Behance</a>
          <a href="mailto:hola@maicomaceira.com" className="social-link"><Mail size={20} /> {lang === 'es' ? 'Contacto' : 'Contact'}</a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} Maico Maceira. {t.rights} | <a href="/login" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>Admin</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
