// services/AuthGuard.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService"; // Importa tu servicio de autenticación

const AuthGuard = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authService.validateToken();
        setIsVerified(true);
      } catch (error) {
        // Manejar error (token no válido, etc.)
        setIsVerified(false);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // O algún otro indicador de carga
  }

  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
