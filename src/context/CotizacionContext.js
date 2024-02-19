import React, { createContext, useContext, useState } from "react";
import ESTADOS_COTIZACIONES from "../constants/CotizacionesStates";

import {
  EstadoInicialStrategy,
  EstadoGeneradoStrategy,
  EstadoAprobadoStrategy,
  EstadoAprobadoConCursoStrategy,
  EstadoCerradoStrategy,
  EstadoRechazadoStrategy,
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
      case ESTADOS_COTIZACIONES.APROBADO:
        return new EstadoAprobadoStrategy();
      case ESTADOS_COTIZACIONES.APROBADO_CON_CURSO:
        return new EstadoAprobadoConCursoStrategy();
      case ESTADOS_COTIZACIONES.CERRADO:
        return new EstadoCerradoStrategy();
      case ESTADOS_COTIZACIONES.RECHAZADO:
        return new EstadoRechazadoStrategy();
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
