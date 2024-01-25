import api from "./api";

const asesorService = {
  getAdvisors: async () => {
    try {
      const response = await api.get("/asesor/getAdvisors");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los asesores:", error);
      throw error;
    }
  },

  getAsesorById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/asesor/getAsesorById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el asesor:", error);
      throw error;
    }
  },

  insertAsesor: async (datosAsesor) => {
    try {
      const response = await api.post("/asesor/insertAsesor", datosAsesor);
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al insertar el asesor:", error);
      throw error;
    }
  },

  updateAsesorById: async (id, data) => {
    try {
      const response = await api.put("/asesor/updateAsesorById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al actualizar el asesor:", error);
      throw error;
    }
  },
  deleteAsesorById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/asesor/deleteAsesorById/${id}`);
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("Error al actualizar el asesor:", error);
      throw error;
    }
  },

  loginAsesor: async (data) => {
    try {
      const response = await api.post(`/asesor/loginAsesor`, data);
      return response.data; // Respuesta de la API tras insertar el asesor
    } catch (error) {
      console.error("No se puedo iniciar la sesión", error);
      throw error;
    }
  },

  // Aquí puedes agregar más funciones para interactuar con la API de asesor
};

export default asesorService;
