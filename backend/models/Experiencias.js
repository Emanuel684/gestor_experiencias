var mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
var Usuarios = mongoose.model("Usuarios");

// Esta es la estructura que van a tener los datos de las experiencias
const ExperienciasSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true
  },
  sala_interactiva: {
    type: String,
    required: true
  },
  imagen_relacionada: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  id_usuario: {
    type: Schema.ObjectId,
    ref: "Usuarios",
  },
});

module.exports = model("Expericias", ExperienciasSchema);
