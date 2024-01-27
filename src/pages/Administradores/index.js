import React, { useState, useEffect } from "react";
import administradorService from "../../services/administradorService.js";
import { Table, Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.js";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Administradores() {
  const [administradors, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [filters, setFilters] = useState({
    nombre: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const administradorsObtenidos =
          await administradorService.getAdministradores();
        // console.log(administradorsObtenidos);
        setAdministradores(administradorsObtenidos.data);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar administradors:", error);
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

  const handleDeleteClick = () => {
    if (selectedClientId) {
      setDeleting(true);
      administradorService
        .deleteAdministradorById(selectedClientId)
        .then((response) => {
          console.log(response);
          setAdministradores((prevAdministradores) =>
            prevAdministradores.filter(
              (administrador) => administrador._id !== selectedClientId
            )
          );
          setDeleting(false);
          setOpenModal(false);
          setSelectedClientId(null); // Limpia el ID almacenado
        });
    }
  };
  const passClientId = (clientId) => {
    // Tomamos el Id del administrador que viene del botón borrar
    setSelectedClientId(clientId);

    // Abre el modal
    setOpenModal(true);
  };

  const filteredAdministradores = administradors.filter((administrador) => {
    return (
      (!filters.nombre ||
        administrador.nombre
          .toLowerCase()
          .includes(filters.nombre.toLowerCase())) &&
      (!filters.email ||
        administrador.email
          ?.toLowerCase()
          .includes(filters.email?.toLowerCase()))
    );
  });

  return (
    <>
      <h1 className="PagesTitles">Administradores</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Nombre de Administrador", "nombre")}
            {renderFilterInput("Correo de Administrador", "email")}
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
        <Link to="/formAdministradores">
          <Button className="shadow mb-5" color="success">
            Crear Administrador +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}

          <Table.HeadCell>Nombre de Administrador</Table.HeadCell>
          <Table.HeadCell>Correo de Administador</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredAdministradores &&
            filteredAdministradores.map((administrador) => (
              <Table.Row
                key={administrador._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {administrador.id}
              </Table.Cell> */}
                <Table.Cell>{administrador.nombre}</Table.Cell>
                <Table.Cell>{administrador.email}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formAdministradores/${administrador._id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passClientId(administrador._id)}
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
                            onClick={() => handleDeleteClick(administrador._id)}
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

export default Administradores;
