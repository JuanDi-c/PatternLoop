const express = require("express");

const router = express.Router();

const {
    registrarUsuario,
    loginUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/usuarioController");

router.post("/registro", registrarUsuario);

router.post("/login", loginUsuario);

router.get("/:id", obtenerUsuario);

router.put("/:id", actualizarUsuario);

router.delete("/:id", eliminarUsuario);

module.exports = router;