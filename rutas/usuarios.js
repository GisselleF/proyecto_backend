const express = require("express");
const { body, validationResult } = require("express-validator");
const Usuario = require("../modelos/usuario");
const loggerMiddleware = require("../logger");

const router = express.Router();

// Crear un nuevo usuario
router.post(
  "/usuarios",
  [
    loggerMiddleware,
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("correo").isEmail().withMessage("El correo no es válido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  }
);

// Obtener todos los usuarios
router.get("/usuarios", [loggerMiddleware], async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Obtener un usuario por ID
router.get("/usuarios/:id", [loggerMiddleware], async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// Actualizar un usuario por ID
router.put("/usuarios/:id", [loggerMiddleware], async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Eliminar un usuario por ID
router.delete("/usuarios/:id", [loggerMiddleware], async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

module.exports = router;
