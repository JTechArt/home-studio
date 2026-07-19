import React from 'react';
import { useI18n } from '../../i18n/i18n';
import type { Project } from '../../types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FeaturedProps {
  project: Project | null;
  onSelect: () => void;
}

export const Featured: React.FC<FeaturedProps> = ({ project, onSelect }) => {
  const { t, locale } = useI18n();
  const { elementRef } = useIntersectionObserver({ threshold: 0.15 });

  const sectionStyle: React.CSSProperties = {
    padding: '120px 48px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '80px',
    alignItems: 'center',
  };

  const imgContainerStyle: React.CSSProperties = {
    position: 'relative',
    aspectRatio: '4 / 5',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const infoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : '';
  const coverImage = project?.coverImageUrl
    ? `${API_BASE}${project.coverImageUrl}`
    : 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&q=85';

  return (
    <section 
      id="featured" 
      ref={elementRef}
      className="reveal" 
      style={sectionStyle}
    >
      <style>{`
        .featured-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .featured-img:hover img {
          transform: scale(1.03);
        }
        .featured-img .frame {
          position: absolute;
          inset: 16px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          pointer-events: none;
          transition: inset 0.5s;
        }
        .featured-img:hover .frame {
          inset: 24px;
        }
      `}</style>
      
      <div style={imgContainerStyle} className="featured-img" onClick={onSelect} data-hover>
        <img src={coverImage} alt="Featured project" />
        <div className="frame"></div>
      </div>

      <div style={infoStyle}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '20px'
        }}>
          {t('featured.label')}
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '48px',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '20px'
        }}>
          {project ? (locale === 'am' ? project.titleAm : project.titleRu) : 'Dark Marble Kitchen'}
        </h2>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
          color: 'var(--text-muted)',
          marginBottom: '32px'
        }}>
          {project ? project.projectCode : 'KIT-031'}
        </div>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: 'var(--text-muted)',
          marginBottom: '40px'
        }}>
          {project 
            ? (locale === 'am' ? project.descriptionAm : project.descriptionRu)
            : 'Элегантная кухня из тёмного мрамора с интегрированной подсветкой и фурнитурой из матового золота. Проект выполнен для частной резиденции.'
          }
        </p>

        <div style={{ display: 'flex', gap: '48px' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--accent)' }}>
              {t('featured.projects_value')}
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t('featured.projects_label')}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--accent)' }}>
              {t('featured.experience_value')}
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t('featured.experience_label')}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--accent)' }}>
              {t('featured.custom_value')}
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t('featured.custom_label')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
