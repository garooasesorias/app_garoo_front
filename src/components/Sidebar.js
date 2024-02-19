import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CollapsibleDropdown from "./CollapsibleDropdown";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaDollarSign,
  FaPercentage,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";
import { NotificacionesContext } from "../context/NotificacionesContext";
import { IoPeopleSharp, IoSettingsSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";

import { BsCircleFill } from "react-icons/bs";
import authService from "../services/authService";
// {/* <BsCircleFill style={{ color: "red" }} /> */}

function Sidebar({ isOpen, toggle, isMinimized, setIsMinimized }) {
  const { notificaciones } = useContext(NotificacionesContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = await authService.isAdmin();
      setIsAdmin(isAdmin);
    };

    checkAdmin();
  }, []);

  return (
    <>
      {!isMinimized && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 h-screen transition-transform sm:translate-x-0 ${
            isMinimized ? "w-20" : "w-64"
          }`}
          aria-label="Sidenav"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ul className="space-y-2">
              {authService.isAdmin() && (
                <li>
                  <Link to="/clientes">
                    <button
                      type="button"
                      className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls="dropdown-pages"
                      data-collapse-toggle="dropdown-pages"
                    >
                      <IoPeopleSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        <b>Clientes</b>
                      </span>
                    </button>
                  </Link>
                  <ul id="dropdown-pages" className="hidden py-2 space-y-2">
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
              )}
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Materias</b>}
                    icon={
                      <FaBookOpen className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/materias">Materias</NavLink>
                    </li>
                    <li className="ml-5">
                      <NavLink to="/tipoMaterias">Tipo de Materias</NavLink>
                    </li>
                    {/* Other sub-options for "Actividades" */}
                  </CollapsibleDropdown>
                </li>
              )}
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Asesores</b>}
                    icon={
                      <FaChalkboardTeacher className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="mr-2">
                      <NavLink to="/asesores">
                        <button
                          type="button"
                          className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          aria-controls="dropdown-pages"
                          data-collapse-toggle="dropdown-pages"
                        >
                          <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            Asesores
                          </span>
                        </button>
                      </NavLink>
                    </li>
                    <li className="ml-2">
                      <NavLink
                        to="/skills"
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                      >
                        Skills
                      </NavLink>
                    </li>
                    {/* <li className="ml-2">
                      <NavLink
                        to="/especialidades"
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                      >
                        Especialidades
                      </NavLink>
                    </li> */}
                  </CollapsibleDropdown>

                  <ul id="dropdown-pages" className="hidden py-2 space-y-2">
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
              )}
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Actividades</b>}
                    icon={
                      <FaPen className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/actividades">Actividades</NavLink>
                    </li>
                    <li className="ml-5">
                      <NavLink to="/tipoActividades">
                        Tipo de Actividades
                      </NavLink>
                    </li>
                    {/* Other sub-options for "Actividades" */}
                  </CollapsibleDropdown>
                </li>
              )}
              {authService.isAdmin() && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Planes</b>}
                    icon={
                      <FaPercentage className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/planes">Planes</NavLink>
                    </li>
                    <li className="ml-5">
                      <NavLink to="/descuentos">Descuentos</NavLink>
                    </li>
                    {/* Other sub-options for "Actividades" */}
                  </CollapsibleDropdown>
                </li>
              )}
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Cotizaciones</b>}
                    icon={
                      <FaDollarSign className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/cotizaciones">Cotizaciones</NavLink>
                    </li>{" "}
                    {/* <li className="ml-5">
                      <NavLink to="/estadosCotizaciones">
                        Estados Cotizaciones
                      </NavLink>
                    </li>
                    */}
                    {/* Other sub-options for "Actividades" */}
                  </CollapsibleDropdown>
                </li>
              )}

              <li>
                <CollapsibleDropdown
                  buttonText={<b>CursosV2</b>}
                  icon={
                    notificaciones && notificaciones.length > 0 ? (
                      <BsCircleFill style={{ color: "red" }} />
                    ) : (
                      <FaGraduationCap className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    )
                  }
                >
                  <li className="ml-5">
                    <NavLink to="/cursosv2">Cursos</NavLink>
                  </li>
                  {/* <li className="ml-5">
                    <NavLink to="/estadosCursosv2">Estados Cursos</NavLink>
                  </li> */}
                  {/* Other sub-options for "Actividades" */}
                </CollapsibleDropdown>
              </li>
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Reportes</b>}
                    icon={
                      <FaChartLine className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/actividadesReportes">
                        Reporte Actividades
                      </NavLink>
                    </li>
                  </CollapsibleDropdown>
                </li>
              )}
            </ul>
            {/* <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              {isAdmin && (
                <li>
                  <CollapsibleDropdown
                    buttonText={<b>Configuraciones</b>}
                    icon={
                      <IoSettingsSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    }
                  >
                    <li className="ml-5">
                      <NavLink to="/administradores">Administradores</NavLink>
                    </li>
                  </CollapsibleDropdown>
                </li>
              )}
            </ul> */}
          </div>
        </aside>
      )}
    </>
  );
}
export default Sidebar;
