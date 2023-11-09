import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Tabs } from "flowbite-react";
import Select from "react-select";
import Loader from "../../components/Loader.js";
import { parseISO, format } from "date-fns";
import { NotificacionesContext } from "../../context/NotificacionesContext.js";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asesores, setAsesores] = useState([]);
  const [estadosAdm, setEstadosAdm] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [formData, setFormData] = useState({
    fecha: "",
    actividades: [],
  });
  const [estadosAsesor, setEstadosAsesores] = useState([]);
  const { notificationes } = useContext(NotificacionesContext);

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setCursos(data);
          setLoading(false);
        })
        .getCursos();

      await google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setAsesores(response);
        })
        .getAsesores();

      await google.script.run.withSuccessHandler(setEstadosAdm).getEstadosAdm();

      await google.script.run
        .withSuccessHandler(setEstadosAsesores)
        .getEstadosAsesores();
    };
    fetchData();
  }, []);

  const updateFormData = (curso) => {
    setSelectedCurso(curso);
    setSelectedDates({});
    setFormData({
      fecha: "",
      actividades: [],
    });

    const initialActividades = curso.actividades.map((actividad) => ({
      nota: actividad.nota || { $numberInt: "0" },
      _id: actividad._id,
      asesor: {
        nombre: actividad.asesor.nombre,
        _id: actividad.asesor._id,
      },
      estadoAdm: actividad.estadoAdm,
      estadoAsesor: actividad.estadoAsesor,
      fechaVencimiento: actividad.fechaVencimiento,
    }));
    setFormData((prev) => ({
      ...prev,
      fecha: curso.fecha,
      actividades: initialActividades,
    }));

    const initialSelectedDates = curso.actividades.map((actividad) => {
      return actividad.fechaVencimiento
        ? format(parseISO(actividad.fechaVencimiento), "yyyy-MM-dd")
        : "";
    });

    console.log(initialSelectedDates);
    setSelectedDates(initialSelectedDates);
  };

  const handleAsesorChange = (selectedOption, actividadIndex) => {
    setFormData((prevFormData) => {
      const newActividades = [...prevFormData.actividades];
      const asesorObj = asesores.find(
        (asesor) => asesor._id === selectedOption.value
      );
      newActividades[actividadIndex].asesor = asesorObj;
      return { ...prevFormData, actividades: newActividades };
    });
  };

  const handleEstadoADMChange = (selectedOption, actividadIndex) => {
    setFormData((prevFormData) => {
      const newActividades = [...prevFormData.actividades];
      newActividades[actividadIndex].estadoAdm = selectedOption.value;
      return { ...prevFormData, actividades: newActividades };
    });
  };

  const handleEstadoAsesorChange = (selectedOption, actividadIndex) => {
    setFormData((prevFormData) => {
      const newActividades = [...prevFormData.actividades];
      newActividades[actividadIndex].estadoAsesor = selectedOption.value;
      return { ...prevFormData, actividades: newActividades };
    });
  };

  const handleDateChange = (date, actividadIndex) => {
    setSelectedDates((prevSelectedDates) => {
      const newDates = [...prevSelectedDates];
      newDates[actividadIndex] = date;
      return newDates;
    });

    setFormData((prevFormData) => {
      const newActividades = [...prevFormData.actividades];
      // Comprobar si la fecha es nula o indefinida antes de intentar formatearla
      newActividades[actividadIndex].fechaVencimiento = date
        ? format(parseISO(date), "yyyy-MM-dd")
        : "";
      return { ...prevFormData, actividades: newActividades };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const actividadesToSend = formData.actividades.map((actividad) => {
      // Asegurar que fechaVencimiento no sea null o undefined
      const fechaVencimiento = actividad.fechaVencimiento || "";

      return {
        ...actividad,
        fechaVencimiento,
        _id: { $oid: actividad._id },
        asesor: actividad.asesor._id ? { $oid: actividad.asesor._id } : null,
        estadoAdm: actividad.estadoAdm || null,
        estadoAsesor: actividad.estadoAsesor || null,
      };
    });

    google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
        alert("Éxito");
      })
      .updateCursoById(selectedCurso._id, { actividades: actividadesToSend });
  };

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700">Cursos V2</h1>
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
                onClick={() => updateFormData(curso)}
              >
                {curso.materia &&
                  `${curso.materia.nombre} - ${curso.cliente.nombre}`}
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-full">
          {formData.fecha && (
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item title="Asignamientos">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl mb-4 font-semibold text-gray-700">
                    Actividades para{" "}
                    {`${selectedCurso.materia.nombre} - ${selectedCurso.cliente.nombre}`}
                  </h2>
                  <Table variant="striped">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Nombre Actividad</th>
                        <th className="px-4 py-2">Fecha Límite</th>
                        <th className="px-4 py-2">Asesor</th>
                        {/* <th className="px-4 py-2">Estado Asesor</th>
                        <th className="px-4 py-2">Fecha Límite</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.actividades.map((actividad, actividadIndex) => (
                        <tr key={actividad._id}>
                          <td className="px-4 py-2">
                            {selectedCurso.actividades[actividadIndex].nombre}
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="date"
                              value={selectedDates[actividadIndex] || ""}
                              onChange={(event) =>
                                handleDateChange(
                                  event.target.value,
                                  actividadIndex
                                )
                              }
                              className="datepicker-custom"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Select
                              options={asesores.map((asesor) => ({
                                value: asesor._id,
                                label: asesor.nombre,
                              }))}
                              value={
                                actividad.asesor
                                  ? {
                                      value: actividad.asesor._id,
                                      label: actividad.asesor.nombre,
                                    }
                                  : null
                              }
                              onChange={(selectedOption) =>
                                handleAsesorChange(
                                  selectedOption,
                                  actividadIndex
                                )
                              }
                              isSearchable={true}
                            />
                          </td>
                          {/* <td className="px-4 py-2">
                            <Select
                              options={estadosAdm.map((estado) => ({
                                value: estado.nombre,
                                label: estado.nombre,
                              }))}
                              value={{
                                value: actividad.estadoAdm,
                                label: actividad.estadoAdm,
                              }}
                              onChange={(selectedOption) =>
                                handleEstadoADMChange(
                                  selectedOption,
                                  actividadIndex
                                )
                              }
                              isSearchable={true}
                            />
                          </td> */}
                          {/* <td className="px-4 py-2">
                            <Select
                              options={estadosAsesor.map((estado) => ({
                                value: estado.nombre,
                                label: estado.nombre,
                              }))}
                              value={{
                                value: actividad.estadoAsesor,
                                label: actividad.estadoAsesor,
                              }}
                              onChange={(selectedOption) =>
                                handleEstadoAsesorChange(
                                  selectedOption,
                                  actividadIndex
                                )
                              }
                              isSearchable={true}
                            />
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="flex justify-center mt-2">
                    <Button type="submit" color="dark">
                      Actualizar Curso
                    </Button>
                  </div>
                </form>
              </Tabs.Item>
              <Tabs.Item title="Operaciones">Operaciones</Tabs.Item>
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
                          {/* Replace these Button components with actual event handlers and icons if needed */}
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
