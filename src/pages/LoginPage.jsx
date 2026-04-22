import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Lock, User, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await apiService.login(email, password);
      if (data.session || data.user) {
        navigate('/admin');
      } else {
        setError('Error de autenticación');
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con Supabase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass login-card" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '40px',
        borderRadius: '20px',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--accent)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}>
            <Lock color="white" size={24} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Maico Maceira Portfolio</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 0, 0, 0.1)', 
            border: '1px solid rgba(255, 0, 0, 0.3)', 
            color: '#ff4d4d',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                required
                style={{ 
                  width: '100%', 
                  padding: '12px 12px 12px 40px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '10px',
                  color: 'var(--text)',
                  outline: 'none'
                }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '12px 12px 12px 40px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '10px',
                  color: 'var(--text)',
                  outline: 'none'
                }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: 'var(--accent)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
