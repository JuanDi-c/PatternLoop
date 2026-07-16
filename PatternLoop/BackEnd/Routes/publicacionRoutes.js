const express = require("express");
const upload = require("../config/multer");
const verificarToken = require("../middleware/auth");

const router = express.Router();

const {

    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    buscarPublicaciones

} = require("../controllers/publicacionController");

router.post("/", verificarToken, upload.array("imagenes", 5), crearPublicacion);

router.get("/buscar", buscarPublicaciones);

router.get("/", obtenerPublicaciones);

router.get("/:id", obtenerPublicacion);

router.put("/:id", verificarToken, actualizarPublicacion);

router.delete("/:id", verificarToken, eliminarPublicacion);

module.exports = router;