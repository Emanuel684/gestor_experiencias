const { Schema, model } = require('mongoose');


// Esta es la estructura que van a tener los datos de los usuarios
const UsuariosSchema = new Schema({
    nombres: {
        type:  String, required: true,
    },
    apellidos: {
        type: String, required: true,
    },
    correo_electronico: {
        type: String, required: true,
    },
    contrasena: {
        type: String, required: true,
    }
});

module.exports = model('Usuarios', UsuariosSchema);
