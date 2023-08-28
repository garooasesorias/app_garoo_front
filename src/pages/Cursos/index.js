import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";

function Cursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setCursos(data);
        })
        .getCursos();
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <Link to="/formCursos">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Curso +
        </Button>
      </Link> */}
      <Table>
        <Table.Head>
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Materia</Table.HeadCell>
          <Table.HeadCell>Cliente</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Ver Detalles</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cursos &&
            cursos.map((curso) => (
              <Table.Row
                key={curso._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{curso.fecha}</TableCell>
                {/* Renderiza el nombre de la materia */}
                <Table.Cell>
                  {/* Renderiza la información de la materia */}
                  {curso.materia && (
                    <>
                      <div>Nombre: {curso.materia.nombre}</div>
                      <div>Tipo: {curso.materia.tipo}</div>
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {/* Muestra la información del cliente */}
                  {curso.cliente && (
                    <>
                      {curso.cliente.nombre} - {curso.cliente.identificacion}
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>{curso.estado && curso.estado.nombre}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formCursos/${curso._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Ver Detalles
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Cursos;
