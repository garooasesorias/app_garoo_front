import React, { useState } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import tipoMateriasService from "../../../services/tipoMateriasService.js";


function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("creada");

  const props = { showToast, setShowToast };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await tipoMateriasService.insertTipoMateria(formData);
      // Lógica tras una inserción exitosa
      setAction("creada");
      setShowToast(true); // Usamos setShowToast directamente
      // Otras acciones después de la creación exitosa...
    } catch (error) {
      console.error('Error al insertar tipo materia:', error);
      // Lógica en caso de error
    } finally {
      setLoading(false);
    }
  };

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
            Tipo de materia {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}
export default Form;
