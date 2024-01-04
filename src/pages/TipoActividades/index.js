import React, { useState, useEffect } from "react";
import tipoActividadService from "../../services/tiposActividadesService.js";
import { Table, Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function TiposActividad() {
  const [tiposActividad, setTiposActividad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedTiposActividadId, setSelectedTiposActividadId] = useState(null);

  // useEffect(() => {
    
  //   const fetchData = async () => {
      
  //     await google.script.run
  //       .withSuccessHandler((data) => {
  //         setTiposActividad(data);
  //         setLoading(false);
  //       })
  //       .getTiposActividad();
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposActividad = await tipoActividadService.getTiposActividad();
        setTiposActividad(tiposActividad.data);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar tipos actividades:", error);
      }
    };
  
    fetchData();
  }, []);
  



  const handleDeleteClick = () => {
    if (selectedTiposActividadId) {
      setDeleting(true);
      tipoActividadService.deleteTiposActividadById(selectedTiposActividadId)
        .then((response) => {
          console.log(response);
          setTiposActividad((prevTiposActividades) =>
            prevTiposActividades.filter((tipoActividad) => tipoActividad._id !== selectedTiposActividadId)
          );
          setDeleting(false);
          setOpenModal(false);
          setSelectedTiposActividadId(null);
        })
        .catch((error) => {
          console.error("Error al eliminar tipos de actividad:", error);
          setDeleting(false);
          setOpenModal(false);
        });
    }
  };
  
  const passTiposActividadId = (tipoActividadId) => {
    // Tomamos el Id del cliente que viene del botón borrar
    setSelectedTiposActividadId(tipoActividadId);
  
    // Abre el modal
    setOpenModal(true);
  };
  

  return (
    <>
 
      <h1 className="PagesTitles">Tipo de Actividades</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formTipoActividades">
          <Button className="shadow mb-5" color="success">
            Crear Tipo De Actividad +
          </Button>
        </Link>
      </div>

      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre Tipo Actividad</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tiposActividad &&
            tiposActividad.map((tipoActividad) => (
              <Table.Row
                key={tipoActividad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{tipoActividad.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoActividad/${tipoActividad.id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passTiposActividadId(tipoActividad._id)}
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
                            onClick={() => handleDeleteClick(tipoActividad._id)}
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

export default TiposActividad;
