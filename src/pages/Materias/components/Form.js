import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import Loader from '../../../components/Loader.js';
import { HiCheck } from "react-icons/hi";
import axios from 'axios';
import tipoMateriasService from "../../../services/tipoMateriasService.js";
import materiaService from "../../../services/materiasService.js";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado


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
  const { id } = useParams(); // Extrae el id desde la URL


  useEffect(() => {
    setLoading(true);
  
    const fetchTiposMateria = async () => {
      try {
        const tiposMateriaResponse = await tipoMateriasService.getTiposMateria();
        setTiposMateria(tiposMateriaResponse.data);
      } catch (error) {
        console.error("Error fetching tipos de materia:", error);
      }
    };
  
    const fetchMateriaData = async () => {
      if (id) {
        try {
          const materiaResponse = await materiaService.getMateriaById(id);
          const materiaData = materiaResponse.data;
          setFormData({
            nombre: materiaData.nombre || "",
            tipo: materiaData.tipo || "", // Asegúrate de que esto corresponde al _id del tipo de materia
          });
        } catch (error) {
          console.error("Error fetching materia data:", error);
        }
      }
    };
  
    const fetchData = async () => {
      await fetchTiposMateria();
      await fetchMateriaData(); // Esto esperará a que fetchTiposMateria haya terminado
      setLoading(false);
    };
  
    fetchData();
  }, [id]); // Este efecto se ejecutará cuando el componente se monte y cada vez que el id cambie
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let response;
      if (id) {
        // Actualizar la materia existente
        response = await materiaService.updateMateriaById(id, formData);
        setAction("actualizada");
      } else {
        // Crear una nueva materia
        response = await materiaService.insertMateria(formData);
        setAction("creada");
      }
      console.log(response.data);
      props.setShowToast(!props.showToast);
      setLoading(false);
    } catch (error) {
      console.error("Error en la operación:", error);
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
