import React, { useState, useEffect } from "react";
import actividadesService from '../../services/actividadesService.js'
import tiposActividadesService from '../../services/tiposActividadesService.js'
import { Table, Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';


function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedActividadId, setSelectedActividadId] = useState(null);
  const [filters, setFilters] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const actividadesResponse = await actividadesService.getActividades();
            const tipoDataResponse = await tiposActividadesService.getTiposActividad();
            setLoading(false);

            console.log("actividadesResponse:", actividadesResponse);
            console.log("tipoDataResponse:", tipoDataResponse);

            const tipoDataArray = tipoDataResponse.data || [];
            console.log("tipoDataArray:", tipoDataArray);

            const tipoDataMap = tipoDataArray.reduce((acc, tipo) => {
                acc[tipo._id] = tipo.nombre;
                return acc;
            }, {});

            console.log("tipoDataMap:", tipoDataMap);

            const actividadesArray = actividadesResponse.data || [];
            console.log("actividadesArray:", actividadesArray);

            const actividadesWithTipoNombre = actividadesArray.map(
                (actividad) => ({
                    ...actividad,
                    tipoNombre: tipoDataMap[actividad.tipo] || "Unknown Tipo",
                })
            );

            console.log("actividadesWithTipoNombre:", actividadesWithTipoNombre);

            setActividades(actividadesWithTipoNombre);
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
  
  const filteredActividades = actividades.filter((actividad) => {
    return (
      (!filters.nombre ||
        actividad.nombre
          .toLowerCase()
          .includes(filters.nombre.toLowerCase())) &&
      (!filters.tipo ||
        actividad.tipoNombre.toLowerCase().includes(filters.tipo.toLowerCase())) &&
      (!filters.precio ||
        actividad.precio
          .toLowerCase()
          .includes(filters.precio.toLowerCase())) 
    );
  });
  
  const handleDeleteClick = async () => {
    if (selectedActividadId) {
      setDeleting(true);
      try {
        const response = await actividadesService.deleteActividadById(selectedActividadId);
        console.log(response);
        setActividades((prevActividades) => prevActividades.filter(actividad => actividad._id !== selectedActividadId));
        setDeleting(false);
        setOpenModal(false);
        setSelectedActividadId(null); // Limpia el ID almacenado
      } catch (error) {
        console.log("Error al eliminar actividad:", error);
        setDeleting(false);
      }
    }
  };
  
  const passActividadId = (actividadId) => {
    // Tomamos el Id del cliente que viene del botón borrar
    setSelectedActividadId(actividadId);
  
    // Abre el modal
    setOpenModal(true);
  };
  

  return (
    <>
      <h1 className="PagesTitles">Actividades</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Nombre de Actividad", "nombre")}
            {renderFilterInput("Tipo de Actividad", "tipo")}
            {renderFilterInput("Precio", "precio")}
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Link to="/formActividades">
          <Button className="shadow mb-5" color="success">
            Crear Actividad +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Actividad</Table.HeadCell>
          <Table.HeadCell>Tipo de Actividad</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredActividades &&
            filteredActividades.map((actividad) => (
              <Table.Row
                key={actividad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{actividad.nombre}</Table.Cell>
                <Table.Cell>{actividad.tipoNombre}</Table.Cell>
                <Table.Cell>{actividad.precio}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/editactividad/${actividad._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <TableCell>
                  <button
                    onClick={() => passActividadId(actividad._id)}
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
                            onClick={() => handleDeleteClick(actividad._id)}
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

export default Actividades;
