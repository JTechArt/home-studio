import React from 'react';
import { useI18n } from '../../i18n/i18n';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ContactProps {
  phone?: string;
  whatsapp?: string;
}

export const Contact: React.FC<ContactProps> = ({ 
  phone = '+374 XX XXX XXX', 
  whatsapp = '+374 XX XXX XXX' 
}) => {
  const { t } = useI18n();
  const { elementRef } = useIntersectionObserver({ threshold: 0.15 });

  const ctaSectionStyle: React.CSSProperties = {
    padding: '160px 48px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const btnStyle = (isPrimary: boolean): React.CSSProperties => ({
    padding: '18px 44px',
    border: '1px solid rgba(201, 169, 110, 0.3)',
    background: isPrimary ? 'var(--accent)' : 'transparent',
    color: isPrimary ? 'var(--bg)' : 'var(--accent)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'color 0.4s, border-color 0.4s',
    textDecoration: 'none',
  });

  const handleWhatsApp = () => {
    const formatted = whatsapp.replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${formatted}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <section 
      id="contact" 
      ref={elementRef}
      className="reveal" 
      style={ctaSectionStyle}
    >
      <style>{`
        .contact-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      <div className="contact-glow"></div>
      
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(36px, 5vw, 64px)',
        fontWeight: 400,
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        {t('contact.title')}<br />{t('contact.title_2')}
      </h2>
      <p style={{
        fontSize: '16px',
        color: 'var(--text-muted)',
        marginBottom: '48px',
        position: 'relative',
        zIndex: 1
      }}>
        {t('contact.subtitle')}
      </p>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <button 
          onClick={handleWhatsApp} 
          style={btnStyle(true)} 
          className="cta-button-primary"
          data-hover
        >
          <span>{t('contact.whatsapp')}</span>
        </button>
        <button 
          onClick={handleCall} 
          style={btnStyle(false)} 
          className="cta-button"
          data-hover
        >
          <span>{t('contact.call')}</span>
        </button>
      </div>
    </section>
  );
};
