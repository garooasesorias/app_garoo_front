import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Label, Table } from "flowbite-react";
import Select from "react-select";

function CotizacionForm() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    fecha: "",
    cliente: null,
    items: [],
    total: 0,
    estado: null,
  });

  const [clientes, setClientes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [planActividades, setPlanActividades] = useState([]);
  const [cotizacion, setCotizacion] = useState([]);
  const [estadosCotizaciones, setEstadosCotizaciones] = useState([]);

  const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run.withSuccessHandler(setClientes).getClientes();
      await google.script.run.withSuccessHandler(setMaterias).getMaterias();
      await google.script.run.withSuccessHandler(setPlanes).getPlanes();
      await google.script.run
        .withSuccessHandler(setActividades)
        .getActividades();
      await google.script.run
        .withSuccessHandler(setEstadosCotizaciones)
        .getEstadosCotizaciones();

      if (id) {
        await google.script.run
          .withSuccessHandler((data) => {
            const cotizacion = data[0];
            // Set the fetched cotizacion data to the state
            setCotizacion(data[0]);

            // Prepopulate the form fields with data from cotizacion
            setFormData({
              fecha: cotizacion.fecha,
              cliente: {
                label: cotizacion.cliente.nombre,
                value: cotizacion.cliente._id,
              },
              // You can add other fields similarly
              items: cotizacion.items.map((item) => ({
                materia: {
                  label: item.materia.nombre,
                  value: item.materia._id,
                },
                plan: {
                  label: item.plan.nombre,
                  value: item.plan._id,
                },
                actividad: item.actividades.map((act) => ({
                  label: act.nombre,
                  value: act._id,
                })),
              })),
              total: cotizacion.total,
              estado: {
                label: cotizacion.estado.nombre,
                value: cotizacion.estado._id,
              },
            });

            // Log the fetched cotizacion data
          })
          .getCotizacionById(id);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (const fila of formData.items) {
      if (fila.plan) {
        const plan = planes.find((plan) => plan._id === fila.plan.value);
        total += Number(plan?.precio); // Supongamos que el precio del plan está almacenado en la propiedad 'precio'
      }
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = calculateTotal(); // Calcular el total

    setFormData((prevData) => ({
      ...prevData,
      fecha: currentDate,
      total: total,
    }));

    const formattedItems = formData.items.map((item) => ({
      materia: item.materia ? { $oid: item.materia.value } : null,
      plan: item.plan ? { $oid: item.plan.value } : null,
      actividades: item.actividad
        ? item.actividad.map((act) => ({ $oid: act.value }))
        : [],
    }));

    const formattedFormData = {
      fecha: currentDate,
      cliente: formData.cliente ? { $oid: formData.cliente.value } : null,
      estado: { $oid: "64e600985fef1743de870cbc" },
      items: formattedItems,
      total: total,
    };

    google.script.run
      .withSuccessHandler(() => {
        alert("Éxito");
      })
      .insertCotizacion(formattedFormData);
  };

  const handleSubmitCurso = () => {
    console.log(formData);
    formData.items.forEach(async (item) => {
      const formatedFormData = {
        fecha: currentDate,
        materia: item.materia ? { $oid: item.materia.value } : null,
        cliente: formData.cliente ? { $oid: formData.cliente.value } : null,
        estado: { $oid: "64eb986d83c29fa14cbabb69" },
        actividades: item.actividad
          ? item.actividad.map((act) => ({
              _id: { $oid: act.value },
              asesor: null,
              estadoAdm: null,
              estadoAsesor: null,
              nota: 0,
            }))
          : [],
      };

      await google.script.run
        .withSuccessHandler()
        .insertCurso(formatedFormData);
    });
  };

  const handleClienteChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      cliente: selectedOption,
    }));
  };

  const handleMateriaChange = (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].materia = selectedOption;
    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));
  };

  const handlePlanChange = (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].plan = selectedOption;

    if (selectedOption.value !== "personalizado") {
      const plan = planes.find((plan) => plan._id === selectedOption.value);
      const actividadesRelacionadas = plan.actividades_relacionadas.map(
        (actividad, actividadIndex) => ({
          label: actividad.nombre,
          value: actividad._id,
          key: `${rowIndex}-${actividadIndex}`, // Usar rowIndex y actividadIndex
        })
      );

      setPlanActividades(actividadesRelacionadas);

      updatedFilas[rowIndex].actividad = actividadesRelacionadas;
    } else {
      setPlanActividades([]);
      updatedFilas[rowIndex].actividad = [];
    }

    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));
  };

  const handleActividadChange = (selectedOptions, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].actividad = selectedOptions;
    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));
  };

  const handleEstadoChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      estado: selectedOption,
    }));
  };

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { materia: null, plan: null, actividad: null },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedFilas = [...formData.items];
    updatedFilas.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));
  };

  const isEstadoGenerada =
    formData.estado && formData.estado.value === "64e600985fef1743de870cbc";

  const isEstadoEnviada =
    formData.estado && formData.estado.value === "64e5ffdc0bdfb8235d675878";

  const isEstadoAprobada =
    formData.estado && formData.estado.value === "64e6003c9f5475c68f9c8098";

  const isEstadoRechazada =
    formData.estado && formData.estado.value === "64e600235fef1743de86a806";

  const isEstadoGestionada =
    formData.estado && formData.estado.value === "64ea66fb83c29fa14cfa44bf";

  return (
    <form
      className="flex max-w-lg mx-auto flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1>Formulario Cotizaciones</h1>
      <div className="mb-4">
        <label>Cliente:</label>
        <Select
          options={clientes.map((cliente) => ({
            label: cliente.nombre,
            value: cliente._id,
          }))}
          value={formData.cliente}
          onChange={handleClienteChange}
        />
      </div>
      <Table className="mb-4">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Plan</th>
            <th>Actividades</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((fila, index) => (
            <tr key={index}>
              <td>
                <Select
                  options={materias.map((materia) => ({
                    label: materia.nombre,
                    value: materia._id,
                  }))}
                  value={fila.materia}
                  onChange={(selectedOption) =>
                    handleMateriaChange(selectedOption, index)
                  }
                />
              </td>
              <td>
                <Select
                  options={planes.map((plan) => ({
                    label: plan.nombre,
                    value: plan._id,
                  }))}
                  value={fila.plan}
                  onChange={(selectedOption) =>
                    handlePlanChange(selectedOption, index)
                  }
                />
              </td>
              <td>
                <Select
                  options={
                    fila.plan === "personalizado"
                      ? actividades
                      : planActividades
                  }
                  value={fila.actividad}
                  onChange={(selectedOptions) =>
                    handleActividadChange(selectedOptions, index)
                  }
                  isMulti // Habilitar el modo multiselect
                  isDisabled={fila.plan === "personalizado"} // Deshabilitar si el plan es "Personalizado"
                />
              </td>
              <td>
                <Button color="danger" onClick={() => removeRow(index)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <p>Total: {calculateTotal()} USD</p>
      </div>

      {id && (
        <div className="mb-4">
          <label>Estado de Cotización:</label>
          <Select
            options={estadosCotizaciones.map((estado) => ({
              label: estado.nombre,
              value: estado._id,
            }))}
            value={formData.estado}
            onChange={handleEstadoChange}
          />
        </div>
      )}

      <Button color="success" onClick={addRow}>
        Agregar Fila +
      </Button>

      {!id && (
        <Button type="submit" color="dark">
          Submit
        </Button>
      )}

      {isEstadoGenerada && (
        <Button color="light">Enviar Cotización al Cliente</Button>
      )}

      {isEstadoEnviada && (
        <>
          <Button color="light">Reenviar Cotización</Button>
          <Button color="light">Aprobar Cotización</Button>
          <Button color="light">Rechazar Cotización</Button>
        </>
      )}

      {isEstadoAprobada && (
        <>
          <Button color="light">Reenviar Cotización</Button>
          <Button color="light">Rechazar Cotización</Button>
          <Button onClick={handleSubmitCurso} color="light">
            Crear Curso
          </Button>
        </>
      )}

      {isEstadoRechazada && (
        <>
          <Button color="light">Reenviar Cotización</Button>
          <Button color="light">Aprobar Cotización</Button>
        </>
      )}

      {isEstadoGestionada && <Button color="light">Ver Cursos</Button>}
    </form>
  );
}

export default CotizacionForm;
