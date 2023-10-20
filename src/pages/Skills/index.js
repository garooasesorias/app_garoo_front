import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          setSkills(data);
        })
        .getSkills();
    };

    fetchData();
  }, []);

  return (
    <>
    <h1 className="PagesTitles">Skills</h1>
      <Link to="/formSkills">
        <Button className="shadow mb-5 ms-auto mr-5" color="success">
          Crear skill +
        </Button>
      </Link>
      <Table>
        <Table.Head>
          {/* <Table.HeadCell>Id</Table.HeadCell> */}
          <Table.HeadCell>Nombre de Skills</Table.HeadCell>
          {/*<Table.HeadCell>Tipo</Table.HeadCell>*/}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {skills &&
            skills.map((skill) => (
              <Table.Row
                key={skill._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{skill.nombre}</Table.Cell>
                {/*<Table.Cell>{materia.tipoNombre}</Table.Cell>*/}
                <Table.Cell>
                  <Link
                    to={`/editSkill/${skill.id}`}
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

export default Skills;
