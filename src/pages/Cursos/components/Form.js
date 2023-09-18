import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

//TESTING

const estadosAdm = [
  "Enviado",
  "Pendiente",
  "Finalizado",
  "Pendiente - sin Aporte",
  "Cancelado",
  "No Requerido",
  "Subcontratado",
  "No entregado",
  "Revisado",
];

const estadosAsesor = ["Enviado", "Pendiente", "Finalizado"];

const FormCursos = () => {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    fecha: "",
    items: [],
  });

  const [curso, setCurso] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [selectedAsesores, setSelectedAsesores] = useState({});
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Cargar los datos del curso si es una edición
        await google.script.run
          .withSuccessHandler((data) => {
            console.log(data);
            setCurso(data[0]);
          })
          .getCursoById(id);

        // Cargar los datos de los asesores (debes obtenerlos de alguna fuente)
        const asesoresData = [
          {
            id: 1,
            nombre: "Bonnie Green",
            materia: "MATEMATICAS",
            actividades: 10,
            estado: "ACTIVO",
            avatarUrl:
              "https://avatoon.net/wp-content/uploads/2022/07/Cartoon-Avatar-White-Background-300x300.png", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 75 },
              { label: "DIS", progress: 25 },
              { label: "LE", progress: 95 },
              { label: "OPE", progress: 5 },
              { label: "SIS", progress: 85 },
            ],
          },
          {
            id: 2,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          // Agregar más datos de asesores aquí...
          {
            id: 3,
            nombre: "Julian Benavides",
            materia: "CÁLCULO",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 4,
            nombre: "Spencer Pain",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&usqp=CAU", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 5,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 6,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&usqp=CAU", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 7,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 8,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 9,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&usqp=CAU", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
          {
            id: 10,
            nombre: "Alice Smith",
            materia: "FISICA",
            actividades: 5,
            estado: "INACTIVO",
            avatarUrl:
              "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // URL del avatar de ejemplo
            skills: [
              { label: "CB", progress: 50 },
              { label: "DIS", progress: 15 },
              { label: "LE", progress: 80 },
              { label: "OPE", progress: 10 },
              { label: "SIS", progress: 70 },
            ],
          },
        ];

        setAsesores(asesoresData);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
  };

  const handleAsesorChange = (selectedOption, actividadIndex) => {
    setSelectedAsesores((prevSelectedAsesores) => ({
      ...prevSelectedAsesores,
      [actividadIndex]: selectedOption,
    }));
  };

  const handleDateChange = (date, actividadIndex) => {
    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      [actividadIndex]: date,
    }));
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
          {curso.actividades &&
            curso.actividades.map((actividad, actividadIndex) => (
              <Table.HeadCell key={actividadIndex}>
                <div className="flex flex-col">
                  <div className="mb-2">Actividad: {actividad.nombre}</div>
                  <div className="flex items-center">
                    <span className="mr-2">Fecha de Vencimiento:</span>
                    <div className="ml-auto">
                      {" "}
                      {/* Añadir ml-auto para alinear a la derecha */}
                      <DatePicker
                        selected={selectedDates[actividadIndex]}
                        onChange={(date) =>
                          handleDateChange(date, actividadIndex)
                        }
                        dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de fecha
                        isClearable // Permite borrar la fecha seleccionada
                        className="datepicker-custom"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Asesor:</span>
                    <div className="ml-auto">
                      {" "}
                      {/* Añadir ml-auto para alinear a la derecha */}
                      <Select
                        options={asesores.map((asesor) => ({
                          value: asesor.id,
                          label: asesor.nombre,
                        }))}
                        value={selectedAsesores[actividadIndex]}
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
                      {" "}
                      {/* Añadir ml-auto para alinear a la derecha */}
                      <Select
                        options={estadosAdm.map((estado) => ({
                          value: estado,
                          label: estado,
                        }))}
                        // Añade aquí el estado seleccionado para los estados ADM
                        // value={selectedEstadosADM[actividadIndex]}
                        // onChange={(selectedOption) =>
                        //   handleEstadoADMChange(selectedOption, actividadIndex)
                        // }
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Estado Asesor:</span>
                    <div className="ml-auto">
                      {" "}
                      {/* Añadir ml-auto para alinear a la derecha */}
                      <Select
                        options={estadosAsesor.map((estado) => ({
                          value: estado,
                          label: estado,
                        }))}
                        // Añade aquí el estado seleccionado para los estados Asesor
                        // value={selectedEstadosAsesor[actividadIndex]}
                        // onChange={(selectedOption) =>
                        //   handleEstadoAsesorChange(selectedOption, actividadIndex)
                        // }
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
