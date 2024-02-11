import api from "./api";

const versionService = {
  getVersion: async () => {
    try {
      const response = await api.get("/version");
      return response.data;
    } catch (error) {
      console.error("Error al obtener la versión:", error);
      throw error;
    }
  },
};

export default versionService;
