import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Label, Table } from "flowbite-react";
import Select from "react-select";
import PdfButton from "./PdfButton";
import cotizacionService from "../../../services/cotizacionService"; // Servicio para las operaciones de cotizaciones
import clienteService from "../../../services/clienteService"; // Servicio para las operaciones de clientes
import materiaService from "../../../services/materiasService"; // Servicio para las operaciones de materias
import planService from "../../../services/planesService"; // Servicio para las operaciones de planes
import actividadService from "../../../services/actividadesService"; // Servicio para las operaciones de actividades
import estadoCotizacionService from "../../../services/estadoCotizacionService"; // Servicio para las operaciones de estados de cotizaciones
import descuentoService from "../../../services/descuentosService"; // Servicio para las operaciones de descuentos
import cursoService from "../../../services/cursoService";
import operacionService from "../../../services/operacionService";
// Otros componentes o servicios que puedas necesitar

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
      try {
        // Carga inicial de datos requeridos como clientes, materias, etc.
        const clientesRes = await clienteService.getClientes();
        setClientes(clientesRes.data);

        const materiasRes = await materiaService.getMaterias();
        setMaterias(materiasRes.data);

        const planesRes = await planService.getPlanes();
        setPlanes(planesRes.data);

        const actividadesRes = await actividadService.getActividades();
        setActividades(
          actividadesRes.data.map((act) => ({
            label: act.nombre,
            value: act._id,
          }))
        );

        const estadosCotizacionesRes = await estadoCotizacionService.getEstadosCotizacion();
        const estadosCotizacionesMapeados = estadosCotizacionesRes.data.map(estado => ({
          label: estado.nombre,
          value: estado._id
        }));
        setEstadosCotizaciones(estadosCotizacionesMapeados);
        const descuentosRes = await descuentoService.getDescuentos();
        setDescuentos(descuentosRes.data);

        // Si estamos editando una cotización existente (id presente), obtenemos sus datos
        if (id) {
          const cotizacionRes = await cotizacionService.getCotizacionById(id);
          console.log('Cotización cargada de la base de datos:', cotizacionRes.data);

          const cotizacionData = cotizacionRes.data;

          // Función para obtener el subtotal por plan
          const obtenerSubtotalPorPlan = (planId) => {
            const plan = planesRes.data.find(p => p._id === planId);
            return plan ? plan.precio : 'N/A'; // Asegúrate de que `plan.precio` es el precio del plan
          };

          // Mapeo de actividades para que cada ítem tenga su lista de actividades correspondiente,
          // además de asignar el subtotal adecuado
          const itemsConActividadesYSubtotal = cotizacionData.items.map((item) => {
            const subtotal = obtenerSubtotalPorPlan(item.plan);

            const actividadesOptions = actividadesRes.data.map((act) => ({
              label: act.nombre,
              value: act._id,
            }));

            const descuentoAplicado = descuentosRes.data.find(d => d._id === item.descuento);

            return {
              ...item,
              planSubtotal: subtotal, // Agrega el subtotal al item
              actividades: item.actividades.map(
                (actId) => actividadesOptions.find((act) => act.value === actId._id) || null
              ),
              // Agrega el descuento al item
              descuento: descuentoAplicado ? { label: `${descuentoAplicado.descripcion} (${descuentoAplicado.porcentaje}%)`, value: descuentoAplicado._id } : null,
            };
          });

          const estadoSeleccionado = estadosCotizacionesMapeados.find(e => e.value === cotizacionData.estado);

          // Actualiza el estado formData con los nuevos items que incluyen subtotales
          setFormData({
            ...cotizacionData,
            estado: estadoSeleccionado,
            items: itemsConActividadesYSubtotal,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Dependencia: id


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);

    // Formateamos los datos con validación
    const formattedItems = formData.items.map((item) => ({
      materia: item.materia ? item.materia.value : null,
      plan: item.plan ? item.plan.value : null,
      // Asegúrate de que el descuento exista y tenga un valor antes de intentar acceder a `value`
      descuento: item.descuento ? item.descuento.value : null,
      // Asegúrate de que la actividad sea un arreglo no vacío antes de mapear
      actividades: item.actividad ? item.actividad.map((act) => act.value) : [],
    }));

    const formattedFormData = {
      fecha: formData.fecha,
      cliente: formData.cliente ? formData.cliente.value : null,
      estado: formData.estado ? formData.estado.value : null,
      items: formattedItems,
      subtotal: calculateTotal(),
      total: calculateTotal(),
      divisionPagos: formData.divisionPagos.map((division) => ({
        numeroDivision: division.numeroDivision,
        monto: division.monto,
        fechaLimite: division.fechaLimite,
      })),
    };

    // Enviamos los datos
    try {
      const response = await cotizacionService.insertCotizacion(
        formattedFormData
      );
      alert("Cotización creada con éxito.");
    } catch (error) {
      console.error("Error al crear la cotización:", error);
      alert("Ocurrió un error al crear la cotización.");
    }
  };

  const handleSubmitCurso = async () => {
    for (const item of formData.items) {
      const formattedFormData = {
        fecha: currentDate,
        materia: item.materia,
        cliente: formData.cliente,
        estado: "64eb986d83c29fa14cbabb69",
        actividades: item.actividades
          ? item.actividades.map((act) => act.value)
          : [],
      };

      try {
        const response = await cursoService.insertCurso(formattedFormData);
        const insertedId = response.data._id;

        console.log("insertedId", insertedId);
        const actividades = item.actividades
          ? item.actividades.map((act) => ({
            actividad: act.value,
            curso: insertedId,
          }))
          : [];
        console.log("actividades", actividades);
        if (actividades.length > 0) {
          console.log(actividades);
          const operacionesResponse = await operacionService.insertOperaciones(
            actividades
          );
          console.log("operacionesResponse", operacionesResponse);
        }
      } catch (error) {
        console.error("Error al insertar curso y operaciones:", error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    }
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

  const handlePlanChange = async (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].plan = selectedOption;

    // Inicializa el precio del plan y las actividades relacionadas
    let planPrice = 0;
    let actividadesRelacionadas = [];

    if (selectedOption.value !== "personalizado") {
      try {
        // Obtiene los detalles del plan, incluyendo las actividades relacionadas
        const planDetails = await planService.getPlanById(selectedOption.value);
        const plan = planDetails.data;

        planPrice = plan.precio || 0; // Asume un precio por defecto si no está definido

        // Mapea las actividades relacionadas para usar en el Select
        if (plan.actividades && plan.actividades.length > 0) {
          actividadesRelacionadas = plan.actividades.map((actividad) => ({
            label: actividad.nombre,
            value: actividad._id,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los detalles del plan:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }

    // Actualiza las filas con las actividades relacionadas y el precio del plan
    updatedFilas[rowIndex] = {
      ...updatedFilas[rowIndex],
      actividades: actividadesRelacionadas,
      planSubtotal: planPrice,
    };

    // Actualiza el estado del formulario con las filas actualizadas
    setFormData((prevData) => ({
      ...prevData,
      items: updatedFilas,
    }));
    // También puedes actualizar las actividades del plan aquí si es necesario
    setPlanActividades(actividadesRelacionadas);
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
        { materia: null, plan: null, actividades: [], descuento: null }, // Asegúrate de que el objeto tenga la estructura correcta
      ],
    }));
  };

  const generateDivisionesPagos = (nuevoNumeroDivisiones) => {
    setFormData((prevData) => {
      const diferencia = nuevoNumeroDivisiones - prevData.divisionPagos.length;
      if (diferencia > 0) {
        const nuevasDivisiones = Array.from({ length: diferencia }).map(
          (_, index) => ({
            numeroDivision: prevData.divisionPagos.length + index + 1,
            monto: (
              calculateTotalConDescuento() / nuevoNumeroDivisiones
            ).toFixed(2),
            fechaLimite: "",
          })
        );
        return {
          ...prevData,
          divisionPagos: [...prevData.divisionPagos, ...nuevasDivisiones],
        };
      } else if (diferencia < 0) {
        return {
          ...prevData,
          divisionPagos: prevData.divisionPagos.slice(0, nuevoNumeroDivisiones),
        };
      }
      return prevData; // No hay cambios
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

  // Variables de estado (asegúrate de que los valores son correctos)
  const isEstadoGenerada =
    formData.estado?.value === "64e600985fef1743de870cbc";
  const isEstadoEnviada = formData.estado?.value === "64e5ffdc0bdfb8235d675878";
  const isEstadoAprobada =
    formData.estado?.value === "64e6003c9f5475c68f9c8098";
  const isEstadoRechazada =
    formData.estado?.value === "64e600235fef1743de86a806";
  const isEstadoGestionada =
    formData.estado?.value === "64ea66fb83c29fa14cfa44bf";

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <form className="flex mx-auto flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Cliente:</label>
          <Select
            options={clientes.map((cliente) => ({
              label: cliente.nombre,
              value: cliente._id,
            }))}
            value={clientes
              .map((cliente) => ({
                label: cliente.nombre,
                value: cliente._id,
              }))
              .find((option) => option.value === formData.cliente)}
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
                    value={materias
                      .map((materia) => ({
                        label: materia.nombre,
                        value: materia._id,
                      }))
                      .find((option) => option.value === fila.materia)}
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
                    value={planes
                      .map((plan) => ({
                        label: plan.nombre,
                        value: plan._id,
                      }))
                      .find((option) => option.value === fila.plan)}
                    onChange={(selectedOption) =>
                      handlePlanChange(selectedOption, index)
                    }
                  />
                </td>
                <td>
                  <Select
                    options={
                      fila.plan && fila.plan.value !== "personalizado"
                        ? planActividades
                        : actividades
                    }
                    value={
                      fila.actividades &&
                      fila.actividades.map((actividad) => ({
                        label: actividad?.label,
                        value: actividad?.value,
                      }))
                    }
                    onChange={(selectedOptions) =>
                      handleActividadChange(selectedOptions, index)
                    }
                    isMulti
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
                <td>{formData.total} COP</td>
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
          <p>Total: {formData.total} COP</p>
          {formData.items.some((fila) => fila.descuento) && (
            <p>Total con Descuento: {formData.subtotal} COP</p>
          )}
        </div>

        {id && (
          <div className="mb-4">
            <label>Estado de Cotización:</label>
            <Select
              options={estadosCotizaciones}
              value={estadosCotizaciones.find(estado => estado.value === formData.estado?.value)}
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

        {/* {formData.fecha && <PdfButton data={formData} />} */}
        <PdfButton data={formData} />

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
      <Button
        type="button"
        color="dark"
        onClick={goBack}
        className="m-auto mt-4"
      >
        Volver
      </Button>
    </>
  );
}

export default CotizacionForm;
