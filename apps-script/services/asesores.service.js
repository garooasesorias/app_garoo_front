function insertAsesor(document) {
  const result = new MongoDBLib("asesores").insertDocument("insertOne",document);
  return result;
}

function getAsesores() {
  const collectionName = "asesores"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = { _id: 1 }; // Your sort order
  const limit = 10; // Limit the number of documents
 // const documents = mongoDB.getAsesoresWithSkillsAndEspecialidades
  const documents = mongoDB.getSkillsWithEspecialidades(
    "aggregate",
    query,
    order,
    limit
  );
  console.log("Documents with related activities:", documents);
  return documents;
}

function getAsesoresById(id) {
 /* const collectionName = "asesores"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id }, // Replace with the specific _id you want to search for
  }; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getAsesoresWithSkillsAndEspecialidades(
    "aggregate",
    query,
    order,
    limit
  );
  return documents;*/
}

function updateAsesoresById() {}

