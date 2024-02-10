import React, { useRef, useState, useEffect } from "react";
import clienteService from "../../../services/clienteService.js";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import Loader from "../../../components/Loader.js";
import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function Form() {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    referencia: "",
    cedula: "",
    nombre: "",
    fechaNacimiento: "",
    genero: "",
    usuario: "",
    contrasena: "",
    correo: "",
    celular: "",
    carrera: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const { id } = useParams(); // Extrae el id desde la URL

  const [action, setAction] = useState("creado"); // Nuevo estado para saber si estamos creando o actualizando

  // Si hay un id, obtén los datos del cliente por el id
  useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
      clienteService
        .getClienteById(id)
        .then((response) => {
          const date = parseISO(response.data.fechaNacimiento);
          const zonedDate = utcToZonedTime(date, "UTC");
          const formattedDate = format(zonedDate, "yyyy-MM-dd");

          console.log(response.data.fechaNacimiento); // 2025-02-01T00:00:00.000Z
          console.log(formattedDate); // 2025-02-01
          setCliente(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el cliente:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [id]);

  const setCliente = (cliente) => {
    setFormData({
      referencia: cliente.referencia || "",
      cedula: cliente.cedula || "",
      nombre: cliente.nombre || "",
      fechaNacimiento: cliente.fechaNacimiento
        ? format(
          utcToZonedTime(parseISO(cliente.fechaNacimiento), "UTC"),
          "yyyy-MM-dd"
        )
        : "",
      genero: cliente.genero || "",
      usuario: cliente.usuario || "",
      contrasena: cliente.contrasena || "",
      usuario: cliente.usuario || "",
      correo: cliente.correo || "",
      celular: cliente.celular || "",
      carrera: cliente.carrera || "",
      // ...otros campos
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (id) {
        // Actualizar cliente existente
        response = await clienteService.updateClienteById(id, formData);
        setAction("actualizado"); // Esto se mostrará en el Toast si tiene éxito
      } else {
        // Insertar nuevo cliente
        response = await clienteService.insertCliente(formData);
        setAction("creado"); // Esto se mostrará en el Toast si tiene éxito
      }

      // Muestra el toast de éxito
      setShowToast(true);
    } catch (error) {
      console.error("Error en la operación:", error);

      // Aquí se define el mensaje de error basado en el error capturado
      setAction("no pudo ser creado/datos duplicados"); // Cambia este texto según sea necesario
      setShowToast(true); // Asegúrate de que se muestre el Toast
    } finally {
      setLoading(false);
      // Aquí ocultamos el Toast después de un tiempo, independientemente de si fue éxito o error
      setTimeout(() => {
        setShowToast(false);
      }, 5000);

      if (!id) {
        handleResetForm();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goBack = () => {
    window.history.back();
  };

  const handleResetForm = () => {
    setFormData({
      referencia: "",
      cedula: "",
      nombre: "",
      fechaNacimiento: "",
      genero: "",
      usuario: "",
      contrasena: "",
      correo: "",
      celular: "",
      carrera: "",
    });
  };

  return (
    <>
      <form
        ref={formRef}
        className="flex max-w-md flex-col gap-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="referencia" value="Referencia" />
          </div>
          <TextInput
            addon="ID"
            id="referencia"
            name="referencia"
            value={formData.referencia}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="referencia" value="Cédula" />
          </div>
          <TextInput
            addon="Cédula"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Nombre" />
          </div>
          <TextInput
            addon="Nombre"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="fechaNacimiento" value="Fecha Nacimiento" />
          </div>
          <TextInput
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="genero" value="Género" />
          </div>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="" disabled>
              Selecciona un género
            </option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
          </select>
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="usuario" value="Usuario" />
          </div>
          <TextInput
            addon="Usuario"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="contrasena" value="Contraseña" />
          </div>
          <TextInput
            addon="Contraseña"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="correo" value="Correo" />
          </div>
          <TextInput
            addon="@"
            id="correo"
            name="correo"
            placeholder="mail@mail.com"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="celular" value="Celular" />
          </div>
          <TextInput
            addon="#"
            id="celular"
            name="celular"
            placeholder="3134599875"
            value={formData.celular}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="carrera" value="Carrera" />
          </div>
          <TextInput
            addon="Carrera"
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <Button type="submit" color="dark" onClick={handleReset}>
          Submit
        </Button> */}
        <Button type="submit" color="dark">
          {id ? "Actualizar" : "Crear"}
        </Button>
      </form>

      <Button
        type="button"
        color="dark"
        onClick={goBack}
        className="m-auto mt-4"
      >
        Volver
      </Button>

      <div className="LoaderContainerForm">{loading ? <Loader /> : null}</div>
      {showToast && (
        <Toast style={{ maxWidth: "250px" }} className="Toast">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Cliente {action} {/* Aquí se usa el estado `action` para mostrar el mensaje */}
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}

    </>
  );
}
export default Form;
