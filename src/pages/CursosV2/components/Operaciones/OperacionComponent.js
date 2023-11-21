import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table, Modal, TextInput } from "flowbite-react";
import Select from "react-select";

export default function OperacionComponent({ data }) {
  const [operaciones, setOperaciones] = useState([]);

  const [asesores, setAsesores] = useState([]);
  const [estadosAdm, setEstadosAdm] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({}); // Estado para almacenar el item actual

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((response) => {
          console.log("response operaciones by Curso", response);
          setFormData({
            items: response.map((operacion) => ({
              _id: operacion._id,
              actividad: operacion.actividad,
              curso: data._id,
              nombreActividad: "test",
              nombreActividad:
                data.actividades.find(
                  (actividad) => actividad._id === operacion.actividad
                )?.nombre || "",
              grupo: operacion.grupo || "",
              tutor: operacion.tutor || "",
              archivosURL: operacion.archivosURL || "",
              comentarios: operacion.comentarios || "",
              estado: {
                _id: operacion.estado || "",
              },
              formaEnvio: operacion.formaEnvio || "",
              actividadURL: operacion.actividadURL || "",
              priorizacion: operacion.priorizacion || "",
            })),
          });
        })
        .getOperacionesByIdCurso(data._id);

      await google.script.run.withSuccessHandler(setAsesores).getAsesores();
      await google.script.run.withSuccessHandler(setEstadosAdm).getEstadosAdm();
    };
    fetchData();
  }, []);

  const handleEstadoChange = (selectedOption, itemIndex) => {
    setFormData((prevFormData) => {
      const newItems = [...prevFormData.items];
      const estadoObj = estadosAdm.find(
        (estado) => estado._id === selectedOption.value
      );
      newItems[itemIndex].estado = estadoObj;
      return { ...prevFormData, items: newItems };
    });
  };

  // Función para abrir el modal con la información del item seleccionado
  const handleEdit = (item, index) => {
    console.log(item);
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
  const handleUpdate = () => {
    const objectToSend = currentItem;
    objectToSend.actividad = { $oid: currentItem.actividad };
    objectToSend._id = { $oid: currentItem._id };
    objectToSend.curso = { $oid: currentItem.curso };

    console.log("Actualizar", objectToSend);
    google.script.run
      .withSuccessHandler((response) => {
        console.log("respuesta actualización operación");
        console.log(response);
      })
      .updateOperacionById({ _id: objectToSend._id }, objectToSend);
    console.log("FormData", formData);
    // Aquí puedes agregar la lógica para actualizar el item
    setOpenModal(false); // Cerrar el modal después de actualizar
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
                <td className="px-4 py-2">
                  {item.nombreActividad}
                  {/* {
                    data.actividades.find(
                      (actividad) => actividad._id === item.actividad
                    ).nombre
                  } */}
                </td>
                <td className="px-4 py-2">{item.grupo || "Sin Grupo"}</td>
                <td className="px-4 py-2">{item.tutor || "Sin Tutor"}</td>
                <td className="px-4 py-2">{item.archivos || "Sin Archivos"}</td>
                <td className="px-4 py-2">
                  {item.comentarios || "Sin Comentarios"}
                </td>
                <td className="px-4 py-2">
                  {estadosAdm.find((estado) => estado._id === item.estado._id)
                    ?.nombre || "Sin Estado"}
                  {/* <Select
                    options={estadosAdm.map((estado) => ({
                      value: estado._id,
                      label: estado.nombre,
                    }))}
                    value={
                      estadosAdm.find(
                        (estado) => estado._id === item.estado._id
                      )
                        ? {
                            value: item.estado._id,
                            label: estadosAdm.find(
                              (estado) => estado._id === item.estado._id
                            ).nombre,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleEstadoChange(selectedOption, itemIndex)
                    }
                    isSearchable={true}
                  /> */}
                </td>
                <td className="px-4 py-2">
                  {item.formaEnvio || "Sin Forma de Envío"}
                </td>
                <td className="px-4 py-2">{item.actividadURL || "Sin URL"}</td>
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
                  id="archivos"
                  name="archivos"
                  value={currentItem.archivos}
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
