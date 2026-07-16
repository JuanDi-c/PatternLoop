const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema({

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

// Evita favoritos duplicados
favoritoSchema.index(
    { usuario: 1, publicacion: 1 },
    { unique: true }
);

module.exports = mongoose.model("Favorito", favoritoSchema);