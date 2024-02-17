import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";
import cotizacionService from "../services/cotizacionService";

class EstadoCotizacionStrategy {
  constructor() {
    this.colorBadge = "gray";
    this.nombre = "";
  }

  getFormValidationRules() {
    // Define las validaciones para el estado Borrador
    return {
      cliente: { required: true },
      materia: { required: true },
      planes: { required: true },
      actividades: { required: true },
      // Añade más reglas según sea necesario
    };
  }

  async submitCotizacion(formData, id) {
    if (!formData.items || formData.items.length === 0) {
      throw new Error("Debes seleccionar al menos una actividad");
    }
    try {
      formData.estado = ESTADOS_COTIZACIONES.GENERADO;
      await this.submit(formData, id); // Usa 'await' y maneja la promesa correctamente
      return formData.estado;
    } catch (error) {
      throw new Error("Hubo un problema al guardar la cotización");
    }
  }

  downloadPDF(formData) {
    console.log("generando PDF...");
  }

  async submit(formData, id) {
    let response;

    try {
      if (id) {
        response = await cotizacionService.updateCotizacionById(id, formData);
        return response;
      }
      response = await cotizacionService.insertCotizacion(formData);
    } catch (error) {
      throw error;
    }
  }

  displayButtons() {}
  canBeDeleted() {
    return true;
  }
  // getFormValidationRules() {
  //   return {};
  // }
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
        action: (formData, id) => super.submitCotizacion(formData, id),
        color: "blue",
      },
    ];
  }

  getValidationRules() {
    return super.getFormValidationRules();
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
        action: (formData, id) => super.submitCotizacion(formData, id),
        color: "blue",
      },
      {
        id: "descargarPDF",
        text: "Descargar PDF",
        action: (formData, id) => super.downloadPDF(formData),
        color: "dark",
      },
    ];
  }

  // getFormValidationRules() {
  //   // Define las validaciones para el estado Borrador
  //   return {
  //     cliente: { required: true },
  //     materia: { required: true },
  //     planes: { required: true },
  //     actividades: { required: true },
  //     // Añade más reglas según sea necesario
  //   };
  // }
  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}

// Implement similar classes for SENT, APPROVED, REJECTED, MANAGED
