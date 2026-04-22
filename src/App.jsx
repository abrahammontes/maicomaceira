import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Background from './components/Background';
import { useAppContext } from './context/AppContext';
import { translations } from './constants/translations';
import { Camera, Globe, Mail, AlertTriangle } from 'lucide-react';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const { lang, theme } = useAppContext();
  const t = translations[lang].footer;
  
  const isMissingEnvVars = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className={`App ${theme}`}>
      {isMissingEnvVars && (
        <div style={{ background: '#ef4444', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '500', zIndex: 9999, position: 'relative', fontSize: '14px' }}>
          <AlertTriangle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', marginBottom: '2px' }}/>
          Error de configuración: Faltan las variables <strong>VITE_SUPABASE_URL</strong> y <strong>VITE_SUPABASE_ANON_KEY</strong> en Vercel.
        </div>
      )}
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
