import api from "./api";

const cursoService = {
  getCursos: async () => {
    try {
      const response = await api.get("/curso/getCursos");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      throw error;
    }
  },

  getCursoById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/curso/getCursoById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el curso:", error);
      throw error;
    }
  },

  insertCurso: async (datosCurso) => {
    try {
      const response = await api.post("/curso/insertCurso", datosCurso);
      return response.data; // Respuesta de la API tras insertar el curso
    } catch (error) {
      console.error("Error al insertar el curso:", error);
      throw error;
    }
  },

  updateCursoById: async (id, data) => {
    try {
      const response = await api.put("/curso/updateCursoById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el curso
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      throw error;
    }
  },
  deleteCursoById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/curso/deleteCursoById/${id}`);
      return response.data; // Respuesta de la API tras insertar el curso
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de cursos
};

export default cursoService;
