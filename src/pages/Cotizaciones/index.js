import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      // try {
      //   const response = await fetch("your_api_endpoint_here");
      //   const data = await response.json();
      //   setClientes(data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      await google.script.run
        .withSuccessHandler((data) => {
          setClientes(data);
        })
        .getClientes();
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/formCotizaciones">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Cotización +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Identificación</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Celular</Table.HeadCell>
          <Table.HeadCell>Correo</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clientes &&
            clientes.map((cliente) => (
              <Table.Row
                key={cliente._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{cliente.identificacion}</Table.Cell>
                <Table.Cell>{cliente.nombre}</Table.Cell>
                <Table.Cell>{cliente.celular}</Table.Cell>
                <Table.Cell>{cliente.correo}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/editCliente/${cliente.id}`} // Assuming you have an edit route
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

export default Clientes;
