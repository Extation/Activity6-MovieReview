import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const movieAPI = {
  getAll: () => axios.get(`${API_BASE}/movies`),
  getOne: (id: string) => axios.get(`${API_BASE}/movies/${id}`),
  create: (data: any) => axios.post(`${API_BASE}/movies`, data),
  update: (id: string, data: any) => axios.put(`${API_BASE}/movies/${id}`, data),
  delete: (id: string) => axios.delete(`${API_BASE}/movies/${id}`),
};

export const reviewAPI = {
  getByMovie: (movieId: string) => axios.get(`${API_BASE}/reviews/movie/${movieId}`),
  create: (movieId: string, data: any) => axios.post(`${API_BASE}/reviews/${movieId}`, data),
  delete: (id: string) => axios.delete(`${API_BASE}/reviews/${id}`),
};
