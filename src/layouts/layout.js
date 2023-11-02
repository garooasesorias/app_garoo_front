import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiBell } from "react-icons/fi"; // Importamos el ícono de campana

export function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  let marginLeftValue = isMinimized ? "100px" : "280px";

  return (
    <>
      <div className="shadow w-full h-10 flex justify-end p-3">
        <FiBell size={24} /> {/* Ícono de campana */}
      </div>
      <Sidebar
        isOpen={isOpen}
        toggle={toggleSidebar}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <main style={{ marginLeft: marginLeftValue, marginRight: "10px" }}>
        {children}
      </main>

      <Footer>{/* Contenido del pie de página */}</Footer>
    </>
  );
}

export default Layout;
