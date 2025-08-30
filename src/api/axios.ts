import axios from "axios";

// URL base de tu API (ajusta el puerto si es necesario)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor para agregar el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;