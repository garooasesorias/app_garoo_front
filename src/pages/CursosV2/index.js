import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Tabs } from "flowbite-react";
import Select from "react-select";
import Loader from "../../components/Loader.js";
import AsignamientoComponent from "./components/Asignamientos/AsignamientoComponent.js";
import OperacionComponent from "./components/Operaciones/OperacionComponent.js";
import CalificacionComponent from "./components/Calificaciones/CalificacionComponent.js";
import cursoService from "../../services/cursoService.js";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cursosObtenidos = await cursoService.getCursos();
      console.log("cursosObtenidos", cursosObtenidos);
      setCursos(cursosObtenidos.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700 ">Cursos V2</h1>
      <div className="flex">
        <aside className="p-3 shadow mr-3">
          <h2 className="text-xl mb-3 font-semibold text-gray-600">
            Lista de Cursos
          </h2>
          <ul className="space-y-2">
            {cursos.length > 0 &&
              cursos.map((curso) => (
                <li
                  key={curso._id}
                  className="cursor-pointre hover:text-blue-600"
                  onClick={() => setSelectedCurso(curso)}
                >
                  {curso.materia &&
                    `${curso.materia.nombre} - ${curso.cliente.nombre}`}
                </li>
              ))}
          </ul>
        </aside>

        <main className="w-full">
          {selectedCurso?.fecha && (
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item title="Asignamientos">
                <AsignamientoComponent
                  data={selectedCurso}
                ></AsignamientoComponent>
              </Tabs.Item>
              <Tabs.Item title="Operaciones">
                <OperacionComponent data={selectedCurso}></OperacionComponent>
              </Tabs.Item>
              <Tabs.Item title="Calificaciones">
                <CalificacionComponent
                  data={selectedCurso}
                ></CalificacionComponent>
              </Tabs.Item>
            </Tabs.Group>
          )}
        </main>
      </div>

      <div className="LoaderContainer mt-4">{loading && <Loader />}</div>
    </div>
  );
}

export default Cursos;
