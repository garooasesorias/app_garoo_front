import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";

function Especialidades() {
    
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setEspecialidades(data);
        })
        .getEspecialidades();
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/formEspecialidades">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Especialidades +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Especialidad</Table.HeadCell>
          {/*<Table.HeadCell>Tipo</Table.HeadCell>*/}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {especialidades &&
            especialidades.map((especialidad) => (
              <Table.Row
                key={especialidad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{especialidad.nombre}</Table.Cell>
                {/*<Table.Cell>{materia.tipoNombre}</Table.Cell>*/}
                <Table.Cell>
                  <Link
                    to={`/editEspecialidad/${especialidad.id}`}
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

export default Especialidades;
