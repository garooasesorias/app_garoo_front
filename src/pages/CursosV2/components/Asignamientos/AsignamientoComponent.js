import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import adviserService from "../../../../services/asesorService";
import asignamientoService from "../../../../services/asignamientoService";
import authService from "../../../../services/authService"; // Importando authService

export default function AsignamientoComponent({
  data,
  notifyOperacionesUpdate,
}) {
  // console.log("data", data);
  // const items = data.asignamiento?.items || [];
  const [formData, setFormData] = useState({
    items: [],
    // items: items.map((actividad, index) => ({
    //   fechaVencimiento: items[index]?.fechaVencimiento
    //     ? format(parseISO(items[index]?.fechaVencimiento), "yyyy-MM-dd")
    //     : "",
    //   actividad: items[index]?.actividad || actividad._id,
    //   asesor: {
    //     _id: items[index]?.asesor || null,
    //   },
    // })),
  });

  const [asesores, setAsesores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador

  const fetchData = async () => {
    const asesores = await adviserService.getAdvisors();
    setAsesores(asesores.data);

    // const asignamientos =
    asignamientoService
      .getAsignamientoesByIdCurso(data._id)
      .then((response) => {
        // console.log("asignamientos", response.data);
        setFormData({
          items: response.data.map((asignamiento) => ({
            id: asignamiento._id,
            fechaVencimiento: asignamiento?.fechaVencimiento
              ? format(parseISO(asignamiento.fechaVencimiento), "yyyy-MM-dd")
              : "",
            actividad: asignamiento.actividad._id,
            nombreActividad: asignamiento.actividad.nombre,
            asesor: {
              _id: asignamiento.asesor || null,
            },
          })),
        });
      });
  };

  useEffect(() => {
    const checkAdmin = async () => {
      setIsAdmin(await authService.isAdmin()); // Comprobar si el usuario es administrador
    };
    checkAdmin();

    fetchData();
  }, []);

  const handleDateChange = async (date, id) => {
    // setFormData((prevFormData) => {
    //   const newItems = [...prevFormData.items];
    //   newItems[itemIndex].fechaVencimiento = date;
    //   return { ...prevFormData, items: newItems };
    // });
    await asignamientoService.updateAsignamientoById(id, {
      fechaVencimiento: date,
    });
    fetchData();
    notifyOperacionesUpdate();
  };

  const handleAsesorChange = async (selectedOption, id) => {
    // setFormData((prevFormData) => {
    //   const newItems = [...prevFormData.items];
    //   const asesorObj = asesores.find(
    //     (asesor) => asesor._id === selectedOption.value
    //   );
    //   newItems[itemIndex].asesor = asesorObj;
    //   return { ...prevFormData, items: newItems };
    // });
    await asignamientoService.updateAsignamientoById(id, {
      asesor: selectedOption.value,
    });
    fetchData();
    notifyOperacionesUpdate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsToSend = formData.items.map((item) => {
      return {
        ...item,
        fechaVencimiento: item.fechaVencimiento,
        actividad: item.actividad,
        asesor: item.asesor._id ? item.asesor._id : null,
      };
    });

    await asignamientoService
      .updateAsignamientoById(
        data.asignamiento?._id ? data.asignamiento._id : null,
        {
          curso: data._id,
          items: itemsToSend,
        }
      )
      .then(() => alert("success"))
      .catch(() => alert("error"));
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
            <th className="px-4 py-2">Fecha Límite</th>
            <th className="px-4 py-2">Asesor</th>
          </tr>
        </thead>
        <tbody>
          {formData.items &&
            formData.items.map((item, itemIndex) => (
              <tr key={item.actividad}>
                <td className="px-4 py-2">{item.nombreActividad}</td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    value={item.fechaVencimiento}
                    onChange={(event) =>
                      isAdmin && handleDateChange(event.target.value, item.id)
                    }
                    disabled={!isAdmin}
                    className="datepicker-custom"
                  />
                </td>
                <td className="px-4 py-2">
                  <Select
                    options={[
                      { value: null, label: "Sin asignar" },
                      ...asesores.map((asesor) => ({
                        value: asesor._id,
                        label: asesor.nombre,
                      })),
                    ]}
                    value={
                      asesores.find((asesor) => asesor._id === item.asesor._id)
                        ? {
                            value: item.asesor._id,
                            label: asesores.find(
                              (asesor) => asesor._id === item.asesor._id
                            ).nombre,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      isAdmin && handleAsesorChange(selectedOption, item.id)
                    }
                    isSearchable={isAdmin}
                    isDisabled={!isAdmin}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* {isAdmin && (
        <div className="flex justify-center mt-2">
          <Button type="submit" color="dark">
            Actualizar Asignamiento
          </Button>
        </div>
      )} */}
    </form>
  );
}
