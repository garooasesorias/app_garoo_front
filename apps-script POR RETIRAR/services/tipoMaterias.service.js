function insertTipoMateria(document) {
  const result = new MongoDBLib("tipoMaterias").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getTiposMateria() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("tipoMaterias").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function deleteTiposmById(id) {
  const filter = {
    _id: { $oid: id },
  };

  const result = new MongoDBLib("tipoMaterias").deleteDocument(
    "deleteOne",
    filter,
  );
  return result;
}
function getTipoMateriaById() {}

function updateTipoMateriaById() {}
