import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { Project, Category } from '../../types';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cats = await api.get<Category[]>('/admin/categories');
      setCategories(cats);

      let url = '/admin/projects?size=100';
      if (selectedCategory) {
        url += `&categoryId=${selectedCategory}`;
      }
      const data = await api.get<{ content: Project[] }>(url);
      setProjects(data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      const updated = await api.put<Project>(`/admin/projects/${project.id}`, {
        isPublished: !project.isPublished
      });
      setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, isPublished: updated.isPublished } : p)));
    } catch (err) {
      alert('Failed to toggle visibility');
    }
  };

  const filteredProjects = projects.filter((p) => 
    p.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.titleRu && p.titleRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.titleAm && p.titleAm.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    flex: 1
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    background: '#1a1a1e',
    border: '1px solid #29292e',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
  };

  const selectStyle: React.CSSProperties = {
    padding: '12px 24px',
    background: '#1a1a1e',
    border: '1px solid #29292e',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
  };

  const btnStyle: React.CSSProperties = {
    padding: '12px 24px',
    background: 'var(--accent, #c9a96e)',
    color: '#121214',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#1a1a1e',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #29292e'
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '16px 24px',
    background: '#29292e',
    borderBottom: '1px solid #29292e',
    color: '#a8a8b3',
    fontWeight: 500,
    fontSize: '14px'
  };

  const tdStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderBottom: '1px solid #29292e',
    fontSize: '14px'
  };

  const API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : '';

  return (
    <div>
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 500 }}>Projects</h1>
          <p style={{ color: '#8d8d99', marginTop: '4px' }}>Manage your showcase projects catalog</p>
        </div>
        <Link to="/admin/projects/new" style={btnStyle}>
          <Plus size={18} />
          <span>Add Project</span>
        </Link>
      </div>

      <div style={toolbarStyle}>
        <div style={searchContainerStyle}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#7c7c8a' }} />
          <input 
            type="text" 
            placeholder="Search by code or title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={inputStyle}
          />
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          style={selectStyle}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nameRu} ({cat.code})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading catalog...</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Cover</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Title (RU)</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => {
              const cover = p.coverImageUrl 
                ? `${API_BASE}${p.coverImageUrl}`
                : 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=100&q=50';
              return (
                <tr key={p.id}>
                  <td style={tdStyle}>
                    <img 
                      src={cover} 
                      alt="" 
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'Space Mono, monospace', fontWeight: 'bold' }}>
                    {p.projectCode}
                  </td>
                  <td style={tdStyle}>{p.category.nameRu}</td>
                  <td style={tdStyle}>{p.titleRu || '(Untitled)'}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleTogglePublish(p)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: p.isPublished ? '#00b37e' : '#f75a68',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {p.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                      <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <Link 
                        to={`/admin/projects/edit/${p.id}`} 
                        style={{ color: '#0087f7', display: 'inline-flex', alignItems: 'center' }}
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        style={{ background: 'none', border: 'none', color: '#f75a68', cursor: 'pointer', padding: 0 }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
