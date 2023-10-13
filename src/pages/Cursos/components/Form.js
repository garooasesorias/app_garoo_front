import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

const FormCursos = () => {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    fecha: "",
    items: [],
    actividades: [],
  });

  const [curso, setCurso] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [selectedAsesores, setSelectedAsesores] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [estadosAdm, setEstadosAdm] = useState([]);
  const [estadosAsesor, setEstadosAsesores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Cargar los datos del curso si es una edición
        await google.script.run
          .withSuccessHandler((data) => {
            console.log(data[0]);
            setCurso(data[0]);

            const initialActividades = data[0].actividades.map((actividad) => ({
              nota: actividad.nota || { $numberInt: "0" },
              asesor: actividad.asesor ? actividad.asesor._id : null,
              _id: actividad._id,
              estadoAdm: actividad.estadoAdm,
              estadoAsesor: actividad.estadoAsesor,
              fechaVencimiento: actividad.fechaVencimiento,
            }));

            setFormData((prev) => ({
              ...prev,
              actividades: initialActividades,
            }));

            const initialSelectedDates = data[0].actividades.map(
              (actividad) => {
                return actividad.fechaVencimiento
                  ? new Date(actividad.fechaVencimiento)
                  : null;
              }
            );

            setSelectedDates(initialSelectedDates);
          })
          .getCursoById(id);

        google.script.run
          .withSuccessHandler((response) => {
            setAsesores(response);
          })
          .getAsesores();

        google.script.run.withSuccessHandler(setEstadosAdm).getEstadosAdm();

        google.script.run
          .withSuccessHandler(setEstadosAsesores)
          .getEstadosAsesores();
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const actividadesToSend = formData.actividades.map((actividad) => {
      return {
        ...actividad,
        _id: { $oid: actividad._id },
        asesor: actividad.asesor ? { $oid: actividad.asesor._id } : null,
      };
    });

    google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
      })
      .updateCursoById(id, { actividades: actividadesToSend });
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
        ? format(date, "yyyy-MM-dd")
        : null;
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

  return (
    <form
      className="flex mx-auto flex-col gap-4 w-full"
      onSubmit={handleSubmit}
    >
      {curso.cliente && (
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          {curso.materia.nombre} - {curso.cliente.nombre} - {curso.fecha}
        </h2>
      )}
      <Table>
        <Table.Head>
          <Table.HeadCell>Estudiante</Table.HeadCell>
          {formData.actividades &&
            formData.actividades.map((actividad, actividadIndex) => (
              <Table.HeadCell key={actividadIndex}>
                <div className="flex flex-col">
                  <div className="mb-2">Actividad: {actividad.nombre}</div>
                  <div className="flex items-center">
                    <span className="mr-2">Fecha de Vencimiento:</span>
                    <div className="ml-auto">
                      <DatePicker
                        selected={selectedDates[actividadIndex]}
                        onChange={(date) =>
                          handleDateChange(date, actividadIndex)
                        }
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        className="datepicker-custom"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Asesor:</span>
                    <div className="ml-auto">
                      <Select
                        options={asesores.map((asesor) => ({
                          value: asesor._id,
                          label: asesor.nombre,
                        }))}
                        value={{
                          value: actividad.asesor ? actividad.asesor._id : null,
                          label: actividad.asesor
                            ? actividad.asesor.nombre
                            : null,
                        }}
                        onChange={(selectedOption) =>
                          handleAsesorChange(selectedOption, actividadIndex)
                        }
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Estado ADM:</span>
                    <div className="ml-auto">
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
                          handleEstadoADMChange(selectedOption, actividadIndex)
                        }
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Estado Asesor:</span>
                    <div className="ml-auto">
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
                    </div>
                  </div>
                </div>
              </Table.HeadCell>
            ))}
        </Table.Head>
        <Table.Body>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {curso.cliente && curso.cliente.nombre}
            </Table.Cell>
            {curso.actividades &&
              curso.actividades.map((actividad, actividadIndex) => (
                <Table.Cell key={actividadIndex}>0</Table.Cell>
              ))}
          </Table.Row>
        </Table.Body>
      </Table>

      <Button type="submit" color="dark">
        Submit
      </Button>
    </form>
  );
};

export default FormCursos;

const actividades = [
  {
    nota: { $numberInt: "0" },
    asesor: null,
    _id: { $oid: "64dabe480add76a0a305a734" },
    estadoAdm: null,
    estadoAsesor: null,
    fechaVencimiento: null,
  },
  {
    _id: { $oid: "64dac56473243a87dde43fc1" },
    estadoAdm: null,
    estadoAsesor: null,
    nota: { $numberInt: "0" },
    asesor: null,
    fechaVencimiento: null,
  },
  {
    nota: { $numberInt: "0" },
    _id: { $oid: "64dac5867f3ef1926f2b73a3" },
    estadoAsesor: null,
    estadoAdm: null,
    asesor: null,
    fechaVencimiento: null,
  },
];
