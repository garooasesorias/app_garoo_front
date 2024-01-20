import api from "./api";

const operacionService = {
  getOperaciones: async () => {
    try {
      const response = await api.get("/operacion/getOperaciones");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los operaciones:", error);
      throw error;
    }
  },

  getOperacionById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/operacion/getOperacionById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el operacion:", error);
      throw error;
    }
  },
  getOperacionesByIdCurso: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.post(
        `/operacion/getOperacionesByIdCurso`,
        { id }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el operacion:", error);
      throw error;
    }
  },

  insertOperacion: async (datosOperacion) => {
    try {
      const response = await api.post(
        "/operacion/insertOperacion",
        datosOperacion
      );
      return response.data; // Respuesta de la API tras insertar el operacion
    } catch (error) {
      console.error("Error al insertar el operacion:", error);
      throw error;
    }
  },

  updateOperacionById: async (id, data) => {
    try {
      const response = await api.put("/operacion/updateOperacionById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el operacion
    } catch (error) {
      console.error("Error al actualizar el operacion:", error);
      throw error;
    }
  },
  deleteOperacionById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(
        `/operacion/deleteOperacionById/${id}`
      );
      return response.data; // Respuesta de la API tras insertar el operacion
    } catch (error) {
      console.error("Error al actualizar el operacion:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de operacions
};

export default operacionService;
