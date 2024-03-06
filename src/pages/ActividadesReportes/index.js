import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";



import actividadesReporteService from "../../services/actividadesReporteService.js";

function ActividadesReportes() {
  const [cursos, setCursos] = useState([]);
  const [asignamientos, setAsignamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fecha: "",
    materia: "",
    cliente: "",
    actividad: "",
    asesor: "",
    estadoAdm: "",
    fechaVencimiento: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {

        const dataReporte = await actividadesReporteService.getActividadesReporte();
        const filteredData = applyFilters(dataReporte);
        setAsignamientos(filteredData);
        setLoading(false);
              } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);
  const applyFilters = (dataReporte) => {
    let filteredData = Array.isArray(dataReporte.data) ? dataReporte.data : [];
  
    // Filtrar por fecha
    
    if (filters.fecha) {
      filteredData = filteredData.filter(asignamiento => asignamiento.curso.fecha.toLowerCase().includes(filters.fecha.toLowerCase()));
    }
    // Filtrar por materia
    if (filters.materia) {
      filteredData = filteredData.filter(asignamiento => asignamiento.curso.materia.nombre.toLowerCase().includes(filters.materia.toLowerCase()));
    }
  
    // Filtrar por cliente
    if (filters.cliente) {
      filteredData = filteredData.filter(asignamiento => asignamiento.curso.cliente.nombre.toLowerCase().includes(filters.cliente.toLowerCase()));
    }
  
    // Filtrar por actividad
    if (filters.actividad) {
      filteredData = filteredData.filter(asignamiento => asignamiento.actividad.nombre.toLowerCase().includes(filters.actividad.toLowerCase()));
    }
  
    // Filtrar por asesor
    if (filters.asesor) {
      filteredData = filteredData.filter(asignamiento => asignamiento.asesor.nombre.toLowerCase().includes(filters.asesor.toLowerCase()));
    }
  
    // Filtrar por estadoAdm
    if (filters.estadoAdm) {
      filteredData = filteredData.filter(asignamiento => asignamiento.operaciones.some(operacion => operacion.estado?.nombre.toLowerCase().includes(filters.estadoAdm.toLowerCase())));
    }
  
    // Filtrar por fechaVencimiento
    if (filters.fechaVencimiento) {
      filteredData = filteredData.filter(asignamiento => asignamiento.fechaVencimiento && asignamiento.fechaVencimiento.toLowerCase().includes(filters.fechaVencimiento.toLowerCase()));
    }
    
  
    return filteredData || [];
  };
  
  // Filtro que funciona perfecto antes del cambio del otro filtro

  // const applyFilters = (dataReporte) => {
  //   let filteredData = Array.isArray(dataReporte.data) ? dataReporte.data : [];

  //   if (filters.fecha) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.curso.fecha === filters.fecha);
  //   }
  //   if (filters.materia) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.curso.materia.nombre === filters.materia);
  //   }
  //   if (filters.cliente) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.curso.cliente.nombre === filters.cliente);
  //   }
  //   if (filters.actividad) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.actividad.nombre === filters.actividad);
  //   }
  //   if (filters.asesor) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.asesor.nombre === filters.asesor);
  //   }
  //   if (filters.estadoAdm) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.operaciones.some(operacion => operacion.estado.nombre === filters.estadoAdm));
  //   }
  //   if (filters.fechaVencimiento) {
  //     filteredData = filteredData.filter(asignamiento => asignamiento.fechaVencimiento === filters.fechaVencimiento);
  //   }

  //   return filteredData || [];
  // };
  const renderFilterInput = (label, filterKey) => (
    <div className="flex-1 px-2 mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={filters[filterKey]}
        onChange={(e) =>
          setFilters({ ...filters, [filterKey]: e.target.value })
        }
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );


  return (
    <div className="flex flex-col space-y-6">
      <h1 className="PagesTitles">Reporte Actividades</h1>
      <div className="w-full">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">

            {renderFilterInput("Fecha", "fecha")}
            {renderFilterInput("Materia", "materia")}
            {renderFilterInput("Cliente", "cliente")}
            {renderFilterInput("Actividad", "actividad")}
            {renderFilterInput("Asesor", "asesor")}
            {renderFilterInput("Astado Adm", "estadoAdm")}
            {/* {renderFilterInput("Fecha Vencimiento", "fechaVencimiento")} */}
            
          </div>
        </Card>
      </div>
      <div>
        <Table className="w-full">
          <Table.Head>
            <Table.HeadCell>Fecha Curso</Table.HeadCell>
            <Table.HeadCell>Materia</Table.HeadCell>
            <Table.HeadCell>Cliente</Table.HeadCell>
            <Table.HeadCell>Actividad</Table.HeadCell>
            <Table.HeadCell>Asesor</Table.HeadCell>
            <Table.HeadCell>Estado Adm</Table.HeadCell>
            <Table.HeadCell>Fecha Vencimiento</Table.HeadCell>
            
          </Table.Head>
          <Table.Body>
            {asignamientos && asignamientos.length > 0 && asignamientos.map((asignamiento) => (
              <Table.Row key={asignamiento._id}>
                <Table.Cell>{asignamiento.curso.fecha ? new Date(asignamiento.curso.fecha).toLocaleDateString() : ''}</Table.Cell>
                <Table.Cell>{asignamiento.curso.materia ? asignamiento.curso.materia.nombre : ''}</Table.Cell>
                <Table.Cell>{asignamiento.curso.cliente ? asignamiento.curso.cliente.nombre : ''}</Table.Cell>
                <Table.Cell>{asignamiento.actividad ? asignamiento.actividad.nombre : ''}</Table.Cell>
                <Table.Cell>{asignamiento.asesor ? asignamiento.asesor.nombre : ''}</Table.Cell>
                <Table.Cell>{asignamiento.operaciones.length > 0 ? asignamiento.operaciones[0]?.estado?.nombre: ''}</Table.Cell>
                <Table.Cell>{asignamiento.fechaVencimiento ? new Date(asignamiento.fechaVencimiento).toLocaleDateString() : ''}</Table.Cell>
              </Table.Row>
            ))}



          </Table.Body>
         
        </Table>
      </div>
    </div>
  );

}

export default ActividadesReportes;
