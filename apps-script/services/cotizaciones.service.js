function insertCotizacion(document) {
  const result = new MongoDBLib("cotizaciones").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getCotizaciones() {
  const collectionName = "cotizaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCotizacionesWithItems(
    "aggregate",
    query,
    order,
    limit
  );
  console.log("Documents with related Items:", documents);
  return documents;
}

function getCotizacionById(id) {
  const collectionName = "cotizaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id }, // Replace with the specific _id you want to search for
  }; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCotizacionesWithItems(
    "aggregate",
    query,
    order,
    limit
  );
  return documents;
}

function updateCotizacionById() {}
