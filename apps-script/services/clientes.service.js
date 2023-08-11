function insertCliente(document) {
  const result = new MongoDBLib("clientes").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getClientes() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("clientes").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getClienteById() {}

function updateClienteById() {}
