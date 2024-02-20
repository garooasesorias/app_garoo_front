import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";
import asignamientoService from "../services/asignamientoService";
import cotizacionService from "../services/cotizacionService";
import cursoService from "../services/cursoService";
import generatePDF from "../utils/pdfGenerator";


class EstadoCotizacionStrategy {
  constructor() {
    this.colorBadge = "gray";
    this.nombre = "";
  }

  getFormValidation() {
    // Define las validaciones para el estado Borrador
    return {
      cliente: { required: true, disabled: false },
      materia: { required: true, disabled: false },
      planes: { required: true, disabled: false },
      actividades: { required: true, disabled: false },
      divisionPagos: { required: true, disabled: false },
      divisionPagosFecha: { required: true, disabled: false },
      descuento: { required: true, disabled: false },
      addRow: { required: true, disabled: false },
      removeRow: { required: true, disabled: false },
    };
  }
  getFormValidationRestricted() {
    // Define las validaciones para el estado Borrador
    return {
      cliente: { required: true, disabled: true },
      materia: { required: true, disabled: true },
      planes: { required: true, disabled: true },
      actividades: { required: true, disabled: true },
      divisionPagos: { required: true, disabled: true },
      divisionPagosFecha: { required: true, disabled: true },
      descuento: { required: true, disabled: true },
      addRow: { required: true, disabled: true },
      removeRow: { required: true, disabled: true },
      // Añade más reglas según sea necesario
    };
  }

  async submitCotizacion(formData, id, estado) {
    let response;

    try {
      if (!formData.items || formData.items.length === 0) {
        throw new Error("Debes seleccionar al menos una actividad");
      }
      if (!formData.divisionPagos || formData.divisionPagos.length === 0) {
        throw new Error("No se han configurados los pagos");
      }

      formData.estado = estado;

      if (id) {
        response = await cotizacionService.updateCotizacionById(id, formData);
        return { estado: formData.estado };
      }
      response = await cotizacionService.insertCotizacion(formData);
      return { estado: formData.estado, id: response.data._id };
    } catch (error) {
      throw error;
    }
  }

  downloadPDF(formData) {
    generatePDF(formData);
  }
 
  displayButtons() {}
  canBeDeleted() {
    return true;
  }
}

export class EstadoInicialStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "gray";
    this.nombre = ESTADOS_COTIZACIONES.INICIAL;
  }

  displayButtons() {
    return [
      {
        id: "guardarCotizacion",
        text: "Guardar Cotización",
        module: "cotizaciones",
        action: (formData, id) =>
          super.submitCotizacion(formData, id, ESTADOS_COTIZACIONES.GENERADO),
        color: "blue",
      },
    ];
  }

  getFormValidation() {
    return super.getFormValidation();
  }
}
export class EstadoGeneradoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "blue";
    this.nombre = ESTADOS_COTIZACIONES.GENERADO;
  }

  displayButtons() {
    return [
      {
        id: "actualizarCotizacion",
        text: "Actualizar Cotizacion",
        module: "cotizaciones",
        action: (formData, id) =>
          super.submitCotizacion(formData, id, ESTADOS_COTIZACIONES.GENERADO),
        color: "blue",
      },
      {
        id: "descargarPDF",
        text: "Descargar PDF",
        module: "cotizaciones",
        action: (formData, id) => super.downloadPDF(formData),
        color: "dark",
      },
      {
        id: "aprobarCotizacion",
        text: "Aprobar Cotizacion",
        module: "cotizaciones",
        action: (formData, id) =>
          super.submitCotizacion(formData, id, ESTADOS_COTIZACIONES.APROBADO),
        color: "success",
      },
    ];
  }

  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}
export class EstadoAprobadoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "success";
    this.nombre = ESTADOS_COTIZACIONES.APROBADO;
  }

  displayButtons() {
    return [
      {
        id: "crearCurso",
        module: "cursos",
        text: "Crear Curso",
        action: (formData, id) => this.submitCurso(formData, id),
        color: "success",
      },
      {
        id: "descargarPDF",
        module: "cotizaciones",
        text: "Descargar PDF",
        action: (formData, id) => super.downloadPDF(formData),
        color: "dark",
      },
      {
        id: "rechazarCotizacion",
        module: "cotizaciones",
        text: "Rechazar Cotización",
        action: (formData, id) =>
          super.submitCotizacion(formData, id, ESTADOS_COTIZACIONES.RECHAZADO),
        color: "failure",
      },
    ];
  }

  getFormValidation() {
    return super.getFormValidationRestricted();
  }

  async submitCurso(formData, id) {
    const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO
    for (const item of formData.items) {
      const formattedFormData = {
        cotizacion: id,
        fecha: currentDate,
        materia: item.materia?.value || item.materia,
        cliente: formData.cliente?.value || formData.cliente,
        actividades: item.actividades
          ? item.actividades.map((act) => act.value)
          : [],
      };

      try {
        let response = await cursoService.insertCurso(formattedFormData);
        const insertedId = response.data._id;

        const actividades = item.actividades
          ? item.actividades.map((act) => ({
              actividad: act.value,
              curso: insertedId,
            }))
          : [];
        if (actividades.length > 0) {
          await asignamientoService.insertAsignamiento(actividades);
        }

        response = await cotizacionService.updateCotizacionById(id, {
          estado: ESTADOS_COTIZACIONES.APROBADO_CON_CURSO,
        });
      } catch (error) {
        console.error("Error al insertar curso y asignamientos:", error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    }
    return { estado: ESTADOS_COTIZACIONES.APROBADO_CON_CURSO };
  }

  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}
export class EstadoAprobadoConCursoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "success";
    this.nombre = ESTADOS_COTIZACIONES.APROBADO_CON_CURSO;
  }

  displayButtons() {
    return [
      {
        id: "cerrarCotizacion",
        module: "cotizaciones",
        text: "Cerrar Cotizacion",
        action: (formData, id) =>
          super.submitCotizacion(formData, id, ESTADOS_COTIZACIONES.CERRADO),
        color: "gray",
      },
      {
        id: "descargarPDF",
        module: "cotizaciones",
        text: "Descargar PDF",
        action: (formData, id) => super.downloadPDF(formData),
        color: "dark",
      },
    ];
  }

  getFormValidation() {
    return super.getFormValidationRestricted();
  }
  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}
export class EstadoCerradoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "gray";
    this.nombre = ESTADOS_COTIZACIONES.CERRADO;
  }

  displayButtons() {
    return [
      {
        id: "descargarPDF",
        module: "cotizaciones",
        text: "Descargar PDF",
        action: (formData, id) => super.downloadPDF(formData),
        color: "dark",
      },
    ];
  }

  getFormValidation() {
    return super.getFormValidationRestricted();
  }
  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}
export class EstadoRechazadoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "failure";
    this.nombre = ESTADOS_COTIZACIONES.RECHAZADO;
  }

  displayButtons() {
    return [];
  }

  getFormValidation() {
    return super.getFormValidationRestricted();
  }
  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}
