import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function TiposMateria() {
  const [tiposMateria, setTiposMateria] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      // try {
      //   const response = await fetch("your_api_endpoint_here");
      //   const data = await response.json();
      //   setTiposMateria(data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      await google.script.run
        .withSuccessHandler((data) => {
          setTiposMateria(data);
        })
        .getTiposMateria();
    };

    fetchData();
  }, []);

  return (
    <>
    <h1 className="PagesTitles">Tipos de Materias</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formTipoMaterias">
          <Button className="shadow mb-5" color="success">
            Crear Tipo De Materia +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre Tipo de Materia</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tiposMateria &&
            tiposMateria.map((tipoMateria) => (
              <Table.Row
                key={tipoMateria._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{tipoMateria.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoMateria/${tipoMateria.id}`} // Assuming you have an edit route
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

export default TiposMateria;
