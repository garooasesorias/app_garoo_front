import api from "./api";

const administradorService = {
  getAdministradores: async () => {
    try {
      const response = await api.get("/administrador/getAdministradores");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los administradores:", error);
      throw error;
    }
  },

  getAdministradorById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/administrador/getAdministradorById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el administrador:", error);
      throw error;
    }
  },

  insertAdministrador: async (datosAdministrador) => {
    try {
      const response = await api.post("/administrador/insertAdministrador", datosAdministrador);
      return response.data; // Respuesta de la API tras insertar el administrador
    } catch (error) {
      console.error("Error al insertar el administrador:", error);
      throw error;
    }
  },

  updateAdministradorById: async (id, data) => {
    try {
      const response = await api.put("/administrador/updateAdministradorById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el administrador
    } catch (error) {
      console.error("Error al actualizar el administrador:", error);
      throw error;
    }
  },
  deleteAdministradorById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/administrador/deleteAdministradorById/${id}`);
      return response.data; // Respuesta de la API tras insertar el administrador
    } catch (error) {
      console.error("Error al actualizar el administrador:", error);
      throw error;
    }
  },

  loginAdministrador: async (data) => {
    try {
      const response = await api.post(`/administrador/loginAdministrador`, data);
      return response.data; // Respuesta de la API tras insertar el administrador
    } catch (error) {
      console.error("No se puedo iniciar la sesión", error);
      throw error;
    }
  },

  // Aquí puedes agregar más funciones para interactuar con la API de administrador
};

export default administradorService;
