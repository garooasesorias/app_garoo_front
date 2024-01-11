import api from "./api";

const materiaService = {
  getMaterias: async () => {
    try {
      const response = await api.get("/materia/getMaterias");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las materias:", error);
      throw error;
    }
  },

  getMateriaById: async (id) => {
    try {
      const response = await api.get(`/materia/getMateriaById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la materia:", error);
      throw error;
    }
  },

  insertMateria: async (datosMateria) => {
    try {
      const response = await api.post("/materia/insertMateria", datosMateria);
      return response.data; // Respuesta de la API tras insertar la materia
    } catch (error) {
      console.error("Error al insertar la materia:", error);
      throw error;
    }
  },

  updateMateriaById: async (id, data) => {
    try {
      const response = await api.put("/materia/updateMateriaById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras actualizar la materia
    } catch (error) {
      console.error("Error al actualizar la materia:", error);
      throw error;
    }
  },

  deleteMateriaById: async (id) => {
    try {
      const response = await api.delete(`/materia/deleteMateriaById/${id}`);
      return response.data; // Respuesta de la API tras eliminar la materia
    } catch (error) {
      console.error("Error al eliminar la materia:", error);
      throw error;
    }
  },

  // Si tienes otras funciones relacionadas con materias, puedes agregarlas aquí.
};

export default materiaService;
