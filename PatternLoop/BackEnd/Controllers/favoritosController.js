const Favorito = require("../models/Favoritos");

// Agregar a favoritos
const agregarFavorito = async (req, res) => {

    try {

        const existe = await Favorito.findOne({
            usuario: req.usuario.id,
            publicacion: req.body.publicacion
        });

        if (existe) {
            return res.status(400).json({
                mensaje: "La publicación ya está en favoritos"
            });
        }

        const favorito = new Favorito({

            usuario: req.usuario.id,

            publicacion: req.body.publicacion

        });

        await favorito.save();

        res.status(201).json({
            mensaje: "Publicación agregada a favoritos"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener mis favoritos
const obtenerFavoritos = async (req, res) => {

    try {

        const favoritos = await Favorito.find({

            usuario: req.usuario.id

        }).populate({

            path: "publicacion",

            populate: {
                path: "autor",
                select: "nombre"
            }

        });

        res.json(favoritos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar favorito
const eliminarFavorito = async (req, res) => {

    try {

        const favorito = await Favorito.findOneAndDelete({

            usuario: req.usuario.id,

            publicacion: req.params.publicacionId

        });

        if (!favorito) {

            return res.status(404).json({
                mensaje: "Favorito no encontrado"
            });

        }

        res.json({

            mensaje: "Favorito eliminado"

        });

    } catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};

// Contar favoritos
const contarFavoritos = async (req, res) => {

    try {

        const cantidad = await Favorito.countDocuments({

            publicacion: req.params.publicacionId

        });

        res.json({

            favoritos: cantidad

        });

    } catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};

// Saber si una publicación está en favoritos
const verificarFavorito = async (req, res) => {

    try {

        const favorito = await Favorito.findOne({

            usuario: req.usuario.id,

            publicacion: req.params.publicacionId

        });

        res.json({

            favorito: favorito ? true : false

        });

    } catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};

module.exports = {

    agregarFavorito,

    obtenerFavoritos,

    eliminarFavorito,

    contarFavoritos,

    verificarFavorito

};