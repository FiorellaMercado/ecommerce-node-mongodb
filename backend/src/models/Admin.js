const mongoose = require('mongoose');
const validator = require('validator');


const adminSchema= new mongoose.Schema({
    email: {type: String, lowercase:true, trim:true,
        unique: true, required: [true, 'El email es obligatorio'],
        validate: [validator.isEmail, 'El email no tiene un formato válido']},
    nombre: {type:String, trim:true,required: [true, 'El nombre es obligatorio']},
    passwordHash: {type:String, required: [true, 'La contrasena es obligatoria'], select:false}
},{timestamps:true})

module.exports = mongoose.model('Admin', adminSchema);