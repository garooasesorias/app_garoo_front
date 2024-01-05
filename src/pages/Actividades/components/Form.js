import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import tiposActividadesService from "../../../services/tiposActividadesService.js";
import actividadesService from "../../../services/actividadesService.js";

function Form(props) {
  const [tiposActividad, setTiposActividad] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tiposActividadesService.getTiposActividad();
        setTiposActividad(data || []); // Asegura que sea un array
      } catch (error) {
        console.error("Error fetching tipos de actividad:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await actividadesService.insertActividad(formData);
      setAction("creada");
      setLoading(false);
      setShowToast(!showToast);
      console.log(response);
    } catch (error) {
      console.error("Error inserting actividad:", error);
      setLoading(false);
    }
  };

  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };

  const handlePrecioChange = (e) => {
    const newPrecio = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      precio: newPrecio,
    }));
  };

  const handleTipoChange = (selectedTipo) => {
    const selectedTipoObj = tiposActividad.find(
      (tipo) => tipo._id === selectedTipo
    );

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

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("creada");

  return (
    <>
      <form className="flex max-w-md flex-col gap-4 m-auto" onSubmit={handleSubmit}>
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
            {Array.isArray(tiposActividad) &&
              tiposActividad.map((tipo) => (
                <option key={tipo._id} value={tipo._id}>
                  {tipo.nombre}
                </option>
              ))}

          </select>
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
            onChange={handlePrecioChange}
            required
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

      {showToast && (
        <Toast style={{ maxWidth: '250px' }} className="Toast" >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Actividad {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}

export default Form;
