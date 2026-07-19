import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import type { LoginResponse } from '../../types';
import { useI18n } from '../../i18n/i18n';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post<LoginResponse>('/auth/login', { username, password });
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const screenStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#121214',
    fontFamily: 'Inter, sans-serif'
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    background: '#1a1a1e',
    borderRadius: '8px',
    padding: '40px',
    border: '1px solid #29292e',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    background: '#121214',
    border: '1px solid #29292e',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    marginTop: '6px',
    marginBottom: '20px'
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    background: 'var(--accent, #c9a96e)',
    color: '#121214',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  };

  return (
    <div style={screenStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
          Home Studio
        </h2>
        <p style={{ fontSize: '14px', color: '#a8a8b3', textAlign: 'center', marginBottom: '32px' }}>
          Portfolio Management Panel
        </p>

        {(import.meta.env.VITE_USE_MOCKS === 'true' || localStorage.getItem('mock_fallback') === 'true') && (
          <div style={{ 
            padding: '14px', 
            background: 'rgba(201, 169, 110, 0.1)', 
            border: '1px solid var(--accent, #c9a96e)', 
            borderRadius: '6px', 
            color: 'var(--accent, #c9a96e)', 
            fontSize: '13px', 
            lineHeight: '1.5',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>🛠️ Mock Dev Mode Active</strong>
            Use username <strong>admin</strong> (any password works).
          </div>
        )}

        {error && (
          <div style={{ padding: '12px', background: 'rgba(247, 90, 104, 0.1)', border: '1px solid #f75a68', borderRadius: '6px', color: '#f75a68', fontSize: '13px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#c4c4cc', letterSpacing: '0.05em' }}>
            {t('admin.username')}
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={inputStyle}
            required 
          />

          <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#c4c4cc', letterSpacing: '0.05em' }}>
            {t('admin.password')}
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={inputStyle}
            required 
          />

          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Logging in...' : t('admin.login')}
          </button>
        </form>
      </div>
    </div>
  );
};
