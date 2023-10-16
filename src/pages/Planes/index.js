import React, { useEffect, useState } from "react";
import { Card, Avatar, Table, Button, Progress } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from '../../styles/main.scss';

function Planes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setPlanes(data);
        })
        .getPlanes();
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCollapseToggle = (index) => {
    setCollapsedIndex(collapsedIndex === index ? null : index);
  };

  const filteredPlanes = planes.filter(
    (plan) => plan.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    // || Add more filtering based on plan properties
    // plan.actividades.some((actividad) => actividad.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
    <h1 class="PagesTitles">Planes</h1>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Buscar plan..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center">
          <Link to="/formPlanes" className="">
            <Button className="shadow me-5" color="success">
              Crear
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredPlanes.map((plan, index) => (
          <Card
            key={plan._id}
            className="w-full md:w-1/2 lg:w-1/3"
            style={{ maxWidth: "400px" }}
          >
            <Link to={`/editPlan/${plan.id}`}>
              <Button className="shadow mb-2 ms-auto" color="success">
                Editar
              </Button>
            </Link>
            <div className="flex flex-col items-center pb-4">
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {plan.nombre}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ${plan.precio}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div
                className="text-base font-medium cursor-pointer dark:text-dark"
                onClick={() => handleCollapseToggle(index)}
              >
                Ver Actividades {">"}
              </div>
              {collapsedIndex === index && (
                <div className="grid gap-2">
                  {plan.actividades_relacionadas.map(
                    (actividad, actividadIndex) => (
                      <div
                        key={actividadIndex}
                        className="text-sm text-gray-500"
                      >
                        {actividad.nombre}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Planes;
