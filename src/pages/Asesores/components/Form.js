import React, {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import Select from "react-select";


function Form() {
  //let { id } = useParams();
  const [formData, setFormData] = useState({
    avatar:"",
    identificacion:"",
    nombre: "",
    cargo: "",
    celular: "",
    skills: [],
    especialidades:[]

  });
 
  const [skills, setSkills] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

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

 /*    if (id) {
        await google.script.run
          .withSuccessHandler((data) => {
            const asesores = data;
            // Set the fetched cotizacion data to the state
            setAsesores(data);

            // Prepopulate the form fields with data from cotizacion
            setFormData({
              identificacion: asesores.identificacion,
              nombre: asesores.nombre,
              // You can add other fields similarly
              skills: asesores.skills.map((ski) => ({
                skill: {
                  label: ski.skill.nombre,
                  value: ski.skill._id,
                },
              
              })),
              especialidades: asesores.especialidades.map((espe) => ({
                especialidad: {
                  label: espe.especialidad.nombre,
                  value: espe.especialidad._id,
                },
              
              })),
              cargo: asesores.cargo,
              celular: asesores.celular
            });

            // Log the fetched cotizacion data
          })
          .getAsesoresById(id);
      }*/
    };
    

    fetchData();
  }, []);
  function guardarArchivo(e) {
    var file = e.target.files[0] //the file
    var reader = new FileReader() //this for convert to Base64 
    reader.readAsDataURL(e.target.files[0]) //start conversion...
    reader.onload = function (e) { //.. once finished..
      var rawLog = reader.result.split(',')[1]; //extract only thee file data part
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      fetch('https://script.google.com/a/macros/garooasesorias.com/s/AKfycbxfvDi-3uPAJ3svy1C5fdGsIUWHm_QGOI3uex_koJGjyOB3bu74yoUirm1OrWXVz-4/exec', //your AppsScript URL
        { redirect: "follow",
        method: "POST", 
        body: JSON.stringify(dataSend), 
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
       }) //send to Api
        .then(res => res.json()).then((a) => {
          console.log(a) //See response
        }).catch(e => console.log(e)) // Or Error in console
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    google.script.run
      .withSuccessHandler((response) => {
        console.log(response);
      })
      .insertAsesor(formData);
  };
  /*const handleAvatarChange = (e) => {
    const newAvatar = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      avatar: newAvatar,
    }));
  };*/
  
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
      especialidades: selectedOptionsEspecialidades.map((option) => option.value),
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
            <Label htmlFor="avatar" value="Avatar" />
          </div>
          <FileInput
            addon="PH"
            id="customFile"
            name="avatar"
            value={formData.avatar}
            onChange={(e) => guardarArchivo(e)}
            required
          />
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
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
