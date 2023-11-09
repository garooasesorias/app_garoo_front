import React from "react";
import { Dropdown } from "flowbite-react";
import { Table, Button, Tabs } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { FiBell } from "react-icons/fi";

const Home = () => {
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
