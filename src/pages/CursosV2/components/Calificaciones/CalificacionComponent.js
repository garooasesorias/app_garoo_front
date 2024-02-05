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

  const fetchData = async () => {
    const asignamientos = (
      await asignamientoService.getAsignamientoesByIdCurso(data._id)
    ).data;

    const calificaciones = (
      await calificacionService.getCalificacionesByIdCurso(data._id)
    ).data;

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

    const clientes = await clienteService.getClientes();
    setClientes(clientes.data);
  };

  useEffect(() => {
    fetchData();
    console.log("refreshCalificaciones ", refreshCalificaciones);
    if (refreshCalificaciones) {
      fetchData();
      setRefreshCalificaciones(false); // Restablece el flag
    }
  }, [refreshCalificaciones]);

  const handleEstudianteChange = async (selectedOption) => {
    const calificaciones = formData.itemsHead.map((item) => ({
      estudiante: selectedOption.value,
      asignamiento: item.id,
      puntaje: 0,
      entregableURL: null,
    }));

    setLoading(true);
    const resultInsertion = await calificacionService.insertCalificaciones(
      calificaciones
    );

    fetchData();
    setLoading(false);
  };

  // Función para manejar el cambio en las calificaciones
  const handleNotaChange = async (calificacionId, newValue) => {
    setLoading(true);
    const resultUpdate = await calificacionService.updatePuntaje(
      {
        _id: calificacionId,
      },
      newValue
    );

    fetchData();
    setLoading(false);
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

const array = [
  [
    {
      idEstudiante: "655cbc8bc158ce073cb420d0",
      nombreEstudiante: "estudiante.nombre",
    },
    {
      idAsignamiento: "65bdeed12c99c13b9df58e17",
      idCalificacion: "65c0fa23c621dfac20aafcef",
      puntaje: "calificaion.puntaje",
    },
    {
      idAsignamiento: "65bdeed12c99c13b9df58e16",
      idCalificacion: "65c0fa23c621dfac20aafcf0",
      puntaje: "calificaion.puntaje",
    },
  ],
  [
    {
      idEstudiante: "65c0e9c9169c8c36ca58427d",
      nombreEstudiante: "estudiante.nombre",
    },
    {
      idAsignamiento: "65bdeed12c99c13b9df58e17",
      idCalificacion: "65c0fa46c621dfac20aafd0a",
      puntaje: "calificaion.puntaje",
    },
    {
      idAsignamiento: "65bdeed12c99c13b9df58e16",
      idCalificacion: "65c0fa46c621dfac20aafd0b",
      puntaje: "calificaion.puntaje",
    },
  ],
];
