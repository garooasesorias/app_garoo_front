function insertPlan(document) {
  const result = new MongoDBLib("planes").insertDocument("insertOne", document);
  return result;
}

function getPlanes() {
  const collectionName = "planes"; // Replace with your collection name
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


function deletePlanById(id) {
  const filter = {
    _id: { $oid: id },
  };

  const result = new MongoDBLib("planes").deleteDocument(
    "deleteOne",
    filter,
  );
  return result;
}

function getPlanById() {}

function updatePlanById() {}
