import apiClient from './axiosClient';

export const userApi = {
  getProfile: async (id) => {
    return apiClient.get(`/users/${id}/`);
  },
  updateProfile: async (id, data) => {
    return apiClient.put(`/users/${id}/`, data);
  },
  getUsersList: async (params = {}) => {
    return apiClient.get('/users/', { params });
  }
};

export default userApi;
