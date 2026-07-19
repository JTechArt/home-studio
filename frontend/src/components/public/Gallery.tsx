import React, { useRef, useState } from 'react';
import { useI18n } from '../../i18n/i18n';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface GalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ projects, onSelectProject }) => {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { elementRef } = useIntersectionObserver({ threshold: 0.1 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.parentElement?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !trackRef.current || !trackRef.current.parentElement) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.parentElement.scrollLeft = scrollLeft - walk;
  };

  const trackWrapperStyle: React.CSSProperties = {
    position: 'relative',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    gap: '24px',
    paddingRight: '48px',
    cursor: isDown ? 'grabbing' : 'grab',
    userSelect: 'none',
    width: 'max-content',
  };

  return (
    <section 
      id="gallery" 
      ref={elementRef}
      className="reveal" 
      style={{ padding: '120px 0 120px 48px' }}
    >
      <style>{`
        .track-wrapper::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="section-header" style={{ paddingRight: '48px' }}>
        <span className="section-number">02</span>
        <h2 className="section-title">{t('gallery.title')}</h2>
        <div className="section-line"></div>
      </div>

      <div style={trackWrapperStyle} className="track-wrapper">
        <div 
          ref={trackRef}
          style={trackStyle}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => onSelectProject(project)} 
            />
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '40px',
        paddingRight: '48px'
      }}>
        <div style={{
          width: '100px',
          height: '1px',
          background: 'var(--accent)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg)',
            animation: 'hintSlide 2s ease-in-out infinite'
          }}></div>
        </div>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }}>
          {t('gallery.drag_hint')}
        </span>
      </div>
      <style>{`
        @keyframes hintSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};
