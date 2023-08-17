import React, { useState, useEffect } from "react";
import { Button, Label, Table } from "flowbite-react";
import Select from "react-select";

function CotizacionForm() {
  const [formData, setFormData] = useState({
    identificacion: "",
    nombre: "",
    correo: "",
    celular: "",
    materiasFilas: [],
  });

  const [clientes, setClientes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [planActividades, setPlanActividades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await google.script.run.withSuccessHandler(setClientes).getClientes();
      await google.script.run.withSuccessHandler(setMaterias).getMaterias();
      await google.script.run.withSuccessHandler(setPlanes).getPlanes();
      await google.script.run
        .withSuccessHandler(setActividades)
        .getActividades();
    };

    fetchData();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (const fila of formData.materiasFilas) {
      if (fila.plan) {
        const plan = planes.find((plan) => plan._id === fila.plan.value);
        total += Number(plan.precio); // Supongamos que el precio del plan está almacenado en la propiedad 'precio'
      }
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // google.script.run
    //   .withSuccessHandler((response) => {})
    //   .insertCotizacion(formData);
  };

  const handleMateriaChange = (selectedOption, rowIndex) => {
    const updatedFilas = [...formData.materiasFilas];
    updatedFilas[rowIndex].materia = selectedOption;
    setFormData((prevData) => ({
      ...prevData,
      materiasFilas: updatedFilas,
    }));
  };

  const handlePlanChange = (selectedOption, rowIndex) => {
    console.log("Selected plan:", selectedOption);
    console.log("Row index:", rowIndex);
    const updatedFilas = [...formData.materiasFilas];
    updatedFilas[rowIndex].plan = selectedOption;

    if (selectedOption.value !== "personalizado") {
      const plan = planes.find((plan) => plan._id === selectedOption.value);
      const actividadesRelacionadas = plan.actividades_relacionadas.map(
        (actividad, actividadIndex) => ({
          label: actividad.nombre,
          value: actividad._id,
          key: `${rowIndex}-${actividadIndex}`, // Usar rowIndex y actividadIndex
        })
      );

      setPlanActividades(actividadesRelacionadas);

      updatedFilas[rowIndex].actividad = actividadesRelacionadas;
    } else {
      setPlanActividades([]);
      updatedFilas[rowIndex].actividad = [];
    }

    setFormData((prevData) => ({
      ...prevData,
      materiasFilas: updatedFilas,
    }));
  };

  const handleActividadChange = (selectedOptions, rowIndex) => {
    console.log(selectedOptions);
    const updatedFilas = [...formData.materiasFilas];
    updatedFilas[rowIndex].actividad = selectedOptions;
    setFormData((prevData) => ({
      ...prevData,
      materiasFilas: updatedFilas,
    }));
  };
  const addRow = () => {
    console.log(planes);
    setFormData((prevData) => ({
      ...prevData,
      materiasFilas: [
        ...prevData.materiasFilas,
        { materia: null, plan: null, actividad: null },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedFilas = [...formData.materiasFilas];
    updatedFilas.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      materiasFilas: updatedFilas,
    }));
  };

  return (
    <form
      className="flex max-w-lg mx-auto flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {/* Rest of the form fields (identificacion, nombre, correo, celular) */}
      {/* ... */}

      <Table className="mb-4">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Plan</th>
            <th>Actividades</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formData.materiasFilas.map((fila, index) => (
            <tr key={index}>
              <td>
                <Select
                  options={materias.map((materia) => ({
                    label: materia.nombre,
                    value: materia._id,
                  }))}
                  value={fila.materia}
                  onChange={(selectedOption) =>
                    handleMateriaChange(selectedOption, index)
                  }
                />
              </td>
              <td>
                <Select
                  options={planes.map((plan) => ({
                    label: plan.nombre,
                    value: plan._id,
                  }))}
                  value={fila.plan}
                  onChange={(selectedOption) =>
                    handlePlanChange(selectedOption, index)
                  }
                />
              </td>
              <td>
                <Select
                  options={
                    fila.plan === "personalizado"
                      ? actividades
                      : planActividades
                  }
                  value={fila.actividad}
                  onChange={(selectedOptions) =>
                    handleActividadChange(selectedOptions, index)
                  }
                  isMulti // Habilitar el modo multiselect
                  isDisabled={fila.plan === "personalizado"} // Deshabilitar si el plan es "Personalizado"
                />
              </td>
              <td>
                <Button color="danger" onClick={() => removeRow(index)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <p>Total: {calculateTotal()} USD</p>
      </div>

      <Button color="success" onClick={addRow}>
        Agregar Fila
      </Button>

      <Button type="submit" color="dark">
        Submit
      </Button>
    </form>
  );
}

export default CotizacionForm;
