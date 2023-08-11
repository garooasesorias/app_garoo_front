import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import FormClientes from "./pages/Clientes/components/Form";
import FormAsesores from "./pages/Asesores/components/Form";
import FormActividades from "./pages/Actividades/components/Form";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Layout from "./layouts/layout";
import Asesores from "./pages/Asesores";
import Clientes from "./pages/Clientes";
<<<<<<< HEAD
import ModalService from "./components/ModalService";
import Cotizaciones from "./pages/Cotizaciones";
=======
import Actividades from "./pages/Actividades";
>>>>>>> 2c31c77da16ab746267c94603812e69952f7807f

function App() {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/clientes" element={<Clientes />} />
<<<<<<< HEAD
        <Route path="/modalservice" element={<ModalService />} />
=======
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/formAsesores" element={<FormAsesores />} />
        <Route path="/formClientes" element={<FormClientes />} />
        <Route path="/formActividades" element={<FormActividades />} />
>>>>>>> 2c31c77da16ab746267c94603812e69952f7807f
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
