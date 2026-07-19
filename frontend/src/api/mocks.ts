import type { Category, Project, Stats, LoginResponse } from '../types';

// Default mock categories
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', code: 'KIT', nameAm: 'Խոհանոցներ', nameRu: 'Кухни', sortOrder: 1, projectCount: 2 },
  { id: 'cat-2', code: 'WRD', nameAm: 'Պահարաններ', nameRu: 'Шкафы', sortOrder: 2, projectCount: 1 },
  { id: 'cat-3', code: 'BDR', nameAm: 'Ննջասենյակներ', nameRu: 'Спальни', sortOrder: 3, projectCount: 1 },
  { id: 'cat-4', code: 'LIV', nameAm: 'Հյուրասենյակներ', nameRu: 'Гостиные', sortOrder: 4, projectCount: 1 },
  { id: 'cat-5', code: 'TVU', nameAm: 'Հեռուստացույցի գոտիներ', nameRu: 'TV-зоны', sortOrder: 5, projectCount: 1 }
];

// Default mock projects
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    projectCode: 'PROJ-KIT-01',
    category: DEFAULT_CATEGORIES[0],
    titleAm: 'Ժամանակակից Խոհանոց Գյումրիում',
    titleRu: 'Современная кухня в Гюмри',
    descriptionAm: 'Մինիմալիստական ոճի խոհանոց պատրաստված բարձրորակ MDF-ից և եվրոպական աքսեսուարներով։',
    descriptionRu: 'Минималистичная кухня из высококачественного МДФ со встроенной фурнитурой европейского производства.',
    isPublished: true,
    isFeatured: true,
    viewCount: 142,
    sortOrder: 1,
    coverImageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
        isCover: true,
        sortOrder: 1,
        originalFilename: 'kitchen-main.jpg',
        width: 1200,
        height: 800
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80',
        isCover: false,
        sortOrder: 2,
        originalFilename: 'kitchen-details.jpg',
        width: 1200,
        height: 800
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-2',
    projectCode: 'PROJ-KIT-02',
    category: DEFAULT_CATEGORIES[0],
    titleAm: 'Դասական ոճի սպիտակ խոհանոց',
    titleRu: 'Классическая белая кухня',
    descriptionAm: 'Նուրբ դետալներով և փայտե դեկորատիվ տարրերով հարմարավետ խոհանոց։',
    descriptionRu: 'Уютная кухня в классическом стиле с нежными деталями и деревянными элементами декора.',
    isPublished: true,
    isFeatured: false,
    viewCount: 78,
    sortOrder: 2,
    coverImageUrl: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=600&q=80',
        isCover: true,
        sortOrder: 1,
        originalFilename: 'white-kitchen.jpg',
        width: 1200,
        height: 800
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-3',
    projectCode: 'PROJ-WRD-01',
    category: DEFAULT_CATEGORIES[1],
    titleAm: 'Հայելապատ Պահարան նախասրահի համար',
    titleRu: 'Зеркальный шкаф для прихожей',
    descriptionAm: 'Տարողունակ պահարան հայելային դռներով, որոնք տեսողականորեն ընդարձակում են սենյակը։',
    descriptionRu: 'Вместительный шкаф с зеркальными дверями, которые визуально расширяют пространство прихожей.',
    isPublished: true,
    isFeatured: false,
    viewCount: 95,
    sortOrder: 1,
    coverImageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
        isCover: true,
        sortOrder: 1,
        originalFilename: 'wardrobe.jpg',
        width: 1200,
        height: 800
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj-4',
    projectCode: 'PROJ-BDR-01',
    category: DEFAULT_CATEGORIES[2],
    titleAm: 'Ննջասենյակի կահույք լոֆթ ոճում',
    titleRu: 'Мебель для спальни в стиле лофт',
    descriptionAm: 'Մահճակալ և տումբաներ մետաղական և փայտե համադրությամբ։',
    descriptionRu: 'Кровать и прикроватные тумбы из комбинации металла и натурального дерева.',
    isPublished: true,
    isFeatured: false,
    viewCount: 64,
    sortOrder: 1,
    coverImageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
        isCover: true,
        sortOrder: 1,
        originalFilename: 'loft-bed.jpg',
        width: 1200,
        height: 800
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_SETTINGS: Record<string, string> = {
  phone: '+374 93 123 456',
  whatsapp: '+374 93 123 456',
  email: 'info@homestudio.am',
  address_am: 'Գյումրի, Շիրակացի 12',
  address_ru: 'Гюмри, Ширакаци 12',
  about_am: 'Մենք ստեղծում ենք յուրահատուկ կահույք ձեր տան և գրասենյակի համար։ Յուրաքանչյուր նախագիծ մշակվում է անհատական մոտեցմամբ։',
  about_ru: 'Мы создаем уникальную мебель для вашего дома и офиса. Каждый проект разрабатывается по индивидуальному заказу.',
  instagram: 'https://instagram.com/homestudio_gyumri',
  facebook: 'https://facebook.com/homestudio_gyumri'
};

