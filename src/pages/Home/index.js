import DatePicker from "react-datepicker";

function Home() {
  return (
    <>
      <DatePicker
        selected={selectedDates[actividadIndex]}
        // onChange={(date) => handleDateChange(date, actividadIndex)}
        dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de fecha
        isClearable // Permite borrar la fecha seleccionada
        className="datepicker-custom"
      />
    </>
  );
}

export default Home;
