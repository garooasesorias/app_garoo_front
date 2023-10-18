import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function EstadosCursos() {
  const [estadosCotizaciones, setEstadosCotizaciones] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setEstadosCotizaciones(data);
        })
        .getEstadosCotizaciones();
    };

    fetchData();
  }, []);

  return (
    <>
    <h1 className="PagesTitles">Estados Cotizaciones</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formEstadosCotizaciones">
          <Button className="shadow mb-5" color="success">
            Crear Estado Cotización +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {estadosCotizaciones &&
            estadosCotizaciones.map((estadoCotizacion) => (
              <Table.Row
                key={estadoCotizacion._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{estadoCotizacion.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoMateria/${estadoCotizacion.id}`} // Assuming you have an edit route
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
