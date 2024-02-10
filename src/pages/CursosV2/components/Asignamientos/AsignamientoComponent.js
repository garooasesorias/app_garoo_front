import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import adviserService from "../../../../services/asesorService";
import asignamientoService from "../../../../services/asignamientoService";
import authService from "../../../../services/authService"; // Importando authService
import { utcToZonedTime } from "date-fns-tz";

export default function AsignamientoComponent({
  data,
  notifyOperacionesUpdate,
  notifyCalificacionesUpdate,
}) {
  const [formData, setFormData] = useState({
    items: [],
  });

  const [asesores, setAsesores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador

  const fetchData = async () => {
    const asesores = await adviserService.getAdvisors();
    setAsesores(asesores.data);

    asignamientoService
      .getAsignamientosByIdCurso(data._id)
      .then((response) => {
        setFormData({
          items: response.data.map((asignamiento) => ({
            id: asignamiento._id,
            fechaVencimiento: asignamiento.fechaVencimiento
              ? format(
                  utcToZonedTime(
                    parseISO(asignamiento.fechaVencimiento),
                    "UTC"
                  ),
                  "yyyy-MM-dd"
                )
              : "",
            actividad: asignamiento.actividad._id,
            nombreActividad: asignamiento.actividad.nombre,
            asesor: {
              _id: asignamiento.asesor?._id || null,
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
    await asignamientoService.updateAsignamientoById(id, {
      fechaVencimiento: date,
    });
    fetchData();
    notifyOperacionesUpdate();
    notifyCalificacionesUpdate();
  };

  const handleAsesorChange = async (selectedOption, id) => {
    await asignamientoService.updateAsignamientoById(id, {
      asesor: selectedOption.value,
    });
    fetchData();
    notifyOperacionesUpdate();
    notifyCalificacionesUpdate();
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
    </form>
  );
}
