import axios from "axios";
import env from "../env.json";
// Crear una instancia de Axios con configuraciones por defecto
const api = axios.create({
  baseURL: env.baseURL,
});

// Interceptor para añadir el token de autenticación en cada solicitud
api.interceptors.request.use(
  (config) => {
    // Aquí obtienes el token de alguna forma, por ejemplo, del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
