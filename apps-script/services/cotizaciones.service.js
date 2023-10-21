var imagesFiles = [
  { nombre: "logoGaroo", id: "19WEtck882Nc0uuMfmB7KLC0D9jjPCjwu" },
  { nombre: "logoNequi", id: "1ebNHvVH8Je1sDda-4EAmQ0OQcZwvyk25" },
  { nombre: "logoEfecty", id: "1aHg0PH0lgP5mNBaHEaeZV7XoTsTxVEam" },
  { nombre: "logoDavivienda", id: "1fMzH1flz9Kk5_xf9qxl672h80vPdyKFl" },
  { nombre: "logoDaviplata", id: "1k49gluP8NYtqsz5GKbjq7J9gLSrEbOW0" },
  { nombre: "logoEpayco", id: "1C5ma_ny3fzNDjSPZt-uDJd_exmUnh3CK" },
  { nombre: "logoBancolombia", id: "1c6bfNgM-w1WIi8ji0G6qgtYw8YYKoNyW" },
];

function insertCotizacion(document) {
  const result = new MongoDBLib("cotizaciones").insertDocument(
    "insertOne",
    document
  );
  return result;
}

function getCotizaciones() {
  const collectionName = "cotizaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCotizacionesWithItems(
    "aggregate",
    query,
    order,
    limit
  );
  console.log("Documents with related Items:", documents);
  return documents;
}

function getCotizacionById(id) {
  const collectionName = "cotizaciones"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id }, // Replace with the specific _id you want to search for
  }; // Your query conditions
  const order = {}; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getCotizacionesWithItems(
    "aggregate",
    query,
    order,
    limit
  );
  return documents;
}

function updateCotizacionById() {}

function getImagenesCotizacion() {
  return filesToBase64(imagesFiles);
}

function filesToBase64(filesArray) {
  for (var i = 0; i < filesArray.length; i++) {
    var file = DriveApp.getFileById(filesArray[i].id);
    var blob = file.getBlob();
    var data = Utilities.base64Encode(blob.getBytes());
    filesArray[i].base64 = data;
  }

  return filesArray;
}
