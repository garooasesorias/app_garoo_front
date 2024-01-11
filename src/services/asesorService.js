import api from "./api";

const adviserService = {
  getAdvisors: async () => {
    try {
      const response = await api.get("/asesor/getAdvisors");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los asesores:", error);
      throw error;
    }
  },

  getAdviserById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/asesor/getAdviserById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el asesor:", error);
      throw error;
    }
  },

  insertAdviser: async (datosAdviser) => {
    try {
      const response = await api.post("/asesor/insertAdviser", datosAdviser);
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al insertar el asesor:", error);
      throw error;
    }
  },

  updateAdviserById: async (id, data) => {
    try {
      const response = await api.put("/asesor/updateAdviserById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al actualizar el asesor:", error);
      throw error;
    }
  },
  deleteAdviserById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/asesor/deleteAdviserById/${id}`);
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al actualizar el asesor:", error);
      throw error;
    }
  },

  // Aquí puedes agregar más funciones para interactuar con la API de asesor
};


export default adviserService ;
