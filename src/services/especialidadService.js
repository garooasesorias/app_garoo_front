import api from "./api";

const SpecialtyService = {
  getSpecialties: async () => {
    try {
      const response = await api.get("/especialidad/getSpecialties");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los Specialities:", error);
      throw error;
    }
  },
  

  getSpecialtyById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/especialidad/getSpecialtyById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el Specialities:", error);
      throw error;
    }
  },

  insertSpecialty: async (datosSpecialty) => {
    try {
      const response = await api.post("/especialidad/insertSpecialty", datosSpecialty);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al insertar el Specialty:", error);
      throw error;
    }
  },

  updateSpecialtyById: async (id, data) => {
    try {
      const response = await api.put("/especialidad/updateSpecialtyById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el Specialities:", error);
      throw error;
    }
  },
  deleteSpecialtyById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/especialidad/deleteSpecialtyById/${id}`);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el Especialidad:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de clientes
};

export default SpecialtyService;
