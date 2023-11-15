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
        // const cursosResponse = await new Promise((resolve) => {
        //   google.script.run
        //     .withSuccessHandler((response) => {
        //       console.log(response);
        //       resolve(response);
        //     })
        //     .getCursos();
        // });

        // setCursos(cursosResponse);
        setCursos([
          {
            fecha: "2023-09-08T19:28:29.580Z",
            cliente: {
              celular: "3241243445e",
              identificacion: "3456",
              _id: "64d292067724b2e0f91308a6",
              nombre: "Fernando Osorio",
              correo: "fernando@mail.com",
            },
            estado: {
              nombre: "Iniciado",
              _id: "64eb986d83c29fa14cbabb69",
            },
            materia: {
              nombre: "Calculo II",
              tipo: "64dc1e8b1b0f1b5ea3978af8",
              _id: "64dc206ede10c0d9a0f360a6",
            },
            _id: "64fb75e0cbdbf5a1f137cb36",
            actividades: [
              {
                estadoAdm: "PENDIENTE-SIN APORTE",
                precio: "150",
                tipo: "64da55f2c0919e09477b59a8",
                fechaVencimiento: "2023-10-09",
                asesor: {
                  nombre: "Julian",
                  _id: "6525687bf7c64b76e9686ea0",
                },
                estadoAsesor: "ENVIADO",
                _id: "64dabe480add76a0a305a734",
                nombre: "Quiz 2",
                nota: 0,
              },
              {
                estadoAdm: "PENDIENTE-SIN APORTE",
                precio: "150",
                tipo: "64da55f2c0919e09477b59a8",
                fechaVencimiento: "2023-10-09",
                asesor: {
                  nombre: "Fabian",
                  _id: "65299a459fb77abc2cc231a7",
                },
                estadoAsesor: "ENVIADO",
                _id: "64dac56473243a87dde43fc1",
                nota: 0,
                nombre: "Quiz 1",
              },
              {
                estadoAdm: "REVISADO",
                tipo: "64da55f2c0919e09477b59a8",
                precio: "200",
                fechaVencimiento: "2023-10-13",
                asesor: {
                  nombre: "Fabian",
                  _id: "65299a459fb77abc2cc231a7",
                },
                estadoAsesor: "FINALIZADO",
                _id: "64dac5867f3ef1926f2b73a3",
                nombre: "Parcial 1",
                nota: 0,
              },
            ],
          },
          {
            fecha: "2023-10-13T16:39:36.623Z",
            cliente: {
              celular: "3165321730",
              identificacion: "NG220",
              _id: "65087d8208fdc492800cb7da",
              nombre: "Diana Katherine Moncada Real",
              correo: "natalia24tolosa@gmial.com",
            },
            estado: {
              nombre: "Iniciado",
              _id: "64eb986d83c29fa14cbabb69",
            },
            materia: {
              nombre: "Calculo II",
              tipo: "64dc1e8b1b0f1b5ea3978af8",
              _id: "64dc206ede10c0d9a0f360a6",
            },
            _id: "652972cd79a1f1c149c5acdc",
            actividades: [
              {
                estadoAdm: "ENVIADO",
                tipo: "64da55f2c0919e09477b59a8",
                precio: "150",
                fechaVencimiento: "2023-10-13",
                asesor: {
                  nombre: "Julian",
                  _id: "6525687bf7c64b76e9686ea0",
                },
                estadoAsesor: "PENDIENTE",
                _id: "64dabe480add76a0a305a734",
                nota: 0,
                nombre: "Quiz 2",
              },
              {
                estadoAdm: "ENVIADO",
                tipo: "64da55f2c0919e09477b59a8",
                precio: "200",
                fechaVencimiento: "2023-10-15",
                estadoAsesor: "PENDIENTE",
                asesor: {
                  nombre: "Julian",
                  _id: "6525687bf7c64b76e9686ea0",
                },
                _id: "64dac5867f3ef1926f2b73a3",
                nota: 0,
                nombre: "Parcial 1",
              },
            ],
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCursos = cursos.filter((curso) => {
    return (
      (!filters.materia ||
        curso.materia.nombre
          .toLowerCase()
          .includes(filters.materia.toLowerCase())) &&
      (!filters.cliente ||
        curso.cliente.nombre
          .toLowerCase()
          .includes(filters.cliente.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="PagesTitles">Reporte Actividades</h1>
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
      <div>
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
