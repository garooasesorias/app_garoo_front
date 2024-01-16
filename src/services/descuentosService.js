import api from "./api";

const descuentosService = {
  getDescuentos: async () => {
    try {
      const response = await api.get("/descuentos/getDescuentos");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los descuentos:", error);
      throw error;
    }
  },

  getDescuentoById: async (id) => {
    try {
      const response = await api.get(`/descuentos/getDescuentoById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el descuento:", error);
      throw error;
    }
  },

  insertDescuento: async (datosDescuento) => {
    try {
      const response = await api.post("/descuentos/insertDescuento", datosDescuento);
      return response.data; // Respuesta de la API tras insertar el descuento
    } catch (error) {
      console.error("Error al insertar el descuento:", error);
      throw error;
    }
  },

  updateDescuentoById: async (id, data) => {
    try {
      const response = await api.put("/descuentos/updateDescuentoById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras actualizar el descuento
    } catch (error) {
      console.error("Error al actualizar el descuento:", error);
      throw error;
    }
  },
  
  deleteDescuentoById: async (id) => {
    try {
      const response = await api.delete(`/descuentos/deleteDescuentoById/${id}`);
      return response.data; // Respuesta de la API tras eliminar el descuento
    } catch (error) {
      console.error("Error al eliminar el descuento:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de descuentos
};

export default descuentosService;
