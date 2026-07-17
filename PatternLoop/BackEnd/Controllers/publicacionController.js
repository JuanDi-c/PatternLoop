const Publicacion = require("../models/Publicacion");

// Crear publicación
const crearPublicacion = async (req, res) => {

    try {

        const imagenes = req.files.map(file => file.filename);

        const instrucciones = req.body.instrucciones
            ? JSON.parse(req.body.instrucciones)
            : [];

        const materiales = req.body.materiales
            ? JSON.parse(req.body.materiales)
            : [];

        const nuevaPublicacion = new Publicacion({

            titulo: req.body.titulo,

            descripcion: req.body.descripcion,

            categoria: req.body.categoria,

            dificultad: req.body.dificultad,

            instrucciones,

            materiales,

            imagenes,

            autor: req.usuario.id

        });

        await nuevaPublicacion.save();

        res.status(201).json(nuevaPublicacion);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};




// Obtener todas
const obtenerPublicaciones = async (req, res) => {

    try {

        const publicaciones = await Publicacion.find()
            .populate("autor", "nombre fotoPerfil");

        res.json(publicaciones);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener una
const obtenerPublicacion = async (req, res) => {

    try {

        const publicacion = await Publicacion.findById(req.params.id)
            .populate("autor", "nombre fotoPerfil");

        res.json(publicacion);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar
const actualizarPublicacion = async (req, res) => {

    try {

        const publicacion = await Publicacion.findById(req.params.id);

        if (!publicacion) {

            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            });

        }

        if (publicacion.autor.toString() !== req.usuario.id) {

            return res.status(403).json({
                mensaje: "No tienes permiso para editar esta publicación"
            });

        }

        const publicacionActualizada = await Publicacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(publicacionActualizada);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar
const eliminarPublicacion = async (req, res) => {

    try {

        const publicacion = await Publicacion.findById(req.params.id);

        if (!publicacion) {

            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            });

        }

        if (publicacion.autor.toString() !== req.usuario.id) {

            return res.status(403).json({
                mensaje: "No tienes permiso para eliminar esta publicación"
            });

        }

        await Publicacion.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Publicación eliminada correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Buscar publicaciones
const buscarPublicaciones = async (req, res) => {

    try {

        const { titulo, categoria, dificultad } = req.query;

        let filtro = {};

        if (titulo) {

            filtro.titulo = {
                $regex: titulo,
                $options: "i"
            };

        }

        if (categoria) {

            filtro.categoria = categoria;

        }

        if (dificultad) {

            filtro.dificultad = dificultad;

        }

        const publicaciones = await Publicacion.find(filtro)
            .populate("autor", "nombre")
            .sort({ createdAt: -1 });

        res.json(publicaciones);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    buscarPublicaciones
};