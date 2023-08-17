function insertPlan(document) {
  const result = new MongoDBLib("planes").insertDocument("insertOne", document);
  return result;
}

function getPlanes() {
<<<<<<< HEAD
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("planes").getDocuments(
    "find",
=======
  const collectionName = "planes"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = { _id: 1 }; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getDocumentsWithActivities(
    "aggregate",
>>>>>>> a454435c168cab7d8871cae19dad1bcea213db51
    query,
    order,
    limit
  );
<<<<<<< HEAD
  return result;
=======
  console.log("Documents with related activities:", documents);
  return documents;
>>>>>>> a454435c168cab7d8871cae19dad1bcea213db51
}

function getPlanById() {}

function updatePlanById() {}
