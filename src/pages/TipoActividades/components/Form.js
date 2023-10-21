import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {})
      .insertTipoActividad(formData);
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

  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
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
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
      <Button type="button" color="dark" onClick= {goBack}>
          Volver
        </Button>
    </>
  );
}
export default Form;
