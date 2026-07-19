import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';
import type { Project, Category, ProjectImage } from '../../types';
import { Save, ArrowLeft, Upload, Trash2, Star } from 'lucide-react';

export const ProjectForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<ProjectImage[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<Category[]>('/admin/categories')
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0 && !isEdit) {
          setCategoryId(cats[0].id);
        }
      })
      .catch(console.error);

    if (isEdit) {
      api.get<Project>(`/admin/projects/${id}`)
        .then((p) => {
          setCategoryId(p.category.id);
          setTitleAm(p.titleAm || '');
          setTitleRu(p.titleRu || '');
          setDescriptionAm(p.descriptionAm || '');
          setDescriptionRu(p.descriptionRu || '');
          setIsPublished(p.isPublished);
          setIsFeatured(p.isFeatured);
          setImages(p.images || []);
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      categoryId,
      titleAm,
      titleRu,
      descriptionAm,
      descriptionRu,
      isPublished,
      isFeatured
    };

    try {
      if (isEdit) {
        await api.put(`/admin/projects/${id}`, payload);
      } else {
        const newProj = await api.post<Project>('/admin/projects', payload);
        navigate(`/admin/projects/edit/${newProj.id}`);
        return;
      }
      navigate('/admin/projects');
    } catch (err) {
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !id) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files', e.target.files[i]);
    }

    try {
      await api.post(`/admin/projects/${id}/images`, formData);
      // Reload project images
      const updated = await api.get<Project>(`/admin/projects/${id}`);
      setImages(updated.images || []);
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/admin/images/${imageId}`);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      alert('Delete image failed');
    }
  };

  const handleSetCover = async (imageId: string) => {
    try {
      await api.put(`/admin/images/${imageId}/cover`, {});
      setImages((prev) => prev.map((img) => ({
        ...img,
        isCover: img.id === imageId
      })));
    } catch (err) {
      alert('Set cover image failed');
    }
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
    minHeight: '100px',
    resize: 'vertical'
  };

  const API_BASE = import.meta.env.DEV ? 'http://localhost:8080' : '';

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/admin/projects')}
          style={{ background: 'none', border: 'none', color: '#a8a8b3', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: 500 }}>
          {isEdit ? 'Edit Project' : 'Create New Project'}
        </h1>
      </div>

      <form onSubmit={handleSave} style={{ background: '#1a1a1e', border: '1px solid #29292e', borderRadius: '12px', padding: '32px' }}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Category</label>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)} 
            style={inputStyle}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameRu} ({cat.code})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Title (Armenian)</label>
            <input type="text" value={titleAm} onChange={(e) => setTitleAm(e.target.value)} style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Title (Russian)</label>
            <input type="text" value={titleRu} onChange={(e) => setTitleRu(e.target.value)} style={inputStyle} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description (Armenian)</label>
            <textarea value={descriptionAm} onChange={(e) => setDescriptionAm(e.target.value)} style={textareaStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description (Russian)</label>
            <textarea value={descriptionRu} onChange={(e) => setDescriptionRu(e.target.value)} style={textareaStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', margin: '12px 0 32px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            <span>Publish immediately</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <span>Feature on hero banner</span>
          </label>
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
            gap: '8px'
          }}
        >
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save & Continue'}</span>
        </button>
      </form>

      {isEdit && (
        <div style={{ marginTop: '40px', background: '#1a1a1e', border: '1px solid #29292e', borderRadius: '12px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 500 }}>Project Images</h3>
            <label style={{
              padding: '10px 20px',
              background: '#29292e',
              border: '1px solid #3e3e4a',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 500
            }}>
              <Upload size={16} />
              <span>{uploading ? 'Uploading...' : 'Upload Photos'}</span>
              <input type="file" multiple onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {images.map((img) => (
              <div 
                key={img.id}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid #29292e'
                }}
              >
                <img 
                  src={`${API_BASE}${img.thumbnailUrl || img.url}`} 
                  alt="" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* Actions overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px'
                }}
                className="img-actions"
                >
                  <button 
                    type="button"
                    onClick={() => handleSetCover(img.id)}
                    style={{
                      background: img.isCover ? 'var(--accent)' : 'none',
                      border: 'none',
                      color: img.isCover ? '#121214' : '#fff',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '4px'
                    }}
                    title="Set as Cover"
                  >
                    <Star size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f75a68',
                      cursor: 'pointer',
                      padding: '6px',
                    }}
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <style>{`
                  div:hover > .img-actions {
                    opacity: 1 !important;
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
