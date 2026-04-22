import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';
import { apiService } from '../services/api';

const Gallery = () => {
  const { lang } = useAppContext();
  const t = translations[lang].gallery.items;
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState(null);

  const staticItems = [
    { id: 's1', filename: '/images/portrait_black_white_1776816332419.png', description: t.portrait, resolution: 'High Res', category: 'Retrato' },
    { id: 's2', filename: '/images/lifestyle_fashion_1776816346376.png', description: t.lifestyle, resolution: 'High Res', category: 'General' },
    { id: 's3', filename: '/images/dramatic_theater_1776816359304.png', description: t.theater, resolution: 'High Res', category: 'Eventos' },
    { id: 's4', filename: '/images/minimalist_landscape_1776816375040.png', description: t.landscape, resolution: 'High Res', category: 'Paisaje' },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await apiService.getImages();
      // Combine static items with DB items, prioritizing DB items
      const dynamicItems = (data && data.length > 0) ? data : [];
      setImages([...staticItems, ...dynamicItems]);
    } catch (err) {
      console.error('API Error, using fallback static items');
      setImages(staticItems);
    }
  };

  const uniqueCategories = ['Todas', ...new Set(images.map(img => img.category || 'General'))];

  const filteredImages = selectedCategory === 'Todas' 
    ? images 
    : images.filter(img => (img.category || 'General') === selectedCategory);

  return (
    <section id="gallery" className="gallery-section container">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {uniqueCategories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? 'var(--accent)' : 'var(--bg)',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text)',
              border: `1px solid ${selectedCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
              padding: '8px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              boxShadow: selectedCategory !== cat ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((item) => (
          <div 
            key={item.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(item)}
          >
            <img 
              src={item.publicUrl || item.filename} 
              alt={item.description} 
              loading="lazy" 
            />
            <div className="gallery-item-info">
              <h3>{item.description}</h3>
              <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>{item.resolution}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999,
            padding: '40px',
            cursor: 'zoom-out',
            animation: 'fadeInUp 0.3s ease'
          }}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute', top: '20px', right: '30px',
              background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)',
              fontSize: '3rem', cursor: 'pointer', transition: 'color 0.2s',
              lineHeight: 1
            }}
            onMouseOver={(e) => e.target.style.color = '#fff'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
          >
            &times;
          </button>
          <img 
            src={selectedImage.publicUrl || selectedImage.filename} 
            alt={selectedImage.description}
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              borderRadius: '4px',
              cursor: 'default'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div style={{
            position: 'absolute', bottom: '30px', left: '0', width: '100%',
            textAlign: 'center', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 500 }}>{selectedImage.description}</h3>
            <p style={{ margin: '8px 0 0', opacity: 0.8, fontSize: '0.9rem', letterSpacing: '1px' }}>{selectedImage.resolution}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
