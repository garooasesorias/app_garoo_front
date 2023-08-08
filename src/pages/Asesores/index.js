import React from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Avatar, Dropdown, Card } from "flowbite-react";
import { Progress } from "flowbite-react";
import { Link } from "react-router-dom";

function Asesores() {
  // Contenido del componente Asesores
  return (
    <>
      <Link to="/formAsesores">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear Asesor +
        </Button>
      </Link>
      <Card className="width:200%">
        <div className="flex justify-end px-4 pt-4 ">
          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
              >
                <p>Edit</p>
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
              >
                <p>Export Data</p>
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
              >
                <p>Delete</p>
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <Avatar
            Display
            Name
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src="/src/images/profile-garoo.jpeg"
            width="200"
            status="online"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            MATEMATICAS
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              href="#"
            >
              <p>10 PROYECTOS</p>
            </a>
            <a
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              href="#"
            >
              <p>ACTIVO</p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <Table className="w-min">
            <Table.Head>
              <Table.HeadCell> Especialidades</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className=""></Table.Row>
              <Table.Cell>Algebra</Table.Cell>
              <Table.Cell>Calculo...</Table.Cell>
              <Table.Cell>Ingles</Table.Cell>
              <Table.Row className=""></Table.Row>
              <Table.Cell>Calculo ...</Table.Cell>
              <Table.Cell>Matema....</Table.Cell>
              <Table.Cell>Pensamie...</Table.Cell>
              <Table.Row className=""></Table.Row>
              <Table.Cell>Calculo...</Table.Cell>
              <Table.Cell>Program...</Table.Cell>
              <Table.Cell>Probabi...</Table.Cell>
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-medium dark:text-dark">SKILLS</div>

          <Progress
            labelProgres
            labelText
            textLabel="CB"
            size="lg"
            color="dark"
            progress={75}
          />
          <Progress
            labelProgres
            labelText
            textLabel="DIS"
            size="lg"
            color="dark"
            progress={25}
          />
          <Progress
            labelProgres
            labelText
            textLabel="LE"
            size="lg"
            color="dark"
            progress={95}
          />
          <Progress
            labelProgres
            labelText
            textLabel="OPE"
            size="lg"
            color="dark"
            progress={5}
          />
          <Progress
            labelProgres
            labelText
            textLabel="SIS"
            size="lg"
            color="dark"
            progress={85}
          />
        </div>
      </Card>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            <Dropdown
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="./src/images/profile-garoo.jpeg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Dropdown>
          </Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Cargo</Table.HeadCell>
          <Table.HeadCell>Celular</Table.HeadCell>
          <Table.HeadCell>Rol</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple MacBook Pro 17"
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <p>Microsoft Surface Pro</p>
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default Asesores;
