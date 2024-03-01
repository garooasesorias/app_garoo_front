import React, { useState, useEffect } from 'react';
import { Tabs } from 'flowbite-react';
import Select from 'react-select';
import Loader from '../../components/Loader.js';
import ventasService from '../../services/ventasService.js';

// Descomenta este código cuando tengas el componente SeguimientosComponent
import SeguimientosComponent from './components/Seguimientos/SeguimientosComponent.js';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await ventasService.getVentas();
        if (!response.ok) {
          const errorData = await response;
          setErrorMessage(errorData.message || 'Error al cargar las ventas.');
        } else {
          const data = await response;
          if (data.ok) {
            setVentas(data.data);
          } else {
            setErrorMessage(data.message || 'Error desconocido');
          }
        }
      } catch (err) {
        setErrorMessage(
          `${err.response.data.message || err.message || 'Error desconocido'}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container p-6">
      <h1 className="PagesTitles">Ventas</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {loading && (
        <div className="LoaderContainer mt-4">
          <Loader />
        </div>
      )}
      {!loading && !errorMessage && (
        <>
          <div className="flex">
            <aside className="p-3 shadow mr-3">
              <h2 className="text-xl mb-3 font-semibold text-gray-600">
                Lista de Ventas
              </h2>
              <ul className="space-y-2">
                {ventas.length > 0 &&
                  ventas.map((venta, index) => (
                    <div key={venta._id}>
                      <li
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => setSelectedVenta(venta)}
                      >
                        {venta.cliente && <strong>Cliente:</strong>} {venta.cliente && venta.cliente.nombre}
                        <br />
                        {venta.fecha && <strong>Fecha:</strong>} {venta.fecha && new Date(venta.fecha).toLocaleDateString()}
                        {/* Agregar más información aquí */}
                      </li>
                      {index < ventas.length - 1 && <hr style={{ borderWidth: '1px', borderColor: 'gray' }} />} {/* Agrega una línea solo si no es el último elemento */}
                    </div>
                  ))}
              </ul>
            </aside>

            <main className="w-full">
              {selectedVenta?.fecha && (
                <Tabs.Group aria-label="Tabs with underline" style="underline">
                  <Tabs.Item title="Seguimientos">
                    <SeguimientosComponent
                      data={selectedVenta}
                      materia={selectedVenta.materia}
                      divisionPagos={selectedVenta.divisionPagos}
                    />
                  </Tabs.Item>
                  {/* Añadir más pestañas para otros componentes de venta */}
                </Tabs.Group>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default Ventas;