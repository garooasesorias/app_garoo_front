import api from "./api";

const cotizacionService = {
  getCotizaciones: async () => {
    try {
      const response = await api.get("/cotizacion/getCotizaciones");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los cotizaciones:", error);
      throw error;
    }
  },

  getCotizacionById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/cotizacion/getCotizacionById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  insertCotizacion: async (datosCotizacion) => {
    try {
      const response = await api.post(
        "/cotizacion/insertCotizacion",
        datosCotizacion
      );
      return response.data; // Respuesta de la API tras insertar el cotizacion
    } catch (error) {
      console.error("Error al insertar el cotizacion:", error);
      throw error;
    }
  },

  updateCotizacionById: async (id, data) => {
    try {
      const response = await api.put(
        `/cotizacion/updateCotizacionById/${id}`,
        data
      );
      return response.data; // Respuesta de la API tras insertar el cotizacion
    } catch (error) {
      throw error;
    }
  },

  deleteCotizacionById: async (id) => {
    try {
      const response = await api.delete(
        `/cotizacion/deleteCotizacionById/${id}`
      );
      return response.data; // Respuesta de la API tras insertar el cotizacion
    } catch (error) {
      console.error("Error al actualizar el cotizacion:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de cotizaciones
};

export default cotizacionService;
