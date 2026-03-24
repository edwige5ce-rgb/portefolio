import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
});

export const getSiteConfig = async () => {
  const response = await api.get('/config');
  return response.data;
};

export const getHero = async () => {
  const response = await api.get('/hero');
  return response.data;
};

export const getAbout = async () => {
  const response = await api.get('/about');
  return response.data;
};

export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data;
};

export const sendContactMessage = async (message) => {
  const response = await api.post('/contact', message);
  return response.data;
};

export default api;
