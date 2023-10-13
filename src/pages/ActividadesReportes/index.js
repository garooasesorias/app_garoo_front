import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Link } from "react-router-dom";

function ActividadesReportes() {
  const [cursos, setCursos] = useState([]);
  const [filters, setFilters] = useState({
    fecha: "",
    materia: "",
    cliente: "",
    actividad: "",
    asesor: "",
    estadoAsesor: "",
    estadoAdm: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Suponiendo que ahora la función devuelve una lista de cursos
        const cursosResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              console.log(response);
              resolve(response);
            })
            .getCursos(); // Asume que esta función ahora obtiene la lista de cursos
        });

        setCursos(cursosResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCursos = cursos.filter((curso) => {
    return (
      (!filters.fecha ||
        new Date(curso.fecha).toLocaleDateString() === filters.fecha) &&
      (!filters.materia || curso.materia.nombre.includes(filters.materia)) &&
      (!filters.cliente || curso.cliente.nombre.includes(filters.cliente)) &&
      curso.actividades.some(
        (actividad) =>
          (!filters.actividad ||
            actividad.nombre.includes(filters.actividad)) &&
          (!filters.asesor ||
            actividad.asesor.nombre.includes(filters.asesor)) &&
          (!filters.estadoAsesor ||
            actividad.estadoAsesor.includes(filters.estadoAsesor)) &&
          (!filters.estadoAdm ||
            actividad.estadoAdm.includes(filters.estadoAdm)) &&
          (!filters.fechaVencimiento ||
            new Date(actividad.fechaVencimiento).toLocaleDateString() ===
              filters.fechaVencimiento) &&
          (!filters.nota || actividad.nota.includes(filters.nota))
      )
    );
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                value={filters.fecha}
                onChange={(e) =>
                  setFilters({ ...filters, fecha: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Materia
              </label>
              <input
                type="text"
                value={filters.materia}
                onChange={(e) =>
                  setFilters({ ...filters, materia: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <input
                type="text"
                value={filters.cliente}
                onChange={(e) =>
                  setFilters({ ...filters, cliente: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Actividad
              </label>
              <input
                type="text"
                value={filters.actividad}
                onChange={(e) =>
                  setFilters({ ...filters, actividad: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Asesor
              </label>
              <input
                type="text"
                value={filters.asesor}
                onChange={(e) =>
                  setFilters({ ...filters, asesor: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estado Asesor
              </label>
              <input
                type="text"
                value={filters.estadoAsesor}
                onChange={(e) =>
                  setFilters({ ...filters, estadoAsesor: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estado ADM
              </label>
              <input
                type="text"
                value={filters.estadoAdm}
                onChange={(e) =>
                  setFilters({ ...filters, estadoAdm: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Vencimiento
              </label>
              <input
                type="date"
                value={filters.fechaVencimiento}
                onChange={(e) =>
                  setFilters({ ...filters, fechaVencimiento: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nota
              </label>
              <input
                type="number"
                value={filters.nota}
                onChange={(e) =>
                  setFilters({ ...filters, nota: e.target.value })
                }
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="w-2/3">
        <Table className="w-full">
          <Table.Head>
            <Table.HeadCell>Fecha Curso</Table.HeadCell>
            <Table.HeadCell>Materia</Table.HeadCell>
            <Table.HeadCell>Cliente</Table.HeadCell>
            <Table.HeadCell>Actividad</Table.HeadCell>
            <Table.HeadCell>Asesor</Table.HeadCell>
            <Table.HeadCell>Estado Asesor</Table.HeadCell>
            <Table.HeadCell>Estado Adm</Table.HeadCell>
            <Table.HeadCell>Fecha Vencimiento</Table.HeadCell>
            <Table.HeadCell>Nota</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredCursos &&
              filteredCursos.map((curso) =>
                curso.actividades.map((actividad, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {new Date(curso.fecha).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{curso.materia.nombre}</Table.Cell>
                    <Table.Cell>{curso.cliente.nombre}</Table.Cell>
                    <Table.Cell>{actividad.nombre}</Table.Cell>
                    <Table.Cell>{actividad.asesor.nombre}</Table.Cell>
                    <Table.Cell>{actividad.estadoAsesor}</Table.Cell>
                    <Table.Cell>{actividad.estadoAdm}</Table.Cell>
                    <Table.Cell>
                      {new Date(
                        actividad.fechaVencimiento
                      ).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{actividad.nota}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/editactividad/${actividad._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default ActividadesReportes;
