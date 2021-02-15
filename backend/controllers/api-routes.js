const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const uuid = require("uuid")
const uuidv1 = uuid.v1;

require("dotenv").config()

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
})

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const bucket = storage.bucket(process.env.GCS_BUCKET)

module.exports = function(app) {

}