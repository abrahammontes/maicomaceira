import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Upload, Trash2, LogOut, Image as ImageIcon, CheckCircle } from 'lucide-react';

const AdminPanel = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('High Res');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = apiService.getToken();
    if (!token) {
      navigate('/login');
    } else {
      fetchImages();
    }
  }, [navigate]);

  const fetchImages = async () => {
    try {
      const data = await apiService.getImages();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append('resolution', resolution);

    try {
      await apiService.uploadImage(formData);
      setMessage('Imagen subida con éxito');
      setFile(null);
      setDescription('');
      fetchImages();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error al subir imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta foto?')) {
      await apiService.deleteImage(id);
      fetchImages();
    }
  };

  return (
    <div className="admin-dashboard" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Gestiona tu portafolio fotográfico</p>
        </div>
        <button onClick={handleLogout} className="control-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
          <LogOut size={18} /> Salir
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Upload Section */}
        <section className="glass" style={{ padding: '30px', borderRadius: '20px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Upload size={20} /> Nueva Fotografía
          </h3>
          
          <form onSubmit={handleUpload}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>ARCHIVO</label>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                required
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px dashed rgba(255,255,255,0.2)', 
                  borderRadius: '10px',
                  color: 'var(--text)'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>RESOLUCIÓN</label>
              <select 
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '10px',
                  color: 'var(--text)'
                }}
              >
                <option value="Portrait">Portrait</option>
                <option value="Landscape">Landscape</option>
                <option value="Web Res">Web Res</option>
                <option value="High Res">High Res</option>
                <option value="4K">4K</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>DESCRIPCIÓN</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Captura de artes escénicas..."
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '10px',
                  color: 'var(--text)',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '15px', 
                background: 'var(--accent)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: 'bold', 
                cursor: 'pointer' 
              }}
            >
              {loading ? 'Subiendo...' : 'Publicar en Portafolio'}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: '20px', color: message.includes('éxito') ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <CheckCircle size={16} /> {message}
            </div>
          )}
        </section>

        {/* List Section */}
        <section className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ImageIcon size={20} /> Galería Actual
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
            {images.map((img) => (
              <div key={img.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', aspectRatio: '1' }}>
                <img 
                  src={`http://localhost:5000/uploads/${img.filename}`} 
                  alt={img.description} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button 
                  onClick={() => handleDelete(img.id)}
                  style={{ 
                    position: 'absolute', 
                    top: '5px', 
                    right: '5px', 
                    background: 'rgba(255,0,0,0.7)', 
                    border: 'none', 
                    borderRadius: '5px', 
                    padding: '5px', 
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <Trash2 size={14} />
                </button>
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  background: 'rgba(0,0,0,0.5)', 
                  padding: '5px', 
                  fontSize: '0.7rem',
                  color: 'white'
                }}>
                  {img.resolution}
                </div>
              </div>
            ))}
          </div>
          {images.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No hay imágenes en la galería.</p>}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
