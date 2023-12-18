function insertAsesor(document) {
  const result = new MongoDBLib("asesores").insertDocument("insertOne", document);
  return result;
}

function getAsesores() {
  const collectionName = "asesores"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {}; // Your query conditions
  const order = { _id: 1 }; // Your sort order
  const limit = 10; // Limit the number of documents

  const documents = mongoDB.getSkillsWithEspecialidades(
    "aggregate",
    query,
    order,
    limit
  );
  console.log("Documents with related skllis and espe:", documents);
  return documents;
}

function getAsesoresById() {
 
}

function updateAsesoresById() {}

function uploadFilesToGoogleDrive(data, name, type) {
  console.log("uploadFilesToGoogleDrive");
  var datafile = Utilities.base64Decode(data); // convert to Binary (from Base4) Utilities is native from AppsScript
  var blob = Utilities.newBlob(datafile, type, name); // structure the file
  var folder = DriveApp.getFolderById("14lYRccoOW7AOqp-_lKOwr_ynFvl0LXym"); //select folder to save
  var newFile = folder.createFile(blob); // create and save
  newFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); // set permision to anyone to view
  var url = newFile.getUrl(); //get the file URL to share
  console.log("url imagen google drive ", url);
  var id = newFile.getId();
  let obj = { url, id }; //prepare object to response
  return obj;
}

function deleteAsesorById(id) {
  const filter = {
    _id: { $oid: id },
  };

  const result = new MongoDBLib("asesores").deleteDocument(
    "deleteOne",
    filter,
  );
  return result;
}