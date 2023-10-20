import React, { useRef, useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

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
  const props = { showToast, setShowToast };

  const { id } = useParams(); // Extrae el id desde la URL

  const [action, setAction] = useState("created"); // Nuevo estado para saber si estamos creando o actualizando

  // Si hay un id, obtén los datos del cliente por el id
  useEffect(() => {
    console.log(id);
    if (id) {
      google.script.run
        .withSuccessHandler((data) => {
          setCliente(data[0]);
        })
        .getClienteById(id);
    }
  }, [id]);

  const setCliente = (cliente) => {
    setFormData({
      referencia: cliente.referencia || "",
      cedula: cliente.cedula || "",
      nombre: cliente.nombre || "",
      fechaNacimiento: cliente.fechaNacimiento || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Si hay un ID, actualizamos el cliente en lugar de insertar uno nuevo
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setAction("updated"); // Establecemos la acción a 'actualizado'
          props.setShowToast(!props.showToast);
        })
        .updateClienteById(id, formData); // Envia el ID y los datos del formulario
    } else {
      // Si no hay un ID, insertamos un nuevo cliente
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
          setAction("created"); // Establecemos la acción a 'creado'
          props.setShowToast(!props.showToast);
        })
        .insertCliente(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleReset = () => {
  //   if (
  //     formData.referencia !== "" &&
  //     formData.nombre !== "" &&
  //     formData.correo !== "" &&
  //     formData.celular !== ""
  //   ) {
  //     formRef.current.reset();
  //     setFormData({
  //       referencia: "",
  //       nombre: "",
  //       correo: "",
  //       celular: "",
  //     });
  //     // alert("Usuario creado con exito");
  //   }
  // };

  return (
    <>
      {props.showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Cliente {action} con Éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
      <form
        ref={formRef}
        className="flex max-w-md flex-col gap-4"
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
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
