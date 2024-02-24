import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table, Modal, TextInput } from "flowbite-react";
import Select from "react-select";
import { IoMdAttach } from "react-icons/io";
import operacionService from "../../../../services/operacionService";
import estadoAdmService from "../../../../services/estadoAdmService";
import Loader from "../../../../components/Loader";
import { utcToZonedTime } from "date-fns-tz";

export default function OperacionComponent({
  data,
  refreshOperaciones,
  setRefreshOperaciones,
}) {
  const [loading, setLoading] = useState(false);
  const [estadosAdm, setEstadosAdm] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({}); // Estado para almacenar el item actual

  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      // Intenta cargar las operaciones
      let operacionesData = [];
      try {
        const operacionesResponse =
          await operacionService.getOperacionesByIdCurso(data._id);
        operacionesData = operacionesResponse.data;
      } catch (error) {
        console.warn("No se pudieron cargar las operaciones: ", error.message);
        // Manejo específico del error de operaciones aquí
      }

      // Procesar operaciones para actualizar el estado, incluso si está vacío
      setFormData({
        items: operacionesData.map((operacion) => ({
          _id: operacion._id,
          actividad: operacion.actividad,
          curso: data._id,
          nombreActividad: operacion.asignamiento.actividad.nombre,
          nombreAsesor: operacion.asignamiento?.asesor?.nombre || "Sin asignar",
          fechaVencimiento: operacion.asignamiento?.fechaVencimiento
            ? format(
                utcToZonedTime(
                  parseISO(operacion.asignamiento.fechaVencimiento),
                  "UTC"
                ),
                "yyyy-MM-dd"
              )
            : "no establecido",
          grupo: operacion.grupo || "",
          tutor: operacion.tutor || "",
          archivosURL: operacion.archivosURL || "",
          comentarios: operacion.comentarios || "",
          estado: operacion.estado || "",
          formaEnvio: operacion.formaEnvio || "",
          actividadURL: operacion.actividadURL || "",
          priorizacion: operacion.priorizacion || "",
        })),
      });

      // Cargar estados administrativos independientemente del éxito de operaciones
      try {
        const estadosAdmResponse = await estadoAdmService.getEstadosAdm();
        setEstadosAdm(estadosAdmResponse.data);
      } catch (error) {
        console.error(
          "Error al cargar estados administrativos: ",
          error.message
        );
        // Manejo específico del error de estados administrativos aquí
      }
    } catch (error) {
      // Manejo de otros errores no esperados
      console.error("Error no manejado: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (refreshOperaciones) {
      fetchData();
      setRefreshOperaciones(false); // Restablece el flag
    }
  }, [refreshOperaciones, data]);

  const handleEstadoChange = (selectedOption, itemIndex) => {
    setCurrentItem((prevCurrentItem) => {
      return { ...prevCurrentItem, estado: { _id: selectedOption.value } };
    });
  };

  // Función para abrir el modal con la información del item seleccionado
  const handleEdit = (item, index) => {
    setCurrentItem({ ...item, index });
    setOpenModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      [name]: value,
    }));
  };

  // // Función para manejar la actualización del item (ajustar según tus necesidades)
  const handleUpdate = async () => {
    const objectToSend = currentItem;
    objectToSend.actividad = currentItem.actividad;
    objectToSend._id = currentItem._id;
    objectToSend.curso = currentItem.curso;
    objectToSend.estado = currentItem.estado?._id
      ? currentItem.estado._id
      : null;

    setLoading(true);
    const updateResponse = await operacionService.updateOperacionById(
      objectToSend._id,
      objectToSend
    );

    fetchData().then(() => setLoading(false));

    // Aquí puedes agregar la lógica para actualizar el item
    setOpenModal(false); // Cerrar el modal después de actualizar
  };

  const renderLinkIcon = (url) => {
    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <IoMdAttach size={20} />
        </a>
      );
    }
    return "Sin Archivos"; // O cualquier otro mensaje/placerholder que prefieras
  };

  return (
    <form>
      <h2 className="text-2xl mb-4 font-semibo-ld text-gray-700">
        Actividades para {`${data.materia.nombre} - ${data.cliente.nombre}`}
      </h2>
      <Table variant="striped">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre Actividad</th>
            <th className="px-4 py-2">Detalle Actividad</th>
            <th className="px-4 py-2">Grupo</th>
            <th className="px-4 py-2">Tutor</th>
            <th className="px-4 py-2">Archivos</th>
            <th className="px-4 py-2">Comentarios</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Forma De Envío</th>
            <th className="px-4 py-2">Actividad</th>
            <th className="px-4 py-2">Priorización</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {formData.items &&
            formData.items.map((item, itemIndex) => (
              <tr key={item.actividad}>
                <td className="px-4 py-2">{item.nombreActividad}</td>
                <td className="px-4 py-2" style={{ whiteSpace: "nowrap" }}>
                  Vence: {item.fechaVencimiento}
                  <br />
                  Asesor: <strong>{item.nombreAsesor}</strong>
                </td>
                <td className="px-4 py-2">{item.grupo || "Sin Grupo"}</td>
                <td className="px-4 py-2">{item.tutor || "Sin Tutor"}</td>
                <td className="px-4 py-2">
                  {renderLinkIcon(item.archivosURL)}
                </td>
                <td className="px-4 py-2">
                  {item.comentarios || "Sin Comentarios"}
                </td>
                <td className="px-4 py-2">
                  {estadosAdm.find((estado) => estado._id === item.estado)
                    ?.nombre || "Sin Estado"}
                </td>
                <td className="px-4 py-2">
                  {item.formaEnvio || "Sin Forma de Envío"}
                </td>
                <td className="px-4 py-2">
                  {renderLinkIcon(item.actividadURL)}
                </td>
                <td className="px-4 py-2">
                  {item.priorizacion || "Sin Priorización"}
                </td>
                <td className="px-4 py-2">
                  <Button
                    color="light"
                    onClick={() => handleEdit(item, itemIndex)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Modal para editar */}
      <div className="LoaderContainerForm">{loading ? <Loader /> : null}</div>
      {currentItem.index >= 0 && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            Editar Actividad {currentItem.nombreActividad}
          </Modal.Header>
          <Modal.Body>
            <h1>{currentItem._id}</h1>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="grupo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grupo
                </label>
                <TextInput
                  id="grupo"
                  name="grupo"
                  value={currentItem.grupo}
                  onChange={handleFormChange}
                  placeholder="Grupo"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="tutor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tutor
                </label>
                <TextInput
                  id="tutor"
                  name="tutor"
                  value={currentItem.tutor}
                  onChange={handleFormChange}
                  placeholder="Tutor"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="tutor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Archivos
                </label>
                <TextInput
                  id="archivosURL"
                  name="archivosURL"
                  value={currentItem.archivosURL}
                  onChange={handleFormChange}
                  placeholder="URL ejem. http://www..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="tutor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comentarios
                </label>
                <TextInput
                  id="comentarios"
                  name="comentarios"
                  value={currentItem.comentarios}
                  onChange={handleFormChange}
                  placeholder="comentarios"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <Select
                  id="estado"
                  options={estadosAdm.map((estado) => ({
                    value: estado._id,
                    label: estado.nombre,
                  }))}
                  value={
                    estadosAdm.find(
                      (estado) => estado._id === currentItem.estado?._id
                    )
                      ? {
                          value: currentItem.estado._id,
                          label: estadosAdm.find(
                            (estado) => estado._id === currentItem.estado?._id
                          ).nombre,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleEstadoChange(selectedOption, currentItem.index)
                  }
                  isSearchable={true}
                />
              </div>
              <div>
                <label
                  htmlFor="formaEnvio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Forma Envío
                </label>
                <TextInput
                  id="formaEnvio"
                  name="formaEnvio"
                  value={currentItem.formaEnvio}
                  onChange={handleFormChange}
                  placeholder=""
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="actividadURL"
                  className="block text-sm font-medium text-gray-700"
                >
                  Actividad URL
                </label>
                <TextInput
                  id="actividadURL"
                  name="actividadURL"
                  value={currentItem.actividadURL}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="priorizacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priorización
                </label>
                <TextInput
                  id="priorizacion"
                  name="priorizacion"
                  value={currentItem.priorizacion}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* Repite este patrón para otros campos */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={handleUpdate}>
              Actualizar
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </form>
  );
}
