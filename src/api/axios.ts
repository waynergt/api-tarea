import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Cambia el puerto si es necesario
  withCredentials: false,
});

export default api;