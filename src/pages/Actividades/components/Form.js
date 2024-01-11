import React, { useRef, useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { useParams } from "react-router-dom"; 
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import tiposActividadesService from "../../../services/tiposActividadesService.js";
import actividadesService from "../../../services/actividadesService.js";

function Form() {
  const formRef = useRef();
  const [tiposActividad, setTiposActividad] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const { id } = useParams(); // Extrae el id desde la URL

  const [action, setAction] = useState("creada");
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    precio: "",
  });

  useEffect(() => {
    // Función asincrónica para obtener tipos de actividad
    const obtenerTiposActividad = async () => {
      try {
        const data = await tiposActividadesService.getTiposActividad();
        // console.log("Tipos de actividad obtenidos:", data);
        setTiposActividad(data?.data || []); // Asegura que sea un array
      } catch (error) {
        console.error("Error al obtener tipos de actividad:", error);
        // Puedes manejar el error aquí según tus necesidades
      }
    };
  
    console.log(id);
  
    // Llama a la función para obtener tipos de actividad siempre
    obtenerTiposActividad();
  
    if (id) {
      setLoading(true);
      actividadesService
        .getActividadById(id)
        .then((response) => {
          setActividad(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener la actividad:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    }
  }, [id]);

  const setActividad = (Actividad) => {
    setFormData({
      nombre: Actividad.nombre || "",
      tipo: Actividad.tipo || "",
      precio: Actividad.precio || "",
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await tiposActividadesService.getTiposActividad();
  //       console.log("Tipos de actividad obtenidos:", data);
  //       setTiposActividad(data?.data || []); // Asegura que sea un array
  //     } catch (error) {
  //       console.error("Error fetching tipos de actividad:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await actividadesService.insertActividad(formData);
  //     setAction("creada");
  //     setLoading(false);
  //     setShowToast(!showToast);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error inserting actividad:", error);
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (id) {
        // Actualizar cliente existente
        console.log("intenta actualizar");
        console.log(formData);
        response = await actividadesService.updateActividadById(id, formData);
        console.log(response);
        setAction("actualizada");
        props.setShowToast(true, "Tipo Actividad Actualizado");
      } else {
        // Insertar nuevo cliente
        console.log("intenta crear");
        response = await actividadesService.insertActividad(formData);
        props.setShowToast(true, "Tipo Actividad creado");
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
    // Configurar el estado solo si se selecciona un tipo válido
    setFormData((prevData) => ({
      ...prevData,
      tipo: selectedTipo || "", // Asegura que el valor no sea nulo
    }));
  };

  const handleTipoSelect = (e) => {
    const selectedValue = e.target.value;
    // Llamamos a handleTipoChange con el valor seleccionado
    handleTipoChange(selectedValue);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
            <form
        ref={formRef}
        className="flex max-w-md flex-col gap-4 m-auto"
        onSubmit={handleSubmit}
      >
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
