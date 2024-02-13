import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Modal, TextInput } from "flowbite-react";
import Select from "react-select";
import calificacionService from "../../../../services/calificacionService";
import clienteService from "../../../../services/clienteService";
import Loader from "../../../../components/Loader";
import asignamientoService from "../../../../services/asignamientoService";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function CalificacionComponent({
  data,
  refreshCalificaciones,
  setRefreshCalificaciones,
}) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemsHead: [],
    itemsBody: [],
  });

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

  // Agregar manejo de errores en fetchData
  const fetchData = async () => {
    try {
      setLoading(true); // Iniciar loading antes de la petición

      const asignamientosResponse =
        await asignamientoService.getAsignamientosByIdCurso(data._id);
      const asignamientos = asignamientosResponse.data;

      // Intentar cargar calificaciones, pero continuar normalmente si falla
      let calificaciones = [];
      try {
        const calificacionesResponse =
          await calificacionService.getCalificacionesByIdCurso(data._id);
        calificaciones = calificacionesResponse.data;
      } catch (error) {
        console.warn(
          "Error al cargar calificaciones, continuando con otros datos: ",
          error.message
        );
        // Aquí se maneja el error pero no se interrumpe el flujo normal
      }

      const itemsBody = createArray(asignamientos, calificaciones);
      setFormData({
        itemsHead: asignamientos.map((asignamiento) => ({
          id: asignamiento._id,
          nombreActividad: asignamiento.actividad.nombre,
          nombreAsesor: asignamiento.asesor?.nombre || "Sin asignar",
          fechaVencimiento: asignamiento.fechaVencimiento
            ? format(
                utcToZonedTime(parseISO(asignamiento.fechaVencimiento), "UTC"),
                "yyyy-MM-dd"
              )
            : "no establecido",
        })),
        itemsBody,
      });

      // Separar la carga de clientes para manejar sus errores de forma independiente
      try {
        const clientesResponse = await clienteService.getClientes();
        setClientes(clientesResponse.data);
      } catch (error) {
        console.error("Error al cargar los clientes: ", error.message);
        // Manejar el error de carga de clientes aquí, si es necesario
      }
    } catch (error) {
      console.error("Error al cargar los datos generales: ", error.message);
      // Manejar otros errores inesperados aquí
    } finally {
      setLoading(false); // Finalizar loading después de la petición
    }
  };

  useEffect(() => {
    fetchData();
    if (refreshCalificaciones) {
      fetchData();
      setRefreshCalificaciones(false); // Restablece el flag
    }
  }, [refreshCalificaciones, data]);

  const handleEstudianteChange = async (selectedOption) => {
    const calificaciones = formData.itemsHead.map((item) => ({
      estudiante: selectedOption.value,
      asignamiento: item.id,
      puntaje: 0,
      entregableURL: null,
    }));

    setLoading(true);
    try {
      // Intenta insertar las calificaciones
      const resultInsertion = await calificacionService.insertCalificaciones(
        calificaciones
      );
      console.log("Inserción exitosa:", resultInsertion);
      // Puedes agregar más lógica aquí si necesitas procesar resultInsertion
    } catch (error) {
      // Manejo de errores durante la inserción de calificaciones
      console.error("Error al insertar calificaciones:", error.message);
      // Aquí puedes mostrar un mensaje de error al usuario, si es necesario
    } finally {
      // fetchData se llama independientemente de si la inserción fue exitosa o no
      fetchData().finally(() => {
        setLoading(false);
      });
    }
  };

  // Función para manejar el cambio en las calificaciones
  const handleNotaChange = async (calificacionId, newValue) => {
    try {
      setLoading(true);
      await calificacionService.updatePuntaje(
        { _id: calificacionId },
        newValue
      );
      fetchData(); // Recargar datos después de la actualización
    } catch (error) {
      console.error("Error al actualizar la calificación: ", error.message);
      // Manejar el error en la UI aquí
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="LoaderContainerForm">{loading ? <Loader /> : null}</div>
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Nombre Estudiante</Table.HeadCell>
          {formData.itemsHead.map((item) => (
            <Table.HeadCell key={item.id}>
              {item.nombreActividad} <br />
              {item.fechaVencimiento} <br />
              {item.nombreAsesor} <br />
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {formData.itemsBody.length > 0 &&
            formData.itemsBody.map((studentData) => (
              <Table.Row key={studentData.studentDetails.idEstudiante}>
                <Table.Cell>
                  {studentData.studentDetails.nombreEstudiante}
                </Table.Cell>
                {studentData.scores.map((score) => (
                  <Table.Cell key={score.idCalificacion}>
                    <EditableCell
                      value={score.puntaje}
                      onValueChange={(newValue) =>
                        handleNotaChange(score.idCalificacion, newValue)
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

function createArray(assignments, scores) {
  // Create a map of assignments to keep the order
  const assignmentOrder = {};
  assignments.forEach((assignment, index) => {
    assignmentOrder[assignment._id] = index;
  });

  // Create a map to hold students and their scores as objects
  const studentsScores = {};
  scores.forEach((score) => {
    const studentId = score.estudiante._id;
    if (!studentsScores[studentId]) {
      studentsScores[studentId] = {
        studentDetails: {
          idEstudiante: studentId,
          nombreEstudiante: score.estudiante.nombre,
        },
        scores: new Array(assignments.length).fill(null).map(() => ({})),
      };
    }
    // Find the assignment order index and add the score object
    const orderIndex = assignmentOrder[score.asignamiento];
    studentsScores[studentId].scores[orderIndex] = {
      idAsignamiento: score.asignamiento,
      idCalificacion: score._id,
      puntaje: score.puntaje,
    };
  });

  // Convert the map to the final array structure
  const finalArray = Object.values(studentsScores).map((studentScores) => {
    return {
      studentDetails: studentScores.studentDetails,
      scores: studentScores.scores,
    };
  });

  return finalArray;
}
