import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import Loader from '../../components/Loader.js';

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fecha: "",
    cliente: "",
    total: "",
    estado: ""
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cotizacionesResponse = await new Promise((resolve) => {
            google.script.run
              .withSuccessHandler((response) => {
                resolve(response);
              })
              .getCotizaciones();
          });        
          const estadosResponse = await new Promise((resolve) => {
            google.script.run
              .withSuccessHandler((response) => {
                resolve(response);
              })
              .getEstadosCotizaciones();
          });
    
          const clientesResponse = await new Promise((resolve) => {
            google.script.run
              .withSuccessHandler((response) => {
                resolve(response);
              })
              .getClientes();
          });
          setLoading(false);
          
          const estadoDataMap = estadosResponse.reduce((acc, estado) => {
          acc[estado._id] = estado.nombre;
          return acc;
          }, {});
    
          const clienteDataMap = clientesResponse.reduce((acc, cliente) => {
            acc[cliente._id] = cliente.nombre;
            return acc;
          }, {});
    
          const cotizacionesWithClienteEstado = cotizacionesResponse.map(
            (cotizacion) => ({
              ...cotizacion, 
              clienteNombre: clienteDataMap[cotizacion.cliente] || "Cliente Desconocido",
              estadoNombre: estadoDataMap[cotizacion.estado] || "Estado Desconocido",
            })

          );
    
          setCotizaciones(cotizacionesWithClienteEstado);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
    
  const renderFilterInput = (label, filterKey) => (
    <div className="flex-1 px-2 mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={filters[filterKey]}
        onChange={(e) =>
          setFilters({ ...filters, [filterKey]: e.target.value })
        }
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );

  const filteredCotizaciones = cotizaciones.filter((cotizacion) => {
    return (
      (!filters.fecha ||
        cotizacion.fecha
          .toLowerCase()
          .includes(filters.fecha.toLowerCase())) &&
      (!filters.cliente ||
        cotizacion.clienteNombre
        .toLowerCase().includes(filters.cliente.toLowerCase())) &&
      (!filters.total ||
        cotizacion.total
        .toString()
        .includes(filters.total.toLowerCase())) &&
      (!filters.estado ||
        cotizacion.estadoNombre
        .toLowerCase().includes(filters.estado.toLowerCase())) 
    );
  });


  return (
    <>
    <h1 className="PagesTitles">Cotizaciones</h1>
    <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Fecha", "fecha")}
            {renderFilterInput("Cliente", "cliente")}
            {renderFilterInput("Total", "total")}
            {renderFilterInput("Estado", "estado")}
          </div>
        </Card>
      </div>
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formCotizaciones">
          <Button className="shadow mb-5" color="success">
            Crear Cotización +
          </Button>
        </Link>
      </div>
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
          {filteredCotizaciones &&
            filteredCotizaciones.map((cotizacion) => (
              <Table.Row
                key={cotizacion._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{cotizacion.fecha}</TableCell>
                <Table.Cell>
                  {/* Muestra la información del cliente */}
                  {cotizacion.cliente && (
                    <>
                      {cotizacion.cliente.nombre} 
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
      <div className="LoaderContainer">
            {loading ? <Loader /> : null}
            </div>
    </>
  );
}

export default Cotizaciones;