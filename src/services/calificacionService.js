import api from "./api";

const calificacionService = {
  getCalificaciones: async () => {
    try {
      const response = await api.get("/calificacion/getCalificaciones");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los calificaciones:", error);
      throw error;
    }
  },

  getCalificacionById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/calificacion/getCalificacionById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el calificacion:", error);
      throw error;
    }
  },
  getCalificacionesByIdCurso: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.post(
        `/calificacion/getCalificacionesByIdCurso`,
        { id }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el calificacion:", error);
      throw error;
    }
  },

  insertCalificaciones: async (datosCalificaciones) => {
    try {
      const response = await api.post(
        "/calificacion/insertCalificaciones",
        datosCalificaciones
      );
      return response.data; // Respuesta de la API tras insertar el operacion
    } catch (error) {
      console.error("Error al insertar el operaciones:", error);
      throw error;
    }
  },

  insertCalificacion: async (datosCalificacion) => {
    try {
      const response = await api.post(
        "/calificacion/insertCalificacion",
        datosCalificacion
      );
      return response.data; // Respuesta de la API tras insertar el calificacion
    } catch (error) {
      console.error("Error al insertar el calificacion:", error);
      throw error;
    }
  },

  updateCalificacionById: async (id, data) => {
    try {
      const response = await api.put("/calificacion/updateCalificacionById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el calificacion
    } catch (error) {
      console.error("Error al actualizar el calificacion:", error);
      throw error;
    }
  },
  updatePuntaje: async (query, value) => {
    try {
      const response = await api.put("/calificacion/updatePuntaje", {
        query,
        value,
      });
      return response.data; // Respuesta de la API tras insertar el calificacion
    } catch (error) {
      console.error("Error al actualizar el puntaje:", error);
      throw error;
    }
  },

  deleteCalificacionById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(
        `/calificacion/deleteCalificacionById/${id}`
      );
      return response.data; // Respuesta de la API tras insertar el calificacion
    } catch (error) {
      console.error("Error al actualizar el calificacion:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de calificacions
};

export default calificacionService;
