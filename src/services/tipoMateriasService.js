import api from "./api";

const tipoMateriaService = {
  getTiposMateria: async () => {
    try {
      const response = await api.get("/tipoMateria/getTipoMaterias");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los tipos de materia:", error);
      throw error;
    }
  },

  getTipoMateriaById: async (id) => {
    try {
      const response = await api.get(`/tipoMateria/getTipoMateriaById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el tipo de materia:", error);
      throw error;
    }
  },

  insertTipoMateria: async (datosTipoMateria) => {
    try {
      const response = await api.post("/tipoMateria/insertTipoMateria", datosTipoMateria);
      return response.data;
    } catch (error) {
      console.error("Error al insertar el tipo de materia:", error);
      throw error;
    }
  },

  updateTipoMateriaById: async (id, data) => {
    try {
      const response = await api.put("/tipoMateria/updateTipoMateriaById", {
        id,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el tipo de materia:", error);
      throw error;
    }
  },

  deleteTipoMateriaById: async (id) => {
    try {
      const response = await api.delete(`/tipoMateria/deleteTipoMateriaById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el tipo de materia:", error);
      throw error;
    }
  },
  // Puedes agregar aquí más funciones para interactuar con la API de tipos de materia
};

export default tipoMateriaService;
