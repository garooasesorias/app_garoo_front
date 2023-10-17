// const findEndpoint =
//   "https://us-east-1.aws.data.mongodb-api.com/app/data-wrmqs/endpoint/data/v1/action/find";
// const clusterName = "Cluster0";
// const apiKey =
//   "FUQ2alqUudxvlD7vmU2cTDdUhtYdBnWf8WOEyRFCDk9APPPPtefutF1579Pf0lMi";

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

function doPost(request = {}) {
  const { parameter, postData: { contents, type } = {} } = request;
  const { dataReq = {} } = JSON.parse(contents); //content
  const { fname = {} } = JSON.parse(contents); //function name

  const response = {
    status: "function not found: " + fname, // prepare response in function not found
    data2: dataReq,
  };
  switch (
    fname //function selection
  ) {
    case "uploadFilesToGoogleDrive":
      var output = JSON.stringify(
        uploadFilesToGoogleDrive(dataReq.data, dataReq.name, dataReq.type)
      ); //call function with data, name and type from request
      break;
    default:
      var output = JSON.stringify(response);
      break;
  }
  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  ); //response to frontend
}

// function getClientes() {
//   const query = { business_name: { $regex: `American`, $options: 'i' } }
//   const order = { business_name: 1, date: -1 }
//   const limit = 100
//   //We can Specify sort, limit and a projection here if we want
//   const payload = {
//     filter: query, sort: order, limit: limit,
//     collection: "inspections", database: "sample_training", dataSource: clusterName
//   }

//   const options = {
//     method: 'post',
//     contentType: 'application/json',
//     payload: JSON.stringify(payload),
//     headers: { "api-key": apiKey },
//     muteHttpExceptions: true
//   };

//   const response = UrlFetchApp.fetch(findEndpoint, options);
//   const documents = JSON.parse(response.getContentText()).documents;
//   return env.clusterName;
// }
