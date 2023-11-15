import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table } from "flowbite-react";
import Select from "react-select";

export default function OperacionComponent({ data }) {
  console.log(data);
  const [asesores, setAsesores] = useState([]);
  const [estadosAdm, setEstadosAdm] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Estado para almacenar el item actual

  const items = data.asignamiento?.items || [];
  const [formData, setFormData] = useState({
    items: data.actividades.map((actividad, index) => ({
      actividad: items[index]?.actividad || actividad._id,
      grupo: items[index]?.grupo || null,
      tutor: items[index]?.tutor || null,
      archivos: items[index]?.archivos || null,
      comentarios: items[index]?.comentarios || null,
      estado: {
        _id: items[index]?.estado || null,
      },
      formaEnvio: items[index]?.formaEnvio || null,
      actividadURL: items[index]?.actividadURL || null,
      priorizacion: items[index]?.priorizacion || null,
    })),
  });

  useEffect(() => {
    const fetchData = async () => {
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
  const handleEdit = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };

  // // Función para manejar la actualización del item (ajustar según tus necesidades)
  // const handleUpdate = () => {
  //   console.log("Actualizar", currentItem);
  //   // Aquí puedes agregar la lógica para actualizar el item
  //   setOpenModal(false); // Cerrar el modal después de actualizar
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsToSend = formData.items.map((item) => {
      return {
        ...item,
        fechaVencimiento: item.fechaVencimiento,
        actividad: { $oid: item.actividad },
        asesor: item.asesor._id ? { $oid: item.asesor._id } : null,
      };
    });

    google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
        alert("Éxito");
      })
      .updateOperacionById(
        data.operacion._id ? { _id: { $oid: data.operacion._id } } : {},
        {
          curso: { $oid: data._id },
          items: itemsToSend,
        }
      );
  };

  return (
    <form onSubmit={handleSubmit}>
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
                  {data.actividades[itemIndex].nombre}
                </td>
                <td className="px-4 py-2">{item.grupo || "Sin Grupo"}</td>
                <td className="px-4 py-2">
                  {item.tutor?.nombre || "Sin Tutor"}
                </td>
                <td className="px-4 py-2">
                  {item.archivos?.length > 0
                    ? item.archivos.join(", ")
                    : "Sin Archivos"}
                </td>
                <td className="px-4 py-2">
                  {item.comentarios || "Sin Comentarios"}
                </td>
                <td className="px-4 py-2">
                  <Select
                    options={estadosAdm.map((estados) => ({
                      value: estados._id,
                      label: estados.nombre,
                    }))}
                    value={
                      estadosAdm.find(
                        (estado) => estado._id === item.estado._id
                      )
                        ? {
                            value: item.estados._id,
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
                  />
                </td>
                <td className="px-4 py-2">
                  {item.formaEnvio || "Sin Forma de Envío"}
                </td>
                <td className="px-4 py-2">{item.actividadURL || "Sin URL"}</td>
                <td className="px-4 py-2">
                  {item.priorizacion || "Sin Priorización"}
                </td>
                <td className="px-4 py-2">
                  <Button color="light" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Modal para editar */}
      {currentItem && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Editar Actividad</Modal.Header>
          <Modal.Body>
            {/* Aquí puedes agregar campos de formulario para editar los detalles de currentItem */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdate}>Actualizar</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* <div className="flex justify-center mt-2">
        <Button type="submit" color="dark">
          Actualizar Operaciones
        </Button>
      </div> */}
    </form>
  );
}
