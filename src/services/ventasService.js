import api from "./api";

const ventaService = {
  getVentas: async () => {
    try {
      const response = await api.get("/ventas/getVentas");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
      throw error;
    }
  },

  getVentaById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/ventas/getVentaById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la venta:", error);
      throw error;
    }
  },

  insertVenta: async (datosVenta) => {
    try {
      const response = await api.post("/ventas/insertVenta", datosVenta);
      return response.data; // Respuesta de la API tras insertar el curso
    } catch (error) {
      console.error("Error al insertar la venta:", error);
      throw error;
    }
  },

  updateVentaById: async (id, data) => {
    try {
      const response = await api.put(`/ventas/updateVentaById/${id}`, data);
      return response.data; // Respuesta de la API tras actualizar la venta
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      throw error;
    }
  },
  
  deleteVentaById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/ventas/deleteVentaById/${id}`);
      return response.data; // Respuesta de la API tras insertar el curso
    } catch (error) {
      console.error("Error al borrar la venta:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de cursos
};

export default ventaService;
