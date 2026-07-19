import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import type { Stats } from '../../types';
import { Folder, Eye, Layers, CheckCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Stats>('/admin/stats')
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    marginTop: '32px'
  };

  const cardStyle: React.CSSProperties = {
    background: '#1a1a1e',
    border: '1px solid #29292e',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  };

  const iconWrapperStyle = (color: string): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: `rgba(${color}, 0.1)`,
    color: `rgb(${color})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 500 }}>Dashboard Summary</h1>
      <p style={{ color: '#8d8d99', marginTop: '4px' }}>Overview of your workspace assets and activity</p>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={iconWrapperStyle('201, 169, 110')}>
            <Folder size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.totalProjects}</div>
            <div style={{ fontSize: '13px', color: '#8d8d99', marginTop: '2px' }}>Total Projects</div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle('0, 179, 126')}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.publishedProjects}</div>
            <div style={{ fontSize: '13px', color: '#8d8d99', marginTop: '2px' }}>Published</div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle('0, 135, 247')}>
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.totalCategories}</div>
            <div style={{ fontSize: '13px', color: '#8d8d99', marginTop: '2px' }}>Categories</div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle('247, 90, 104')}>
            <Eye size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.totalViews}</div>
            <div style={{ fontSize: '13px', color: '#8d8d99', marginTop: '2px' }}>Total Image Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};
