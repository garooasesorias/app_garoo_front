function insertCurso(document) {
  const result = new MongoDBLib("cursos").insertDocument("insertOne", document);
  return result;
}

function getCursos() {
  const collectionName = "cursos"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCursos("aggregate", query, order, limit);
  return documents;
}

function getCursoById(id) {
  const collectionName = "cursos"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id },
  };
  const order = {};
  const limit = 10;

  const documents = mongoDB.getCursos("aggregate", query, order, limit);
  console.log(id);
  console.log("Documents with related Items:", documents);
  return documents;
}

function updateCursoById(id, data) {
  const filter = {
    _id: { $oid: id },
  };
  const update = {
    $set: data,
  };

  const result = new MongoDBLib("cursos").updateDocument(
    "updateOne",
    filter,
    update
  );
  return result;
}
