import React, { useState, useEffect, useRef } from "react";
import asesorService from "../../../services/asesorService.js";
import skillService from "../../../services/skillService.js";
import especialidadService from "../../../services/especialidadService.js";
import { Button, Label, TextInput, FileInput, Toast } from "flowbite-react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { HiCheck } from "react-icons/hi";
import Loader from "../../../components/Loader.js";
import { ToggleSwitch } from "flowbite-react";

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
    skills: "",
    specialties: "",
  });
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isTempPwd, setIsTempPwd] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [action, setAction] = useState("creado");
  const { id } = useParams(); // Extrae el id desde la URL

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
      const fetchData = async () => {
        try {
          const skillResponse = await skillService.getSkills();
          setSkills(skillResponse.data);

          const specialtyResponse = await especialidadService.getSpecialties();
          setSpecialties(specialtyResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

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
      specialties: asesor.specialties || "",
      skills: asesor.skills || "",
      celular: asesor.celular || "",
      // ...otros campos
    });
  };

  function guardarArchivo(e) {
    const file = e.target.files[0];
    console.log("file guardar archivo ", file);
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

    // Agregar todos los datos del formulario al objeto FormData
    Object.keys(formDataState).forEach((key) => {
      formData.append(key, formDataState[key]);
    });

    // Agregar el archivo, si existe
    console.log("selectedFile insertAsesor", selectedFile);
    if (selectedFile) {
      console.log("appending file insertAsesor");
      formData.append("photoFile", selectedFile);
    }

    try {
      let response;
      if (id) {
        response = await asesorService.updateAsesorById(id, formData);
        setAction("actualizado");
        // props.setShowToast(true, "asesor actualizado");
      } else {
        // Insertar nuevo asesor
        response = await asesorService.insertAsesor(formData);
        setAction("creado");
        // props.setShowToast(true, "Asesor creado");
      }

      // Verificar si la respuesta del servidor es exitosa
      if (!response.ok) {
        // Si la respuesta tiene un código de estado de error
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Ocurrió un error al realizar la operación"
        );
      }

      setShowToast(true); // Mostrar el mensaje de éxito
      setLoading(false);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);

      if (!id) {
        handleResetForm();
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      showToastWithTimeout("Error en la operación"); // Muestra el toast con el mensaje de error
    } finally {
      setLoading(false); // Desactivar la señal de carga independientemente del resultado
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
      specialties: "",
      skills: "",
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
  const handleSkillsChange = (selectedOptions) => {
    // Mapear los objetos seleccionados a sus IDs
    const selectedSkillsIds = selectedOptions.map(
      (selectedOption) => selectedOption.value
    );

    setFormDataState((prevData) => ({
      ...prevData,
      skills: selectedSkillsIds,
    }));
  };

  const handleSpecialtiesChange = (selectedOptionsSpecialties) => {
    const selectedSpecialtiesIds = selectedOptionsSpecialties.map(
      (selectedOptionsSpecialties) => selectedOptionsSpecialties.value
    );

    setFormDataState((prevData) => ({
      ...prevData,
      specialties: selectedSpecialtiesIds,
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
            value={(Array.isArray(formDataState.skills)
              ? formDataState.skills
              : []
            ).map((selectedSkillId) => ({
              label:
                skills.find((skill) => skill._id === selectedSkillId)?.nombre ||
                "",
              value: selectedSkillId,
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
            options={specialties.map((specialty) => ({
              label: specialty.nombre,
              value: specialty._id,
            }))}
            isMulti
            value={(Array.isArray(formDataState.specialties)
              ? formDataState.specialties
              : []
            ).map((selectedSpecialtyId) => ({
              label:
                specialties.find(
                  (specialty) => specialty._id === selectedSpecialtyId
                )?.nombre || "",
              value: selectedSpecialtyId,
            }))}
            onChange={handleSpecialtiesChange}
          />
        </div>

        <Button
          type="submit"
          color="dark"
          // value={formData.avatar}
          // onChange={(e) => guardarArchivo(e)}
        >
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

      {showErrorToast && (
        <Toast>
          <div
            className="inline-flex items-center justify-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="text-sm font-normal">{toastMessage}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={hideToast}
            >
              <span className="sr-only">Cerrar</span>
              {/* Icono de cierre */}
            </button>
          </div>
        </Toast>
      )}
    </>
  );
}
export default Form;
