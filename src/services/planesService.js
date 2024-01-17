import api from "./api";

const planesService = {
  getPlanes: async () => {
    try {
      const response = await api.get("/planes/getPlanes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los planes:", error);
      throw error;
    }
  },

  getPlanById: async (id) => {
    try {
      const response = await api.get(`/planes/getPlanById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el plan:", error);
      throw error;
    }
  },

  insertPlan: async (datosPlan) => {
    try {
      const response = await api.post("/planes/insertPlan", datosPlan);
      return response.data; // Respuesta de la API tras insertar el plan
    } catch (error) {
      console.error("Error al insertar el plan:", error);
      throw error;
    }
  },

  updatePlanById: async (id, data) => {
    try {
      const response = await api.put(`/planes/updatePlanById/${id}`, data);
      return response.data; // Respuesta de la API tras actualizar el plan
    } catch (error) {
      console.error("Error al actualizar el plan:", error);
      throw error;
    }
  },
  
  
  deletePlanById: async (id) => {
    try {
      const response = await api.delete(`/planes/deletePlanById/${id}`);
      return response.data; // Respuesta de la API tras eliminar el plan
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de planes
};

export default planesService;
