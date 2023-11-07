import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import Loader from "../../components/Loader.js";
import styles from "../../styles/main.scss";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from an external source (assuming it's an array of objects)
    const fetchData = async () => {
      await google.script.run
        .withSuccessHandler((data) => {
          console.log(data);
          setCursos(data);
          setLoading(false);
        })
        .getCursos();
    };
    fetchData();
  }, []);

  return <></>;
}

export default Cursos;
