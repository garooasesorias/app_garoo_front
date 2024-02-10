import api from "./api";
import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;
};

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

  isAdmin: () => {
    const decodedToken = getDecodedToken();
    return decodedToken.role === "administrador";
  },
};

export default authService;
