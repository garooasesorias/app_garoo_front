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

  insertActividad: async (document) => {
    try {
      const response = await api.post("/actividades/insertActividad", document);
      return response.data;
    } catch (error) {
      console.error("Error al insertar actividad:", error);
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
  
  updateActividadById: async (id, data) => {
    try {
      const response = await api.put("/actividades/updateActividadById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar la actividad:", error);
      throw error;
    }
  },

  getActividadById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/actividades/getActividadById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la actividad:", error);
      throw error;
    }
  },
  
};

export default actividadesService;
