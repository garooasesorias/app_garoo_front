import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import ModalClientes from "./pages/Clientes/components/Form";
import ModalAsesores from "./pages/Asesores/components/Form";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Layout from "./layouts/layout";
import Asesores from "./pages/Asesores";
import Clientes from "./pages/Clientes";

function App() {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/formAsesores" element={<ModalAsesores />} />
        <Route path="/formClientes" element={<ModalClientes />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
