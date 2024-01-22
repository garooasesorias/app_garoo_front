import React, { useState } from "react";
import { Tabs } from "flowbite-react";

function Login() {
  const [activeTab, setActiveTab] = useState("advisor");

  return (
    <div className="container p-6">
      <h1 className="text-3xl mb-4 font-semibold text-gray-700">
        Iniciar Sesión
      </h1>

      <div className="flex">
        <main className="w-full">
          <Tabs.Group aria-label="Tabs for user roles" style="underline">
            <Tabs>
              <Tabs.Item
                active={activeTab === "advisor"}
                onClick={() => setActiveTab("advisor")}
              >
                Soy Asesor
              </Tabs.Item>
              <Tabs.Item
                active={activeTab === "admin"}
                onClick={() => setActiveTab("admin")}
              >
                Soy Administrador
              </Tabs.Item>
            </Tabs>
            <Tabs.Panels>
              <Tabs.Panel>
                {activeTab === "advisor" && (
                  // Aquí insertarás tu componente o formulario para asesores
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                      Ingreso para Asesores
                    </h2>
                    {/* Formulario de inicio de sesión para Asesor */}
                  </div>
                )}
              </Tabs.Panel>
              <Tabs.Panel>
                {activeTab === "admin" && (
                  // Aquí insertarás tu componente o formulario para administradores
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                      Ingreso para Administradores
                    </h2>
                    {/* Formulario de inicio de sesión para Administrador */}
                  </div>
                )}
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Group>
        </main>
      </div>
    </div>
  );
}

export default Login;
