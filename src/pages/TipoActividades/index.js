import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function tiposActividad() {
  const [tiposActividad, setTiposActividad] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      // try {
      //   const response = await fetch("your_api_endpoint_here");
      //   const data = await response.json();
      //   setTiposActividad(data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      await google.script.run
        .withSuccessHandler((data) => {
          setTiposActividad(data);
        })
        .getTiposActividad();
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/formtiposActividad">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Tipo de Actividad +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tiposActividad &&
            tiposActividad.map((tipoActividad) => (
              <Table.Row
                key={tipoActividad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{tipoActividad.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoActividad/${tipoActividad.id}`} // Assuming you have an edit route
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

export default tiposActividad;