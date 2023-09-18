import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import FormClientes from "./pages/Clientes/components/Form";
import FormAsesores from "./pages/Asesores/components/Form";
import FormActividades from "./pages/Actividades/components/Form";
import FormTipoActividades from "./pages/TipoActividades/components/Form";
import FormPlanes from "./pages/Planes/components/Form";
import FormMaterias from "./pages/Materias/components/Form";
import FormTipoMaterias from "./pages/TipoMaterias/components/Form";
import FormCotizaciones from "./pages/Cotizaciones/components/Form";
import FormEstadosCotizaciones from "./pages/EstadosCotizaciones/components/Form";
import FormEstadosCursos from "./pages/EstadosCursos/components/Form";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Layout from "./layouts/layout";
import Asesores from "./pages/Asesores";
import Clientes from "./pages/Clientes";
import Actividades from "./pages/Actividades";
import TipoActividades from "./pages/TipoActividades";
import Planes from "./pages/Planes";
import Materias from "./pages/Materias";
import TiposMateria from "./pages/TipoMaterias";
import Cotizaciones from "./pages/Cotizaciones";
import EstadosCotizaciones from "./pages/EstadosCotizaciones";
import Cursos from "./pages/Cursos";
import EstadosCursos from "./pages/EstadosCursos";
import CursosForm from "./pages/Cursos/components/Form";
import FormCursos from "./pages/Cursos/components/Form";

function App() {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/asesores" element={<Asesores />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/tipoActividades" element={<TipoActividades />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/tipoMaterias" element={<TiposMateria />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/estadosCotizaciones" element={<EstadosCotizaciones />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/estadosCursos" element={<EstadosCursos />} />
        <Route path="/formAsesores" element={<FormAsesores />} />
        <Route path="/formClientes" element={<FormClientes />} />
        <Route path="/formPlanes" element={<FormPlanes />} />
        <Route path="/formMaterias" element={<FormMaterias />} />
        <Route path="/formActividades" element={<FormActividades />} />
        <Route path="/formTipoActividades" element={<FormTipoActividades />} />
        <Route path="/formTipoMaterias" element={<FormTipoMaterias />} />
        <Route path="/formCotizaciones" element={<FormCotizaciones />} />
        <Route path="/formCotizaciones/:id" element={<FormCotizaciones />} />
        <Route
          path="/formEstadosCotizaciones"
          element={<FormEstadosCotizaciones />}
        />
        <Route path="/formCursos" element={<FormCursos />} />
        <Route path="/formCursos/:id" element={<FormCursos />} />
        <Route path="/formEstadosCursos" element={<FormEstadosCursos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
