import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import Select from "react-select";

const FormCursos = () => {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    fecha: "",
    items: [],
  });

  const [curso, setCurso] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [selectedAsesores, setSelectedAsesores] = useState({});

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

  return (
    <form
      className="flex max-w-lg mx-auto flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Table className="mb-4">
        <thead>
          <tr>
            <th>Actividad de Curso</th>
            <th>Asesor</th>
          </tr>
        </thead>
        <tbody>
          {curso.actividades &&
            curso.actividades[0].map((actividad, index) => (
              <tr key={index}>
                <td>{actividad.nombre}</td>
                <td>
                  <Select
                    options={asesores.map((asesor) => ({
                      value: asesor.id,
                      label: `${asesor.nombre} - ${asesor.materia} - ${asesor.actividades} actividades`,
                    }))}
                    value={selectedAsesores[index]}
                    onChange={(selectedOption) =>
                      handleAsesorChange(selectedOption, index)
                    }
                    isSearchable={true} // Permitir buscar por nombre y materia
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Button type="submit" color="dark">
        Submit
      </Button>
    </form>
  );
};

export default FormCursos;
