import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ project, onClose }) => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  if (!project || project.images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : '';
  const currentImage = `${API_BASE}${project.images[currentIndex].url}`;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(8, 8, 10, 0.95)',
        backdropFilter: 'blur(15px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      {/* Top Controls */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '10px'
        }}
        data-hover
      >
        <X size={28} />
      </button>

      {/* Main Slider Area */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button 
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '-60px',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            cursor: 'pointer',
            padding: '10px',
          }}
          data-hover
        >
          <ChevronLeft size={36} />
        </button>

        <img 
          src={currentImage} 
          alt={`Project detail ${currentIndex + 1}`} 
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '4px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        />

        <button 
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '-60px',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            cursor: 'pointer',
            padding: '10px',
          }}
          data-hover
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Project Details Footer */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '30px',
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            color: 'var(--accent)',
            letterSpacing: '0.1em'
          }}>
            {t('lightbox.code')}: {project.projectCode}
          </span>
        </div>
        
        {/* Thumbnails strip */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {project.images.map((img, idx) => {
            const isSelected = idx === currentIndex;
            const thumbUrl = `${API_BASE}${img.thumbnailUrl || img.url}`;
            return (
              <img 
                key={img.id}
                src={thumbUrl}
                alt="Thumbnail"
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                  opacity: isSelected ? 1 : 0.4,
                  transition: 'all 0.3s'
                }}
                data-hover
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
