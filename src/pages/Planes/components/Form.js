import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Select from "react-select";

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    actividades: [],
  });
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setActividades(data);
        })
        .getActividades();
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      actividades: formData.actividades.map((activity) => ({ $oid: activity })),
    };

    google.script.run
      .withSuccessHandler((response) => {})
      .insertPlan(formattedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActividadesChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      actividades: selectedOptions.map((option) => option.value),
    }));
  };

  const selectedOptions = actividades.filter((actividad) =>
    formData.actividades.includes(actividad._id)
  );

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
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="precio" value="precio" />
          </div>
          <TextInput
            addon="@"
            id="precio"
            name="precio"
            placeholder="300"
            value={formData.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="celular" value="Actividades" />
          </div>
          <Select
            id="actividades"
            name="actividades"
            options={actividades.map((actividad) => ({
              label: actividad.nombre,
              value: actividad._id,
            }))}
            isMulti
            value={selectedOptions.map((actividad) => ({
              label: actividad.nombre, // Display activity names instead of IDs
              value: actividad._id,
            }))}
            onChange={handleActividadesChange}
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
