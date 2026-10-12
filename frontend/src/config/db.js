// importar mongoose
const mongoose = require('mongoose')

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB conectado");
    }catch(err){
        console.log("Error al conectar con MongoDB: ", err);
        process.exit(1);
    }
    
}

module.exports=connectDB