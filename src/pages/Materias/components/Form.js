import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";

function Form() {
  const [tiposMateria, setTiposMateria] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
  });

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setTiposMateria(data);
        })
        .getTiposMateria();
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {
        alert("Éxito");
        console.log(response);
      })
      .insertMateria(formData);
  };

  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };

  const handleTipoChange = (selectedTipo) => {
    console.log("Selected Tipo:", selectedTipo);

    const selectedTipoObj = tiposMateria.find(
      (tipo) => tipo._id === selectedTipo
    );

    console.log("Selected Tipo Object:", selectedTipoObj);

    setFormData((prevData) => ({
      ...prevData,
      tipo: selectedTipoObj ? selectedTipoObj._id : "",
    }));
  };

  const handleTipoSelect = (e) => {
    const selectedValue = e.target.value;
    handleTipoChange(selectedValue);
  };

  const goBack = () => {
    
    window.history.back();
  };

  return (
    <>
      <h1 className="PagesTitles">Formulario Materias</h1>
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
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="tipo" value="tipo" />
          </div>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleTipoSelect}
            required
          >
            <option value="">Selecciona un tipo</option>
            {tiposMateria.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
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
