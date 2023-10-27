import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import Select from "react-select";

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    actividades: [],
  });
  const [actividades, setActividades] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const [action, setAction] = useState("creado");

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
    setLoading(true);

    const formattedData = {
      ...formData,
      actividades: formData.actividades.map((activity) => ({ $oid: activity })),
    };

    google.script.run
      .withSuccessHandler((response) => {
        setAction("creado"); 
        setLoading(false);
      props.setShowToast(!props.showToast);
      })
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
      <form className="flex max-w-md flex-col gap-4 m-auto" onSubmit={handleSubmit}>
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
      <Button type="button" color="dark" onClick={goBack} className="m-auto mt-4">
        Volver
      </Button>

      <div className="LoaderContainerForm">
      {loading ? <Loader /> : null}
      </div>

      {props.showToast && (
        <Toast style={{ maxWidth: '250px' }} className="Toast" >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Plan {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}

export default Form;
