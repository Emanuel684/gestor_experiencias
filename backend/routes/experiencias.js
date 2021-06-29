const { Router } = require("express");
const Experiencias = require("../models/Experiencias");
const router = Router();

// Get para mostrar todas las experiencias existentes
// Funciona Jest
router.get("/all-experiencias", async (req, res) => {
  const experiencias = await Experiencias.find().sort("-_id");
  res.json(experiencias);
});

// Get para mostrar los datos de una experiencia
// Funciona Jest
router.get("/experiencia-upgrade-usuario/:id", async (req, res) => {
  const id_experiencia = req.params;
  console.log("Este es el id de la experiencia", id_experiencia.id);
  const experiencias = await Experiencias.find({ _id: id_experiencia.id });
  res.json(experiencias);
});

// Get para mostrar todas las experiencias que existen de un usuario
// Funciona Jest
router.get("/all-experiencias-usuario/:id", async (req, res) => {
  const id_usuario = req.params;
  console.log("Este es el id del usuario", id_usuario.id);
  const experiencias = await Experiencias.find({
    id_usuario: id_usuario.id
  });
  res.json(experiencias);
});


// Post para crear una nueva experiencia
// Funciona Jest
router.post("/new-experiencia", async (req, res) => {
  const { titulo, descripcion, sala_interactiva, imagen_relacionada, imagen, id_usuario } = req.body;
  const newExperiencia = new Experiencias({
    titulo,
    descripcion,
    sala_interactiva,
    imagen_relacionada,
    imagen,
    id_usuario,
  });
  newExperiencia.save();
  res.json({ message: "Se creo una nueva experiencia." });
});

// Actualizar la informacion de una experiencia
// Funciona
router.put("/info-experiencia/:id", async (req, res) => {
  const { titulo, descripcion, sala_interactiva, imagen_relacionada, imagen, id_usuario } = req.body;
  const _id = req.params.id;
  console.log("Id de la experiencia:", _id);
  Experiencias.findByIdAndUpdate(
    _id,
    {
      $set: req.body,
    },
    (err, resultado) => {
      if (err) {
        console.log(err);
      }
      res.json({ message: "Se actualizo la informacion de la experiencia." });
    }
  );
});

// Eliminar una experiencia
// Funciona
router.delete("/delete-experiencia/:id", async (req, res) => {
  const id = req.params.id;
  const experiencias = await Experiencias.findByIdAndDelete(id);
  res.json({ message: "Tarea eliminada." });
});

module.exports = router;
