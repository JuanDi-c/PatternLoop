const mongoose = require("mongoose");

const publicacionSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true,
        trim: true
    },

    descripcion: {
        type: String,
        required: true
    },

instrucciones:[
    {
        paso:Number,
        descripcion:String
    }
],

materiales: [
    {
        nombre: String,
        cantidad: String
    }
],

    imagenes: [{
        type: String
    }],

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    likes: {
    type: Number,
    default: 0
},

favoritos: {
    type: Number,
    default: 0
},

estado: {
    type: String,
    enum: ["Activo", "Oculto"],
    default: "Activo"
},

categoria: {
    type: String,
    required: [true, "La categoría es obligatoria"],
    enum: [
        "Amigurumi",
        "Ropa",
        "Hogar",
        "Accesorios",
        "Bebés",
        "Otro"
    ]
},

dificultad: {
    type: String,
    required: [true, "La dificultad es obligatoria"],
    enum: [
        "Principiante",
        "Media",
        "Experta"
    ]
},

}, {
    timestamps: true
});

module.exports = mongoose.model("Publicacion", publicacionSchema);