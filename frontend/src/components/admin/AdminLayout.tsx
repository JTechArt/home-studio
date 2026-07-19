import React from 'react';
import { Navigate, Link, useNavigate, Outlet } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n';
import { LayoutDashboard, FolderKanban, Tags, Settings, LogOut, Globe } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    background: '#121214',
    color: '#e1e1e6',
    fontFamily: 'Inter, sans-serif'
  };

  const sidebarStyle: React.CSSProperties = {
    width: '260px',
    background: '#1a1a1e',
    borderRight: '1px solid #29292e',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
  };

  const logoStyle: React.CSSProperties = {
    padding: '0 24px 24px',
    fontFamily: 'Playfair Display, serif',
    fontSize: '20px',
    color: '#fff',
    borderBottom: '1px solid #29292e',
    marginBottom: '24px'
  };

  const menuStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    padding: '0 12px'
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: active ? '#fff' : '#a8a8b3',
    background: active ? '#29292e' : 'transparent',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s'
  });

  const logoutBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    margin: '0 12px',
    borderRadius: '8px',
    color: '#f75a68',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 500
  };

  const path = window.location.pathname;

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <div style={logoStyle}>Home Studio Admin</div>
        <nav style={menuStyle}>
          <Link to="/admin" style={linkStyle(path === '/admin')}>
            <LayoutDashboard size={18} />
            <span>{t('admin.dashboard')}</span>
          </Link>
          <Link to="/admin/projects" style={linkStyle(path.startsWith('/admin/projects'))}>
            <FolderKanban size={18} />
            <span>{t('admin.projects')}</span>
          </Link>
          <Link to="/admin/categories" style={linkStyle(path === '/admin/categories')}>
            <Tags size={18} />
            <span>{t('admin.categories')}</span>
          </Link>
          <Link to="/admin/settings" style={linkStyle(path === '/admin/settings')}>
            <Settings size={18} />
            <span>{t('admin.settings')}</span>
          </Link>
          <a href="/" target="_blank" style={linkStyle(false)}>
            <Globe size={18} />
            <span>View Site</span>
          </a>
        </nav>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          <LogOut size={18} />
          <span>{t('admin.logout')}</span>
        </button>
      </aside>
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
