const express = require("express");
const router = express.Router();
const multer = require("multer");
//const { v4: uuidv4 } = require('uuid');
const uuid = require('uuid/v4');
const path = require("path");
const { Storage } = require("@google-cloud/storage");

require('dotenv').config()


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY
  }
});

let uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileZise: 5 * 1024 * 1024
  }
});

const bucket = storage.bucket(process.env.GCS_BUCKET)

router.post('/imageupload', uploadHandler.single('file'), (req, res) => {
  const newFileName = uuid() + path.extname(req.file.originalname);
  const blob = bucket.file(newFileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true
  }).on('finish', () => {
    const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
    res.json(publicURL);
  });
  blobStream.end(req.file.buffer);
});

/*
const filename = './public/uploads/7d367c5d-8a68-4956-8098-10d623de5144.png';
const destination = '7d367c5d-8a68-4956-8098-10d623de5144.png';

const storageG = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY
  }
});

// [START public_url]
function getPublicUrl(destination) {
  console.log(`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${destination}`);
}
// [END public_url]


// [START upload_image]
async function uploadFile() {
await storageG.bucket(process.env.GCS_BUCKET).upload(filename, {
  destination: destination,
  metadata: {
    cacheControl: 'public, max-age=31536000',
  },
});
console.log(`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${destination}`);
console.log(`${filename} uploaded to ${process.env.GCS_BUCKET}.`);
}
// [END upload_image]

uploadFile().catch(console.error);

//getPublicUrl(destination);







const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req,file,cb) => {
      return cb(null, uuid()+path.extname(file.originalname))
  }
});


const cargarImagen = multer({
  fileFilter: function (req, file, cb) {
    console.log('file',file)
    console.log('cb',cb())
      if (file.mimetype !== 'image/png') {
       req.fileValidationError = 'El tipo de archivo es invalido.';
       return cb(null, false, new Error('El tipo de archivo es invalido.'));
      }
      cb(null, true);
     },
  storageG,
  limits: {fileSize: 5 * 1024 * 1024}
  
}).single('image');

router.post('/images/upload', (req,res) => {

  cargarImagen(req,res,(err) => {
      if(err){
          err.message = 'Error al cargar imagen.';
          return res.send(err);
      }else if(req.fileValidationError){
          return res.end(req.fileValidationError);
      }else{
          res.send('Archivo subido.');
      }
  })
})
*/

module.exports = router;