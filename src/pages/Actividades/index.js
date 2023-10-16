import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function Actividades() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const actividadesResponse = await google.script.run.getActividades();
        // const tipoDataResponse = await google.script.run.getTiposActividad();
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

  return (
    <>
      <h1 class="PagesTitles">Actividades</h1>
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
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Tipo</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {actividades &&
            actividades.map((actividad) => (
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
    </>
  );
}

export default Actividades;
