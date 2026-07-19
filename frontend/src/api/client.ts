import { handleMockRequest } from './mocks';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV 
  ? 'http://localhost:8080/api/v1' 
  : '/api/v1');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return handleMockRequest(path, options);
  }

  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem('token');
      if (!window.location.pathname.startsWith('/admin/login') && window.location.pathname.includes('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: any) => request<T>(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(path: string, body: any) => request<T>(path, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

