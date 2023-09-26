const env = {
  //MONGODB API
  mongoDBAPI:
    "https://us-east-1.aws.data.mongodb-api.com/app/data-wrmqs/endpoint/data/v1/action/",
  mongoDBAPIKey:
    "FUQ2alqUudxvlD7vmU2cTDdUhtYdBnWf8WOEyRFCDk9APPPPtefutF1579Pf0lMi",
  mongoClusterName: "Cluster0",
    mongoDataBase: "academia_garoo",
//   mongoDataBase: "sample_training",
};

/*const {google} = require ('googleapis');
const path = require ('path');
const fs = require ('fs');


const CLIENT_ID = 
'359141085002-pqmrb8ooiemaq42tbkm7djs7q7mbbu03.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = 
'1//04dTiqFuHEZFBCgYIARAAGAQSNgF-L9IrjKvO6ZVeD1FoCJSgJwZTe13QYhbCXnHGK7JnzL1mqTuDhz91IkR-l4WsowjfmTjVjA';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

const filePath = path.join(__dirname, 'profile-garro.jpeg');

async function generatePublicUrl() {
  try {
    const fileId= '';
    await drive.permissions.create({
      filId : fileId,
      requestBody:{
        role: 'reader',
        type: 'anyone'
      }
    })
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink'
    })
    console.log(resul.data);
  } catch (error) {
    console.log(error.message);
  }
  
};
generatePublicUrl(); 
*/
