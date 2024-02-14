import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiBell, FiLogOut } from "react-icons/fi";
import { Dropdown } from "flowbite-react";
import { NotificacionesContext } from "../context/NotificacionesContext";
import authService from "../services/authService";

export function Layout({ children }) {
  const navigate = useNavigate();
  const { notificaciones } = useContext(NotificacionesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authService.getUser(); // Asume authService ya importado
        setUser(user); // Asume setUser ya definido en este contexto
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        // Manejar el error, por ejemplo, estableciendo un estado de error
      }
    };

    getUser(); // Invocar la función asíncrona
  }, []); // U

  let marginLeftValue = isMinimized ? "100px" : "280px";

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="shadow w-full h-15 flex justify-between p-5 items-center">
        <button
          className={`accordion ${
            isMinimized ? "z-50 text-xl ml-0" : "z-50 text-xl ml-64"
          }`}
          onClick={toggleMinimize}
        >
          ☰
        </button>
        <div className="flex items-center">
          <div className="me-3">{user.email}</div>
          <Dropdown
            inline={true}
            label={
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FiBell size={24} />
                <span className="sr-only">Notifications</span>
                {notificaciones.length > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {notificaciones.length}
                  </div>
                )}
              </div>
            }
            show={dropdownOpen}
            onClose={() => setDropdownOpen(false)}
          >
            {Array.isArray(notificaciones) &&
              notificaciones.map((notificacion, index) => (
                <Dropdown.Item key={`notificacion-${index}`}>
                  {notificacion.mensaje}
                </Dropdown.Item>
              ))}
          </Dropdown>
          <button
            onClick={handleLogout}
            className="ms-4 p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FiLogOut size={24} />
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <Sidebar
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
        />
        <main
          style={{
            marginLeft: marginLeftValue,
            marginRight: "10px",
            marginBottom: "20px",
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
