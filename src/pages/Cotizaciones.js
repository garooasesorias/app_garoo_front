import React from "react";
import { Button, Checkbox } from "flowbite-react";
import { Table } from "flowbite-react";


function Cotizaciones() {
    return (<>
      <Button className="shadow mb-5 ms-auto mr-5" color="success">Cotizar</Button>
      <Button className="shadow mb-5 ms-auto mr-5" color="Dark">Informe Diario</Button>


      <Table className="border-gray-500 dark:bg-gray-800">
        <Table.Head>
        <Table.HeadCell>Planes Académicos 2023</Table.HeadCell>
        </Table.Head>
        <Table.Head>
        <Table.HeadCell>Actividades</Table.HeadCell>
          <Table.HeadCell color="warning">Plan Esencial</Table.HeadCell>
          <Table.HeadCell color="blue">Plan Básico</Table.HeadCell>
          <Table.HeadCell color="gray"> Plan Grupal</Table.HeadCell>
          <Table.HeadCell color="success">Plan Personal</Table.HeadCell>
          <Table.HeadCell color="default">Plan Personal Plus</Table.HeadCell>
          <Table.HeadCell color="failure">Plan Premium</Table.HeadCell>
          <Table.HeadCell color="purple">Plan Grupal plus</Table.HeadCell>

        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Actividades evaluativas
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <p>Trabajo Colaborativo</p>
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Participación de foros
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Proyecto Completo
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            1 Punto de entrega
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Coordinacion de Actividades con tu grupo
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Pagos flexibles
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row >
        </Table.Body>
      </Table>
 

 //*Segunda Tabla*//
 
      <Table>
        <Table.Head>
        <Table.HeadCell>Planes Académicos - Clientes POLI</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Actividades evaluativas
            </Table.Cell>
            <Table.Cell className="bg-warning-200">Plan Esencial</Table.Cell>
            <Table.Cell>Incluye actividades evaluativas </Table.Cell>
            </Table.Row>
            
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Materia completa -TC
            </Table.Cell>
            <Table.Cell color="blue">Plan Básico</Table.Cell>
            <Table.Cell>Incluye actividades evaluativas y trabajo colaborativo - semana 3,4 y 5</Table.Cell>
            </Table.Row>
            
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Proyecto completo grupal
            </Table.Cell>
            <Table.Cell color="gray">Plan Grupal</Table.Cell>
            <Table.Cell>Incluye proyecto completo (3 Entregas)</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Proyecto completo grupal
            </Table.Cell>
            <Table.Cell color="default">Plan Grupal Plus</Table.Cell>
            <Table.Cell>Incluye proyecto completo (3 Entregas) + actividades evaluativas + Cooridinación entregas</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            1 aporte por entrega
            </Table.Cell>
            <Table.Cell color="success">Plan Personal</Table.Cell>
            <Table.Cell>Incluye 1 punto/aporte por entrega</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            1 aporte + AE
            </Table.Cell>
            <Table.Cell color="purple">Plan Personal Plus</Table.Cell>
            <Table.Cell>Incluye 1 punto/aporte por entrega + actividades evaluativas</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Materia Completa
            </Table.Cell>
            <Table.Cell color="failure">Plan Premium</Table.Cell>
            <Table.Cell>Incluye 1 punto/aporte por entrega + actividades evaluativas + coordinación entregas</Table.Cell>
            </Table.Row>
            </Table.Body>
      </Table>



//Tercera Tabla//
<Table>
        <Table.Head>
        <Table.HeadCell>Entrega 1</Table.HeadCell>
        <Table.HeadCell>Entrega 2</Table.HeadCell>
        <Table.HeadCell>Entrega 3</Table.HeadCell>
        </Table.Head>
        <Table.Head>
        <Table.HeadCell>Calendario</Table.HeadCell>
          <Table.HeadCell color="warning">Semana 1</Table.HeadCell>
          <Table.HeadCell color="blue">Semana 2</Table.HeadCell>
          <Table.HeadCell color="gray"> Semana 3</Table.HeadCell>
          <Table.HeadCell color="success">Semana 4</Table.HeadCell>
          <Table.HeadCell color="default">Semana 5</Table.HeadCell>
          <Table.HeadCell color="failure">Semana 6</Table.HeadCell>
          <Table.HeadCell color="purple">Semana  7</Table.HeadCell>
          <Table.HeadCell color="purple">Semana  8</Table.HeadCell>
         </Table.Head>

         <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Actividades / Fechas Bloque 1
            </Table.Cell>
            <Table.Cell>14 Marzo</Table.Cell>
            <Table.Cell>21 Marzo</Table.Cell>
            <Table.Cell>28 Marzo</Table.Cell>
            <Table.Cell>4 Abril</Table.Cell>
            <Table.Cell>18 Abril</Table.Cell>
            <Table.Cell>25 Abril</Table.Cell>
            <Table.Cell>2 Mayo</Table.Cell>
            <Table.Cell>9 Mayo</Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-500 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Actividades / Fechas Bloque 2
            </Table.Cell>
            <Table.Cell>16 Mayo</Table.Cell>
            <Table.Cell>23 Mayo</Table.Cell>
            <Table.Cell>30 Mayo</Table.Cell>
            <Table.Cell>6 Junio</Table.Cell>
            <Table.Cell>13 Junio</Table.Cell>
            <Table.Cell>20 Junio</Table.Cell>
            <Table.Cell>27 Junio</Table.Cell>
            <Table.Cell>4 Julio</Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
           Actividad puntos evaluables 2/5/6
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Entrega 1
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
           Quiz 1/2
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Entrega 2
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          Entrega 3
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Trabajo Colaborativo
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Sustentacion Trabajo Colaborativo
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Parcial 1 
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Parcial 2
            </Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            <Table.Cell>  <Checkbox id="remember" /></Table.Cell>
            
          </Table.Row>

          
          </Table.Body>

</Table>

 </>

    );
}
export default Cotizaciones;