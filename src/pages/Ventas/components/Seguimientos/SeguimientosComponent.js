import React from "react";
import { Table } from "flowbite-react";

export default function SeguimientosComponent({ data, onDataChange }) {
  const handleCheckboxChange = (index) => {
    const updatedDivisionPagos = [...data.divisionPagos];
    updatedDivisionPagos[index].estadoVenta = !updatedDivisionPagos[index].estadoVenta;

    // Actualizar la venta completa
    const updatedData = {
      ...data,
      divisionPagos: updatedDivisionPagos,
    };

    // Construir la URL
    const url = `http://localhost:4200/api/v1/ventas/updateVentaById/${data._id}`;

    // Enviar la solicitud de actualización
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          // Obtener los datos actualizados de la venta después de la actualización
          return fetch(`http://localhost:4200/api/v1/ventas/getVentaById/${data._id}`);
        } else {
          console.error("Error al enviar datos a la base de datos:", response.statusText);
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener los datos actualizados de la venta");
        }
      })
      .then((updatedData) => {
        // Actualizar los datos de la venta en el componente padre
        onDataChange(updatedData);
        console.log("Datos de venta actualizados:", updatedData);
      })
      .catch((error) => {
        console.error("Error al actualizar los datos de la venta:", error);
      });
  };

  const handleUrlChange = (event, index) => {
    const updatedDivisionPagos = [...data.divisionPagos];
    updatedDivisionPagos[index].url = event.target.value;
  
    // Actualizar el estado del componente con la nueva URL
    onDataChange({ ...data, divisionPagos: updatedDivisionPagos });
  
    console.log("URL actualizada:", updatedDivisionPagos[index].url);
  };
  

  const handleSaveUrl = (index) => {
    const updatedData = {
      ...data,
      divisionPagos: [...data.divisionPagos], // Clonar para evitar mutación
    };
  
    // Send updated data to server
    fetch(`http://localhost:4200/api/v1/ventas/updateVentaById/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          // Si la solicitud fue exitosa, actualiza el estado con los nuevos datos
          onDataChange(updatedData);
        } else {
          console.error("Error al enviar datos a la base de datos:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la venta:", error);
      });
  };
  

  return (
    <div>
      <h2 className="text-2xl mb-4 font-semibold text-gray-700">
        Datos de venta de {`${data.cliente.nombre}`}
      </h2>
      <Table variant="striped">
        <thead>
          <tr>
            <th className="px-4 py-2">Materia</th>
            <th className="px-4 py-2">Número de división</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Fecha Límite</th>
            <th className="px-4 py-2">URL</th>
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
                  <input
                    type="text"
                    value={division.url}
                    onChange={(e) => handleUrlChange(e, index)}
                  />
                  <button onClick={() => handleSaveUrl(index)} >Guardar</button>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={division.estadoVenta}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
