// src/context/NotificationesContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  // Supongamos que esta es tu función para obtener notificaciones de la base de datos
  const fetchNotificaciones = useCallback(async () => {
    try {
      await google.script.run
        .withSuccessHandler(setNotificaciones)
        .getNotificaciones();
    } catch (error) {
      console.error("Error al cargar las notificaciones:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  // Proporcionar el array y la función de actualización en el contexto
  return (
    <NotificacionesContext.Provider
      value={{ notificaciones, fetchNotificaciones }}
    >
      {children}
    </NotificacionesContext.Provider>
  );
};
