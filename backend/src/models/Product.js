const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {type:String, required:[true, 'El nombre es obligatorio'], trim: true},
    categoria: {type: String, required:true, lowercase:true, enum: {
        values: ['pescado', 'hielo', 'esmoquin'],
        message: 'Categoría no válida'
        },  trim:true},
    stock: {type: Number, min:0, default:0},
    precio: {type: Number, required: [true, 'El precio es obligatorio'], min: 0},
    activo: {type: Boolean, default: true}
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)