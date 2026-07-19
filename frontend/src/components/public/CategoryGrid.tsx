import React from 'react';
import { useI18n } from '../../i18n/i18n';
import type { Category } from '../../types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface CategoryGridProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  activeCategoryId, 
  onSelectCategory 
}) => {
  const { t, locale } = useI18n();
  const { elementRef } = useIntersectionObserver({ threshold: 0.1 });

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2px',
    background: 'var(--border)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const getCategoryImage = (code: string) => {
    const images: Record<string, string> = {
      'KIT': 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'WRD': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
      'BDR': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
      'LIV': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'TVU': 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
      'OFC': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
      'KID': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
      'CUS': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80'
    };
    return images[code] || 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80';
  };

  return (
    <section 
      id="categories" 
      ref={elementRef}
      className="reveal" 
      style={{ padding: '120px 48px' }}
    >
      <div className="section-header">
        <span className="section-number">01</span>
        <h2 className="section-title">{t('categories.title')}</h2>
        <div className="section-line"></div>
      </div>
      
      <div style={gridStyle}>
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <div 
              key={cat.id}
              onClick={() => onSelectCategory(isActive ? null : cat.id)}
              className="category-card"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1.1',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isActive ? '2px solid var(--accent)' : 'none'
              }}
              data-hover
            >
              <style>{`
                .category-card img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  filter: brightness(0.3) saturate(0.3);
                  transition: filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                  transform: scale(1.05);
                }
                .category-card:hover img {
                  filter: brightness(0.6) saturate(1);
                  transform: scale(1);
                }
                .category-card .overlay {
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  padding: 32px;
                  background: linear-gradient(to top, rgba(8,8,10,0.85) 0%, transparent 60%);
                }
                .category-card .cat-name {
                  font-family: 'Playfair Display', serif;
                  font-size: 22px;
                  transform: translateY(20px);
                  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                  color: #fff;
                }
                .category-card:hover .cat-name {
                  transform: translateY(0);
                }
                .category-card .cat-line {
                  width: 0;
                  height: 1px;
                  background: var(--accent);
                  margin: 12px 0;
                  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s;
                }
                .category-card:hover .cat-line {
                  width: 40px;
                }
              `}</style>
              <img src={getCategoryImage(cat.code)} alt={cat.nameRu} />
              <div className="overlay">
                <span className="cat-name">
                  {locale === 'am' ? cat.nameAm : cat.nameRu}
                </span>
                <div className="cat-line"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
