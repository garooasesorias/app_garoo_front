import api from "./api";

const estadoAdmService = {
  getEstadosAdm: async () => {
    try {
      const response = await api.get("/estadoAdm/getEstadosAdm");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estadoAdms:", error);
      throw error;
    }
  },

  getEstadoAdmById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/estadoAdm/getEstadoAdmById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el estadoAdm:", error);
      throw error;
    }
  },

  insertEstadoAdm: async (datosEstadoAdm) => {
    try {
      const response = await api.post("/estadoAdm/insertEstadoAdm", datosEstadoAdm);
      return response.data; // Respuesta de la API tras insertar el estadoAdm
    } catch (error) {
      console.error("Error al insertar el estadoAdm:", error);
      throw error;
    }
  },

  updateEstadoAdmById: async (id, data) => {
    try {
      const response = await api.put("/estadoAdm/updateEstadoAdmById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el estadoAdm
    } catch (error) {
      console.error("Error al actualizar el estadoAdm:", error);
      throw error;
    }
  },
  deleteEstadoAdmById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/estadoAdm/deleteEstadoAdmById/${id}`);
      return response.data; // Respuesta de la API tras insertar el estadoAdm
    } catch (error) {
      console.error("Error al actualizar el estadoAdm:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de estadoAdms
};

export default estadoAdmService;
