function insertAsignamiento(document) {
  const result = new MongoDBLib("cursos").insertDocument("insertOne", document);
  return result;
}

function getAsignamientos() {
  const collectionName = "cursos"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCursos("aggregate", query, order, limit);
  return documents;
}

function getAsignamientoById(id) {
  const collectionName = "cursos"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id },
  };

  const order = {};
  const limit = 10;

  const documents = mongoDB.getCursos("aggregate", query, order, limit);
  console.log("Documents with related Items:", documents);
  return documents;
}

function updateAsignamientoById(idObject, data) {
  const update = {
    $set: data,
  };

  const result = new MongoDBLib("asignamientos").updateDocument(
    "updateOne",
    idObject,
    update
  );
  return result;
}
