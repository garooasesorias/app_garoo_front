import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import tipoMateriasService from "../../services/tipoMateriasService.js";

function TiposMateria() {
  const [tiposMateria, setTiposMateria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedTipomId, setSelectedTipomId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await tipoMateriasService.getTiposMateria();
        if (response.ok && Array.isArray(response.data)) {
          setTiposMateria(response.data);
        } else {
          // Manejar casos donde la respuesta no es lo que se espera
          setTiposMateria([]);
          console.error('La respuesta no es un arreglo:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
        
  const handleDeleteClick = async () => {
    if (selectedTipomId) {
      setDeleting(true);
  
      try {
        await tipoMateriaService.deleteTipoMateriaById(selectedTipomId);
        setTiposMateria(prevTiposMaterias => prevTiposMaterias.filter(tipoMateria => tipoMateria._id !== selectedTipomId));
      } catch (error) {
        console.error('Error deleting tipos materia:', error);
      } finally {
        setDeleting(false);
        setOpenModal(false);
        setSelectedTipomId(null); // Limpia el ID almacenado
      }
    }
  };
  
    const passTiposmId = (tipoMateriaId) => {
      // Tomamos el Id del cliente que viene del botón borrar
      setSelectedTipomId(tipoMateriaId);
    
      // Abre el modal
      setOpenModal(true);
    };

  return (
    <>
    <h1 className="PagesTitles">Tipos de Materias</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formTipoMaterias">
          <Button className="shadow mb-5" color="success">
            Crear Tipo De Materia +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre Tipo de Materia</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tiposMateria &&
            tiposMateria.map((tipoMateria) => (
              <Table.Row
                key={tipoMateria._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{tipoMateria.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoMateria/${tipoMateria.id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passTiposmId(tipoMateria._id)}
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
                            onClick={() => handleDeleteClick(tipoMateria._id)}
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

export default TiposMateria;
