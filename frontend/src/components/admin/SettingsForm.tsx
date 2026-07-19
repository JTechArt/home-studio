import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Save } from 'lucide-react';

export const SettingsForm: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<Record<string, string>>('/settings/public')
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put('/admin/settings', settings);
      alert('Settings updated successfully');
    } catch (err) {
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const formGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#c4c4cc',
    marginBottom: '6px',
    fontWeight: 500
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    background: '#1a1a1e',
    border: '1px solid #29292e',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '4px' }}>Settings</h1>
      <p style={{ color: '#8d8d99', marginBottom: '32px' }}>Configure contacts, addresses, and about texts</p>

      <form onSubmit={handleSave} style={{ background: '#1a1a1e', border: '1px solid #29292e', borderRadius: '12px', padding: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', color: '#fff' }}>Contact Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input 
              type="text" 
              value={(settings.phone as string) || ''} 
              onChange={(e) => handleChange('phone', e.target.value)} 
              style={inputStyle} 
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>WhatsApp Coordinate</label>
            <input 
              type="text" 
              value={(settings.whatsapp as string) || ''} 
              onChange={(e) => handleChange('whatsapp', e.target.value)} 
              style={inputStyle} 
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input 
            type="email" 
            value={(settings.email as string) || ''} 
            onChange={(e) => handleChange('email', e.target.value)} 
            style={inputStyle} 
          />
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '32px 0 24px', color: '#fff' }}>Address coordinates</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Address (Armenian)</label>
            <input 
              type="text" 
              value={(settings.address_am as string) || ''} 
              onChange={(e) => handleChange('address_am', e.target.value)} 
              style={inputStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Address (Russian)</label>
            <input 
              type="text" 
              value={(settings.address_ru as string) || ''} 
              onChange={(e) => handleChange('address_ru', e.target.value)} 
              style={inputStyle} 
            />
          </div>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '32px 0 24px', color: '#fff' }}>About Studio Description</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>About Text (Armenian)</label>
            <textarea 
              value={(settings.about_am as string) || ''} 
              onChange={(e) => handleChange('about_am', e.target.value)} 
              style={textareaStyle} 
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>About Text (Russian)</label>
            <textarea 
              value={(settings.about_ru as string) || ''} 
              onChange={(e) => handleChange('about_ru', e.target.value)} 
              style={textareaStyle} 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          style={{
            padding: '14px 28px',
            background: 'var(--accent, #c9a96e)',
            color: '#121214',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px'
          }}
        >
          <Save size={18} />
          <span>{saving ? 'Updating...' : 'Save Settings'}</span>
        </button>
      </form>
    </div>
  );
};
