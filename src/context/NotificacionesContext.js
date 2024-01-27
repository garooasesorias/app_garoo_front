// Context
import React, { createContext, useState, useEffect, useCallback } from "react";
import notificacionesService from "../services/notificacionesService";

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotificacionesDelBackend = useCallback(async () => {
    setLoading(true);
    try {
      const data = await notificacionesService.getNotificaciones();
      console.log(data)
      setNotificaciones(data); // data ya es un array según la lógica en el servicio
    } catch (error) {
      console.error("Error al cargar las notificaciones:", error);
      setNotificaciones([]); // Asegúrate de que notificaciones siempre es un array
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotificacionesDelBackend();
  }, [fetchNotificacionesDelBackend]);

  return (
    <NotificacionesContext.Provider value={{ notificaciones, fetchNotificaciones: fetchNotificacionesDelBackend, loading }}>
      {children}
    </NotificacionesContext.Provider>
  );
};
