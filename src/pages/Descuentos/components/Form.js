import React, { useRef, useState, useEffect } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { useParams } from "react-router-dom";

function DescuentoForm() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    descripcion: "",
    porcentaje: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });
  const [showToast, setShowToast] = useState(false);
  const props = { showToast, setShowToast };

  const { id } = useParams();
  const [action, setAction] = useState("created");

  useEffect(() => {
    if (id) {
      google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setDescuento(data[0]);
        })
        .getDescuentoById(id);
    }
  }, [id]);

  const setDescuento = (descuento) => {
    setFormData({
      descripcion: descuento.descripcion || "",
      porcentaje: descuento.porcentaje || "",
      fechaInicio: descuento.fechaInicio || "",
      fechaFin: descuento.fechaFin || "",
      estado: descuento.estado || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      google.script.run
        .withSuccessHandler((response) => {
          setAction("updated");
          props.setShowToast(!props.showToast);
        })
        .updateDescuentoById(id, formData);
    } else {
      google.script.run
        .withSuccessHandler((response) => {
          setAction("created");
          props.setShowToast(!props.showToast);
        })
        .insertDescuento(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {props.showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Descuento {action} con Éxito
          </div>
          <Toast.Toggle onDismiss={() => props.setShowToast(false)} />
        </Toast>
      )}
      <form
        ref={formRef}
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="max-w-md">
          <Label htmlFor="descripcion" value="Descripción" />
          <TextInput
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <Label htmlFor="porcentaje" value="Porcentaje" />
          <TextInput
            type="number"
            id="porcentaje"
            name="porcentaje"
            value={formData.porcentaje}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <Label htmlFor="fechaInicio" value="Fecha Inicio" />
          <TextInput
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <Label htmlFor="fechaFin" value="Fecha Fin" />
          <TextInput
            type="date"
            id="fechaFin"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="max-w-md">
          <Label htmlFor="estado" value="Estado" />
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            <option value="activa">Activa</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
    </>
  );
}

export default DescuentoForm;
