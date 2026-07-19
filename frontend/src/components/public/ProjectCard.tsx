import React from 'react';
import { useI18n } from '../../i18n/i18n';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { locale } = useI18n();

  const cardStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '380px',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageWrapperStyle: React.CSSProperties = {
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    borderRadius: '4px',
  };

  const infoStyle: React.CSSProperties = {
    padding: '20px 0',
  };

  const categoryStyle: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '8px',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: '18px',
    fontWeight: 400,
  };

  const API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : '';
  const coverImage = project.coverImageUrl 
    ? `${API_BASE}${project.coverImageUrl}`
    : 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=85';

  return (
    <div style={cardStyle} onClick={onClick} className="project-card">
      <style>{`
        .project-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s;
          filter: brightness(0.85) saturate(0.9);
        }
        .project-card:hover img {
          transform: scale(1.05);
          filter: brightness(1) saturate(1);
        }
        .project-card .code-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          padding: 8px 14px;
          background: rgba(8, 8, 10, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 169, 110, 0.2);
          color: var(--accent);
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .project-card:hover .code-badge {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
      <div style={imageWrapperStyle} data-hover>
        <img src={coverImage} alt={project.titleRu} />
        <div className="code-badge">{project.projectCode}</div>
      </div>
      <div style={infoStyle}>
        <div style={categoryStyle}>
          {locale === 'am' ? project.category.nameAm : project.category.nameRu}
        </div>
        <div style={titleStyle}>
          {locale === 'am' ? project.titleAm : project.titleRu}
        </div>
      </div>
    </div>
  );
};
