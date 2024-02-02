import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (content = "Hola Mundo", options = {}) => {
  const doc = new jsPDF();

  // Posición inicial para el contenido
  let y = 10;

  // Agregar texto principal al documento
  doc.text(content, 10, y);
  y += 10; // Incrementar y para el próximo contenido

  // Si hay contenido adicional de texto, añádelo
  if (options.additionalText) {
    doc.text(options.additionalText, 10, y);
    y += 10; // Incrementar y para el próximo contenido
  }

  // Si hay más texto para añadir
  if (options.moreText) {
    options.moreText.forEach(textLine => {
      doc.text(textLine, 10, y);
      y += 10; // Incrementar y para cada línea de texto
    });
  }

  // Agregar una tabla con contenido al azar
  const tableColumnNames = ["ID", "Nombre", "Valor"];
  const tableRows = [
    [1, "Producto 1", "$30.00"],
    [2, "Producto 2", "$45.00"],
    [3, "Producto 3", "$25.00"]
    // Puedes agregar más filas aquí
  ];

  doc.autoTable(tableColumnNames, tableRows, { startY: y });
  y = doc.lastAutoTable.finalY; // Actualizar la posición de 'y' después de la tabla

  // Guardar el PDF generado
  doc.save('generatedDocument.pdf');
};

export default generatePDF;
