import React, { useState, useEffect, useRef } from "react";
import administradorService from "../../../services/administradorService.js";
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
  //const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    isTempPwd: false,
  });

  const [isTempPwd, setIsTempPwd] = useState(false);
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
      // Obtiene el administrador por ID
      const administradorPromise = administradorService
        .getAdministradorById(id)
        .then((response) => {
          setAdministrador(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el administrador:", error);
          setLoading(false);
        });

      Promise.all([administradorPromise])
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

  const setAdministrador = (administrador) => {
    setFormData({
      nombre: administrador.nombre || "",
      email: administrador.email || "",
      password: administrador.password || "",
      isTempPwd: administrador.isTempPwd || false,
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
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Resetear el mensaje de error

    // Validar si la contraseña es necesaria y está presente
    if (!isTempPwd && !formData.email) {
      setError("Por favor, ingresa una contraseña.");
      return; // No continuar con el envío si la validación falla
    }

    try {
      let response;

      if (id) {
        // Actualizar administrador existente
        response = await administradorService.updateAdministradorById(
          id,
          formData
        );
        setAction("actualizado");
        // props.setShowToast(true, "administrador actualizado");
      } else {
        // Insertar nuevo administrador
        response = await administradorService.insertAdministrador(formData);
        setAction("creado");
        // props.setShowToast(true, "Administrador creado");
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
    // } catch (error) {
    //   setLoading(false);
    //   props.setShowToast(true, "Error en la operación");
    //   setTimeout(() => {
    //     props.setShowToast(false);
    //   }, 5000);
    // }
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
    setFormData({
      nombre: "",
      email: "",
      contrasena: "",
    });
  };

  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nombre: newName,
    }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      email: newEmail,
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
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
          <input type="hidden" name="avatar" value={formData.avatar} />
          {/* <p >Archivo seleccionado: {selectedFile || 'Ningún archivo seleccionado'}</p>*/}
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
            <Label htmlFor="email" value="Correo Electrónico" />
          </div>
          <TextInput
            addon="@"
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={formData.email}
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
            value={formData.password}
            onChange={handlePasswordChange}
            disabled={!isTempPwd} // Deshabilitar basado en isTempPwd
            required={!formData.isTempPwd} // El campo es requerido si `isTempPwd` es false
          />
          <ToggleSwitch
            className="mt-2"
            checked={formData.isTempPwd}
            label="Contraseña Temporal"
            onChange={(isChecked) => {
              // Aquí se asume que 'isChecked' es un booleano directamente, no un evento
              setIsTempPwd(isChecked); // Actualiza el estado local
              setFormData((prevFormData) => ({
                ...prevFormData,
                isTempPwd: isChecked,
              }));
            }}
          />
        </div>

        <Button
          type="submit"
          color="dark"
          // value={formData.avatar}
          // onChange={(e) => guardarArchivo(e)}
        >
          {" "}
          Submit
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
            Administrador {action} con éxito
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
