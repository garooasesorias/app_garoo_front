import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function EstadosCursos() {
  const [estadosCotizaciones, setEstadosCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedEstadosCotizacionesId, setSelectedEstadosCotizacionesId] = useState(null);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setEstadosCotizaciones(data);
          setLoading(false);
        })
        .getEstadosCotizaciones();
    };

    fetchData();
  }, []);

  const handleDeleteClick = () => {
    if (selectedEstadosCotizacionesId) {
      setDeleting(true);
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setEstadosCotizaciones((prevEstadosCotizaciones) => prevEstadosCotizaciones.filter(estadoCotizacion => estadoCotizacion._id !== selectedEstadosCotizacionesId));
          setDeleting(false);
          setOpenModal(false);
          setSelectedEstadosCotizacionesId(null); // Limpia el ID almacenado
        })
        .deleteEstadoCotizacionesById(selectedEstadosCotizacionesId);
    }
  };
    const passEstadoCotizacionId = (estadoCotizacionId) => {
      // Tomamos el Id del cliente que viene del botón borrar
      setSelectedEstadosCotizacionesId(estadoCotizacionId);
    
      // Abre el modal
      setOpenModal(true);
    };

  return (
    <>
    <h1 className="PagesTitles">Estados Cotizaciones</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formEstadosCotizaciones">
          <Button className="shadow mb-5" color="success">
            Crear Estado Cotización +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre Estado Cotización</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {estadosCotizaciones &&
            estadosCotizaciones.map((estadoCotizacion) => (
              <Table.Row
                key={estadoCotizacion._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{estadoCotizacion.nombre}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/editTipoMateria/${estadoCotizacion.id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passEstadoCotizacionId(estadoCotizacion._id)}
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
                            onClick={() => handleDeleteClick(estadoCotizacion._id)}
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

export default EstadosCursos;
