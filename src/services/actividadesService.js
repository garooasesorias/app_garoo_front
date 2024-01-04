import api from "./api";

const actividadesService = {
  getActividades: async () => {
    try {
      const response = await api.get("/actividades/getActividades");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      throw error;
    }
  },


  deleteActividadById: async (id) => {
    try {
      const response = await api.delete(`/actividades/deleteActividadById/${id}`);
      return response.data; // Respuesta de la API tras eliminar la actividad
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
      throw error;
    }
  },

  
};

export default actividadesService;
