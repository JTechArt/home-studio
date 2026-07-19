import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import type { Category } from '../../types';
import { Trash2, Edit } from 'lucide-react';

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [nameAm, setNameAm] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await api.get<Category[]>('/admin/categories');
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      code,
      nameAm,
      nameRu,
      sortOrder: parseInt(sortOrder) || 0
    };

    try {
      if (editingId) {
        await api.put(`/admin/categories/${editingId}`, payload);
      } else {
        await api.post('/admin/categories', payload);
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      alert('Save category failed');
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setCode(cat.code);
    setNameAm(cat.nameAm);
    setNameRu(cat.nameRu);
    setSortOrder(cat.sortOrder.toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Project items linked to it will need revision.')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert('Delete category failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setCode('');
    setNameAm('');
    setNameRu('');
    setSortOrder('0');
  };

  const formStyle: React.CSSProperties = {
    background: '#1a1a1e',
    border: '1px solid #29292e',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px'
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px 14px',
    background: '#121214',
    border: '1px solid #29292e',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    marginTop: '4px'
  };

  const btnStyle: React.CSSProperties = {
    padding: '12px 24px',
    background: 'var(--accent, #c9a96e)',
    color: '#121214',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer'
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '4px' }}>Categories</h1>
      <p style={{ color: '#8d8d99', marginBottom: '32px' }}>Manage portfolio categories and prefixes</p>

      {/* Scaffolding Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '20px' }}>
          {editingId ? 'Edit Category' : 'Create Category'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#a8a8b3' }}>Prefix Code (e.g. KIT)</label>
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              style={inputStyle} 
              required 
              disabled={!!editingId}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#a8a8b3' }}>Name (Armenian)</label>
            <input 
              type="text" 
              value={nameAm} 
              onChange={(e) => setNameAm(e.target.value)} 
              style={inputStyle} 
              required 
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#a8a8b3' }}>Name (Russian)</label>
            <input 
              type="text" 
              value={nameRu} 
              onChange={(e) => setNameRu(e.target.value)} 
              style={inputStyle} 
              required 
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#a8a8b3' }}>Sort Order</label>
            <input 
              type="number" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)} 
              style={inputStyle} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" style={btnStyle}>Save Category</button>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm} 
              style={{ ...btnStyle, background: 'transparent', color: '#a8a8b3', border: '1px solid #29292e' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Listing */}
      {loading ? (
        <div>Loading categories...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {categories.map((cat) => (
            <div 
              key={cat.id}
              style={{
                background: '#1a1a1e',
                border: '1px solid #29292e',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 500 }}>{cat.nameRu} ({cat.code})</h4>
                <div style={{ fontSize: '12px', color: '#8d8d99', marginTop: '4px' }}>
                  AM: {cat.nameAm} | Order: {cat.sortOrder}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => handleEdit(cat)}
                  style={{ background: 'none', border: 'none', color: '#0087f7', cursor: 'pointer' }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  style={{ background: 'none', border: 'none', color: '#f75a68', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
