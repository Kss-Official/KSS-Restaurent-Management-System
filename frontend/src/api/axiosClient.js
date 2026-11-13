// Base API Client Configuration (Ready for Django backend integration)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = {
  get: async (url, config = {}) => {
    // In frontend-first mode, resolves cleanly
    return { data: null, status: 200 };
  },
  post: async (url, body = {}, config = {}) => {
    return { data: body, status: 201 };
  },
  put: async (url, body = {}, config = {}) => {
    return { data: body, status: 200 };
  },
  delete: async (url, config = {}) => {
    return { status: 204 };
  }
};

export default apiClient;
