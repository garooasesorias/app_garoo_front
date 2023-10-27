import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Label, Table } from "flowbite-react";
import Select from "react-select";
import PdfButton from "./PDFButton";

function CotizacionForm() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    fecha: "",
    cliente: null,
    items: [],
    total: 0,
    estado: null,
    divisionPagos: [],
  });

  const [clientes, setClientes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [planActividades, setPlanActividades] = useState([]);
  const [cotizacion, setCotizacion] = useState([]);
  const [estadosCotizaciones, setEstadosCotizaciones] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);
  const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO
  const [fechasLimite, setFechasLimite] = useState([]);

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
      await google.script.run.withSuccessHandler(setDescuentos).getDescuentos();

      if (id) {
        await google.script.run
          .withSuccessHandler((data) => {
            const cotizacion = data[0];
            console.log(data);
            setCotizacion(data[0]);

            // Prepopulate the form fields with data from cotizacion
            setFormData({
              fecha: cotizacion.fecha,
              cliente: {
                label: cotizacion.cliente.nombre,
                value: cotizacion.cliente._id,
                usuario: cotizacion.cliente.usuario,
              },
              items: cotizacion.items.map((item) => ({
                materia: {
                  label: item.materia.nombre,
                  value: item.materia._id,
                },
                plan: item.plan
                  ? {
                      label: item.plan.nombre,
                      value: item.plan._id,
                    }
                  : null,
                planSubtotal: item.plan.precio,
                descuento:
                  item.descuento && Object.keys(item.descuento).length
                    ? {
                        label: `${item.descuento.descripcion} (${item.descuento.porcentaje}%)`,
                        value: item.descuento._id,
                      }
                    : {
                        label: "Sin Descuento",
                        value: null,
                      },
                actividad: item.actividades.map((act) => ({
                  label: act.nombre,
                  value: act._id,
                })),
              })),
              divisionPagos: cotizacion.divisionPagos.map((division) => ({
                numeroDivision: division.numeroDivision,
                monto: division.monto,
                fechaLimite: division.fechaLimite,
              })),
              total: cotizacion.total,
              estado: {
                label: cotizacion.estado.nombre,
                value: cotizacion.estado._id,
              },
            });
          })
          .getCotizacionById(id);
      }
    };
    fetchData();
  }, []);

  console.log(formData);

  const calculateRowTotal = (row) => {
    let totalRow = 0;
    if (row.plan) {
      const plan = planes.find((plan) => plan._id === row.plan.value);
      totalRow += Number(plan?.precio || 0); // Asumimos que el precio del plan está almacenado en la propiedad 'precio'
    }

    if (row.descuento) {
      const descuentoAplicable = descuentos.find(
        (descuento) => descuento._id === row.descuento.value
      );
      if (descuentoAplicable) {
        totalRow = totalRow - totalRow * (descuentoAplicable.porcentaje / 100);
      }
    }

    // Si tienes más campos que influyen en el total por fila, puedes añadirlos aquí.
    return totalRow;
  };

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
  const calculateTotalConDescuento = () => {
    return formData.items.reduce(
      (accum, fila) => accum + calculateRowTotal(fila),
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí es donde formateamos y enviamos los datos.
    // Asegúrate de incluir el descuento cuando estés guardando el formulario.

    const formattedItems = formData.items.map((item) => ({
      materia: item.materia ? { $oid: item.materia.value } : null,
      plan: item.plan ? { $oid: item.plan.value } : null,
      descuento: item.descuento ? { $oid: item.descuento.value } : null,
      actividades: item.actividad
        ? item.actividad.map((act) => ({ $oid: act.value }))
        : [],
    }));

    const formattedFormData = {
      fecha: currentDate,
      cliente: formData.cliente ? { $oid: formData.cliente.value } : null,
      estado: { $oid: "64e600985fef1743de870cbc" },
      items: formattedItems,
      subtotal: calculateTotal(),
      total: calculateTotalConDescuento(),
      divisionPagos: formData.divisionPagos,
    };

    console.log(formattedFormData);

    google.script.run
      .withSuccessHandler(() => {
        alert("Éxito");
      })
      .insertCotizacion(formattedFormData);
  };

  const handleSubmitCurso = () => {
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

    // Precio por defecto, puede ser cambiado según la estructura de datos.
    let planPrice = 0;

    if (selectedOption.value !== "personalizado") {
      const plan = planes.find((plan) => plan._id === selectedOption.value);

      // Suponiendo que cada plan tiene un precio asociado
      planPrice = plan.precio;

      const actividadesRelacionadas = plan.actividades_relacionadas.map(
        (actividad, actividadIndex) => ({
          label: actividad.nombre,
          value: actividad._id,
          key: `${rowIndex}-${actividadIndex}`,
        })
      );
      updatedFilas[rowIndex].actividad = actividadesRelacionadas;
    } else {
      updatedFilas[rowIndex].actividad = [];
    }

    // Calcula el subtotal basado en el precio del plan y la cantidad.
    updatedFilas[rowIndex].planSubtotal = planPrice;

    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));

    setPlanActividades(updatedFilas[rowIndex].actividad);
  };

  const handleDescuentoChange = (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].descuento = selectedOption;
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
        { materia: null, plan: null, actividad: null, descuento: null },
      ],
    }));
  };

  const generateDivisionesPagos = (nuevoNumeroDivisiones) => {
    setFormData((prevData) => {
      const diferencia = nuevoNumeroDivisiones - prevData.divisionPagos.length;

      // Si necesitas agregar más divisiones
      if (diferencia > 0) {
        return {
          ...prevData,
          divisionPagos: [
            ...prevData.divisionPagos,
            ...Array.from({ length: diferencia }).map((_, index) => ({
              numeroDivision: index + 1,
              monto: (
                calculateTotalConDescuento() / nuevoNumeroDivisiones
              ).toFixed(2),
              fechaLimite: "",
            })),
          ],
        };
      }

      // Si necesitas eliminar divisiones
      if (diferencia < 0) {
        return {
          ...prevData,
          divisionPagos: prevData.divisionPagos.slice(0, nuevoNumeroDivisiones),
        };
      }

      // Si no hay cambios
      return prevData;
    });
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

    const goBack = () => {
    
      window.history.back();
    };
  

  return (
    <>
    <form
      className="flex mx-auto flex-col gap-4"
      onSubmit={handleSubmit}
    >
 
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
            <th>Subtotal</th>
            <th>Descuento</th>
            <th>Total</th>
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
              <td>{fila.planSubtotal ? fila.planSubtotal : "N/A"} COP</td>
              <td>
                <Select
                  options={[
                    { label: "Sin descuento", value: null },
                    ...descuentos.map((descuento) => ({
                      label: `${descuento.descripcion} (${descuento.porcentaje}%)`,
                      value: descuento._id,
                    })),
                  ]}
                  value={fila.descuento}
                  onChange={(selectedOption) =>
                    handleDescuentoChange(selectedOption, index)
                  }
                />
              </td>
              <td>{calculateRowTotal(fila)} COP</td>
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
        <p>Total: {calculateTotal()} COP</p>
        {formData.items.some((fila) => fila.descuento) && (
          <p>Total con Descuento: {calculateTotalConDescuento()} COP</p>
        )}
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

      <div className="mb-4">
        <label>Número de divisiones:</label>
        <input
          type="number"
          value={formData.divisionPagos.length}
          onChange={(e) => generateDivisionesPagos(e.target.value)}
        />
      </div>

      <Table className="mb-4">
        <thead>
          <tr>
            <th>División</th>
            <th>Monto</th>
            <th>Fecha límite</th>
          </tr>
        </thead>
        <tbody>
          {formData.divisionPagos.map((division, index) => (
            <tr key={index}>
              <td>{division.numeroDivision}</td>
              <td>{division.monto}</td>
              <td>
                <input
                  type="date"
                  value={division.fechaLimite}
                  onChange={(e) => {
                    setFormData((prevData) => {
                      const updatedDivisiones = [...prevData.divisionPagos];
                      updatedDivisiones[index].fechaLimite = e.target.value;
                      return {
                        ...prevData,
                        divisionPagos: updatedDivisiones,
                      };
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!id && (
        <Button type="submit" color="dark">
          Submit
        </Button>
      )}

      {formData.fecha && <PdfButton data={formData} />}

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
    <Button type="button" color="dark" onClick={goBack} className="m-auto mt-4">
        Volver
      </Button>
    </>
  );
  
}

export default CotizacionForm;
