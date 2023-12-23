import React, { useState, useEffect, useRef } from "react";
import especialidadService from "../../../services/especialidadService.js";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';


function Form() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const { id } = useParams(); // Extrae el id desde la URL

  const [action, setAction] = useState("creada");

  useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
      especialidadService
        .getEspecialidadById(id)
        .then((response) => {
        
          setEspecialidad(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el Especialidad:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [id]);


  const setEspecialidad = (especialidad) => {
    setFormData({
      nombre: especialidad.nombre || "",
      
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (id) {
        // Actualizar especialidad existente
        console.log(formData);
        response = await especialidadService.updateEspecialidadById(id, formData);
        console.log(response);
        setAction("actualizado");
        props.setShowToast(true, "Especialidad actualizado");
      } else {
        // Insertar nuevo especialidad
        console.log("intenta crear");
        response = await especialidadService.insertEspecialidad(formData);
        props.setShowToast(true, "especialidad creado");
      }

      console.log(response);
      setLoading(false);
      setTimeout(() => {
        props.setShowToast(false);
      }, 5000);

      if (!id) {
        handleResetForm();
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      setLoading(false);
      props.setShowToast(true, "Error en la operación");
      setTimeout(() => {
        props.setShowToast(false);
      }, 5000);
    }
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

  const handleResetForm = () => {
    setFormData({
    
      nombre: "",
      
    });
  };
  

  return (
    <>
      <form 
      ref={formRef} 
      className="flex max-w-md flex-col gap-4 m-auto" 
      onSubmit={handleSubmit}>

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
            Especialidad {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}
export default Form;
