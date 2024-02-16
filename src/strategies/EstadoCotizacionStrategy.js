import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";

class EstadoCotizacionStrategy {
  constructor() {
    this.colorBadge = "gray";
    this.nombre = "";
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

  saveBorrador(formData) {
    console.log("Guardando borrador", formData);
    // Lógica para guardar el borrador
  }

  saveCotizacion(formData) {
    
  }

  guardar;
  displayButtons() {
    return [
      { label: "Guardar Borrador", action: "submit", color: "gray" },
      { label: "Guardar Cotizacion", action: "submit" },
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
export class EstadoAprobadoStrategy extends EstadoCotizacionStrategy {
  constructor() {
    super();
    this.colorBadge = "success";
    this.nombre = ESTADOS_COTIZACIONES.APROBADO;
  }
  displayButtons() {
    return [
      { label: "Send Button Aprobado", action: "send", color: "" },
      { label: "Edit Button Aprobado", action: "edit", color: "" },
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
