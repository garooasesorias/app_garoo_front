import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';
import Select from "react-select";
import planesService from '../../../services/planesService'; // Asegúrate de importar tu servicio de planes
import actividadesService from '../../../services/actividadesService'; // Importa el servicio de actividades
import { useParams } from "react-router-dom"; // Importa si estás usando react-router

function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    actividades: "",
  });
  const [actividadesOptions, setActividadesOptions] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };
  const [action, setAction] = useState("creado");
  const { id } = useParams(); // Extrae el id desde la URL si es necesario

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const actividadesResponse = await actividadesService.getActividades();
        const actividadesData = actividadesResponse.data.map(a => ({
          label: a.nombre,
          value: a._id
        }));
        setActividadesOptions(actividadesData);
  
        // Si no hay un 'id', significa que estamos creando un nuevo plan, no editando uno existente.
        if (!id) {
          setFormData(prevFormData => ({
            ...prevFormData,
            actividades: [] // Asegurarse de que se inicializa como un array vacío para la creación
          }));
        }
  
        return actividadesData; // Devuelve esto para usarlo en el siguiente paso
      } catch (error) {
        console.error("Error fetching actividades:", error);
      }
    };
  
    const fetchPlanData = async (actividadesData) => {
      if (id) {
        try {
          const planResponse = await planesService.getPlanById(id);
          const selectedActividades = planResponse.data.actividades.map(a => {
            return actividadesData.find(option => option.value === a) || a;
          }).filter(a => a); // Filtrar elementos falsy
          setFormData({
            nombre: planResponse.data.nombre || "",
            precio: planResponse.data.precio || "",
            actividades: selectedActividades
          });
        } catch (error) {
          console.error("Error fetching plan data:", error);
        }
      }
    };
  
    // Llama a fetchActividades y luego a fetchPlanData con los resultados.
    fetchActividades().then(actividadesData => {
      if (id) {
        fetchPlanData(actividadesData);
      }
    }).finally(() => setLoading(false));
  }, [id]);
    
      

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Crear un objeto con los datos a enviar
    const dataToSend = {
      nombre: formData.nombre,
      precio: formData.precio,
      actividades: formData.actividades.map(a => a.value), // Solo envía los IDs
    };
  
    try {
      let response;
      if (id) {
        response = await planesService.updatePlanById(id, dataToSend);
        setAction("actualizado");
      } else {
        response = await planesService.insertPlan(dataToSend);
        setAction("creado");
      }
      console.log(response.data);
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
      }, 5000);
    } catch (error) {
      console.error("Error en la operación:", error);
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
      }, 5000);
    } finally {
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

  const handleActividadesChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      actividades: selectedOptions || [],
    }));
  };
  
  // Asegúrate de implementar la lógica correcta para renderizar las opciones de actividades
  // y enlazarlas correctamente con el estado del formulario.

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
  options={actividadesOptions}
  isMulti
  value={formData.actividades}
  getOptionLabel={(option) => option.label}
  getOptionValue={(option) => option.value}
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
