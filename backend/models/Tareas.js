var mongoose = require('mongoose')
const { Schema, model } = require('mongoose');
var Usuarios = mongoose.model('Usuarios')

// Esta es la estructura que van a tener los datos de las tareas
const TareasSchema = new Schema({
    nombre: {
        type:  String, required: true,
    },
    foto: {
        type:  String, required: true,
    },
    prioridad: {
        type:  String, required: true,
    },
    fecha_vencimiento: {
        type: Date,
    },
    id_usuario: {
        type:Schema.ObjectId, ref: "Usuarios"
    }
});

module.exports = model('Tareas', TareasSchema);