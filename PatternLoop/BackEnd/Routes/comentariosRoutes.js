const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/auth");

const {

    crearComentario,
    obtenerComentarios,
    eliminarComentario

} = require("../controllers/comentariosController");

router.post("/", verificarToken, crearComentario);

router.get("/publicacion/:id", obtenerComentarios);

router.delete("/:id", verificarToken, eliminarComentario);

module.exports = router;