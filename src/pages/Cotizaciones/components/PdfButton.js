import React from "react";
const { jsPDF } = window.jspdf;
import { Button } from "flowbite-react";

export default function PdfButton(props) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const data = props.data;
    // Encabezado
    doc.text("Cotización para: " + data.cliente.label, 10, 20);
    doc.text("Fecha: " + new Date(data.fecha).toLocaleDateString(), 10, 30);
    doc.text(
      "Recuerda que el precio de esta cotización expira en las próximas 24 horas",
      10,
      40
    );

    // Tabla de items
    const headers = [
      ["Materia", "Plan", "Actividades", "Subtotal", "Descuento"],
    ];
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
      startY: doc.autoTable.previous.finalY + 10, // Comenzar después de la tabla anterior
      head: paymentHeaders,
      body: paymentBody,
    });

    // Total
    doc.text("Total: $" + data.total, 10, doc.autoTable.previous.finalY + 20);

    // Guardar el PDF
    doc.save("cotizacion.pdf");
  };

  return (
    <Button type="button" color="blue" onClick={generatePDF}>
      Generar PDF
    </Button>
  );
}
