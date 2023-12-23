import React, { useState, useEffect } from "react";
import skillService from "../../services/skillService.js";
import { Button, Label, Modal,Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsObtenidos = await skillService.getSkills();
      
        setSkills(skillsObtenidos.data);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar skills:", error);
      }
    
    };

    fetchData();
  }, []);

  const handleDeleteClick = () => {
    if (selectedSkillId) {
      setDeleting(true);
      skillService.deleteSkillById(selectedSkillId).then((response) => {
        console.log(response);
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill._id !== selectedSkillId)
        );
        setDeleting(false);
        setOpenModal(false);
        setSelectedSkillId(null); // Limpia el ID almacenado
      });
    }
   
  };
    const passSkillId = (skillId) => {
      // Tomamos el Id del cliente que viene del botón borrar
      setSelectedSkillId(skillId);
    
      // Abre el modal
      setOpenModal(true);
    };

  return (
    <>
    <h1 className="PagesTitles">Skills</h1>
      <Link to="/formSkills">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear skill +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Skills</Table.HeadCell>
          {/*<Table.HeadCell>Tipo</Table.HeadCell>*/}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {skills &&
            skills.map((skill) => (
              <Table.Row
                key={skill._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{skill.nombre}</Table.Cell>
                {/*<Table.Cell>{materia.tipoNombre}</Table.Cell>*/}
                <Table.Cell>
                  <Link
                    to={`/formSkills/${skill._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passSkillId(skill._id)}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Borrar
                  </button>
                  <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        {deleting ? ( // Mostrar el loader si se está ejecutando la eliminación
                          <div className="LoaderContainerDelete"><Loader /></div>
                        ) : (
                          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        )}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          {deleting
                            ? "Eliminando..."
                            : "¿Estás seguro de que deseas eliminar este elemento de forma permanente?"}
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            color="failure"
                            onClick={() => handleDeleteClick(skill._id)}
                            disabled={deleting} // Deshabilita el botón durante la eliminación
                          >
                            {deleting ? "Eliminando..." : "Sí, eliminar"}
                          </Button>
                          <Button color="gray" onClick={() => setOpenModal(false)} disabled={deleting}>
                            No, cancelar
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </TableCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className="LoaderContainer">
            {loading ? <Loader /> : null}
            </div>
    </>
  );
}

export default Skills;
