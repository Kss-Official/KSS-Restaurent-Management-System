import apiClient from './axiosClient';

export const authApi = {
  login: async (credentials) => {
    return apiClient.post('/auth/login/', credentials);
  },
  register: async (userData) => {
    return apiClient.post('/auth/register/', userData);
  },
  logout: async () => {
    return apiClient.post('/auth/logout/');
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/user/');
  }
};

export default authApi;
