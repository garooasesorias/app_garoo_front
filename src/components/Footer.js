import React, { useState, useEffect } from "react";
import versionService from "../services/versionService"; // Asegúrate de que la ruta sea correcta
import pkg from "../../package.json";
import env from "../env.json";

function Footer() {
  const [apiVersion, setApiVersion] = useState("");

  useEffect(() => {
    // Llama a la función getVersion de clienteService
    const fetchVersion = async () => {
      try {
        const data = await versionService.getVersion();
        setApiVersion(data.version);
      } catch (error) {
        console.error("Error al obtener la versión de la API:", error);
        setApiVersion("Error al cargar");
      }
    };

    fetchVersion();
  }, []); // El array vacío indica que el efecto se ejecuta solo al montar

  return (
    <p className="text-end me-2">
      F-Version: {pkg.version} | API URL: {env.baseURL} | API Version: {apiVersion}
    </p>
  );
}

export default Footer;
