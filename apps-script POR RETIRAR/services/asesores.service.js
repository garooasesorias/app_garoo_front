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
function guardarArchivo(e) {
  var file = e.target.files[0];

  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    var rawLog = reader.result.split(",")[1];
    var dataSend = {
      data: rawLog,
      name: file.name,
      type: file.type,
    };

    // Cambia la URL de la API a la nueva ubicación en tu backend
    const apiUrl = 'http://localhost:puerto/api/uploadFilesToGoogleDrive'; // Ajusta la URL según tu configuración

    // Utiliza Axios u otra biblioteca para realizar solicitudes HTTP
    axios.post(apiUrl, dataSend)
      .then(response => {
        const fileId = response.data.id;
        const baseUrl = "https://drive.google.com/uc?export=view&id=";
        const nuevaUrl = baseUrl + fileId;

        console.log('Nueva URL formateada:', nuevaUrl);

        setFormData((prevData) => ({
          ...prevData,
          avatar: nuevaUrl,
        }));
      })
      .catch(error => {
        console.error('Error al subir archivo:', error);
        // Maneja el error según tus necesidades
      });
  };
}
