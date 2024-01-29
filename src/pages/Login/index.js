import { Tabs, TextInput, Label, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adviserService from "../../services/asesorService.js";
import administradorService from "../../services/administradorService.js"; // Asegúrate de importar el servicio de administradores

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario del administrador
  const [error, setError] = useState(""); // Para manejar los mensajes de error
  const navigate = useNavigate();

  const handleLogin = async (role, loginData) => {
    try {
      let response;
      if (role === "asesor") {
        response = await adviserService.loginAsesor(loginData);
      } else if (role === "administrador") {
        response = await administradorService.loginAdministrador(loginData);
      }

      if (response && response.ok) {
        const data = response;
        localStorage.setItem("token", data.token); // Almacenar el token en localStorage
        navigate("/"); // Redirigir al dashboard u otra ruta protegida
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ocurrió un error durante el login");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Error en el login");
    }
  };

  const handleAsesorLogin = (event) => {
    event.preventDefault();
    handleLogin("asesor", { email, password });
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    handleLogin("administrador", { email, password });
  };

  // Código del componente sigue aquí...
  // ...

  return (
    <div className="container p-6 flex justify-center items-center bg-slate-200 h-screen">
      <div className="shadow rounded p-6 bg-white sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item title="Soy Asesor">
            <h2 className="text-lg font-bold mb-4">
              Iniciar Sesión como Asesor
            </h2>
            <form onSubmit={handleAsesorLogin}>
              <div className="mb-4">
                <div className="mb-2">
                  <Label htmlFor="email-asesor" value="Correo Electrónico" />
                </div>
                <TextInput
                  id="email-asesor"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <Label htmlFor="password-asesor" value="Contraseña" />
                </div>
                <TextInput
                  id="password-asesor"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" color="blue" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </Tabs.Item>
          <Tabs.Item title="Soy Administrador">
            <h2 className="text-lg font-bold mb-4">
              Iniciar Sesión como Administrador
            </h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <div className="mb-2">
                  <Label htmlFor="username-admin" value="Usuario" />
                </div>
                <TextInput
                  id="username-admin"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <Label htmlFor="password-admin" value="Contraseña" />
                </div>
                <TextInput
                  id="password-admin"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" color="blue" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </Tabs.Item>
        </Tabs.Group>
      </div>
      {error && (
        <div className="text-red-500">
          {error} {/* Mostrar mensaje de error si hay uno */}
        </div>
      )}
    </div>
  );
}

export default Login;
