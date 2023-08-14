import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import FormClientes from "./pages/Clientes/components/Form";
import FormAsesores from "./pages/Asesores/components/Form";
import FormActividades from "./pages/Actividades/components/Form";
import FormTipoActividades from "./pages/TipoActividades/components/Form";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Layout from "./layouts/layout";
import Asesores from "./pages/Asesores";
import Clientes from "./pages/Clientes";
import Actividades from "./pages/Actividades";
import TipoActividades from "./pages/TipoActividades";

function App() {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/tipoActividades" element={<TipoActividades />} />
        <Route path="/formAsesores" element={<FormAsesores />} />
        <Route path="/formClientes" element={<FormClientes />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/formActividades" element={<FormActividades />} />
        <Route path="/formTipoActividades" element={<FormTipoActividades />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
