import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import Select from "react-select";

function Form() {
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

  /*const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
  };*/

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setSkills(data);
        })
        .getSkills();
      await google.script.run
        .withSuccessHandler((data) => {
          setEspecialidades(data);
        })
        .getEspecialidades();
    };

    fetchData();
  }, []);

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
          fname: "uploadFilesToGoogleDrive",
        }; // Prepara la información para enviar a la API
  
        google.script.run.withSuccessHandler((response) => {
           console.log(response);
           const fileId = response.id; 
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
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
    google.script.run
      .withSuccessHandler((response) => {
      })
      .insertAsesor(formData);
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

  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
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
      <Button type="button" color="dark" href="/Asesores" className="button">
          Volver
        </Button>
    </>
  );
}
export default Form;
