import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';


function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actividadesResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              resolve(response);
            })
            .getActividades();
        });

        const tipoDataResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              resolve(response);
            })
            .getTiposActividad();
        });
        setLoading(false);

        // Assuming tipoDataResponse contains an array of tipo objects
        const tipoDataMap = tipoDataResponse.reduce((acc, tipo) => {
          acc[tipo._id] = tipo.nombre;
          return acc;
        }, {});

        const actividadesWithTipoNombre = actividadesResponse.map(
          (actividad) => ({
            ...actividad,
            tipoNombre: tipoDataMap[actividad.tipo] || "Unknown Tipo",
          })
        );

        setActividades(actividadesWithTipoNombre);
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

  const filteredActividades = actividades.filter((actividad) => {
    return (
      (!filters.nombre ||
        actividad.nombre
          .toLowerCase()
          .includes(filters.nombre.toLowerCase())) &&
      (!filters.tipo ||
        actividad.tipoNombre.toLowerCase().includes(filters.tipo.toLowerCase())) &&
      (!filters.precio ||
        actividad.precio
          .toLowerCase()
          .includes(filters.precio.toLowerCase())) 
    );
  });
  return (
    <>
      <h1 className="PagesTitles">Actividades</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Nombre de Actividad", "nombre")}
            {renderFilterInput("Tipo de Actividad", "tipo")}
            {renderFilterInput("Precio", "precio")}
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formActividades">
          <Button className="shadow mb-5" color="success">
            Crear Actividad +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Actividad</Table.HeadCell>
          <Table.HeadCell>Tipo de Actividad</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredActividades &&
            filteredActividades.map((actividad) => (
              <Table.Row
                key={actividad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{actividad.nombre}</Table.Cell>
                <Table.Cell>{actividad.tipoNombre}</Table.Cell>
                <Table.Cell>{actividad.precio}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/editactividad/${actividad.id}`}
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

export default Actividades;
