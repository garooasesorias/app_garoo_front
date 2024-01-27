import api from "./api";

// Service
const notificacionesService = {
  getNotificaciones: async () => {
    try {
      const response = await api.get("/notificaciones/getNotificaciones");
      // Asegúrate de manejar correctamente la estructura de la respuesta
      if (response.status === 200 && response.data.ok && Array.isArray(response.data.data)) {
        return response.data.data; // Devuelve directamente el array de notificaciones
      } else {
        console.error('La respuesta no contiene un array de notificaciones:', response);
        return []; // Devuelve un array vacío si la respuesta no es como se esperaba
      }
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
      throw error;
    }
  },
};

export default notificacionesService;
