import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './i18n/i18n';
import { api } from './api/client';
import type { Category, Project } from './types';

// Public components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { CategoryGrid } from './components/public/CategoryGrid';
import { Gallery } from './components/public/Gallery';
import { Lightbox } from './components/public/Lightbox';
import { Featured } from './components/public/Featured';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { CustomCursor } from './components/public/CustomCursor';
import { ProgressBar } from './components/public/ProgressBar';

// Admin components
import { AdminLayout } from './components/admin/AdminLayout';
import { Login } from './components/admin/Login';
import { Dashboard } from './components/admin/Dashboard';
import { ProjectList } from './components/admin/ProjectList';
import { ProjectForm } from './components/admin/ProjectForm';
import { CategoryManager } from './components/admin/CategoryManager';
import { SettingsForm } from './components/admin/SettingsForm';

const PublicSite: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch categories
    api.get<Category[]>('/categories')
      .then(setCategories)
      .catch(console.error);

    // Fetch featured for hero/about
    api.get<Project[]>('/projects/featured')
      .then((data) => {
        if (data.length > 0) setFeaturedProject(data[0]);
      })
      .catch(console.error);

    // Fetch contact details
    api.get<Record<string, string>>('/settings/public')
      .then(setSettings)
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Fetch projects based on active filter
    let path = '/projects?size=100';
    if (selectedCategoryId) {
      path += `&categoryId=${selectedCategoryId}`;
    }
    api.get<{ content: Project[] }>(path)
      .then((res) => setProjects(res.content))
      .catch(console.error);
  }, [selectedCategoryId]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    // Increment view count via public API
    api.post(`/projects/${project.id}/view`, {}).catch(console.error);
  };

  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <Navbar onScrollTo={handleScrollTo} />
      <Hero 
        onScrollToGallery={() => handleScrollTo('categories')} 
        coverImage={featuredProject?.coverImageUrl || undefined}
      />
      <CategoryGrid 
        categories={categories}
        activeCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <Gallery 
        projects={projects}
        onSelectProject={handleSelectProject}
      />
      <Featured 
        project={featuredProject} 
        onSelect={() => featuredProject && handleSelectProject(featuredProject)}
      />
      <Contact 
        phone={settings.phone} 
        whatsapp={settings.whatsapp}
      />
      <Footer />
      <Lightbox 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          {/* Public Page */}
          <Route path="/" element={<PublicSite />} />

          {/* Admin auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="settings" element={<SettingsForm />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
};

export default App;
