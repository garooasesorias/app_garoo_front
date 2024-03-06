import api from "./api";

const actividadesReporteService = {
  getActividadesReporte: async () => {
    try {
      const response = await api.get("/reportes/getActividadesReporte");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      throw error;
    }
  },

  
};

export default actividadesReporteService;
