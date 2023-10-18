import React, { useRef, useState } from "react";
import React, { useRef } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import React, { useRef } from "react";

function Form() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    identificacion: "",
    nombre: "",
    correo: "",
    celular: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
      })
      .insertCliente(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (
      formData.identificacion !== "" &&
      formData.nombre !== "" &&
      formData.correo !== "" &&
      formData.celular !== ""
    ) {
      formRef.current.reset();
      setFormData({
        identificacion: "",
        nombre: "",
        correo: "",
        celular: "",
      });
      alert("Usuario creado con exito");
    }
  };

  return (
    <>
      <form
        ref={formRef}
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="identificacion" value="Identificacion" />
          </div>
          <TextInput
            addon="ID"
            id="identificacion"
            name="identificacion"
            placeholder="123456789"
            value={formData.identificacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Username" />
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
            <Label htmlFor="correo" value="correo" />
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
        <Button type="submit" color="dark" onClick={handleReset}>
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
