import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Modal, TextInput } from "flowbite-react";
import Select from "react-select";
import calificacionService from "../../../../services/calificacionService";
import clienteService from "../../../../services/clienteService";

export default function CalificacionComponent({ data }) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [clientes, setClientes] = useState([]);

  // Componente de Celda Editable
  const EditableCell = ({ value, onValueChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleBlur = () => {
      setIsEditing(false);
      onValueChange(localValue);
    };

    return isEditing ? (
      <TextInput
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
      />
    ) : (
      <span onClick={() => setIsEditing(true)}>{value}</span>
    );
  };

  const fetchData = async () => {
    const resultCalificaciones =
      await calificacionService.getCalificacionesByIdCurso(data._id);
    console.log("result calificaciones", resultCalificaciones);
    setCalificaciones(resultCalificaciones.data);

    const clientes = await clienteService.getClientes();
    setClientes(clientes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEstudianteChange = async (selectedOption) => {
    // const calificaciones = data.actividades.map((actividad) => ({
    //   estudiante: { $oid: selectedOption.value },
    //   curso: { $oid: data._id },
    //   actividad: {$oid: actividad._id},
    //   nota: 0,
    //   entregableURL: null,
    // }));

    const calificaciones = {
      estudiante: {
        $oid: selectedOption.value,
      },
      curso: { $oid: data._id },
      notas: data.actividades.map((actividad) => ({
        actividad: { $oid: actividad._id },
        puntaje: 0,
        entrableURL: null,
      })),
    };
    await google.script.run
      .withSuccessHandler((response) => {
        console.log("Calificaciones insertadas", response);
        fetchData();
      })
      .insertCalificaciones(calificaciones);
  };

  // Función para manejar el cambio en las calificaciones
  const handleNotaChange = (calificacionId, actividadId, newValue) => {
    // Actualizar el estado con el nuevo valor
    setCalificaciones(
      calificaciones.map((calificacion) => {
        if (calificacion._id === calificacionId) {
          return {
            ...calificacion,
            notas: calificacion.notas.map((nota) => {
              if (nota.actividad === actividadId) {
                return { ...nota, puntaje: newValue };
              }
              return nota;
            }),
          };
        }
        return calificacion;
      })
    );
  };

  return (
    <>
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Nombre Estudiante</Table.HeadCell>
          {data.actividades.map((actividad) => (
            <Table.HeadCell key={actividad._id}>
              {actividad.nombre}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {calificaciones &&
            calificaciones.map((calificacion) => (
              <Table.Row key={calificacion._id}>
                <Table.Cell>
                  {
                    clientes.find(
                      (cliente) => cliente._id === calificacion.estudiante
                    )?.nombre
                  }
                </Table.Cell>
                {calificacion.notas.map((nota) => (
                  <Table.Cell key={calificacion._id + nota.actividad}>
                    <EditableCell
                      value={nota.puntaje}
                      onValueChange={(newValue) =>
                        handleNotaChange(
                          calificacion._id,
                          nota.actividad,
                          newValue
                        )
                      }
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          <Table.Row>
            <Table.Cell>
              <Select
                options={clientes.map((estudiante) => ({
                  value: estudiante._id,
                  label: estudiante.nombre,
                }))}
                placeholder="Agregar Estudiante"
                onChange={(selectedOption) =>
                  handleEstudianteChange(selectedOption)
                }
              ></Select>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}
