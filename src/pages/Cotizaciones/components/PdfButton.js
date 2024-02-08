import React from "react";
import { Button } from "flowbite-react";
import generatePDF from "../../../utils/pdfGenerator"; // Importa la función desde utils

export default function PdfButton(props) {
  const handleGeneratePDF = () => {
    generatePDF(props.data); // Usa la función importada con los datos pasados al componente
  };

  return (
    <Button type="button" color="blue" onClick={handleGeneratePDF}>
      Generar PDF
    </Button>
  );
}
