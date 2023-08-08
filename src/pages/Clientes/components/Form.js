import React from "react";
import { Button, Label, TextInput } from "flowbite-react";

function Form() {
  return (
    <>
      <form className="flex max-w-md flex-col gap-4">
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="identificacion" value="Identificacion" />
          </div>
          <TextInput
            addon="ID"
            id="identificacion"
            placeholder="123456789"
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Username" />
          </div>
          <TextInput addon="Nombre" id="nombre" required />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="correo" value="correo" />
          </div>
          <TextInput
            addon="@"
            id="correo"
            placeholder="mail@mail.com"
            required
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="celular" value="Celular" />
          </div>
          <TextInput
            addon="#"
            id="username1"
            placeholder="3134599875"
            required
          />
        </div>
        <Button type="submit" color="dark">
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
