const { cloudinary } = require("../utils/cloudinary");
const express = require("express");
const router = express.Router();

require("dotenv").config();

const multer = require("multer");
const uuid = require("uuid/v4");
const path = require("path");

var upload = multer({ dest: "./public/uploads" });

router.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

const fs = require("fs");
function delete_file(name_file) {
  try {
    fs.unlinkSync(`./public/uploads/${name_file}`);
    console.log("Archivo removidoPropTypes.any,");
  } catch (err) {
    console.error("Algo salio mal al remover el archivo.", err);
  }
}

router.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    await cloudinary.uploader.upload(req.file.path, function (error, result) {
      delete_file(result.original_filename);
      console.log(result.url, 'result');
      res.json({ msg: "La imagen se a subido correctamente.", url: result.url });
    });
  } catch (err) {
    console.error("Algo sali mal al subir la imagen.", err)
  }
  
});

module.exports = router;
