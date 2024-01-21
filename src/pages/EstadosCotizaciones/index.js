import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import estadosCotizacionesService from "../../services/estadoCotizacionService"; // Asegúrate de crear este servicio

function EstadosCursos() {
  const [estadosCotizaciones, setEstadosCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedEstadosCotizacionesId, setSelectedEstadosCotizacionesId] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estadosCotizacionesResponse =
          await estadosCotizacionesService.getEstadosCotizacion();
        setEstadosCotizaciones(estadosCotizacionesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = () => {
    if (selectedEstadosCotizacionesId) {
      setDeleting(true);
      estadosCotizacionesService
        .deleteEstadoCotizacionById(selectedEstadosCotizacionesId) // Nombre corregido
        .then(() => {
          setEstadosCotizaciones((prevEstados) =>
            prevEstados.filter(
              (estado) => estado._id !== selectedEstadosCotizacionesId
            )
          );
          setDeleting(false);
          setOpenModal(false);
          setSelectedEstadosCotizacionesId(null);
        })
        .catch((error) => {
          console.error("Error deleting estadoCotizacion:", error);
          setDeleting(false);
        });
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
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
                  <Link to={`/formEstadosCotizaciones/${estadoCotizacion._id}`}>
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
                  <Modal
                    show={openModal}
                    size="md"
                    onClose={() => setOpenModal(false)}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        {deleting ? ( // Mostrar el loader si se está ejecutando la eliminación
                          <div className="LoaderContainerDelete">
                            <Loader />
                          </div>
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
                            onClick={() =>
                              handleDeleteClick(estadoCotizacion._id)
                            }
                            disabled={deleting} // Deshabilita el botón durante la eliminación
                          >
                            {deleting ? "Eliminando..." : "Sí, eliminar"}
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => setOpenModal(false)}
                            disabled={deleting}
                          >
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
      <div className="LoaderContainer">{loading ? <Loader /> : null}</div>
    </>
  );
}

export default EstadosCursos;
