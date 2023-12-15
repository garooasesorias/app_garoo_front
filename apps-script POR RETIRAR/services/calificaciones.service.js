// function insertOperacion(document) {
//   const result = new MongoDBLib("operaciones").insertDocument(
//     "insertOne",
//     document
//   );
//   return result;
// }

function insertCalificaciones(document) {
  const result = new MongoDBLib("calificaciones").insertDocument(
    "insertOne",
    document
  );
  return result;
}

// function getOperaciones() {
//   const collectionName = "operaciones"; // Replace with your collection name
//   const mongoDB = new MongoDBLib(collectionName);

//   const query = {}; // Your query conditions
//   const order = {}; // Your sort order
//   const limit = 10; // Limit the number of documents

//   const documents = mongoDB.getDocuments("find", query, order, limit);
//   return documents;
// }

function getCalificacionesByIdCurso(idCurso) {
  const collectionName = "calificaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    curso: { $oid: idCurso },
  };

  const order = {};
  const limit = 10;

  const documents = mongoDB.getDocuments("find", query, order, limit);
  console.log("Documents with related Items:", documents);
  return documents;
}

// function getOperacionById(id) {
//   const collectionName = "operaciones"; // Replace with your collection name
//   const mongoDB = new MongoDBLib(collectionName);

//   const query = {
//     _id: { $oid: id },
//   };

//   const order = {};
//   const limit = 10;

//   const documents = mongoDB.getCursos("aggregate", query, order, limit);
//   console.log("Documents with related Items:", documents);
//   return documents;
// }

// function updateOperacionById(idObject, data) {
//   const update = {
//     $set: data,
//   };

//   const result = new MongoDBLib("operaciones").updateDocument(
//     "updateOne",
//     idObject,
//     update
//   );
//   return result;
// }
