import api from "./api";

const skillService = {
  getSkills: async () => {
    try {
      const response = await api.get("/skill/getSkills");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los skills:", error);
      throw error;
    }
  },

  getSkillById: async (id) => {
    try {
      // Asegúrate de incluir el ID en la URL
      const response = await api.get(`/skill/getSkillById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el skill:", error);
      throw error;
    }
  },

  insertSkill: async (datosSkill) => {
    try {
      const response = await api.post("/skill/insertSkill", datosSkill);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al insertar el skill:", error);
      throw error;
    }
  },

  updateSkillById: async (id, data) => {
    try {
      const response = await api.put("/skill/updateSkillById", {
        id,
        data,
      });
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el skill:", error);
      throw error;
    }
  },
  deleteSkillById: async (id) => {
    console.log(id);
    try {
      const response = await api.delete(`/skill/deleteSkillById/${id}`);
      return response.data; // Respuesta de la API tras insertar el cliente
    } catch (error) {
      console.error("Error al actualizar el skill:", error);
      throw error;
    }
  },
  // Aquí puedes agregar más funciones para interactuar con la API de clientes
};

export default skillService;
