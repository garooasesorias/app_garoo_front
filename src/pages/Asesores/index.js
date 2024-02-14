import React, { useState, useEffect } from "react";
import asesorService from "../../services/asesorService.js";
import { Card, Avatar, Table, Button, Progress, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import RatingComponent from "./components/RatingComponent.js";
import defaultAvatar from "../../images/default_avatar.webp";

function Advisors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [asesores, setAsesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedAdviserId, setSelectedAdviserId] = useState(null);
  const [formDataState, setFormDataState] = useState({
    ratignSkills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: asesorData } = await asesorService.getAdvisors();
        console.log("asesorData useEffect asesorIndex", asesorData);
        setAsesores(asesorData);
        setFormDataState({
          ratignSkills: asesorData,
        });
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar Asesores:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCollapseToggle = (index) => {
    setCollapsedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredAdvisors = asesores.filter(
    (asesor) => asesor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    // || Add more filtering based on plan properties
    // plan.actividades.some((actividad) => actividad.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteClick = () => {
    if (selectedAdviserId) {
      setDeleting(true);
      asesorService.deleteAsesorById(selectedAdviserId).then((response) => {
        setAsesores((prevAsesores) =>
          prevAsesores.filter((asesor) => asesor._id !== selectedAdviserId)
        );
        setDeleting(false);
        setOpenModal(false);
        setSelectedAdviserId(null); // Limpia el ID almacenado
      });
    }
  };
  const passAdviserId = (asesorId) => {
    // Tomamos el Id del Adviser que viene del botón borrar
    setSelectedAdviserId(asesorId);

    // Abre el modal
    setOpenModal(true);
  };

  const handleRatingSkillChange = (ratingSkillId, newRatingSkill) => {
    // setFormDataState((prevData) => ({
    //   ...prevData,
    //   ratingSkills: prevData.ratingSkills.map((ratingSkill) =>
    //     ratingSkill.skill._id === ratingSkillId
    //       ? { ...ratingSkill, rating: newRatingSkill }
    //       : ratingSkill
    //   ),
    // }));
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
        {filteredAdvisors.map((asesor, index) => (
          <Card
            key={asesor._id}
            className="w-full md:w-1/2 lg:w-1/3"
            style={{ maxWidth: "600px" }}
          >
            <Link to={`/formAsesores/${asesor._id}`}>
              <Button
                className="bg-transparent text-blue-600 hover:text-blue-700 shadow mb-2 ms-auto border border-transparent hover:border-blue-600"
                color="none" // Esto establece el color del botón como ninguno, eliminando el color por defecto
              >
                Editar
              </Button>
            </Link>

            <Button
              onClick={() => passAdviserId(asesor._id)}
              className="bg-transparent text-red-600 hover:text-red-700 shadow mb-2 ms-auto border border-transparent hover:border-red-600"
              color="none"
            >
              Borrar
            </Button>
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
                      onClick={() => handleDeleteClick(asesor._id)}
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
            <div className="flex flex-col items-center pb-4">
              <Avatar
                alt={`${asesor.nombre} image`}
                className="mb-2 rounded-full shadow-lg"
                img={`${asesor.photoLink || defaultAvatar}`}
                size={"xl"}
                status="offline"
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
                  {asesor.especialidades &&
                    asesor.especialidades.map(
                      (especialidad, especialidadIndex) => (
                        <div
                          key={especialidad.materia._id}
                          className="text-sm text-gray-500"
                        >
                          {especialidad.materia.nombre}
                        </div>
                      )
                    )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="text-base font-medium dark:text-dark">SKILLS</div>

              {asesor.ratingSkills &&
                asesor.ratingSkills.map((ratingSkill, index) => (
                  <div
                    key={ratingSkill.skill._id}
                    className="flex items-center gap-2"
                  >
                    <div className="text-sm">{ratingSkill.skill.nombre}</div>
                    <RatingComponent
                      ratingSkillId={ratingSkill.skill}
                      rating={ratingSkill.rating}
                      onRatingSkillChange={handleRatingSkillChange}
                    />
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="LoaderContainer">{loading ? <Loader /> : null}</div>
    </>
  );
}

export default Advisors;
