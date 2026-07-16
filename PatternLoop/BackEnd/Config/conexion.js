const mongoose = require ("mongoose");

const conectarBD = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base De Datos Conectada Correctamente");
    }catch (error) {
        console.log("Error Al Conectar");
        console.log(error.message);
        process.exit(1);
        
    }
}

module.exports = conectarBD;