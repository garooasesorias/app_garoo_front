function insertEstadoCotizacion(document) {
  const result = new MongoDBLib("estadosCotizaciones").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getEstadosCotizaciones() {
  const query = {};
  // const order = { business_name: 1, date: -1 };
  const order = {};
  const limit = 100;

  const result = new MongoDBLib("estadosCotizaciones").getDocuments(
    "find",
    query,
    order,
    limit
  );
  return result;
}

function getEstadoCotizacionById() {}

function updateEstadoCotizacionById() {}
