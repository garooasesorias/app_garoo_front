import React, {useState, useEffect}from "react";

import { Button, Label, TextInput } from "flowbite-react";

function Form() {
  
  const [formData, setFormData] = useState({
    identificacion:"",
    nombre: "",
    cargo: "",
    celular: "",
    rol: "",

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {})
      .insertAsesor(formData);
  };
  const handleIdentificacionChange = (e) => {
    const newIdentificacion = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      identificacion: newIdentificacion,
    }));
  };
  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };
  const handleCargoChange = (e) => {
    const newCargo = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      cargo: newCargo,
    }));
  };
  const handleCelularChange = (e) => {
    const newCelular = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      celular: newCelular,
    }));
  };
  const handleRolChange = (e) => {
    const newRol = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      rol: newRol,
    }));
  };
  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="identificacion" value="Identificacion" />
          </div>
          <TextInput
            addon="ID"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleIdentificacionChange}
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
          onChange={handleNombreChange}
          required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="cargo" value="Cargo" />
          </div>
          <TextInput 
         addon="Cargo"
         id="cargo"
         name="cargo"
         value={formData.cargo}
         onChange={handleCargoChange}
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
            value={formData.celular}
            onChange={handleCelularChange}
            required
          />
        </div>
         <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="rol" value="Rol" />
          </div>
          <TextInput 
            addon="&"
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleRolChange}
            required />
        </div> 
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
