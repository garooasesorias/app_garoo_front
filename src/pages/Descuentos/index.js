import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';

function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    descripcion: "",
    porcentaje: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setDescuentos(data);
          setLoading(false);
        })
        .getDescuentos();
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

  const filteredDescuentos = descuentos.filter((descuento) => {
    return (
      (!filters.descripcion ||
        descuento.descripcion
          .toLowerCase()
          .includes(filters.descripcion.toLowerCase())) &&
      (!filters.fechaInicio ||
        descuento.fechaInicio
          .toLowerCase()
          .includes(filters.fechaInicio.toLowerCase())) &&
      (!filters.fechaFin ||
        descuento.fechaFin
          .toLowerCase()
          .includes(filters.fechaFin.toLowerCase())) &&
      (!filters.estado ||
        descuento.estado.toLowerCase().includes(filters.estado.toLowerCase()))
    );
  });

  return (
    <>
      <h1 className="PagesTitles">Descuentos</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Descripción", "descripcion")}
            {renderFilterInput("Fecha Inicio", "fechaInicio")}
            {renderFilterInput("Fecha Fin", "fechaFin")}
            {renderFilterInput("Estado", "estado")}
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
        <Link to="/formDescuentos">
          <Button className="shadow mb-5" color="success">
            Crear Descuento +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>Porcentaje</Table.HeadCell>
          <Table.HeadCell>Fecha Inicio</Table.HeadCell>
          <Table.HeadCell>Fecha Fin</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredDescuentos &&
            filteredDescuentos.map((descuento) => (
              <Table.Row
                key={descuento._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{descuento.descripcion}</Table.Cell>
                <Table.Cell>{descuento.porcentaje}%</Table.Cell>
                <Table.Cell>{descuento.fechaInicio}</Table.Cell>
                <Table.Cell>{descuento.fechaFin}</Table.Cell>
                <Table.Cell>{descuento.estado}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formDescuentos/${descuento._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
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

export default Descuentos;
