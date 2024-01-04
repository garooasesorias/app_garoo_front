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


};

export default tipoActividadService;
