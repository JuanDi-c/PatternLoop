require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const conectarDB = require("./config/conexion");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const usuariosRoutes = require("./Routes/usuarioRoutes");

const publicacionRoutes = require("./Routes/publicacionRoutes")

const comentariosRoutes = require("./routes/comentariosRoutes");

const favoritosRoutes = require("./routes/favoritosRoutes");

conectarDB();

app.use(cors());

app.use(express.json());

app.get("/" , (req,res) => {

    res.send("Servidor Funcionando");
});

app.use("/api/usuarios",usuariosRoutes);

app.use("/api/publicaciones",publicacionRoutes);

app.use("/api/comentarios", comentariosRoutes);

app.use("/api/favoritos", favoritosRoutes);

const PORT = process.env.PORT || 3000

app.listen (PORT,() => {

    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});