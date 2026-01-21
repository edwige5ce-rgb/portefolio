import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// SITE CONFIG
// ============================================

export const getSiteConfig = async () => {
  const response = await api.get('/config');
  return response.data;
};

export const updateSiteConfig = async (config) => {
  const response = await api.put('/config', config);
  return response.data;
};

// ============================================
// HERO
// ============================================

export const getHero = async () => {
  const response = await api.get('/hero');
  return response.data;
};

export const updateHero = async (hero) => {
  const response = await api.put('/hero', hero);
  return response.data;
};

// ============================================
// SERVICES
// ============================================

export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const createService = async (service) => {
  const response = await api.post('/services', service);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await api.put(`/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

// ============================================
// ATMOSPHERES
// ============================================

export const getAtmospheres = async () => {
  const response = await api.get('/atmospheres');
  return response.data;
};

export const createAtmosphere = async (atmosphere) => {
  const response = await api.post('/atmospheres', atmosphere);
  return response.data;
};

export const updateAtmosphere = async (id, atmosphere) => {
  const response = await api.put(`/atmospheres/${id}`, atmosphere);
  return response.data;
};

export const deleteAtmosphere = async (id) => {
  const response = await api.delete(`/atmospheres/${id}`);
  return response.data;
};

// ============================================
// PROJECTS
// ============================================

export const getProjects = async (featured = null) => {
  const params = featured !== null ? { featured } : {};
  const response = await api.get('/projects', { params });
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// ============================================
// CONTACT
// ============================================

export const sendContactMessage = async (message) => {
  const response = await api.post('/contact', message);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const markMessageRead = async (id) => {
  const response = await api.put(`/contact/${id}/read`);
  return response.data;
};

export default api;
