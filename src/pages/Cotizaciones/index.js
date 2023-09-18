import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setCotizaciones(data);
        })
        .getCotizaciones();
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
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Cliente</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Ver Detalles</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cotizaciones &&
            cotizaciones.map((cotizacion) => (
              <Table.Row
                key={cotizacion._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{cotizacion.fecha}</TableCell>
                <Table.Cell>
                  {/* Muestra la información del cliente */}
                  {cotizacion.cliente && (
                    <>
                      {cotizacion.cliente.nombre} -{" "}
                      {cotizacion.cliente.identificacion}
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>${cotizacion.total}</Table.Cell>
                <Table.Cell>
                  {cotizacion.estado && cotizacion.estado.nombre}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formCotizaciones/${cotizacion._id}`}
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

export default Cotizaciones;
