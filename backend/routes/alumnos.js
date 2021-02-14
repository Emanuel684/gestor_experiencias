const { ObjectId } = require('bson');
const { Router } = require('express');
const router = Router();
const connection = require('../db');

// Traer todos los alumnos de la collection alumnos en la base de datos colegiogeek
router.get('/', async(req,res) => {

    const db = await connection();
    await db.collection('alumnos').find()
    .toArray(function(err, alumnos) {
        res.json(alumnos)
    })

});

// Crear un nuevo registro en la coleccion de alumnos
router.post('/', async (req,res) => {
    const db = await connection();
    const { nombres, apellidos, edad } = req.body;
    await db.collection('alumnos').insertOne({
        nombres,
        apellidos,
        edad
    }, function(
        err,
        info 
    ){
        res.json(info.ops[0]);
    })
});

// Para actualiazar un registro segun el id
router.put('/:id', async (req,res) => {
    const db = await connection();
    const { nombres, apellidos, edad } = req.body;
    const id = req.params.id;

    db.collection('alumnos').findOneAndUpdate(
        // {_id:id},
        {_id:ObjectId(id)},
        [{$set: {nombres:nombres, apellidos:apellidos, edad:edad}}],
        // {returnNewDocument: true},
        function(){
            res.json('Alumno actualizado');
        }
    )
})

// Eliminar un registro de la coleccion
router.delete('/:id', async (req,res) => {

    const db = await connection();
    const id = req.params.id;

    await db.collection('alumnos').deleteOne(
        {_id:ObjectId(id)},
        function(){
            res.json({message: 'Alumno eliminado.'});
        }
    )
    
})


module.exports = router;