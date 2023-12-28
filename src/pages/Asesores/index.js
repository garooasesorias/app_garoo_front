import React, { useState, useEffect } from "react";
import asesorService from "../../services/asesorService.js";
import { Card, Avatar, Table, Button, Progress, ModalBodyProps, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


function Asesores() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [asesores, setAsesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedAsesorId, setSelectedAsesorId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const asesoresObtenidos = await asesorService.getAsesores();
       
        setAsesores(asesoresObtenidos.data);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar asesores:", error);
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

  const filteredAsesores = asesores.filter(
    (asesor) => asesor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    // || Add more filtering based on plan properties
    // plan.actividades.some((actividad) => actividad.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  
  const handleDeleteClick = () => {
    if (selectedAsesorId) {
      setDeleting(true);
      asesorService.deleteAsesorById(selectedAsesorId).then((response) => {
        console.log(response);
        setAsesores((prevAsesores) =>
          prevAsesores.filter((asesor) => asesor._id !== selectedAsesorId)
        );
        setDeleting(false);
        setOpenModal(false);
        setSelectedAsesorId(null); // Limpia el ID almacenado
      });
    }
    
  };
  const passAsesorId = (asesorId) => {
    // Tomamos el Id del asesor que viene del botón borrar
    setSelectedAsesorId(asesorId);
  
    // Abre el modal
    setOpenModal(true);
  };
  
  return (
    <>
      <h1 className="PagesTitles">Asesores</h1>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Buscar asesor..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link to="/formAsesores" className="">
            <Button className="shadow me-5" color="success">
              Crear
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredAsesores.map((asesor, index) => (
          <Card
            key={asesor._id}
            className="w-full md:w-1/2 lg:w-1/3"
            style={{ maxWidth: "600px" }}
          >
            <Link to={`/editAsesor/${asesor.id}`}>
              <Button className="shadow mb-2 ms-auto" color="success">
                Editar
              </Button>
            </Link>
            
                  <Button
                    onClick={() => passAsesorId(asesor._id)}
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
                            onClick={() => handleDeleteClick(asesor._id)}
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
              <Avatar
                alt={`${asesor.nombre} image`}
                className="mb-2 rounded-full shadow-lg"
                height="auto" // Cambio de "64" a "auto" para mantener proporciones
                img={asesor.avatar}
                width="100%" // Cambio de "64" a "100%" para ajustar al contenedor
                status="online"
              />
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {asesor.nombre}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asesor.identificacion}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asesor.cargo}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asesor.celular}
              </span>

              {/* <div className="mt-2 flex space-x-2">
                <Button
                  color="gray"
                  className="rounded-lg px-3 py-1 text-sm bg-cyan-700 hover:bg-cyan-800"
                >
                  {asesor.projects} PROYECTOS
                </Button>
                <Button className="rounded-lg border border-gray-300 text-sm text-gray-900 hover:bg-gray-100">
                  {asesor.status}
                </Button>
              </div>*/}
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div
                className="text-base font-medium cursor-pointer dark:text-dark"
                onClick={() => handleCollapseToggle(index)}
              >
                Ver Especialidades {">"}
              </div>
              {collapsedIndex === index && (
                <div className="grid gap-2">
                  {asesor.especialidades_relacionadas.map(
                    (especialidad, especialidadIndex) => (
                      <div
                        key={especialidadIndex}
                        className="text-sm text-gray-500"
                      >
                        {especialidad.nombre}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-base font-medium dark:text-dark">SKILLS</div>
              {asesor.skills.map((skill, index) => (
                <Progress
                  key={index}
                  labelText
                  textLabel={skill.nombre}
                  size="lg"
                  color="dark"
                  progress={skill.progress}
                />
              ))}
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

export default Asesores;
