import React, { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/i18n';

interface HeroProps {
  onScrollToGallery: () => void;
  coverImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToGallery, coverImage }) => {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const heroStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 48px 80px',
    overflow: 'hidden',
  };

  const bgStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.85) contrast(1.02)',
    transform: 'scale(1.1)',
    animation: 'heroZoom 12s ease-in-out infinite alternate',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%), linear-gradient(to right, rgba(8,8,10,0.5) 0%, transparent 60%)',
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '24px',
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s 0.9s, transform 0.8s 0.9s',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(42px, 6vw, 80px)',
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: '28px',
  };

  const lineStyle = (_delay: string): React.CSSProperties => ({
    display: 'block',
    overflow: 'hidden',
    height: '1.2em',
    marginTop: '-0.1em',
  });

  const innerStyle = (delay: string): React.CSSProperties => ({
    display: 'block',
    transform: revealed ? 'translateY(0)' : 'translateY(110%)',
    transition: 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)',
    transitionDelay: delay,
  });

  const subStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.7',
    color: 'var(--text-muted)',
    maxWidth: '480px',
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s 1.1s, transform 0.8s 1.1s',
  };

  const ctaStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '40px',
    padding: '16px 36px',
    border: '1px solid rgba(201, 169, 110, 0.3)',
    color: 'var(--accent)',
    textDecoration: 'none',
    fontSize: '12px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden',
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s 1.3s, transform 0.8s 1.3s, color 0.4s, border-color 0.4s',
    cursor: 'pointer',
    background: 'none',
    fontFamily: 'inherit',
  };

  const defaultHeroImg = 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=85';

  return (
    <section style={heroStyle} id="hero">
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.1); }
          to { transform: scale(1.0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
      <div style={bgStyle}>
        <img src={coverImage || defaultHeroImg} alt="Hero furniture showcase" style={imgStyle} />
        <div style={overlayStyle}></div>
      </div>
      <div style={contentStyle}>
        <div style={labelStyle}>{t('hero.subtitle')}</div>
        <h1 style={titleStyle}>
          <span style={lineStyle('0.3s')}>
            <span style={innerStyle('0.3s')}>{t('hero.title_1')}</span>
          </span>
          <span style={lineStyle('0.5s')}>
            <span style={innerStyle('0.5s')}>{t('hero.title_2')}</span>
          </span>
          <span style={lineStyle('0.7s')}>
            <span style={{ ...innerStyle('0.7s'), color: 'var(--accent)' }}>
              {t('hero.title_3')}
            </span>
          </span>
        </h1>
        <p style={subStyle}>{t('hero.desc')}</p>
        <button style={ctaStyle} onClick={onScrollToGallery} data-hover>
          <span>{t('hero.cta')}</span>
          <span>→</span>
        </button>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 2
      }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          color: 'var(--text-muted)'
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }}></div>
      </div>
    </section>
  );
};
