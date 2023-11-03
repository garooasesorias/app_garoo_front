function getNotificaciones() {
  const collectionName = "cursos"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);
  const fecha = new Date();

  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // getMonth() devuelve un índice basado en 0, por lo tanto sumamos 1
  const dia = fecha.getDate().toString().padStart(2, "0");

  const currentDate = `${año}-${mes}-${dia}`;
  // const query = {};

  // const order = {};
  // const limit = 10;

  const documents = mongoDB.getDocumentsWithExpiredActivities(
    "aggregate",
    currentDate
  );
  return documents;
}
