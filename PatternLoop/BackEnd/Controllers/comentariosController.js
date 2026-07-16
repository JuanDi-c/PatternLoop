const Comentario = require("../Models/Comentarios");

// Crear comentario
const crearComentario = async (req, res) => {

    try {

        const nuevoComentario = new Comentario({

            comentario: req.body.comentario,

            usuario: req.usuario.id,

            publicacion: req.body.publicacion

        });

        await nuevoComentario.save();

        res.status(201).json(nuevoComentario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener comentarios de una publicación
const obtenerComentarios = async (req, res) => {

    try {
        const comentarios = await Comentario.find({
            publicacion: req.params.id
        })
            .populate("usuario", "nombre")
            .sort({ createdAt: -1 });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar comentario
const eliminarComentario = async (req, res) => {

    try {

        const comentario = await Comentario.findById(req.params.id);

        if (!comentario) {

            return res.status(404).json({
                mensaje: "Comentario no encontrado"
            });

        }

        if (comentario.usuario.toString() !== req.usuario.id) {

            return res.status(403).json({
                mensaje: "No puedes eliminar este comentario"
            });

        }

        await Comentario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Comentario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {

    crearComentario,
    obtenerComentarios,
    eliminarComentario

};