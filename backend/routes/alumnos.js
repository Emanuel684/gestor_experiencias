const { Router } = require('express');
const Alumno = require('../models/Alumno');
const router = Router();


// Get para mostrar todos los alumnos
router.get('/', async (req,res) => {
    const alumnos = await Alumno.find().sort('-_id');
    res.json(alumnos);
});


// Post para crear un nuevo alumno
router.post('/', async (req,res) => {
    const { nombres, apellidos, edad } = req.body;
    const newAlumno = new Alumno({ nombres, apellidos, edad});
    newAlumno.save();
    res.json({message: 'Se creo un nuevo alumno.'});
});


// Actualizar la informacion de un alumno
router.put('/:id', async (req,res) => {
    const { nombres, apellidos, edad } = req.body;
    const id = req.params.id;
    Alumno.findOneAndUpdate(id,{
        $set: req.body
    }, (err, resultado) => {
        if(err){
            console.log(err)
        }
        res.json({message: 'Se actualizo la informacion'})

    })
});


// Eliminar un alumno
router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const alumno = await Alumno.findByIdAndDelete(id);
    res.json({message: 'Alumno eliminado.'});
});


module.exports = router;