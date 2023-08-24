const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const usuariosRouter = require("./rutas/usuarios.js");
const loggerMiddleware = require("./logger.js");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conexión a la base de datos
mongoose.connect(
  "mongodb+srv://gissellecarolina15:dg8T7nicnf35yyjz@cluster0.qx6tgz9.mongodb.net/?retryWrites=true&w=majority",
  options
);

// Middleware para manejar datos JSON
app.use(express.json());

// Cargar las rutas
app.use(usuariosRouter);

// Logger
app.use(loggerMiddleware);

// Ruta de prueba
app.get("/", [loggerMiddleware], (req, res) => {
  res.send("Servidor en funcionamiento");
});

app.get("/api-externa", [loggerMiddleware], async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de la API externa" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
