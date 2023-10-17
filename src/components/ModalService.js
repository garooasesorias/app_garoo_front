import React from "react";
import { Button, Label, TextInput } from 'flowbite-react';


function ModalService() {
    return <>
    <form className="flex max-w-md flex-col gap-4">
      <div className="max-w-md">
      <div className="mb-2 block">
        <Label
          htmlFor="identificacion"
          value="Identificacion"
        />
      </div>
      <TextInput
        addon="ID"
        id="username1"
        placeholder="123456789"
        required
      />
    </div>
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label
          htmlFor="username"
          value="Username"
        />
      </div>
      <TextInput
        addon="@"
        id="username1"
        placeholder="Garoo Asesorias"
        required
      />
    </div>
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label
          htmlFor="celular"
          value="Celular"
        />
      </div>
      <TextInput
        addon="#"
        id="username1"
        placeholder="3000000003"
        required
      />
    </div>
      <Button type="submit" color="dark">
        Submit
      </Button>
    </form>
        </>
}
export default ModalService