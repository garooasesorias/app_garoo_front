import React, { useState, useEffect, useContext } from "react";
import { parseISO, format } from "date-fns";
import { Button, Table } from "flowbite-react";
import Select from "react-select";
import adviserService from "../../../../services/asesorService";

export default function AsignamientoComponent({ data }) {
  console.log(data.asignamiento);
  const items = data.asignamiento?.items || [];
  const [formData, setFormData] = useState({
    items: data.actividades.map((actividad, index) => ({
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

  useEffect(() => {
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
        alert("Éxito");
      })
      .updateAsignamientoById(
        data.asignamiento._id ? { _id: { $oid: data.asignamiento._id } } : {},
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
                      handleDateChange(event.target.value, itemIndex)
                    }
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
                      handleAsesorChange(selectedOption, itemIndex)
                    }
                    isSearchable={true}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="flex justify-center mt-2">
        <Button type="submit" color="dark">
          Actualizar Asignamiento
        </Button>
      </div>
    </form>
  );
}
