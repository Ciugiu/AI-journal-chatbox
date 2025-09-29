import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { AuthResponse, JournalResponse, JournalListResponse } from './types/index.js';

const API_BASE_URL: string = 'http://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (email: string, password: string): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/register', { email, password }),

  login: (email: string, password: string): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/login', { email, password }),
};

// Journal API calls
export const journalAPI = {
  createEntry: (entry_text: string): Promise<AxiosResponse<JournalResponse>> =>
    api.post('/journal', { entry_text }),

  getEntries: (): Promise<AxiosResponse<JournalListResponse>> =>
    api.get('/journal'),
};

export default api;