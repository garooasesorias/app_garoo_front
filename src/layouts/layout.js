import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiBell } from "react-icons/fi";
import { Dropdown } from "flowbite-react";
import { NotificacionesContext } from "../context/NotificacionesContext";

export function Layout({ children }) {
  const { notificaciones } = useContext(NotificacionesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  let marginLeftValue = isMinimized ? "100px" : "280px";

  // Para controlar el estado de la visibilidad del Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }
  return (
    <>
      <div className="shadow w-full h-15 flex justify-between p-5 items-center">
        <button
          className={`accordion ${
            isMinimized ? " z-50 text-xl ml-20" : " z-50 text-xl ml-64"
          }`}
          onClick={toggleMinimize}
        >
          ☰
        </button>
        <Dropdown
          inline={true}
          label={
            <div
              // type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <FiBell size={24} />
              <span className="sr-only">Notifications</span>
              {notificaciones.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {notificaciones.reduce(
                    (acc, curr) => acc + curr.actividades.length,
                    0
                  )}
                </div>
              )}
            </div>
          }
          show={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        >
          {notificaciones.map((notificationGroup, indexNotificacionGroup) =>
            notificationGroup.actividades.map((actividad, indexActividad) => (
              <Dropdown.Item
                key={`${indexNotificacionGroup}-${indexActividad}`}
                // No se necesita icono aquí, a menos que lo quieras incluir
              >
                Una actividad necesita revisión
              </Dropdown.Item>
            ))
          )}
        </Dropdown>
      </div>
      <Sidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <main style={{ marginLeft: marginLeftValue, marginRight: "10px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