// Helper keys for localStorage
const KEYS = {
  CATEGORIES: 'mock_categories',
  PROJECTS: 'mock_projects',
  SETTINGS: 'mock_settings'
};

// Initialization helpers
const getStoredCategories = (): Category[] => {
  const data = localStorage.getItem(KEYS.CATEGORIES);
  if (!data) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(data);
};

const getStoredProjects = (): Project[] => {
  const data = localStorage.getItem(KEYS.PROJECTS);
  if (!data) {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  return JSON.parse(data);
};

const getStoredSettings = (): Record<string, string> => {
  const data = localStorage.getItem(KEYS.SETTINGS);
  if (!data) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(data);
};

// Service state mutation
const saveCategories = (categories: Category[]) => {
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
};

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
};

const saveSettings = (settings: Record<string, string>) => {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

// Recalculates category projectCount based on projects
const updateCategoryCounts = (categories: Category[], projects: Project[]): Category[] => {
  return categories.map(cat => ({
    ...cat,
    projectCount: projects.filter(p => p.category.id === cat.id && p.isPublished).length
  }));
};

// Artificial delay to simulate network requests
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function handleMockRequest(path: string, options: RequestInit = {}): Promise<any> {
  await delay();

  const categories = getStoredCategories();
  const projects = getStoredProjects();
  const settings = getStoredSettings();

  const method = options.method || 'GET';
  const cleanPath = path.split('?')[0];
  const searchParams = new URLSearchParams(path.split('?')[1] || '');

  // Auth Mocks
  if (cleanPath === '/auth/login' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    if (body.username === 'admin' && body.password === 'admin123') {
      const response: LoginResponse = {
        token: 'mock-jwt-token-xyz',
        username: 'admin',
        displayName: 'Mock Administrator'
      };
      return response;
    }
    throw new Error('Invalid credentials');
  }

  // Settings Mocks
  if (cleanPath === '/settings/public' && method === 'GET') {
    return settings;
  }

  if (cleanPath === '/admin/settings' && method === 'PUT') {
    const body = JSON.parse(options.body as string);
    const updated = { ...settings, ...body };
    saveSettings(updated);
    return updated;
  }

  // Categories Mocks
  if ((cleanPath === '/categories' || cleanPath === '/admin/categories') && method === 'GET') {
    return updateCategoryCounts(categories, projects);
  }

  if (cleanPath === '/admin/categories' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      code: body.code,
      nameAm: body.nameAm,
      nameRu: body.nameRu,
      sortOrder: body.sortOrder || (categories.length + 1),
      projectCount: 0
    };
    const updated = [...categories, newCategory];
    saveCategories(updated);
    return newCategory;
  }

  if (cleanPath.startsWith('/admin/categories/') && method === 'PUT') {
    const id = cleanPath.split('/').pop();
    const body = JSON.parse(options.body as string);
    const updated = categories.map(cat => cat.id === id ? { ...cat, ...body } : cat);
    saveCategories(updated);
    return updated.find(cat => cat.id === id);
  }

  if (cleanPath.startsWith('/admin/categories/') && method === 'DELETE') {
    const id = cleanPath.split('/').pop();
    const updated = categories.filter(cat => cat.id !== id);
    saveCategories(updated);
    return {};
  }

  // Projects Mocks
  if (cleanPath === '/projects/featured' && method === 'GET') {
    return projects.filter(p => p.isFeatured && p.isPublished);
  }

  if ((cleanPath === '/projects' || cleanPath === '/admin/projects') && method === 'GET') {
    const categoryId = searchParams.get('categoryId');
    let filtered = projects;

    if (categoryId) {
      filtered = filtered.filter(p => p.category.id === categoryId);
    }
    
    // Public queries only show published ones
    if (cleanPath === '/projects') {
      filtered = filtered.filter(p => p.isPublished);
    }

    filtered.sort((a, b) => a.sortOrder - b.sortOrder);

    // Backend returns page contents for projects
    return {
      content: filtered,
      totalPages: 1,
      totalElements: filtered.length
    };
  }

  if (cleanPath.startsWith('/projects/') && cleanPath.endsWith('/view') && method === 'POST') {
    const id = cleanPath.split('/')[2];
    const updated = projects.map(p => p.id === id ? { ...p, viewCount: p.viewCount + 1 } : p);
    saveProjects(updated);
    return {};
  }

  if (cleanPath.startsWith('/admin/projects/') && method === 'GET') {
    const id = cleanPath.split('/').pop();
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return project;
  }

  if (cleanPath === '/admin/projects' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    const cat = categories.find(c => c.id === body.categoryId) || categories[0];
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      projectCode: body.projectCode || `PROJ-${cat.code}-${Date.now().toString().slice(-4)}`,
      category: cat,
      titleAm: body.titleAm || '',
      titleRu: body.titleRu || '',
      descriptionAm: body.descriptionAm || '',
      descriptionRu: body.descriptionRu || '',
      isPublished: body.isPublished ?? false,
      isFeatured: body.isFeatured ?? false,
      viewCount: 0,
      sortOrder: body.sortOrder || (projects.length + 1),
      coverImageUrl: null,
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    return newProject;
  }

  if (cleanPath.startsWith('/admin/projects/') && method === 'PUT') {
    const id = cleanPath.split('/').pop();
    const body = JSON.parse(options.body as string);
    const cat = categories.find(c => c.id === body.categoryId) || categories[0];
    
    const updated = projects.map(p => {
      if (p.id === id) {
        const coverImageUrl = body.coverImageUrl !== undefined ? body.coverImageUrl : p.coverImageUrl;
        return {
          ...p,
          ...body,
          category: cat,
          coverImageUrl,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });
    saveProjects(updated);
    return updated.find(p => p.id === id);
  }

  if (cleanPath.startsWith('/admin/projects/') && method === 'DELETE') {
    const id = cleanPath.split('/').pop();
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    return {};
  }

  // Image Upload / Mutations Mocks
  if (cleanPath.startsWith('/admin/projects/') && cleanPath.endsWith('/images') && method === 'POST') {
    // Return mock images
    const id = cleanPath.split('/')[3];
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');

    const newImage = {
      id: `img-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      isCover: project.images.length === 0,
      sortOrder: project.images.length + 1,
      originalFilename: 'uploaded-item.jpg',
      width: 1200,
      height: 800
    };

    project.images.push(newImage);
    if (newImage.isCover) {
      project.coverImageUrl = newImage.url;
    }
    
    const updated = projects.map(p => p.id === id ? project : p);
    saveProjects(updated);
    return project;
  }

  if (cleanPath.startsWith('/admin/images/') && cleanPath.endsWith('/cover') && method === 'PUT') {
    const imageId = cleanPath.split('/')[3];
    const updated = projects.map(p => {
      const targetImg = p.images.find(img => img.id === imageId);
      if (targetImg) {
        const newImages = p.images.map(img => ({
          ...img,
          isCover: img.id === imageId
        }));
        return {
          ...p,
          images: newImages,
          coverImageUrl: targetImg.url
        };
      }
      return p;
    });
    saveProjects(updated);
    return {};
  }

  if (cleanPath.startsWith('/admin/images/') && method === 'DELETE') {
    const imageId = cleanPath.split('/').pop();
    const updated = projects.map(p => {
      const filteredImages = p.images.filter(img => img.id !== imageId);
      const isDeletedCover = p.images.find(img => img.id === imageId)?.isCover;
      let coverImageUrl = p.coverImageUrl;
      
      if (isDeletedCover) {
        const nextCover = filteredImages[0];
        if (nextCover) {
          nextCover.isCover = true;
          coverImageUrl = nextCover.url;
        } else {
          coverImageUrl = null;
        }
      }

      return {
        ...p,
        images: filteredImages,
        coverImageUrl
      };
    });
    saveProjects(updated);
    return {};
  }

  // Admin stats mock
  if (cleanPath === '/admin/stats' && method === 'GET') {
    const stats: Stats = {
      totalProjects: projects.length,
      publishedProjects: projects.filter(p => p.isPublished).length,
      totalCategories: categories.length,
      totalViews: projects.reduce((sum, p) => sum + p.viewCount, 0)
    };
    return stats;
  }

  throw new Error(`Mock endpoint not implemented for ${method} ${cleanPath}`);
}
