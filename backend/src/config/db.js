const mongoose = require('mongoose');

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado')
    }catch(error){
        console.error('Error al conectar con MongoDB: ', error)
        process.exit(1);
    }
}

module.exports = connectDB;