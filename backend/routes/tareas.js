const { Router } = require('express');
const Tareas = require('../models/Tareas');
const router = Router();


// Get para mostrar todas las tareas que existen
router.get('/', async (req,res) => {
    const tareas = await Tareas.find().sort('-_id');
    res.json(tareas);
});


// Post para crear una nueva tarea
router.post('/', async (req,res) => {
    const { image_tarea, nombre_tarea, prioridad_tarea, fecha_vencimiento_tarea } = req.body;
    const newTarea = new Tareas({ image_tarea, nombre_tarea, prioridad_tarea, fecha_vencimiento_tarea });
    newTarea.save();
    res.json({message: 'Se creo una nueva tarea.'});
});


// Actualizar la informacion de una tarea
router.put('/:id', async (req,res) => {
    const { image_tarea, nombre_tarea, prioridad_tarea, fecha_vencimiento_tarea } = req.body;
    const id = req.params.id;
    Tareas.findOneAndUpdate(id,{
        $set: req.body
    }, (err, resultado) => {
        if(err){
            console.log(err)
        }
        res.json({message: 'Se actualizo la informacion de la tarea'})

    })
});


// Eliminar un alumno
router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const tareas = await Tareas.findByIdAndDelete(id);
    res.json({message: 'Tarea eliminada.'});
});


module.exports = router;