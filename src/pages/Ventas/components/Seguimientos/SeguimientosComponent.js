// components/SeguimientosComponent.js

import React from "react";
import { Table } from "flowbite-react"; // Reemplaza 'flowbite-react' con tu biblioteca de componentes preferida

export default function SeguimientosComponent({
  data,
}) {
  console.log(data); // Imprime la estructura de 'data' en la consola del navegador

  return (
    <div>
      <h2 className="text-2xl mb-4 font-semibo-ld text-gray-700">
        Datos de venta de {`${data.cliente.nombre}`}
      </h2>
      <Table variant="striped">
        <thead>
          <tr>
            <th className="px-4 py-2">Materia</th>
            <th className="px-4 py-2">Número de división</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Fecha Límite</th>
            <th className="px-4 py-2">Estado de venta</th>
          </tr>
        </thead>
        <tbody>
          {data.divisionPagos &&
            data.divisionPagos.map((division, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{data.materia.nombre}</td>
                <td className="px-4 py-2">{division.numeroDivision}</td>
                <td className="px-4 py-2">{division.monto}</td>
                <td className="px-4 py-2">
                  {new Date(division.fechaLimite).toLocaleDateString("es-ES")}
                </td>
                <td className="px-4 py-2">
                  <select>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
