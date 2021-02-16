const { Router } = require("express");
const Tareas = require("../models/Tareas");
const router = Router();

// Get para mostrar todas las tareas que existen
// Funciona
router.get("/all-tareas", async (req, res) => {
  const tareas = await Tareas.find().sort("-_id");
  res.json(tareas);
});

// Get para mostrar los datos de una tarea
// Funciona
router.get("/tarea-upgrade-usuario/:id", async (req, res) => {
  const id_tarea = req.params;
  console.log("Este es el id de la tarea", id_tarea.id);
  const tareas = await Tareas.find({ _id: id_tarea.id });
  res.json(tareas);
});

// Get para mostrar todas las tareas que existen de un usuario para prioridad alta
// Funciona
router.get("/all-tareas-usuario-alta/:id", async (req, res) => {
  const id_usuario = req.params;
  console.log("Este es el id del usuario", id_usuario.id);
  const tareas = await Tareas.find({
    id_usuario: id_usuario.id,
    prioridad: "Alta",
  });
  res.json(tareas);
});

// Get para mostrar todas las tareas que existen de un usuario para prioridad media
// Funciona
router.get("/all-tareas-usuario-media/:id", async (req, res) => {
  const id_usuario = req.params;
  console.log("Este es el id del usuario", id_usuario.id);
  const tareas = await Tareas.find({
    id_usuario: id_usuario.id,
    prioridad: "Media",
  });
  res.json(tareas);
});

// Get para mostrar todas las tareas que existen de un usuario para prioridad baja
// Funciona
router.get("/all-tareas-usuario-baja/:id", async (req, res) => {
  const id_usuario = req.params;
  console.log("Este es el id del usuario", id_usuario.id);
  const tareas = await Tareas.find({
    id_usuario: id_usuario.id,
    prioridad: "Baja",
  });
  res.json(tareas);
});

// Post para crear una nueva tarea
// Funciona
router.post("/new-tarea", async (req, res) => {
  const { nombre, foto, prioridad, fecha_vencimiento, id_usuario } = req.body;
  console.log(foto);
  console.log(nombre);
  console.log(prioridad);
  console.log(fecha_vencimiento);
  console.log(id_usuario);
  const newTarea = new Tareas({
    nombre,
    foto,
    prioridad,
    fecha_vencimiento,
    id_usuario,
  });
  newTarea.save();
  res.json({ message: "Se creo una nueva tarea." });
});

// Actualizar la informacion de una tarea
// Funciona
router.put("/info-tarea/:id", async (req, res) => {
  const { nombre, foto, prioridad, fecha_vencimiento, id_usuario } = req.body;
  const _id = req.params.id;
  console.log("Id de la tarea:", _id);
  Tareas.findByIdAndUpdate(
    _id,
    {
      $set: req.body,
    },
    (err, resultado) => {
      if (err) {
        console.log(err);
      }
      res.json({ message: "Se actualizo la informacion de la tarea" });
    }
  );
});

// Eliminar un tarea
// Funciona
router.delete("/delete-tarea/:id", async (req, res) => {
  const id = req.params.id;
  const tareas = await Tareas.findByIdAndDelete(id);
  res.json({ message: "Tarea eliminada." });
});

module.exports = router;
