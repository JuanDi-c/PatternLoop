const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar usuario
const registrarUsuario = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        const existe = await Usuario.findOne({ correo });

        if (existe) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password: passwordHash
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Login
const loginUsuario = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const coincide = await bcrypt.compare(password, usuario.password);

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            mensaje: "Login exitoso",
            token,
            usuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener usuario por id
const obtenerUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id).select("-password");

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {

    try {

        await Usuario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
};