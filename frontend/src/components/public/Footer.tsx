import React from 'react';
import { useI18n } from '../../i18n/i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const footerStyle: React.CSSProperties = {
    padding: '60px 48px',
    borderTop: '1px solid rgba(201, 169, 110, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <footer style={footerStyle}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '18px'
      }}>
        Home Studio
      </div>
      <div style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '0.05em'
      }}>
        © {new Date().getFullYear()} Home Studio • Gyumri, Armenia. {t('footer.rights')}
      </div>
    </footer>
  );
};
