import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Tabs } from "flowbite-react";
import Select from "react-select";
import Loader from "../../components/Loader.js";
import { NotificacionesContext } from "../../context/NotificacionesContext.js";
import AsignamientoComponent from "./components/Asignamientos/AsignamientoComponent.js";
import OperacionComponent from "./components/Operaciones/OperacionComponent.js";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setCursos(data);
          setLoading(false);
        })
        .getCursos();
    };
    fetchData();
  }, []);

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700 ">Cursos V2</h1>
      <div className="flex">
        <aside className="p-3 shadow mr-3">
          <h2 className="text-xl mb-3 font-semibold text-gray-600">
            Lista de Cursos
          </h2>
          <ul className="space-y-2">
            {cursos.map((curso) => (
              <li
                key={curso._id}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setSelectedCurso(curso)}
              >
                {curso.materia &&
                  `${curso.materia.nombre} - ${curso.cliente.nombre}`}
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-full">
          {selectedCurso?.fecha && (
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item title="Asignamientos">
                <AsignamientoComponent
                  data={selectedCurso}
                ></AsignamientoComponent>
              </Tabs.Item>
              <Tabs.Item title="Operaciones">
                <OperacionComponent data={selectedCurso}></OperacionComponent>
              </Tabs.Item>
              <Tabs.Item title="Calificaciones">
                <Table striped={true}>
                  <Table.Head>
                    <Table.HeadCell>Estudiante</Table.HeadCell>
                    <Table.HeadCell>Entregable</Table.HeadCell>
                    <Table.HeadCell>Nota</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Comentarios</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>Estudiante {index + 1}</Table.Cell>
                        <Table.Cell>Entregable {index + 1}</Table.Cell>
                        <Table.Cell>
                          {(Math.random() * 10).toFixed(2)}
                        </Table.Cell>
                        <Table.Cell>
                          {Math.random() > 0.5 ? "Aprobado" : "Pendiente"}
                        </Table.Cell>
                        <Table.Cell>Comentarios de ejemplo</Table.Cell>
                        <Table.Cell>
                          <Button size="xs" color="gray">
                            Editar
                          </Button>
                          <Button size="xs" color="red">
                            Eliminar
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Tabs.Item>
            </Tabs.Group>
          )}
        </main>
      </div>

      <div className="LoaderContainer mt-4">{loading && <Loader />}</div>
    </div>
  );
}

export default Cursos;
