import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {})
      .insertActividad(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="nombre" />
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
            <Label htmlFor="tipo" value="tipo" />
          </div>
          <TextInput
            addon="Tipo"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="precio" value="precio" />
          </div>
          <TextInput
            addon="$"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
