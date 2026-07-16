const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/auth");

const {

    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito,
    contarFavoritos,
    verificarFavorito

} = require("../controllers/favoritosController");

router.post("/", verificarToken, agregarFavorito);

router.get("/", verificarToken, obtenerFavoritos);

router.delete("/:publicacionId", verificarToken, eliminarFavorito);

router.get("/cantidad/:publicacionId", contarFavoritos);

router.get("/verificar/:publicacionId", verificarToken, verificarFavorito);

module.exports = router;