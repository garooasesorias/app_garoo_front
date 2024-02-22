import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ESTADOS_COTIZACIONES from "../../../constants/CotizacionesStates";

import { useCotizacion } from "../../../context/CotizacionContext";

import { Badge, Button, Label, Table, TextInput, Toast } from "flowbite-react";
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
import asignamientoService from "../../../services/asignamientoService";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { HiCheck } from "react-icons/hi";

// Otros componentes o servicios que puedas necesita
function CotizacionForm() {
  const formRef = useRef(null);
  let { id } = useParams();
  const { getEstadoStrategy, setEstado, estado } = useCotizacion();

  const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO
  const strategy = getEstadoStrategy();
  const validationRules = strategy.getFormValidation();

  const isFieldRequired = (fieldName) => {
    return validationRules[fieldName]?.required;
  };
  const isFieldDisabled = (fieldName) => {
    return validationRules[fieldName]?.disabled;
  };
  const [clientes, setClientes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [planActividades, setPlanActividades] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [action, setAction] = useState(null);
  const [buttonStrategy, setButtonStrategy] = useState(null);
  const [inputDivisionValue, setInputDivisionValue] = useState(); // Initial state set to 0 or whatever you want
  const [processing, setProcessing] = useState(false); // Initial state set to 0 or whatever you want
  const [idCotizacion, setIdCotizacion] = useState(id);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Puedes usar esto para cambiar el estilo del toast según sea éxito o error.

  const [formData, setFormData] = useState({
    fecha: "",
    cliente: null,
    items: [],
    subtotal: 0,
    total: 0,
    estado: null,
    divisionPagos: [],
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setEstado(ESTADOS_COTIZACIONES.INICIAL);

    try {
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

      const descuentosRes = await descuentoService.getDescuentos();

      setDescuentos(descuentosRes.data);

      if (id) {
        const { data } = await cotizacionService.getCotizacionById(id);
        // const cotizacionData = cotizacionRes.data;
        setEstado(data.estado);
        setInputDivisionValue(data.divisionPagos.length);

        // Mapeo de actividades para que cada ítem tenga su lista de actividades correspondiente
        const itemsConActividades = data.items.map((item) => {
          const actividadesOptions = item.actividades.map((act) => ({
            label: act.nombre,
            value: act._id,
          }));

          return {
            ...item,
            actividades: item.actividades.map(
              (actId) =>
                actividadesOptions.find((act) => act.value === actId._id) ||
                null
            ),
          };
        });

        setFormData({
          ...data,
          items: itemsConActividades,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDataCotizaciones = () => {
    // Formateamos los datos con validación
    const formattedItems = formData.items.map((item) => ({
      ...item,
      materia: item.materia?.value || item.materia,
      plan: item.plan?.value || item.plan,
      planSubtotal: item.planSubtotal?.value || item.planSubtotal,
      // Asegúrate de que el descuento exista y tenga un valor antes de intentar acceder a `value`
      descuento: item.descuento?.value || item.descuento,
      // Asegúrate de que la actividad sea un arreglo no vacío antes de mapear
      actividades: item.actividades
        ? item.actividades.map((act) => act.value)
        : [],
    }));

    const formattedFormData = {
      ...formData,
      fecha: currentDate,
      cliente: formData.cliente ? formData.cliente.value : null,
      estado,
      items: formattedItems,
      divisionPagos: formData.divisionPagos.map((division) => ({
        numeroDivision: division.numeroDivision,
        monto: division.monto,
        fechaLimite: division.fechaLimite,
      })),
    };

    return formattedFormData;
  };

  const formatDataPDF = () => {
    // Formateamos los datos con validación
    const formattedItems = formData.items.map((item) => ({
      ...item,
      materia: item.materia?.value || item.materia,
      plan: item.plan?.value || item.plan,
      planSubtotal: item.planSubtotal?.value || item.planSubtotal,
      // Asegúrate de que el descuento exista y tenga un valor antes de intentar acceder a `value`
      descuento: item.descuento?.value || item.descuento,
      // Asegúrate de que la actividad sea un arreglo no vacío antes de mapear
      actividades: item.actividades
        ? item.actividades.map((act) => act.value)
        : [],
    }));

    // console.log("FormDataCliente", formData.cliente);
    // console.log("Cliente", clientes);
    // Intenta encontrar el cliente basado en el ID. Si no se encuentra, usa un valor predeterminado.
    const formattedFormData = {
      ...formData,
      fecha: currentDate,
      cliente: formData.cliente, // Aquí ya tienes el objeto cliente completo
      estado,
      items: formattedItems,
      divisionPagos: formData.divisionPagos.map((division) => ({
        numeroDivision: division.numeroDivision,
        monto: division.monto,
        fechaLimite: division.fechaLimite,
      })),
    };
    return formattedFormData;
  };



  // Calcula el total sin descuentos
  const calculateSubtotal = (items) => {
    return items.reduce((accum, item) => {
      return Number(accum) + Number(item.planSubtotal); // Aquí se llama a la función que calcula el subtotal de cada fila
    }, 0);
  };

  const calculateTotalConDescuento = (items) => {
    return items.reduce((accum, item) => {
      return Number(accum) + Number(item.planTotal); // Aquí se llama a la función que calcula el subtotal de cada fila
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) return;
    // this.setState({ isProcessing: true });
    setProcessing(true);

    let formatedData = formData;

    if (buttonStrategy.module === "cotizaciones") {
      formatedData = formatDataCotizaciones(formData);
    }

    if (buttonStrategy.module === "PDF") {
      formatedData = formatDataPDF();
    }

    try {
      if (buttonStrategy.action) {
        // Ejecuta la acción con los datos formateados actuales
        const response = await buttonStrategy.action(
          formatedData,
          idCotizacion
        );
        setToastMessage("Cotización guardada con éxito.");
        setToastType('success');
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);        

        if (response && response.id) {
          setIdCotizacion(response.id);
        }

        if (response && response.hasOwnProperty('estado')) {
          setEstado(response.estado);
        }
        setProcessing(false);

        // fetchData();
      }
    } catch (error) {
      console.log(error);
      setToastMessage(error.message);
      setToastType('error');
      setShowToast(true);
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
      planTotal: planPrice,
    };

    // Actualiza el estado del formulario con las filas actualizadas
    setFormData((prevData) => ({
      ...prevData,
      subtotal: calculateSubtotal(updatedFilas),
      total: calculateTotalConDescuento(updatedFilas),
      items: updatedFilas,
    }));
    // También puedes actualizar las actividades del plan aquí si es necesario
    setPlanActividades(actividadesRelacionadas);
  };

  const handleDescuentoChange = (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.items];
    updatedFilas[rowIndex].descuento = selectedOption;
    let total = updatedFilas[rowIndex].planSubtotal;
    const descuentoAplicable = descuentos.find(
      (descuento) => descuento._id === selectedOption.value
    );

    if (descuentoAplicable) {
      total -= total * (descuentoAplicable.porcentaje / 100);
    }

    updatedFilas[rowIndex] = {
      ...updatedFilas[rowIndex],
      planTotal: total,
    };

    setFormData((prevData) => ({
      ...prevData,
      total: calculateTotalConDescuento(updatedFilas),
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

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { materia: null, plan: null, actividades: [], descuento: null }, // Asegúrate de que el objeto tenga la estructura correcta
      ],
    }));
  };
  const removeRow = (index) => {
    const updatedFilas = [...formData.items];
    updatedFilas.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      total: calculateTotalConDescuento(updatedFilas),
      subtotal: calculateSubtotal(updatedFilas),
      items: updatedFilas,
    }));
  };

  const generateDivisionesPagos = (nuevoNumeroDivisiones) => {
    setInputDivisionValue(nuevoNumeroDivisiones);
    setFormData((prevData) => {
      const diferencia =
        Number(nuevoNumeroDivisiones) - prevData.divisionPagos.length;
      if (diferencia > 0) {
        const nuevasDivisiones = Array.from({ length: diferencia }).map(
          (_, index) => ({
            numeroDivision: prevData.divisionPagos.length + index + 1,
            monto: (formData.total / Number(nuevoNumeroDivisiones)).toFixed(2),
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

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex justify-start m-4">
        <Badge color={strategy.colorBadge}>{strategy.nombre}</Badge>
      </div>
      <form
        className="flex mx-auto flex-col gap-4"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label>Cliente:</label>
          <Select
            className="test"
            required={isFieldRequired("cliente")}
            isDisabled={isFieldDisabled("cliente")}
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
                    required={isFieldRequired("materia")}
                    isDisabled={isFieldDisabled("materia")}
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
                    required={isFieldRequired("planes")}
                    isDisabled={isFieldDisabled("planes")}
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
                    required={isFieldRequired("actividades")}
                    isDisabled={isFieldDisabled("actividades")}
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
                    required={isFieldRequired("descuento")}
                    isDisabled={isFieldDisabled("descuento")}
                    options={descuentos.map((descuento) => ({
                      label: `${descuento.descripcion} (${descuento.porcentaje}%)`,
                      value: descuento._id,
                    }))}
                    value={descuentos
                      .map((descuento) => ({
                        label: descuento.descripcion,
                        value: descuento._id,
                      }))
                      .find((option) => option.value === fila.descuento)}
                    onChange={(selectedOption) =>
                      handleDescuentoChange(selectedOption, index)
                    }
                  />
                </td>
                <td>{fila.planTotal} COP</td>
                <td>
                  <Button
                    disabled={isFieldDisabled("removeRow")}
                    color="danger"
                    onClick={() => removeRow(index)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          disabled={isFieldDisabled("addRow")}
          color="indigo"
          onClick={addRow}
        >
          Agregar Fila +
        </Button>
        <div className="text-center">
          <p>Subtotal: {formData.subtotal} COP</p>
          <p>Total: {formData.total} COP</p>
        </div>

        <div className="mb-4">
          <Label htmlFor="divisionPagos" value="División Pagos" />
          <TextInput
            type="number"
            id="divisionPagos"
            value={inputDivisionValue}
            onChange={(e) => generateDivisionesPagos(e.target.value)}
            required={isFieldRequired("divisionPagos")}
            disabled={isFieldDisabled("divisionPagos")}
          ></TextInput>
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
                    required={isFieldRequired("divisionPagosFecha")}
                    disabled={isFieldDisabled("divisionPagosFecha")}
                    value={
                      division.fechaLimite
                        ? format(
                          utcToZonedTime(
                            parseISO(division.fechaLimite),
                            "UTC"
                          ),
                          "yyyy-MM-dd"
                        )
                        : ""
                    }
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

        {strategy.displayButtons().map((button) => (
          <Button
            key={button.id}
            type="submit"
            color={button.color}
            disabled={processing && true}
            // onClick={() => setAction(() => button.action)}
            onClick={() => setButtonStrategy(button)}
          >
            {button.text}
          </Button>
        ))}
      </form>

      <Button
        type="button"
        color="dark"
        onClick={goBack}
        className="m-auto mt-4"
      >
        Volver
      </Button>

      {showToast && (
        <Toast className={`Toast ${toastType}`} onDismiss={() => setShowToast(false)}>
          <div className="inline-flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-500">
            {/* El ícono puede cambiar según el tipo de mensaje */}
            {toastType === 'success' ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
          </div>
          <div className="ml-3 text-sm font-normal">
            {toastMessage}
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}

    </>
  );
}

export default CotizacionForm;
