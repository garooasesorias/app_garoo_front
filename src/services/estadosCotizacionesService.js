import api from "./api";

const estadosCotizacionesService = {
  getEstadosCotizaciones: async () => {
    try {
      const response = await api.get("/estadosCotizaciones/getEstadosCotizaciones");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estados de cotizaciones:", error);
      throw error;
    }
  },

  getEstadoCotizacionById: async (id) => {
    try {
      const response = await api.get(`/estadosCotizaciones/getEstadoCotizacionById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el estado de cotización:", error);
      throw error;
    }
  },

  insertEstadoCotizacion: async (datosEstadoCotizacion) => {
    try {
      const response = await api.post("/estadosCotizaciones/insertEstadoCotizacion", datosEstadoCotizacion);
      return response.data; // Respuesta de la API tras insertar el estado de cotización
    } catch (error) {
      console.error("Error al insertar el estado de cotización:", error);
      throw error;
    }
  },

updateEstadoCotizacionById: async (id, data) => {
  try {
    const response = await api.put(`/estadosCotizaciones/updateEstadoCotizacionById/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado de cotización:", error);
    throw error;
  }
},

  
  deleteEstadoCotizacionById: async (id) => {
    try {
      const response = await api.delete(`/estadosCotizaciones/deleteEstadoCotizacionById/${id}`);
      return response.data; // Respuesta de la API tras eliminar el estado de cotización
    } catch (error) {
      console.error("Error al eliminar el estado de cotización:", error);
      throw error;
    }
  },

  // Si tienes otras funciones relacionadas con estados de cotizaciones, puedes agregarlas aquí.
};

export default estadosCotizacionesService;
