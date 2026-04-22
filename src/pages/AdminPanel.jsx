import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Upload, Trash2, LogOut, Image as ImageIcon, CheckCircle, User, Edit2, Check, X } from 'lucide-react';

const AdminPanel = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('High Res');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [editingImageId, setEditingImageId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = apiService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const user = await apiService.getUser();
      if (user) {
        setUserEmail(user.email);
        fetchImages();
      } else {
        navigate('/login');
      }
    };
    checkUser();
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
    try {
      await apiService.uploadImage(file, description, resolution);
      setMessage('Imagen subida con éxito');
      setFile(null);
      setDescription('');
      fetchImages();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Error al subir imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, filename) => {
    if (window.confirm('¿Estás seguro de eliminar esta foto?')) {
      await apiService.deleteImage(id, filename);
      fetchImages();
    }
  };

  const handleEditClick = (img) => {
    setEditingImageId(img.id);
    setEditDescription(img.description || '');
  };

  const handleCancelEdit = () => {
    setEditingImageId(null);
    setEditDescription('');
  };

  const handleSaveEdit = async (id) => {
    setLoading(true);
    try {
      await apiService.updateImageDescription(id, editDescription);
      setMessage('Descripción actualizada');
      setEditingImageId(null);
      fetchImages();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error al actualizar descripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard" style={{ padding: '120px 20px 40px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Gestiona tu portafolio fotográfico</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {userEmail && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(255, 255, 255, 0.05)', padding: '8px 15px', borderRadius: '20px' }}>
              <User size={16} />
              {userEmail}
            </div>
          )}
          <button 
            onClick={handleLogout} 
            className="control-btn" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 16px', 
              background: 'rgba(255, 0, 0, 0.1)', 
              color: '#ff4d4d', 
              border: '1px solid rgba(255, 0, 0, 0.2)', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              transition: 'all 0.2s',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)'}
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
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
                <option value="Portrait" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Portrait</option>
                <option value="Landscape" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Landscape</option>
                <option value="Web Res" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Web Res</option>
                <option value="High Res" style={{ background: 'var(--bg)', color: 'var(--text)' }}>High Res</option>
                <option value="4K" style={{ background: 'var(--bg)', color: 'var(--text)' }}>4K</option>
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
                  src={img.publicUrl} 
                  alt={img.description} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: editingImageId === img.id ? 'brightness(0.3)' : 'none' }}
                />
                
                {editingImageId === img.id ? (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '15px', background: 'rgba(0,0,0,0.6)' }}>
                    <textarea 
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Nueva descripción..."
                      style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '5px', padding: '10px', resize: 'none', marginBottom: '10px', fontSize: '0.8rem' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleSaveEdit(img.id)} style={{ flex: 1, background: '#4ade80', color: 'black', border: 'none', borderRadius: '5px', padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title="Guardar">
                        <Check size={16} />
                      </button>
                      <button onClick={handleCancelEdit} style={{ flex: 1, background: '#f87171', color: 'white', border: 'none', borderRadius: '5px', padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title="Cancelar">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ position: 'absolute', top: '5px', right: '5px', display: 'flex', gap: '5px' }}>
                      <button 
                        onClick={() => handleEditClick(img)}
                        style={{ background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', color: 'white' }}
                        title="Editar descripción"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(img.id, img.filename)}
                        style={{ background: 'rgba(255,0,0,0.7)', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', color: 'white' }}
                        title="Eliminar foto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                      padding: '25px 10px 10px', 
                      fontSize: '0.75rem',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ fontWeight: 'bold' }}>{img.resolution}</div>
                      <div style={{ opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {img.description || 'Sin descripción'}
                      </div>
                    </div>
                  </>
                )}
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
