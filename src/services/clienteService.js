import api from "./api";

const clienteService = {
  getClientes: async () => {
    try {
      const response = await api.get("/cliente/getClientes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      throw error;
    }
  },

  getClienteById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/cliente/getClienteById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      throw error;
    }
  },

insertCliente: async (datosCliente) => {
  try {
    const response = await api.post("/cliente/insertCliente", datosCliente);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Error específico para clientes duplicados
      throw new Error(error.response.data.message);
    } else {
      // Otros errores
      throw new Error("Error al crear el cliente");
    }
  }
},

  updateClienteById: async (id, data) => {
    try {
      const response = await api.put("/cliente/updateClienteById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  },
  deleteClienteById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/cliente/deleteClienteById/${id}`);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de clientes
};

export default clienteService;
