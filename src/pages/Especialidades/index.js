import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";
const { jsPDF } = window.jspdf;

const data = {
  fecha: "2023-10-20T13:19:08.116Z",
  cliente: {
    label: "Julian Benavides",
    value: "652f453e66c327116457d1fc",
    usuario: "saldarriaga",
  },
  items: [
    {
      materia: {
        label: "Calculo II",
        value: "64dc206ede10c0d9a0f360a6",
      },
      plan: {
        label: "Plan 3 ",
        value: "64dd1f111a3f8bb16e59b644",
      },
      planSubtotal: "400",
      descuento: {
        label: "Black Friday (10%)",
        value: "653066cfef5533b5c5966212",
      },
      actividad: [
        {
          label: "Quiz 2",
          value: "64dabe480add76a0a305a734",
        },
        {
          label: "Parcial 1",
          value: "64dac5867f3ef1926f2b73a3",
        },
      ],
    },
  ],
  divisionPagos: [
    {
      numeroDivision: 1,
      monto: "180.00",
      fechaLimite: "2023-10-20",
    },
    {
      numeroDivision: 2,
      monto: "180.00",
      fechaLimite: "2023-10-27",
    },
  ],
  total: 360,
  estado: {
    label: "Generada",
    value: "64e600985fef1743de870cbc",
  },
};

const generatePDF = async () => {
  const doc = new jsPDF();

  // Lista de URLs de las imágenes
  const imageUrls = [
    "https://drive.google.com/uc?export=view&id=19WEtck882Nc0uuMfmB7KLC0D9jjPCjwu",
    // ... agregar más URLs según necesites
  ];

  // Función para obtener una imagen en formato base64 a partir de su URL
  const fetchImageAsBase64 = async (url) => {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  };

  // Obtener todas las imágenes en base64
  const imagesBase64 = await Promise.all(
    imageUrls.map((url) => fetchImageAsBase64(url))
  );

  // Página de bienvenida
  doc.setFontSize(24);
  doc.text("Bienvenido", 80, 50);

  doc.setFontSize(18);
  doc.text(data.cliente.usuario, 80, 80);

  doc.setFontSize(14);
  doc.text("Sabemos lo importante que es para ti", 10, 110);
  doc.text("alcanzar tus objetivos académicos, y", 10, 125);
  doc.text("estamos aquí para ayudarte a lograrlos de", 10, 140);
  doc.text("una manera rápida y eficaz", 10, 155);

  // Reemplaza 'logoBase64' con la data de tu imagen en formato base64.
  doc.addImage(imagesBase64[0], "JPEG", 10, 10, 50, 50);

  // Agrega una nueva página para la cotización
  doc.addPage();

  // Encabezado
  doc.text("Cotización para: " + data.cliente.label, 10, 20);
  doc.text("Fecha: " + new Date(data.fecha).toLocaleDateString(), 10, 30);
  doc.text(
    "Recuerda que el precio de esta cotización expira en las próximas 24 horas",
    10,
    40
  );

  // Tabla de items
  const headers = [["Materia", "Plan", "Actividades", "Subtotal", "Descuento"]];
  const body = data.items.map((item) => [
    item.materia.label,
    item.plan.label,
    item.actividad.map((act) => act.label).join(", "),
    `$${item.planSubtotal}`,
    item.descuento.label,
  ]);

  doc.autoTable({
    startY: 50,
    head: headers,
    body: body,
  });

  // Tabla de división de pagos
  const paymentHeaders = [["No. Cuota", "Fecha de Pago", "Valor"]];
  const paymentBody = data.divisionPagos.map((pago) => [
    pago.numeroDivision,
    new Date(pago.fechaLimite).toLocaleDateString(),
    `$${pago.monto}`,
  ]);

  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 10,
    head: paymentHeaders,
    body: paymentBody,
  });

  // Total
  doc.text("Total: $" + data.total, 10, doc.autoTable.previous.finalY + 20);

  // Guardar el PDF
  doc.save("cotizacion.pdf");
};

function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setEspecialidades(data);
        })
        .getEspecialidades();
    };

    fetchData();
  }, []);

  // Llamar a la función
  generatePDF();

  return (
    <>
      <Link to="/formEspecialidades">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Especialidades +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Especialidad</Table.HeadCell>
          {/*<Table.HeadCell>Tipo</Table.HeadCell>*/}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {especialidades &&
            especialidades.map((especialidad) => (
              <Table.Row
                key={especialidad._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{especialidad.nombre}</Table.Cell>
                {/*<Table.Cell>{materia.tipoNombre}</Table.Cell>*/}
                <Table.Cell>
                  <Link
                    to={`/editEspecialidad/${especialidad.id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Especialidades;
