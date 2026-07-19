export interface Category {
  id: string;
  code: string;
  nameAm: string;
  nameRu: string;
  sortOrder: number;
  projectCount?: number;
}

export interface ProjectImage {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  isCover: boolean;
  sortOrder: number;
  originalFilename: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  projectCode: string;
  titleAm: string;
  titleRu: string;
  descriptionAm: string;
  descriptionRu: string;
  category: Category;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  sortOrder: number;
  coverImageUrl: string | null;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalProjects: number;
  publishedProjects: number;
  totalCategories: number;
  totalViews: number;
}

export interface LoginResponse {
  token: string;
  username: string;
  displayName: string;
}
