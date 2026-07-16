const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({

    comentario: {
        type: String,
        required: [true, "El comentario es obligatorio"],
        trim: true,
        maxlength: 500
    },

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publicacion",
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Comentario", comentarioSchema);