import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function EstadosCursos() {
  const [estadosCursos, setEstadosCursos] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
  
      await google.script.run
        .withSuccessHandler((data) => {
          setEstadosCursos(data);
        })
        .getEstadosCursos();
    };

    fetchData();
  }, []);

  return (
    <>
    <h1 className="PagesTitles">Estados Cursos</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formEstadosCursos">
          <Button className="shadow mb-5" color="success">
            Crear Estado Curso +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre Estado de Curso</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {estadosCursos &&
            estadosCursos.map((estadoCurso) => (
              <Table.Row
                key={estadoCurso._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{estadoCurso.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoMateria/${estadoCurso.id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default EstadosCursos;
