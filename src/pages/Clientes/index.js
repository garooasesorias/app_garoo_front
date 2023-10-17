import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filters, setFilters] = useState({
    identificacion: "",
    nombre: "",
    celular: "",
    correo: "",
  });

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
          console.log(data);
          setClientes(data);
        })
        .getClientes();
    };

    fetchData();
  }, []);

  const filteredCursos = clientes.filter((cliente) => {
    return (
      (!filters.identificacion ||
        cliente.identificacion
          .toLowerCase()
          .includes(filters.identificacion.toLowerCase())) &&
      (!filters.nombre ||
        cliente.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      (!filters.celular ||
        cliente.celular
          .toLowerCase()
          .includes(filters.celular.toLowerCase())) &&
      (!filters.correo ||
        cliente.correo?.toLowerCase().includes(filters.correo?.toLowerCase()))
    );
  });

  return (
    <>
      <h1 className="PagesTitles">Clientes</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Identificación
              </label>
              <input
                type="text"
                value={filters.identificacion}
                onChange={(e) =>
                  setFilters({ ...filters, identificacion: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={filters.nombre}
                onChange={(e) =>
                  setFilters({ ...filters, nombre: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Celular
              </label>
              <input
                type="text"
                value={filters.celular}
                onChange={(e) =>
                  setFilters({ ...filters, celular: e.target.value })
                }
              />
            </div>
            <div className="flex-1 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="text"
                value={filters.correo}
                onChange={(e) =>
                  setFilters({ ...filters, correo: e.target.value })
                }
              />
            </div>
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Link to="/formClientes">
          <Button className="shadow mb-5" color="success">
            Crear Cliente +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Identificación</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Celular</Table.HeadCell>
          <Table.HeadCell>Correo</Table.HeadCell>
          <Table.HeadCell>Cédula</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredCursos &&
            filteredCursos.map((cliente) => (
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
                <Table.Cell>{cliente.cedula}</Table.Cell>
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
