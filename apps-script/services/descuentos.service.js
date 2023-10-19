function insertDescuento(document) {
  const result = new MongoDBLib("descuentos").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getDescuentos() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("descuentos").getDocuments(
    "find",
    query,
    order,
    limit
  );

  return result;
}

function getDescuentoById(id) {
  const query = {
    _id: { $oid: id },
  };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("descuentos").getDocuments(
    "find",
    query,
    order,
    limit
  );

  return result;
}

function updateDescuentoById(id, data) {
  const filter = {
    _id: { $oid: id },
  };
  const update = {
    $set: data,
  };

  const result = new MongoDBLib("descuentos").updateDocument(
    "updateOne",
    filter,
    update
  );
  return result;
}
