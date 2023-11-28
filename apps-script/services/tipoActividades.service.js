function insertTipoActividad(document) {
  const result = new MongoDBLib("tipoActividades").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getTiposActividad() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("tipoActividades").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function deleteTiposActividadById(id) {
  const filter = {
    _id: { $oid: id },
  };

  const result = new MongoDBLib("tipoActividades").deleteDocument(
    "deleteOne",
    filter,
  );
  return result;
}

function getTipoActividadById() {}

function updateTipoActividadById() {}
