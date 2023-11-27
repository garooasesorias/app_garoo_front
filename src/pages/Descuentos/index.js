import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button, Modal} from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDescuentoId, setSelectedDescuentoId] = useState(null);
  const [filters, setFilters] = useState({
    descripcion: "",
    porcentaje: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setDescuentos(data);
          setLoading(false);
        })
        .getDescuentos();
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

  const filteredDescuentos = descuentos.filter((descuento) => {
    return (
      (!filters.descripcion ||
        descuento.descripcion
          .toLowerCase()
          .includes(filters.descripcion.toLowerCase())) &&
      (!filters.fechaInicio ||
        descuento.fechaInicio
          .toLowerCase()
          .includes(filters.fechaInicio.toLowerCase())) &&
      (!filters.fechaFin ||
        descuento.fechaFin
          .toLowerCase()
          .includes(filters.fechaFin.toLowerCase())) &&
      (!filters.estado ||
        descuento.estado.toLowerCase().includes(filters.estado.toLowerCase()))
    );
  });

  const handleDeleteClick = () => {
    if (selectedDescuentoId) {
      setDeleting(true);
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setDescuentos((prevDescuentos) => prevDescuentos.filter(descuento => descuento._id !== selectedDescuentoId));
          setDeleting(false);
          setOpenModal(false);
          setSelectedDescuentoId(null); // Limpia el ID almacenado
        })
        .deleteDescuentoById(selectedDescuentoId);
    }
  };
    const passDescuentoId = (descuentoId) => {
      // Tomamos el Id del cliente que viene del botón borrar
      setSelectedDescuentoId(descuentoId);
    
      // Abre el modal
      setOpenModal(true);
    };
  

  return (
    <>
      <h1 className="PagesTitles">Descuentos</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Descripción", "descripcion")}
            {renderFilterInput("Fecha Inicio", "fechaInicio")}
            {renderFilterInput("Fecha Fin", "fechaFin")}
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
        <Link to="/formDescuentos">
          <Button className="shadow mb-5" color="success">
            Crear Descuento +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>Porcentaje</Table.HeadCell>
          <Table.HeadCell>Fecha Inicio</Table.HeadCell>
          <Table.HeadCell>Fecha Fin</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredDescuentos &&
            filteredDescuentos.map((descuento) => (
              <Table.Row
                key={descuento._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{descuento.descripcion}</Table.Cell>
                <Table.Cell>{descuento.porcentaje}%</Table.Cell>
                <Table.Cell>{descuento.fechaInicio}</Table.Cell>
                <Table.Cell>{descuento.fechaFin}</Table.Cell>
                <Table.Cell>{descuento.estado}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formDescuentos/${descuento._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passDescuentoId(descuento._id)}
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
                            onClick={() => handleDeleteClick(descuento._id)}
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

export default Descuentos;
