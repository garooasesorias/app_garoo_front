function handleError(error) {
  let mensajeError = "Ocurrió un error. Por favor, inténtelo de nuevo.";

  if (error.response) {
    // El servidor respondió con un estado fuera del rango 2xx
    console.error("Error de servidor:", error.response.data);

    // Verifica si existe un mensaje de error personalizado en la respuesta del servidor
    const mensajePersonalizado =
      error.response.data && error.response.data.message;
    mensajeError =
      mensajePersonalizado || "Error en el servidor. Intente más tarde.";
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error("El servidor no responde:", error.request);
    mensajeError =
      "No se puede conectar al servidor. Verifique su conexión a internet.";
  } else {
    // Algo más causó el error
    console.error("Error:", error.message);
    mensajeError =
      error.message ||
      "Ocurrió un error desconocido. Por favor, inténtelo de nuevo.";
  }

  // Aquí podrías decidir cómo quieres mostrar el mensaje de error, por ejemplo:
  return mensajeError;
}

export default manejarError;
