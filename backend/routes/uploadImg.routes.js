const { cloudinary } = require("../utils/cloudinary");
const express = require("express");
const router = express.Router();

require("dotenv").config();

const multer = require("multer");

var upload = multer({ dest: "./public/uploads" });

// Funcion para eliminar una imagen de los archivos del servidor
const fs = require("fs");
function delete_file(name_file) {
  try {
    fs.unlinkSync(`./public/uploads/${name_file}`);
    console.log("Archivo removidoPropTypes.any,");
  } catch (err) {
    console.error("Algo salio mal al remover el archivo.", err);
  }
}
// Fin de la funcion

// Peticion para subir una nueva imagen
router.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    await cloudinary.uploader.upload(req.file.path, function (error, result) {
      delete_file(result.original_filename);
      console.log(result.url, 'result');
      res.json({ msg: "La imagen se a subido correctamente.", url: result.url, public_id: result.public_id });
    });
  } catch (err) {
    console.error("Algo sali mal al subir la imagen.", err)
  }
});
// Fin de la peticion para subir imagenes

module.exports = router;
