import axios from "axios";

// Crear una instancia de Axios con configuraciones por defecto
const api = axios.create({
  baseURL: "http://localhost:4200/api/v1",
  // baseURL: "http://154.41.228.21:3000/api/v1",
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
