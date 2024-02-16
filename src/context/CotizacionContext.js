import React, { createContext, useContext, useState } from "react";
import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";

import {
  EstadoBorradorStrategy,
  EstadoAprobadoStrategy,
} from "../strategies/EstadoCotizacionStrategy";

const CotizacionContext = createContext();

export const useCotizacion = () => useContext(CotizacionContext);

export const CotizacionProvider = ({ children }) => {
  const [estado, setEstado] = useState(ESTADOS_COTIZACIONES.BORRADOR);

  // Aquí iría cualquier lógica para manejar las cotizaciones
  const getEstadoStrategy = () => { 
    switch (estado) {
      case ESTADOS_COTIZACIONES.BORRADOR:
        return new EstadoBorradorStrategy();
      // Implement cases for other states
      case ESTADOS_COTIZACIONES.APROBADO:
        return new EstadoAprobadoStrategy();
      default:
        throw new Error(`Unhandled state: ${estado}`);
    }
  };

  return (
    <CotizacionContext.Provider
      value={{ estado, setEstado, getEstadoStrategy }}
    >
      {children}
    </CotizacionContext.Provider>
  );
};
