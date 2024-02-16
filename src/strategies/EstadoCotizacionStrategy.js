import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";
import cotizacionService from "../services/cotizacionService";

class EstadoCotizacionStrategy {
  constructor() {
    this.colorBadge = "gray";
    this.nombre = "";
  }

  async submitCotizacion(formData, id) {
    if (!formData.items || formData.items.length === 0) {
      throw new Error("Debes seleccionar al menos una actividad");
    }
    try {
      await this.submit(formData, id); // Usa 'await' y maneja la promesa correctamente
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
  getFormValidationRules() {
    return {};
  }
}

export class EstadoBorradorStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "gray";
    this.nombre = ESTADOS_COTIZACIONES.BORRADOR;
  }

  async submitBorrador(formData, id) {
    try {
      return await super.submit(formData, id);
    } catch (error) {
      throw error;
    } // Lógica para guardar el borrador
  }

  displayButtons() {
    return [
      {
        id: "guardarBorrador",
        text: "Guardar Borrador",
        action: (formData, id) => this.submitBorrador(formData, id),
        color: "gray",
      },
      {
        id: "guardarCotizacion",
        text: "Guardar Cotización",
        action: (formData, id) => super.submitCotizacion(formData, id),
        color: "blue",
      },
    ];
  }

  getFormValidationRules() {
    // Define las validaciones para el estado Borrador
    return {
      cliente: { required: true },
      // Añade más reglas según sea necesario
    };
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
        text: "descargar PDF",
        action: (formData, id) => super.downloadPDF(formData),
        color: "blue",
      },
    ];
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
  canBeDeleted() {
    return false; // No se puede eliminar si está aprobada
  }
}

// Implement similar classes for SENT, APPROVED, REJECTED, MANAGED
