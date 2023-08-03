import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Layout from "./layaout/Layout";
import Asesores from "./pages/Asesores";
import Clientes from "./pages/Clientes";


function App() {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
