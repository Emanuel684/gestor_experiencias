const { Schema, model } = require('mongoose');


// Esta es la estructura que van a tener los datos de los alumnos
const AlumnoSchema = new Schema({
    nombres_asignatura: {
        type:  String, required: true,
    },
    created_since: {
        type: Date, default: Date.now,
    }
});

module.exports = model('Asignaturas', AlumnoSchema);