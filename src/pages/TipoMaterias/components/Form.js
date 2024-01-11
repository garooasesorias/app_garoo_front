import React, { useRef, useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import tipoMateriasService from "../../../services/tipoMateriasService.js";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado


function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("creada");
  const { id } = useParams();


  const props = { showToast, setShowToast };
  useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
      tipoMateriasService
        .getTipoMateriaById(id)
        .then((response) => {
          setTipoMateria(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el tipo materia:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [id]);

  const setTipoMateria = (tipoMateria) => {
    setFormData({
      nombre: tipoMateria.nombre || "",
      // ...otros campos
    });
  };


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
      let response;

      if (id) {
        // Actualizar tipo materia existente
      console.log("intenta actualizar");
        console.log(formData);
        response = await tipoMateriasService.updateTipoMateriaById(id, formData);
        console.log(response);
        setAction("actualizado");
        props.setShowToast(true, "Tipo Materia actualizado");
      } else {
        // Insertar nuevo tipo materia
        console.log("intenta crear");
        response = await tipoMateriasService.insertTipoMateria(formData);
        props.setShowToast(true, "Tipo Materia creado");
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

const handleResetForm = () => {
  setFormData({
    nombre: ""
  });
};

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <form className="flex max-w-md flex-col gap-4 m-auto" 
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
          {id ? "Actualizar" : "Crear"}
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
