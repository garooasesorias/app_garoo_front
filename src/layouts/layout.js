import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // Estado para el Sidebar
  const [isMinimized, setIsMinimized] = useState(false); // Estado para minimizar el Sidebar

  // Función para abrir/cerrar el Sidebar
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  // La margen se ajustará según el valor de isMinimized
  let marginLeftValue = isMinimized ? "50px" : "280px";

  return (
    <>
      <button className="relative z-50" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar 
          isOpen={isOpen} 
          toggle={toggleSidebar}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized} // Pasamos el setter como prop
      />
      <main style={{ marginLeft: marginLeftValue, marginRight: "10px" }}>
        {children}
      </main>
      <Footer>{/* Contenido del pie de página */}</Footer>
    </>
  );
}

export default Layout;