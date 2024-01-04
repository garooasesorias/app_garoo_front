import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import Loader from '../../../components/Loader.js';
import { HiCheck } from "react-icons/hi";
import axios from 'axios';
import tipoMateriasService from "../../../services/tipoMateriasService.js";


function Form() {
  const [tiposMateria, setTiposMateria] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
  });
  
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const [action, setAction] = useState("creada");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposMateriaResponse = await tipoMateriasService.getTiposMateria();
        setTiposMateria(tiposMateriaResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('/materias/insertMateria', formData);
      setLoading(false);
      props.setShowToast(!props.showToast);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error inserting materia:", error);
    }
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
      {/* <h1 className="PagesTitles">Formulario Materias</h1> */}
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
            Materia {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}



    </>
  );
}

export default Form;
