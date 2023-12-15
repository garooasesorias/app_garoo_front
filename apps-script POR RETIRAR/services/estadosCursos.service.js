function insertEstadoCurso(document) {
  const result = new MongoDBLib("estadosCursos").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getEstadosCursos() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("estadosCursos").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getEstadoCursoById() {}

function updateEstadoCursoById() {}
