function insertCliente() {

  const result = new MongoDBLib("clientes").insertDocument("insertOne", {
    id: 1,
    nombre: "Alberto Diaz",
    identificacion: "304013456",
  });
  return result;
}

function getClientes() {
  const query = { business_name: { $regex: `American`, $options: "i" } };
  const order = { business_name: 1, date: -1 };
  const limit = 100;

  const result = new MongoDBLib("inspections").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getClienteById() {}

function updateClienteById() {}
