import React, { useState } from "react";
import { Card, Avatar, Table, Button, Progress } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

const asesoresData = [
  {
    id: 1,
    name: "Bonnie Green",
    speciality: "MATEMATICAS",
    projects: 10,
    status: "ACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Julian Benavides",
    speciality: "CÁLCULO",
    projects: 5,
    status: "INACTIVO",
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
    name: "Spencer Pain",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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
    name: "Alice Smith",
    speciality: "FISICA",
    projects: 5,
    status: "INACTIVO",
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

function Asesores() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [collapsedIndex, setCollapsedIndex] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCollapseToggle = (index) => {
    setCollapsedIndex(collapsedIndex === index ? null : index);
  };

  const filteredAsesores = asesoresData.filter(
    (asesor) =>
      asesor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asesor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 class="PagesTitles">Asesores</h1>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Buscar asesor..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link to="/formAsesores" className="">
            <Button className="shadow me-5" color="success">
              Crear
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredAsesores.map((asesor, index) => (
          <Card
            key={asesor.id}
            className="w-full md:w-1/2 lg:w-1/3"
            style={{ maxWidth: "400px" }}
          >
            <Link to={`/editAsesor/${asesor.id}`}>
              <Button className="shadow mb-2 ms-auto" color="success">
                Editar
              </Button>
            </Link>
            <div className="flex flex-col items-center pb-4">
              <Avatar
                alt={`${asesor.name} image`}
                className="mb-2 rounded-full shadow-lg"
                height="auto" // Cambio de "64" a "auto" para mantener proporciones
                img={asesor.avatarUrl}
                width="100%" // Cambio de "64" a "100%" para ajustar al contenedor
                status="online"
              />
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {asesor.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asesor.speciality}
              </span>
              <div className="mt-2 flex space-x-2">
                <Button
                  color="gray"
                  className="rounded-lg px-3 py-1 text-sm bg-cyan-700 hover:bg-cyan-800"
                >
                  {asesor.projects} PROYECTOS
                </Button>
                <Button className="rounded-lg border border-gray-300 text-sm text-gray-900 hover:bg-gray-100">
                  {asesor.status}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div
                className="text-base font-medium cursor-pointer dark:text-dark"
                onClick={() => handleCollapseToggle(index)}
              >
                Ver Especialidades {">"}
              </div>
              {collapsedIndex === index && (
                <div className="grid gap-2">
                  {asesor.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="text-sm text-gray-500">
                      {skill.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-base font-medium dark:text-dark">SKILLS</div>
              {asesor.skills.map((skill, index) => (
                <Progress
                  key={index}
                  labelText
                  textLabel={skill.label}
                  size="lg"
                  color="dark"
                  progress={skill.progress}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Asesores;
