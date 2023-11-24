import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Modal, TextInput } from "flowbite-react";

export default function CalificacionComponent({ data }) {
  const [asignamientos, setAsignamientos] = useState([]);

  const fetchData = async () => {
    await google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
      })
      .getAsignamientosByIdCurso(data._id);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Nombre Estudiante</Table.HeadCell>
          {data.actividades.map((actividad) => (
            <Table.HeadCell key={actividad._id}>
              {actividad.nombre}
            </Table.HeadCell>
          ))}
        </Table.Head>
      </Table>
    </>
  );
}
