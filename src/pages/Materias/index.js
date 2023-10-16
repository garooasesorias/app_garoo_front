import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function Materias() {
  const [materias, setMaterias] = useState([]);

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

  return (
    <>
    <h1 class="PagesTitles">Materias</h1>
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
          {materias &&
            materias.map((materia) => (
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
    </>
  );
}

export default Materias;
