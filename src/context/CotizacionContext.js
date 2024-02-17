import React, { createContext, useContext, useState } from "react";
import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";

import {
  EstadoInicialStrategy,
  EstadoGeneradoStrategy,
} from "../strategies/EstadoCotizacionStrategy";

const CotizacionContext = createContext();

export const useCotizacion = () => useContext(CotizacionContext);

export const CotizacionProvider = ({ children }) => {
  const [estado, setEstado] = useState(ESTADOS_COTIZACIONES.INICIAL);

  // Aquí iría cualquier lógica para manejar las cotizaciones
  const getEstadoStrategy = () => {
    switch (estado) {
      case ESTADOS_COTIZACIONES.INICIAL:
        return new EstadoInicialStrategy();
      // Implement cases for other states
      case ESTADOS_COTIZACIONES.GENERADO:
        return new EstadoGeneradoStrategy();
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
