import React, { useState, useEffect } from "react";
import { Table, Button, Link, TableCell } from "flowbite-react";
import Loader from "../../components/Loader.js";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setCursos(data);
          setLoading(false);
        })
        .getCursos();
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700">Cursos V2</h1>

      <div className="flex">
        <aside className="w-1/4 pr-6 shadow">
          <h2 className="text-xl mb-3 font-semibold text-gray-600">
            Lista de Cursos
          </h2>
          <ul className="space-y-2">
            {cursos.map((curso) => (
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

        <main className="w-3/4 pl-6">
          {selectedCurso && (
            <>
              <h2 className="text-2xl mb-4 font-semibold text-gray-700">
                Actividades para {selectedCurso.materia.nombre}
              </h2>
              <Table variant="striped">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Asesor</th>
                    <th className="px-4 py-2">Estado Adm</th>
                    <th className="px-4 py-2">Fecha Límite</th>
                    {/* ... otros encabezados ... */}
                  </tr>
                </thead>
                <tbody>
                  {selectedCurso.actividades.map((actividad) => (
                    <tr key={actividad._id}>
                      <td className="px-4 py-2">{actividad.nombre}</td>
                      <td className="px-4 py-2">
                        <select>
                          <option>Asesor 1</option>
                          <option>Asesor 2</option>
                          <option>Asesor 3</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <select>
                          <option>Envado</option>
                          <option>Pendiente</option>
                          {/* <option>Asesor 3</option> */}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input type="date"></input>
                      </td>
                      {/* ... otras celdas ... */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </main>
      </div>

      <div className="LoaderContainer mt-4">{loading && <Loader />}</div>
    </div>
  );
}

export default Cursos;
