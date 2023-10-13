import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

function ActividadesReportes() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Suponiendo que ahora la función devuelve una lista de cursos
        const cursosResponse = await new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {
              console.log(response);
              resolve(response);
            })
            .getCursos(); // Asume que esta función ahora obtiene la lista de cursos
        });

        setCursos(cursosResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>Fecha Curso</Table.HeadCell>
          <Table.HeadCell>Materia</Table.HeadCell>
          <Table.HeadCell>Cliente</Table.HeadCell>
          <Table.HeadCell>Actividad</Table.HeadCell>
          <Table.HeadCell>Asesor</Table.HeadCell>
          <Table.HeadCell>Estado Asesor</Table.HeadCell>
          <Table.HeadCell>Estado Adm</Table.HeadCell>
          <Table.HeadCell>Fecha Vencimiento</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cursos &&
            cursos.map((curso) =>
              curso.actividades.map((actividad, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {new Date(curso.fecha).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{curso.materia.nombre}</Table.Cell>
                  <Table.Cell>{curso.cliente.nombre}</Table.Cell>
                  <Table.Cell>{actividad.nombre}</Table.Cell>
                  <Table.Cell>{actividad.asesor.nombre}</Table.Cell>
                  <Table.Cell>{actividad.estadoAsesor}</Table.Cell>
                  <Table.Cell>{actividad.estadoAdm}</Table.Cell>
                  <Table.Cell>
                    {new Date(actividad.fechaVencimiento).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{actividad.nota}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/editactividad/${actividad._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
        </Table.Body>
      </Table>
    </>
  );
}

export default ActividadesReportes;
