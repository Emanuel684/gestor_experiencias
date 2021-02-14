const { Schema, model } = require('mongoose');


// Esta es la estructura que van a tener los datos de los alumnos
const AlumnoSchema = new Schema({
    nombres: {
        type:  String, required: true,
    },
    apellidos: {
        type: String, required: true,
    },
    edad: {
        type: Number, required: true,
    },
    created_since: {
        type: Date, default: Date.now,
    },
    asignaturas: {
        type: Schema.ObjectId, ref:"Asignaturas"
    }
});

module.exports = model('Alumno', AlumnoSchema);
