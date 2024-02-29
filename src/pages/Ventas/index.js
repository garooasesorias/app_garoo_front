import React, { useState, useEffect } from 'react';
import { ESTADOS_COTIZACIONES } from '../../strategies/EstadoCotizacionStrategy'; // Importa los estados de cotizaciones
import ventaService from '../../services/ventasService';

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function fetchVentas() {
      try {
        // Obtén las ventas desde la base de datos o de donde estén almacenadas
        // Aquí puedes utilizar el servicio ventaService o cualquier otro método que obtenga los datos de ventas
        const response = await ventaService.getVentas();
        const ventasData = response.data; // Suponiendo que response.data contiene los datos de las ventas
        setVentas(ventasData);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    }

    fetchVentas();
  }, []); // Se ejecuta solo una vez, al montar el componente

  return (
    <div>
      <h1>Lista de Ventas</h1>
      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>
            <p>Cotización: {venta.cotizacion}</p>
            <p>Fecha: {venta.fecha}</p>
            {/* Agrega aquí el resto de la información de venta que desees mostrar */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ventas;
