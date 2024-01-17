import React, { useEffect, useState } from "react";
import { Card, Table, Button, Progress, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import planesService from '../../services/planesService'; // Asegúrate de importar tu servicio de planes

function Planes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await planesService.getPlanes(); // Utiliza el servicio de planes para obtener los datos
        setPlanes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los planes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCollapseToggle = (index) => {
    setCollapsedIndex(collapsedIndex === index ? null : index);
  };

  const filteredPlanes = planes.filter(
    (plan) => plan.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    // || Add more filtering based on plan properties
    // plan.actividades.some((actividad) => actividad.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteClick = async () => {
    if (selectedPlanId) {
      setDeleting(true);
      try {
        await planesService.deletePlanById(selectedPlanId);
        setPlanes((prevPlanes) => prevPlanes.filter(plan => plan._id !== selectedPlanId));
      } catch (error) {
        console.error("Error al eliminar el plan:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setDeleting(false);
        setOpenModal(false);
        setSelectedPlanId(null); // Limpia el ID almacenado
      }
    }
  };
  
    const passPlantId = (planId) => {
      // Tomamos el Id del cliente que viene del botón borrar
      setSelectedPlanId(planId);
    
      // Abre el modal
      setOpenModal(true);
    };

  return (
    <>
    <h1 className="PagesTitles">Planes</h1>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Buscar plan..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link to="/formPlanes" className="">
            <Button className="shadow me-5" color="success">
              Crear
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredPlanes.map((plan, index) => (
          <Card
            key={plan._id}
            className="w-full md:w-1/2 lg:w-1/3"
            style={{ maxWidth: "400px" }}
          >
            <Link to={`/formPlanes/${plan._id}`}>
              <Button className="shadow mb-2 ms-auto" color="success">
                Editar
              </Button>
            </Link>
            <Button
                    onClick={() => passPlantId(plan._id)}
                    className=" text-red-600 hover:underline shadow mb-2 ms-auto" color="success"
                  >
                    Borrar
                  </Button>
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
                            onClick={() => handleDeleteClick(plan._id)}
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

            <div className="flex flex-col items-center pb-4">
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {plan.nombre}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ${plan.precio}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div
                className="text-base font-medium cursor-pointer dark:text-dark"
                onClick={() => handleCollapseToggle(index)}
              >
                Ver Actividades {">"}
              </div>
              {collapsedIndex === index && (
                <div className="grid gap-2">
                  {plan.actividades_relacionadas.map(
                    (actividad, actividadIndex) => (
                      <div
                        key={actividadIndex}
                        className="text-sm text-gray-500"
                      >
                        {actividad.nombre}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="LoaderContainer">
            {loading ? <Loader /> : null}
            </div>
    </>
  );
}

export default Planes;
