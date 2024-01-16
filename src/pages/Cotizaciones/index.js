import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import Loader from "../../components/Loader.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import cotizacionService from "../../services/cotizacionService.js";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedCotizacionId, setSelectedCotizacionId] = useState(null);
  const [filters, setFilters] = useState({
    fecha: "",
    cliente: "",
    total: "",
    estado: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await cotizacionService
          .getCotizaciones()
          .then(setCotizaciones(cotizacionesResponse));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderFilterInput = (label, filterKey) => (
    <div className="flex-1 px-2 mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={filters[filterKey]}
        onChange={(e) =>
          setFilters({ ...filters, [filterKey]: e.target.value })
        }
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );

  const filteredCotizaciones = cotizaciones.filter((cotizacion) => {
    return (
      (!filters.fecha ||
        cotizacion.fecha.toLowerCase().includes(filters.fecha.toLowerCase())) &&
      (!filters.cliente ||
        cotizacion.clienteNombre
          .toLowerCase()
          .includes(filters.cliente.toLowerCase())) &&
      (!filters.total ||
        cotizacion.total.toString().includes(filters.total.toLowerCase())) &&
      (!filters.estado ||
        cotizacion.estadoNombre
          .toLowerCase()
          .includes(filters.estado.toLowerCase()))
    );
  });

  const handleDeleteClick = () => {
    if (selectedCotizacionId) {
      setDeleting(true);
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setCotizacion((prevCotizacion) =>
            prevCotizacion.filter(
              (cotizacion) => cotizacion._id !== selectedCotizacionId
            )
          );
          setDeleting(false);
          setOpenModal(false);
          setSelectedCotizacionId(null); // Limpia el ID almacenado
        })
        .deleteCotizacionesById(selectedCotizacionId);
    }
  };
  const passCotizacionId = (cotizacionId) => {
    // Tomamos el Id del cliente que viene del botón borrar
    setSelectedCotizacionId(cotizacionId);

    // Abre el modal
    setOpenModal(true);
  };

  return (
    <>
      <h1 className="PagesTitles">Cotizaciones</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Fecha", "fecha")}
            {renderFilterInput("Cliente", "cliente")}
            {renderFilterInput("Total", "total")}
            {renderFilterInput("Estado", "estado")}
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Link to="/formCotizaciones">
          <Button className="shadow mb-5" color="success">
            Crear Cotización +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Cliente</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Ver Detalles</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredCotizaciones &&
            filteredCotizaciones.map((cotizacion) => (
              <Table.Row
                key={cotizacion._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{cotizacion.fecha}</TableCell>
                <Table.Cell>
                  {/* Muestra la información del cliente */}
                  {cotizacion.cliente && <>{cotizacion.cliente.nombre}</>}
                </Table.Cell>
                <Table.Cell>${cotizacion.total}</Table.Cell>
                <Table.Cell>
                  {cotizacion.estado && cotizacion.estado.nombre}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formCotizaciones/${cotizacion._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Ver Detalles
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passCotizacionId(cotizacion._id)}
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
                            onClick={() => handleDeleteClick(cotizacion._id)}
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

export default Cotizaciones;
