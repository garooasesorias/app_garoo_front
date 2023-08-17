function insertCotizacion(document) {
  const result = new MongoDBLib("cotizaciones").insertDocument("insertOne", document);
  return result;
}

function getCotizaciones() {
  const collectionName = "cotizaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = { _id: 1 }; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getDocumentsWithActivities(
    "aggregate",
    query,
    order,
    limit
  );
  console.log("Documents with related activities:", documents);
  return documents;
}

function getCotizacionById() {}

function updateCotizacionById() {}
