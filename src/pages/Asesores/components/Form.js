import React, {useState}from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

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
            <Label htmlFor="identificacion" value="Identificacion" />
          </div>
          <TextInput
            addon="ID"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleInputChange}
            required
          />
        </div>
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
            <Label htmlFor="cargo" value="cargo" />
          </div>
          <TextInput 
         addon="Cargo"
         id="cargo"
         name="cargo"
         value={formData.cargo}
         onChange={handleInputChange}
          required
           />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="celular" value="celular" />
          </div>
          <TextInput
            addon="#"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
