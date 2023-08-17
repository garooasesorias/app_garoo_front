function insertPlan(document) {
  const result = new MongoDBLib("planes").insertDocument("insertOne", document);
  return result;
}

function getPlanes() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("planes").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getPlanById() {}

function updatePlanById() {}
