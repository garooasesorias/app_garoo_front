import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';

function Materias() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    nombre: "",
    tipo: "",  
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const materiasResponse = await google.script.run.getmaterias();
        // const tipoDataResponse = await google.script.run.getTiposmateria();
        const materiasResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              resolve(response);
            })
            .getMaterias();
          });
          

        const tipoDataResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              resolve(response);
            })
            .getTiposMateria();
        });
        setLoading(false);

        // Assuming tipoDataResponse contains an array of tipo objects
        const tipoDataMap = tipoDataResponse.reduce((acc, tipo) => {
          acc[tipo._id] = tipo.nombre;
          return acc;
        }, {});

        const materiasWithTipoNombre = materiasResponse.map((materia) => ({
          ...materia,
          tipoNombre: tipoDataMap[materia.tipo] || "Unknown Tipo",
        }));

        setMaterias(materiasWithTipoNombre);
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

  const filteredMaterias = materias.filter((materia) => {
    return (
      (!filters.nombre ||
        materia.nombre
          .toLowerCase()
          .includes(filters.nombre.toLowerCase())) &&
      (!filters.tipo ||
        materia.tipo
        .toLowerCase()
        .includes(filters.tipo.toLowerCase())) 
    );
  });
  return (
    <>
    <h1 className="PagesTitles">Materias</h1>
    <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Nombre de Materia", "nombre")}
            {renderFilterInput("Tipo de Materia", "tipo")}
            
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formMaterias">
          <Button className="shadow mb-5" color="success">
            Crear Materia +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Materia</Table.HeadCell>
          <Table.HeadCell>Tipo de Materia</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredMaterias &&
            filteredMaterias.map((materia) => (
              <Table.Row
                key={materia._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{materia.nombre}</Table.Cell>
                <Table.Cell>{materia.tipoNombre}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/editmateria/${materia.id}`}
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

export default Materias;
