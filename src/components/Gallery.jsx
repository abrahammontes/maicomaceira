import React from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants/translations';

const Gallery = () => {
  const { lang } = useAppContext();
  const t = translations[lang].gallery.items;

  const items = [
    { id: 1, src: '/images/portrait_black_white_1776816332419.png', title: t.portrait, span: 'span-6' },
    { id: 2, src: '/images/lifestyle_fashion_1776816346376.png', title: t.lifestyle, span: 'span-6' },
    { id: 3, src: '/images/dramatic_theater_1776816359304.png', title: t.theater, span: 'span-12' },
    { id: 4, src: '/images/minimalist_landscape_1776816375040.png', title: t.landscape, span: 'span-8' },
    { id: 5, src: '/images/portrait_black_white_1776816332419.png', title: t.series, span: 'span-4' },
  ];

  return (
    <section id="gallery" className="gallery-section container">
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id} className={`gallery-item ${item.span}`}>
            <img src={item.src} alt={item.title} loading="lazy" />
            <div className="gallery-item-info">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
