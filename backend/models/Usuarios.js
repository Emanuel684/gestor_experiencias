const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

// Esta es la estructura que van a tener los datos de los usuarios
const UsuariosSchema = new Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  correo_electronico: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
});

UsuariosSchema.pre('save', function(next){ 
  bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.contrasena, salts).then(hash => {
          this.contrasena = hash;
          next();
        }).catch(error => next(error))
  }).catch(error => next(error));
})

module.exports = model("Usuarios", UsuariosSchema);
