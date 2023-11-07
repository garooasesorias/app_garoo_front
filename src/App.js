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
import CursosV2 from "./pages/CursosV2";
// import EstadosCursosV2 from "./pages/EstadosCursosV2";
import CursosFormV2 from "./pages/Cursos/components/Form";
import FormCursos from "./pages/Cursos/components/Form";
import Skills from "./pages/Skills";
import FormSkills from "./pages/Skills/components/Form";
import Especialidades from "./pages/Especialidades";
import FormEspecialidades from "./pages/Especialidades/components/Form";
import ActividadesReportes from "./pages/ActividadesReportes";
import Descuentos from "./pages/Descuentos";
import FormDescuentos from "./pages/Descuentos/components/Form";
import { NotificacionesProvider } from "./context/NotificacionesContext";

function App() {
  return (
    <NotificacionesProvider>
      <Layout>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/asesores" element={<Asesores />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/formSkills" element={<FormSkills />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/formEspecialidades" element={<FormEspecialidades />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/actividades" element={<Actividades />} />
          <Route path="/tipoActividades" element={<TipoActividades />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/tipoMaterias" element={<TiposMateria />} />
          <Route path="/cotizaciones" element={<Cotizaciones />} />
          <Route
            path="/estadosCotizaciones"
            element={<EstadosCotizaciones />}
          />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/estadosCursos" element={<EstadosCursos />} />
          <Route path="/cursosv2" element={<CursosV2 />} />
          {/* <Route path="/estadosCursosv2" element={<EstadosCursos />} /> */}
          <Route path="/formAsesores" element={<FormAsesores />} />
          <Route path="/formClientes" element={<FormClientes />} />
          <Route path="/formClientes/:id" element={<FormClientes />} />
          <Route path="/formPlanes" element={<FormPlanes />} />
          <Route path="/formMaterias" element={<FormMaterias />} />
          <Route path="/formActividades" element={<FormActividades />} />
          <Route
            path="/formTipoActividades"
            element={<FormTipoActividades />}
          />
          <Route path="/formTipoMaterias" element={<FormTipoMaterias />} />
          <Route path="/formCotizaciones" element={<FormCotizaciones />} />
          <Route path="/formCotizaciones/:id" element={<FormCotizaciones />} />
          <Route
            path="/formEstadosCotizaciones"
            element={<FormEstadosCotizaciones />}
          />
          <Route path="/formDescuentos" element={<FormDescuentos />} />
          <Route path="/formDescuentos/:id" element={<FormDescuentos />} />
          <Route path="/descuentos" element={<Descuentos />} />
          <Route
            path="/actividadesReportes"
            element={<ActividadesReportes />}
          />
          <Route path="/formCursos" element={<FormCursos />} />
          <Route path="/formCursosV2" element={<CursosFormV2 />} />
          <Route path="/formCursos/:id" element={<FormCursos />} />
          <Route path="/formEstadosCursos" element={<FormEstadosCursos />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </NotificacionesProvider>
  );
}

export default App;
