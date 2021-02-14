const { Router } = require('express');
const Tareas = require('../models/Tareas');
const router = Router();


// Get para mostrar todas las tareas que existen
router.get('/all-tareas', async (req,res) => {
    const tareas = await Tareas.find().sort('-_id');
    res.json(tareas);
});

// Get para mostrar todas las tareas que existen de un usuario
router.get('/all-tareas-usuario/:id', async (req,res) => {
    const id_usuario = req.params;
    console.log('Este es el id del usuario',id_usuario.id)
    const tareas = await Tareas.find({ id_usuario: id_usuario.id });
    res.json(tareas);
});

// Post para crear una nueva tarea
router.post('/new-tarea', async (req,res) => {
    const { nombre, foto, prioridad, fecha_vencimiento, id_usuario } = req.body;
    const newTarea = new Tareas({  nombre, foto, prioridad, fecha_vencimiento, id_usuario });
    newTarea.save();
    res.json({message: 'Se creo una nueva tarea.'});
});


// Actualizar la informacion de una tarea
router.put('/info-tarea/:id', async (req,res) => {
    const { nombre, foto, prioridad, fecha_vencimiento, id_usuario } = req.body;
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


// Eliminar un tarea
router.delete('/delte-tarea/:id', async (req,res) => {
    const id = req.params.id;
    const tareas = await Tareas.findByIdAndDelete(id);
    res.json({message: 'Tarea eliminada.'});
});


module.exports = router;