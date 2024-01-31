import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(""); // Reiniciar el mensaje de error en cada intento
      try {
        const response = await cursoService.getCursos(); // Llamada al servicio
        if (!response.ok) {
          const errorData = await response; // Intentar obtener el cuerpo de la respuesta de error
          setErrorMessage(errorData.message || "Error al cargar los cursos."); // Usar el mensaje de error del backend si está disponible
        } else {
          const data = await response; // Parsear la respuesta JSON
          if (data.ok) {
            setCursos(data.data);
          } else {
            setErrorMessage(data.message || "Error desconocido"); // Usar el mensaje de error del backend si está disponible
          }
        }
      } catch (err) {
        console.log("err ", err);
        setErrorMessage(
          `${err.response.data.message || err.message || "Error desconocido"}`
        );
      } finally {
        setLoading(false); // Asegurar que el estado de carga se actualice correctamente
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700">Cursos V2</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {loading && (
        <div className="LoaderContainer mt-4">
          <Loader />
        </div>
      )}
      {!loading && !errorMessage && (
        <>
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
                      className="cursor-pointer hover:text-blue-600"
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
                    <OperacionComponent
                      data={selectedCurso}
                    ></OperacionComponent>
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
        </>
      )}
    </div>
  );
}

export default Cursos;
