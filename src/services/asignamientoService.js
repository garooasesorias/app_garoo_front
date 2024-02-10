import api from "./api";

const asignamientoService = {
  getAsignamientoes: async () => {
    try {
      const response = await api.get("/asignamiento/getAsignamientos");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los asignamientos:", error);
      throw error;
    }
  },

  getAsignamientoById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/asignamiento/getAsignamientoById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el asignamiento:", error);
      throw error;
    }
  },
  getAsignamientoesByIdCurso: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.post(
        `/asignamiento/getAsignamientosByIdCurso`,
        { id }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el asignamiento:", error);
      throw error;
    }
  },

  insertAsignamiento: async (datosAsignamiento) => {
    try {
      const response = await api.post(
        "/asignamiento/insertAsignamiento",
        datosAsignamiento
      );
      return response.data; // Respuesta de la API tras insertar el asignamiento
    } catch (error) {
      console.error("Error al insertar el asignamiento:", error);
      throw error;
    }
  },

  insertAsignamiento: async (datosOperacion) => {
    try {
      const response = await api.post(
        "/asignamiento/insertAsignamientos",
        datosOperacion
      );
      return response.data; // Respuesta de la API tras insertar el operacion
    } catch (error) {
      console.error("Error al insertar el operaciones:", error);
      throw error;
    }
  },

  updateAsignamientoById: async (id, data) => {
    try {
      const response = await api.put("/asignamiento/updateAsignamientoById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el asignamiento
    } catch (error) {
      console.error("Error al actualizar el asignamiento:", error);
      throw error;
    }
  },
  deleteAsignamientoById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(
        `/asignamiento/deleteAsignamientoById/${id}`
      );
      return response.data; // Respuesta de la API tras insertar el asignamiento
    } catch (error) {
      console.error("Error al actualizar el asignamiento:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de asignamientos
};

export default asignamientoService;
