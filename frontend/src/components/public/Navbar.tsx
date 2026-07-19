import React, { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/i18n';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const { locale, setLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: isScrolled ? '16px 48px' : '24px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: isScrolled ? 'rgba(8, 8, 10, 0.85)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
    borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    letterSpacing: '0.02em',
    color: '#fff',
    cursor: 'pointer',
  };

  const linksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '36px',
    listStyle: 'none',
    alignItems: 'center',
  };

  const linkItemStyle: React.CSSProperties = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    paddingBottom: '4px',
    position: 'relative',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    fontWeight: 300,
  };

  const langSwitchStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
    letterSpacing: '0.08em',
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => onScrollTo('hero')}>Home Studio</div>
      <ul style={linksStyle}>
        <li>
          <button style={linkItemStyle} onClick={() => onScrollTo('categories')} data-hover>
            {t('nav.categories')}
          </button>
        </li>
        <li>
          <button style={linkItemStyle} onClick={() => onScrollTo('gallery')} data-hover>
            {t('nav.portfolio')}
          </button>
        </li>
        <li>
          <button style={linkItemStyle} onClick={() => onScrollTo('featured')} data-hover>
            {t('nav.about')}
          </button>
        </li>
        <li>
          <button style={linkItemStyle} onClick={() => onScrollTo('contact')} data-hover>
            {t('nav.contact')}
          </button>
        </li>
        <li>
          <div style={langSwitchStyle}>
            <span 
              style={{ cursor: 'pointer', opacity: locale === 'am' ? 1 : 0.4, color: '#fff' }} 
              onClick={() => setLocale('am')}
              data-hover
            >
              ՀԱ
            </span>
            <span style={{ opacity: 0.2, color: '#fff' }}>|</span>
            <span 
              style={{ cursor: 'pointer', opacity: locale === 'ru' ? 1 : 0.4, color: '#fff' }} 
              onClick={() => setLocale('ru')}
              data-hover
            >
              РУ
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};
