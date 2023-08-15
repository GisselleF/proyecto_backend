const mongoose = require("mongoose");

const usuarioMongoDB = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  edad: { type: Number },
});

const Usuario = mongoose.model("Usuario", usuarioMongoDB);

module.exports = Usuario;
