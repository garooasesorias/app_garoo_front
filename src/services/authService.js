import api from "./api";
import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;
};

// export const isAdmin = () => {
//   const decodedToken = getDecodedToken();
//   return decodedToken?.role === "administrador";
// };

// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   // Aquí simplemente verifica si el token existe y es un string no vacío
//   return !!token; // Esto devolverá true si hay un token, false si no
// };

// services/authService.js

const authService = {
  validateToken: async () => {
    try {
      const response = await api.post("/auth/verifyAuth");
      return response.data; // Respuesta del servidor tras validar el token
    } catch (error) {
      console.error("Error al validar el token:", error);
      throw error;
    }
  },

  isAdmin: async () => {
    const decodedToken = getDecodedToken();
    return decodedToken?.role === "administrador";
  },

  // export const isAdmin = () => {
  //   const decodedToken = getDecodedToken();
  //   return decodedToken?.role === "administrador";
  // };
  // ... puedes incluir aquí otros métodos relacionados con la autenticación ...
};

export default authService;
