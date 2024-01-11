import api from "./api";

const tipoActividadService = {
  insertTipoActividad: async (document) => {
    try {
      const response = await api.post("/tipoActividades/insertTipoActividad", document);
      return response.data;
    } catch (error) {
      console.error("Error al insertar el tipo de actividad:", error);
      throw error;
    }
  },

  getTiposActividad: async () => {
    try {
      const response = await api.get("/tipoActividades/getTiposActividad");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los tipos de actividad:", error);
      throw error;
    }
  },

  deleteTiposActividadById: async (id) => {
    try {
      const response = await api.delete(`/tipoActividades/deleteTipoActividadById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el tipo de actividad:", error);
      throw error;
    }
  },

  updateTipoActividadById: async (id, data) => {
    try {
      const response = await api.put("/tipoActividades/updateTipoActividadById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el tipo de actividad:", error);
      throw error;
    }
  },

  getTipoActividadById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/tipoActividades/getTipoActividadById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el tipo actividad:", error);
      throw error;
    }
  },



};

export default tipoActividadService;
