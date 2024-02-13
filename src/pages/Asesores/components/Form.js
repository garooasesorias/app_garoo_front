import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import asesorService from "../../../services/asesorService.js";
import skillService from "../../../services/skillService.js";
import materiaService from "../../../services/materiasService.js";

import {
  Button,
  Label,
  TextInput,
  FileInput,
  Toast,
  ToggleSwitch,
} from "flowbite-react";
import Select from "react-select";
import { HiCheck } from "react-icons/hi";
import { HiX } from "react-icons/hi";

import Loader from "../../../components/Loader.js";
import RatingComponent from "../components/RatingComponent.js";

function Form() {
  const formRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formDataState, setFormDataState] = useState({
    //avatar: "",
    identificacion: "",
    nombre: "",
    email: "",
    password: "",
    isTempPwd: false,
    cargo: "",
    celular: "",
    ratingSkills: [],
    especialidades: [],
  });
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isTempPwd, setIsTempPwd] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [action, setAction] = useState("creado");
  const { id } = useParams(); // Extrae el id desde la URL

  const fetchData = async () => {
    try {
      const skillResponse = await skillService.getSkills();
      setSkills(skillResponse.data);

      const materiaResponse = await materiaService.getMaterias();
      setMaterias(materiaResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primero, verifica si hay un ID válido
    if (id) {
      setLoading(true);
      // Obtiene el asesor por ID
      const asesorPromise = asesorService
        .getAsesorById(id)
        .then((response) => {
          setAsesor(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el asesor:", error);
          setLoading(false);
        });

      // Luego, obtén las habilidades y especialidades
      fetchData();
      // Ejecuta ambas llamadas en paralelo
      Promise.all([asesorPromise, fetchData()])
        .then(() => {
          // Todo se completó con éxito
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error en alguna de las llamadas:", error);
          setLoading(false);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
    } else {
      setLoading(true);
      fetchData();
    }
  }, [id]);

  const setAsesor = (asesor) => {
    setFormDataState({
      id: asesor._id,
      identificacion: asesor.identificacion || "",
      cargo: asesor.cargo || "",
      nombre: asesor.nombre || "",
      email: asesor.email || "",
      avatar: asesor.avatar || "",
      especialidades: asesor.especialidades || "",
      ratingSkills: asesor.ratingSkills || "",
      celular: asesor.celular || "",
      // ...otros campos
    });
  };

  function guardarArchivo(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Resetear el mensaje de error

    const formData = new FormData();

    // Agregar los datos del formulario al objeto FormData, excepto 'skills' que necesita ser una cadena JSON
    Object.keys(formDataState).forEach((key) => {
      if (key !== "ratingSkills" && key !== "especialidades") {
        formData.append(key, formDataState[key]);
      }
    });

    // Manejar 'skills' especialmente si existe
    if (formDataState.ratingSkills) {
      // Convertir 'skills' a una cadena JSON y añadir al FormData
      const stringRatingSkills = JSON.stringify(formDataState.ratingSkills);
      formData.append("ratingSkills", stringRatingSkills);
    }

    // Manejar 'especiliades' especialmente si existe
    if (formDataState.especialidades) {
      // Convertir 'skills' a una cadena JSON y añadir al FormData
      const stringEspecialidades = JSON.stringify(formDataState.especialidades);
      formData.append("especialidades", stringEspecialidades);
    }

    // Agregar el archivo, si existe
    if (selectedFile) {
      formData.append("photoFile", selectedFile);
    }

    try {
      let response;
      // Lógica para determinar si se debe insertar o actualizar un asesor
      if (id) {
        // Actualizar asesor existente
        response = await asesorService.updateAsesorById(formData);
      } else {
        // Insertar nuevo asesor
        response = await asesorService.insertAsesor(formData);
      }

      // Manejo de la respuesta del servidor
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Ocurrió un error al realizar la operación"
        );
      }

      id ? setAction("actualizado") : setAction("creado");

      // Operaciones post-envío exitoso
      setShowToast(true);
      // Resetear el formulario si es un nuevo asesor
      if (!id) {
        handleResetForm();
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Hubo un error desconocido. Por favor, intenta de nuevo más tarde.";

      // Establece el mensaje de error
      setAction(errorMessage);

      // Muestra el toast de error
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const showToastWithTimeout = (message, duration = 5000) => {
    setToastMessage(message);
    setShowErrorToast(true);

    setTimeout(() => {
      setShowErrorToast(false);
    }, duration);
  };

  const hideToast = () => {
    setShowErrorToast(false);
  };

  const handleResetForm = () => {
    setFormDataState({
      id: "",
      identificacion: "",
      cargo: "",
      correo: "",
      contrasena: "",
      nombre: "",
      avatar: "",
      especialidades: [],
      ratingSkills: [],
      celular: "",
    });
  };
  const handleIdentificacionChange = (e) => {
    const newIdentificacion = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      identificacion: newIdentificacion,
    }));
  };
  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      email: newEmail,
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  };
  const handleCargoChange = (e) => {
    const newCargo = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      cargo: newCargo,
    }));
  };
  const handleCelularChange = (e) => {
    const newCelular = e.target.value;
    setFormDataState((prevData) => ({
      ...prevData,
      celular: newCelular,
    }));
  };
  const handleSkillChange = (selectedOptions) => {
    setFormDataState((prevData) => {
      // Crear un mapa de los skills existentes para facilitar la búsqueda por _id
      const existingRatingSkillsMap = prevData.ratingSkills.reduce(
        (acc, ratingSkill) => {
          acc[ratingSkill.skill] = ratingSkill.rating;
          return acc;
        },
        {}
      );

      // Mapear las opciones seleccionadas a sus objetos de skills,
      // preservando los ratings existentes o asignando 0 si son nuevas
      const selectedRatingSkills = selectedOptions.map((selectedOption) => ({
        skill: selectedOption.value,
        // Preservar el rating existente si es posible, de lo contrario asignar 0
        rating:
          existingRatingSkillsMap[selectedOption.value] !== undefined
            ? existingRatingSkillsMap[selectedOption.value]
            : 0,
      }));

      // Actualizar el estado con los skills actualizados, preservando otras propiedades
      return {
        ...prevData,
        ratingSkills: selectedRatingSkills,
      };
    });
  };

  const handleMateriasChange = (selectedOptionsMaterias) => {
    console.log(
      "selectedOptionsMaterias handleMateriasChange formAsesor",
      selectedOptionsMaterias
    );
    const selectedEspecialidades = selectedOptionsMaterias.map(
      (selectedOptionsMaterias) => ({ materia: selectedOptionsMaterias.value })
    );

    console.log(
      "selectedMateriasIds handleMateriasChange formAsesor",
      selectedEspecialidades
    );

    setFormDataState((prevData) => ({
      ...prevData,
      especialidades: selectedEspecialidades,
    }));
  };

  const handleRatingSkillChange = (ratingSkillId, newRatingSkill) => {
    setFormDataState((prevData) => ({
      ...prevData,
      ratingSkills: prevData.ratingSkills.map((ratingSkill) =>
        ratingSkill.skill === ratingSkillId
          ? { ...ratingSkill, rating: newRatingSkill }
          : ratingSkill
      ),
    }));
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
            <Label htmlFor="customFile" value="Avatar" />
          </div>
          <FileInput
            addon="PH"
            id="customFile"
            name="avatar"
            accept="image/*"
            onChange={(e) => guardarArchivo(e)}
            // required
          />
          <input type="hidden" name="avatar" value={formDataState.avatar} />
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
            value={formDataState.identificacion}
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
            value={formDataState.nombre}
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Correo Electrónico" />
          </div>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={formDataState.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Contraseña" />
          </div>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formDataState.password}
            onChange={handlePasswordChange}
            disabled={!isTempPwd} // Deshabilitar basado en isTempPwd
            required={!formDataState.isTempPwd} // El campo es requerido si `isTempPwd` es false
          />
          <ToggleSwitch
            className="mt-2"
            checked={formDataState.isTempPwd}
            label="Contraseña Temporal"
            onChange={(isChecked) => {
              // Aquí se asume que 'isChecked' es un booleano directamente, no un evento
              setIsTempPwd(isChecked); // Actualiza el estado local
              setFormDataState((prevFormData) => ({
                ...prevFormData,
                isTempPwd: isChecked,
              }));
            }}
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
            value={formDataState.cargo}
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
            value={formDataState.celular}
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
            value={(Array.isArray(formDataState.ratingSkills)
              ? formDataState.ratingSkills
              : []
            ).map((selectedRatingSkill) => ({
              label:
                skills.find((skill) => skill._id === selectedRatingSkill.skill)
                  ?.nombre || "",
              value: selectedRatingSkill.skill,
            }))}
            onChange={handleSkillChange}
          />
        </div>
        <div className="max-w-md flex flex-col gap-y-3">
          {formDataState.ratingSkills.map((ratingSkill) => (
            <div key={ratingSkill.skill} className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {skills.find((skill) => skill._id === ratingSkill.skill)
                  ?.nombre || ""}
              </div>
              <RatingComponent
                ratingSkillId={ratingSkill.skill}
                rating={ratingSkill.rating}
                onRatingSkillChange={handleRatingSkillChange}
              />
            </div>
          ))}
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="materias" value="Especialidades" />
          </div>
          <Select
            id="materias"
            name="materias"
            options={materias.map((materia) => ({
              label: materia.nombre,
              value: materia._id,
            }))}
            isMulti
            value={(Array.isArray(formDataState.especialidades)
              ? formDataState.especialidades
              : []
            ).map((selectedEspecialidad) => ({
              label:
                materias.find(
                  (materia) => materia._id === selectedEspecialidad.materia
                )?.nombre || "",
              value: selectedEspecialidad.materia,
            }))}
            onChange={handleMateriasChange}
          />
        </div>

        <Button type="submit" color="dark">
          {id ? "Actualizar Asesor" : "Insertar Asesor"}
        </Button>
      </form>
      <Button
        type="button"
        color="dark"
        onClick={goBack}
        className="m-auto mt-4"
      >
        Volver
      </Button>

      <div className="LoaderContainerForm">{loading ? <Loader /> : null}</div>
      {showToast && (
        <Toast style={{ maxWidth: "250px" }} className="Toast">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Asesor {action} con éxito
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}

      {showToast && (
        <Toast style={{ maxWidth: "250px" }} className="Toast">
          <div
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              action === "creado" || action === "actualizado"
                ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
            }`}
          >
            {action === "creado" || action === "actualizado" ? (
              <HiCheck className="h-5 w-5" />
            ) : (
              // Asegúrate de importar HiX o el ícono que elijas para representar errores
              <HiX className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3 text-sm font-normal">
            Cliente {action}{" "}
            {/* Aquí se usa el estado `action` para mostrar el mensaje */}
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}
export default Form;
