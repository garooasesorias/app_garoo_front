import React from "react";
function obtenerFechaActualFormatoYYYYMMDD() {
  const fecha = new Date();

  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // getMonth() devuelve un índice basado en 0, por lo tanto sumamos 1
  const dia = fecha.getDate().toString().padStart(2, "0");

  return `${año}-${mes}-${dia}`;
}

const Home = () => {
  console.log(obtenerFechaActualFormatoYYYYMMDD());
  return (
    <div className="flex-1 flex items-center justify-center p-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-2/3">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a Home</h1>
        <p className="text-gray-600">
          ¡Hola! Este es tu espacio principal. Aquí podrás ver las últimas
          actualizaciones, noticias y estadísticas relacionadas con tu
          aplicación.
        </p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600">
          Explorar más
        </button>
      </div>
    </div>
  );
};

export default Home;
