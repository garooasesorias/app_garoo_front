import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import adviserService from "../../../../services/asesorService";
import asignamientoService from "../../../../services/asignamientoService";
import authService from "../../../../services/authService"; // Importando authService

export default function AsignamientoComponent({ data }) {
  const items = data.asignamiento?.items || [];
  const [formData, setFormData] = useState({
    items: items.map((actividad, index) => ({
      fechaVencimiento: items[index]?.fechaVencimiento
        ? format(parseISO(items[index]?.fechaVencimiento), "yyyy-MM-dd")
        : "",
      actividad: items[index]?.actividad || actividad._id,
      asesor: {
        _id: items[index]?.asesor || null,
      },
    })),
  });

  const [asesores, setAsesores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador

  useEffect(() => {
    const checkAdmin = async () => {
      setIsAdmin(await authService.isAdmin()); // Comprobar si el usuario es administrador
    };
    checkAdmin();

    const fetchData = async () => {
      const asesores = await adviserService.getAdvisors();
      setAsesores(asesores.data);
    };
    fetchData();
  }, []);

  const handleDateChange = (date, itemIndex) => {
    setFormData((prevFormData) => {
      const newItems = [...prevFormData.items];
      newItems[itemIndex].fechaVencimiento = date;
      return { ...prevFormData, items: newItems };
    });
  };

  const handleAsesorChange = (selectedOption, itemIndex) => {
    setFormData((prevFormData) => {
      const newItems = [...prevFormData.items];
      const asesorObj = asesores.find(
        (asesor) => asesor._id === selectedOption.value
      );
      newItems[itemIndex].asesor = asesorObj;
      return { ...prevFormData, items: newItems };
    });
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
                <td className="px-4 py-2">
                  {data.actividades[itemIndex].nombre}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    value={item.fechaVencimiento}
                    onChange={(event) =>
                      isAdmin && handleDateChange(event.target.value, itemIndex)
                    }
                    disabled={!isAdmin}
                    className="datepicker-custom"
                  />
                </td>
                <td className="px-4 py-2">
                  <Select
                    options={asesores.map((asesor) => ({
                      value: asesor._id,
                      label: asesor.nombre,
                    }))}
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
                      isAdmin && handleAsesorChange(selectedOption, itemIndex)
                    }
                    isSearchable={isAdmin}
                    isDisabled={!isAdmin}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {isAdmin && (
        <div className="flex justify-center mt-2">
          <Button type="submit" color="dark">
            Actualizar Asignamiento
          </Button>
        </div>
      )}
    </form>
  );
}
