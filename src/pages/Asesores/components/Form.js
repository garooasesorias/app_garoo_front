import React, { useState, useEffect, useRef } from "react";
import asesorService from "../../../services/asesorService.js";
import { Button, Label, TextInput, FileInput, Toast } from "flowbite-react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { HiCheck } from "react-icons/hi";
import Loader from '../../../components/Loader.js';

function Form() {
  const formRef = useRef();
  //const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    avatar: "",
    identificacion: "",
    nombre: "",
    cargo: "",
    celular: "",
    skills: [],
    especialidades: [],
  });

  const [skills, setSkills] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = { showToast, setShowToast };

  const [action, setAction] = useState("creado");
  const { id } = useParams(); // Extrae el id desde la URL


  /*const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
  };*/

  // useEffect(() => {
  //   console.log(id);
  //   if (id) {
  //     setLoading(true);
  //     asesorService
  //       .getAsesorById(id)
  //       .then((response) => {
        
  //         setAsesor(response.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error al obtener el asesor:", error);
  //         setLoading(false);
  //         // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
  //       });
  //   }
  // }, [id]);

  useEffect(() => {
    // Obtener las especialidades y skills al montar el componente
    const fetchData = async () => {
      try {
        setLoading(true);
  
        if (id) {
          // Obtener el asesor por ID
          const asesorData = await asesorService.getAsesorById(id);
          setAsesor(asesorData);
        }
  
        // Obtener las especialidades
        const especialidadesData = await asesorService.getEspecialidades();
        setEspecialidades(especialidadesData);
  
        // Obtener los skills
        const skillsData = await asesorService.getSkills();
        setSkills(skillsData);
  
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };
  
    fetchData();
  }, [id]);

  const setAsesor = (asesor) => {
    setFormData({
      identificacion: asesor.identificacion || "",
      cargo: asesor.cargo || "",
      nombre: asesor.nombre || "",
      avatar: asesor.avatar || "",
      especialidades: asesor.especialidades || "",
      skills: asesor.skills || "",
      celular: asesor.celular || "",
     
      // ...otros campos
    });
  };

  function guardarArchivo(e) {
    var file = e.target.files[0]; // El archivo seleccionado
    //setSelectedFile(file ? file.name : null);  
      var reader = new FileReader(); // Para convertir a Base64
      reader.readAsDataURL(e.target.files[0]); // Inicia la conversión...
  
      reader.onload = function (e) {
        // Una vez terminada la conversión...
        var rawLog = reader.result.split(",")[1]; // Extrae solo los datos del archivo
        var dataSend = {
          dataReq: { data: rawLog, name: file.name, type: file.type },
          //fname: "uploadFilesToGoogleDrive",
        }; 
  
    const apiUrl = 'http://localhost:3000/api/asesor/uploadFilesToGoogleDrive'; // Ajusta la URL según tu configuración

    axios.post(apiUrl, dataSend)
    .then(response => {
      const fileId = response.data.id;
      const baseUrl = "https://drive.google.com/uc?export=view&id=";
      const nuevaUrl = baseUrl + fileId;

           console.log('Nueva URL formateada:', nuevaUrl);
    
          setFormData((prevData) => ({
          ...prevData,
          avatar: nuevaUrl,
        }));
        }).uploadFilesToGoogleDrive(
          dataSend.dataReq.data,
          dataSend.dataReq.name,
          dataSend.dataReq.type
        );
    };
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (id) {
        // Actualizar asesor existente
        console.log("intenta actualizar");
        console.log(formData);
        response = await asesorService.updateAsesorById(id, formData);
        console.log(response);
        setAction("actualizado");
        props.setShowToast(true, "asesor actualizado");
      } else {
        // Insertar nuevo cliente
        console.log("intenta crear");
        response = await asesorService.insertAsesor(formData);
        props.setShowToast(true, "Cliente creado");asesor
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
      identificacion:  "",
      cargo:  "",
      nombre:  "",
      avatar:  "",
      especialidades:  "",
      skills:  "",
      celular:  "",
    });
  };
  const handleIdentificacionChange = (e) => {
    const newIdentificacion = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      identificacion: newIdentificacion,
    }));
  };
  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };
  const handleCargoChange = (e) => {
    const newCargo = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      cargo: newCargo,
    }));
  };
  const handleCelularChange = (e) => {
    const newCelular = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      celular: newCelular,
    }));
  };
  const handleSkillsChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedOptions.map((option) => option.value),
    }));
  };
  const selectedOptions = skills.filter((skill) =>
    formData.skills.includes(skill._id)
  );
  const handleEspecialidadesChange = (selectedOptionsEspecialidades) => {
    setFormData((prevData) => ({
      ...prevData,
      especialidades: selectedOptionsEspecialidades.map(
        (option) => option.value
      ),
    }));
  };
  const selectedOptionsEspecialidades = especialidades.filter((especialidad) =>
    formData.especialidades.includes(especialidad._id)
  );

  const goBack = () => {
    
    window.history.back();
  };


  return (
    <>
      <form ref={formRef}
       className="flex max-w-md flex-col gap-4 m-auto" 
       onSubmit={handleSubmit}>
        
        <div className="max-w-md">
          <div className="mb-2 block">
          <Label htmlFor="customFile" value="Avatar"/>
          </div>
          <FileInput
            addon="PH"
            id="customFile"
            name="avatar"
            accept="image/*"
            onChange={(e) => guardarArchivo(e)}
            required
          />
          <input type="hidden" name="avatar" value={formData.avatar} />
           {/* <p >Archivo seleccionado: {selectedFile || 'Ningún archivo seleccionado'}</p>*/}
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="identificacion" value="Identificacion" />
          </div>
          <TextInput
            addon="ID"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleIdentificacionChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Nombre" />
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
            <Label htmlFor="cargo" value="Cargo" />
          </div>
          <TextInput
            addon="Cargo"
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleCargoChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="celular" value="Celular" />
          </div>
          <TextInput
            addon="#"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleCelularChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="skills" value="Skills" />
          </div>
          <Select
            id="skills"
            name="skills"
            options={skills.map((skill) => ({
              label: skill.nombre,
              value: skill._id,
            }))}
            isMulti
            value={selectedOptions.map((skill) => ({
              label: skill.nombre, // Display activity names instead of IDs
              value: skill._id,
            }))}
            onChange={handleSkillsChange}
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="especialidades" value="Especialidades" />
          </div>
          <Select
            id="especialidades"
            name="especialidades"
            options={especialidades.map((especialidad) => ({
              label: especialidad.nombre,
              value: especialidad._id,
            }))}
            isMulti
            value={selectedOptionsEspecialidades.map((especialidad) => ({
              label: especialidad.nombre, // Display activity names instead of IDs
              value: especialidad._id,
            }))}
            onChange={handleEspecialidadesChange}
          />
        </div>
        <Button type="submit" color="dark"  
       // value={formData.avatar} 
       // onChange={(e) => guardarArchivo(e)}
        >  Submit
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
            Asesor {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}
export default Form;
