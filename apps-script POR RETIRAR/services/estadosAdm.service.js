function insertEstadoAdm(document) {
  const result = new MongoDBLib("estadosAdm").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getEstadosAdm() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("estadosAdm").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getEstadoAdmById() {}

function updateEstadoAdmById() {}