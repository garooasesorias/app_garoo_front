import React, { useState, useEffect } from "react";
import { Table, Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Loader from '../../components/Loader.js';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    referencia: "",
    cedula: "",
    nombre: "",
    fechaNacimiento: "",
    genero: "",
    usuario: "",
    contrasena: "",
    celular: "",
    correo: "",
    carrera: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
      .withSuccessHandler((data) => {
          console.log(data);
          setClientes(data);
          setLoading(false);
        })
        .getClientes();
        
    };

    fetchData();
  }, []);

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

  const filteredClientes = clientes.filter((cliente) => {
    return (
      (!filters.referencia ||
        cliente.referencia
          .toLowerCase()
          .includes(filters.referencia.toLowerCase())) &&
      (!filters.nombre ||
        cliente.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      (!filters.fechaNacimiento ||
        cliente.fechaNacimiento
          .toLowerCase()
          .includes(filters.fechaNacimiento.toLowerCase())) &&
      (!filters.genero ||
        cliente.genero.toLowerCase().includes(filters.genero.toLowerCase())) &&
      (!filters.usuario ||
        cliente.usuario
          .toLowerCase()
          .includes(filters.usuario.toLowerCase())) &&
      (!filters.celular ||
        cliente.celular
          .toLowerCase()
          .includes(filters.celular.toLowerCase())) &&
      (!filters.correo ||
        cliente.correo
          ?.toLowerCase()
          .includes(filters.correo?.toLowerCase())) &&
      (!filters.carrera ||
        cliente.carrera?.toLowerCase().includes(filters.carrera?.toLowerCase()))
    );
  });

  return (
    <>
      <h1 className="PagesTitles">Clientes</h1>
      <div className="w-full mb-3">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filtros
          </h5>
          <div className="flex flex-wrap -mx-2">
            {renderFilterInput("Referencia", "referencia")}
            {renderFilterInput("Nombre de Cliente", "nombre")}
            {renderFilterInput("Fecha Nacimiento", "fechaNacimiento")}
            {renderFilterInput("Género", "genero")}
            {renderFilterInput("Usuario", "usuario")}
            {renderFilterInput("Celular", "celular")}
            {renderFilterInput("Correo", "correo")}
            {renderFilterInput("Carrera", "carrera")}
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
        }}
      >
        <Link to="/formClientes">
          <Button className="shadow mb-5" color="success">
            Crear Cliente +
          </Button>
        </Link>
      </div>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Referencia</Table.HeadCell>
          <Table.HeadCell>Cédula</Table.HeadCell>
          <Table.HeadCell>Nombre de Cliente</Table.HeadCell>
          <Table.HeadCell>Fecha de Nacimiento</Table.HeadCell>
          <Table.HeadCell>Género</Table.HeadCell>
          <Table.HeadCell>Usuario</Table.HeadCell>
          <Table.HeadCell>Contraseña</Table.HeadCell>
          <Table.HeadCell>Celular</Table.HeadCell>
          <Table.HeadCell>Correo</Table.HeadCell>
          <Table.HeadCell>Carrera</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredClientes &&
            filteredClientes.map((cliente) => (
              <Table.Row
                key={cliente._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cliente.id}
              </Table.Cell> */}
                <Table.Cell>{cliente.referencia}</Table.Cell>
                <Table.Cell>{cliente.cedula}</Table.Cell>
                <Table.Cell>{cliente.nombre}</Table.Cell>
                <Table.Cell>{cliente.fechaNacimiento}</Table.Cell>
                <Table.Cell>{cliente.genero}</Table.Cell>
                <Table.Cell>{cliente.usuario}</Table.Cell>
                <Table.Cell>{cliente.contrasena}</Table.Cell>
                <Table.Cell>{cliente.celular}</Table.Cell>
                <Table.Cell>{cliente.correo}</Table.Cell>
                <Table.Cell>{cliente.carrera}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/formClientes/${cliente._id}`} // Assuming you have an edit route
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
            <div className="LoaderContainer">
            {loading ? <Loader /> : null}
            </div>
    </>
  );
}

export default Clientes;
