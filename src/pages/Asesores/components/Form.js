import React, {useState, useEffect}from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Select from "react-select";


function Form() {
  
  const [formData, setFormData] = useState({
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
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setSkills(data);
          setEspecialidades(data);
        })
        .getSkills().getEspecialidades();
    };

    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      asesores: formData.asesores.map((activity) => ({ $oid: activity })),
    };

    google.script.run
      .withSuccessHandler((response) => {})
      .insertPlan(formattedData);
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
  const handleEspecialidadesChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      especialidades: selectedOptions.map((option) => option.value),
    }));
  };
  const selectedOptionsEspecialidaddes = especialidades.filter((especialidad) =>
  formData.especialidades.includes(especialidad._id)
);
  
  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
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
            value={selectedOptionsEspecialidaddes.map((especialidad) => ({
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
