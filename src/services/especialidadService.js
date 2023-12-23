import api from "./api";

const especialidadService = {
  getEspecialidades: async () => {
    try {
      const response = await api.get("/especialidad/getEspecialidades");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los Especialidades:", error);
      throw error;
    }
  },
  

  getEspecialidadById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/especialidad/getEspecialidadById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el Especialidades:", error);
      throw error;
    }
  },

  insertEspecialidad: async (datosEspecialidad) => {
    try {
      const response = await api.post("/especialidad/insertEspecialidad", datosEspecialidad);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al insertar el Especialidad:", error);
      throw error;
    }
  },

  updateEspecialidadById: async (id, data) => {
    try {
      const response = await api.put("/especialidad/updateEspecialidadById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el Especialidades:", error);
      throw error;
    }
  },
  deleteEspecialidadById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/especialidad/deleteEspecialidadById/${id}`);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el Especialidad:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de clientes
};

export default especialidadService;
