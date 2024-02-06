import jsPDF from "jspdf";
import "jspdf-autotable";
import clienteService from '../services/clienteService';
import planesService from '../services/planesService';
import descuentosService from '../services/descuentosService';
import materiasService from '../services/materiasService';

// Función de ayuda para obtener la etiqueta de un ítem dado
async function getItemLabel(service, itemId, labelName) {
  try {
    const response = await service(itemId);
    return response.data?.[labelName] || 'N/A';
  } catch (error) {
    console.error(`Error al obtener datos de ${labelName}:`, error);
    return 'N/A';
  }
}

// Función de ayuda para calcular el total de la fila
function calculateRowTotal(row, descuentoPorcentaje) {
  let total = parseFloat(row.planSubtotal) || 0;
  if (descuentoPorcentaje) {
    total -= total * (descuentoPorcentaje / 100);
  }
  return total;
}

const generatePDF = async (formData) => {
  const doc = new jsPDF();

  const clienteNombre = await getItemLabel(clienteService.getClienteById, formData.cliente, 'nombre');

  // Añadir logo
  if (formData.logoBase64) {
    doc.addImage(formData.logoBase64, "JPEG", 10, 10, 50, 30);
  }

  // Título del documento
  doc.setFontSize(18);
  doc.text("Cotización", 70, 20);

  // Información del cliente
  doc.setFontSize(12);
  doc.text(`Cliente: ${clienteNombre}`, 10, 50);
  doc.text(`Fecha: ${formData.fecha ? new Date(formData.fecha).toLocaleDateString() : 'N/A'}`, 10, 60);

  // Procesar cada item
  const items = await Promise.all(formData.items.map(async (item) => {
    const materialLabel = await getItemLabel(materiasService.getMateriaById, item.materia, 'nombre');
    const planLabel = await getItemLabel(planesService.getPlanById, item.plan, 'nombre');
    const descuentoLabel = await getItemLabel(descuentosService.getDescuentoById, item.descuento, 'descripcion');
    const descuentoPorcentaje = parseFloat(item.descuento?.porcentaje) || 0;
    const actividadesLabel = (item.actividades || []).map(act => act.label).join(", ") || 'N/A';

    return [
      materialLabel,
      planLabel,
      actividadesLabel,
      `$${item.planSubtotal || 0}`,
      descuentoLabel,
      `$${calculateRowTotal(item, descuentoPorcentaje)}`,
    ];
  }));

  // Añadir la tabla de items al PDF
  doc.autoTable({
    head: [['Materia', 'Plan', 'Actividades', 'Subtotal', 'Descuento', 'Total']],
    body: items,
    startY: 70,
  });

  // Total
  const finalY = doc.autoTable.previous.finalY + 10;
  doc.text(`Total: $${formData.total || 0}`, 10, finalY);

  // Pie de página
  doc.text("GarooAsesoríasAcadémicas", 10, doc.internal.pageSize.height - 20);

  // Guardar el PDF
  doc.save("cotizacion.pdf");
};

export default generatePDF;
