import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import estadosCotizacionesService from "../../../services/estadosCotizacionesService.js";
import { useParams } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("creado");
  const { id } = useParams(); // Extrae el id desde la URL si está disponible

  useEffect(() => {
    console.log(id);
    if (id) {
      setLoading(true);
      estadosCotizacionesService.getEstadoCotizacionById(id)
        .then((response) => {
          const nombre = response.data.nombre || "";
          setFormData({ nombre });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el estado de cotización:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (id) {
        // Actualizar el estado de cotización existente
        response = await estadosCotizacionesService.updateEstadoCotizacionById(id, formData);
        setAction("actualizado");
      } else {
        // Crear un nuevo estado de cotización
        response = await estadosCotizacionesService.insertEstadoCotizacion(formData);
        setAction("creado");
      }
      console.log(response);
      setShowToast(true);
      setLoading(false);
    } catch (error) {
      console.error("Error en la operación:", error);
      setLoading(false);
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

  return (
    <>
      <form className="flex max-w-md flex-col gap-4 m-auto" onSubmit={handleSubmit}>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Nombre" />
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

      {showToast && (
        <Toast style={{ maxWidth: '250px' }} className="Toast" >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Estado de cotización {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}

export default Form;
