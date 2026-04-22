import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';
import { apiService } from '../services/api';

const Gallery = () => {
  const { lang } = useAppContext();
  const t = translations[lang].gallery.items;
  const [images, setImages] = useState([]);

  const staticItems = [
    { id: 's1', filename: '/images/portrait_black_white_1776816332419.png', description: t.portrait, resolution: 'High Res' },
    { id: 's2', filename: '/images/lifestyle_fashion_1776816346376.png', description: t.lifestyle, resolution: 'High Res' },
    { id: 's3', filename: '/images/dramatic_theater_1776816359304.png', description: t.theater, resolution: 'High Res' },
    { id: 's4', filename: '/images/minimalist_landscape_1776816375040.png', description: t.landscape, resolution: 'High Res' },
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

  return (
    <section id="gallery" className="gallery-section container">
      <div className="gallery-grid">
        {images.map((item, index) => (
          <div key={item.id} className={`gallery-item ${index % 3 === 0 ? 'span-12' : index % 2 === 0 ? 'span-8' : 'span-4'}`}>
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
    </section>
  );
};

export default Gallery;
