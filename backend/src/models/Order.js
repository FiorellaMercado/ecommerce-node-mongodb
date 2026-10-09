const mongoose = require("mongoose");

const orderSchema= new mongoose.Schema({
    direccion: {type:String, trim: true, required:true},
    cliente: {type: String, trim: true, required:[true,'El cliente es obligatorio']},
    items: {
        type: [{
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            nombre: { type: String, required: [true, 'El producto es obligatorio'] },
            precio: { type: Number, required: true, min: 0 },
            cantidad: { type: Number, required: true, min: 1, default: 1 }
        }],
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'El pedido debe tener al menos un producto'
        }
    },
    estado:{type: String, required: true, enum: ["pendiente", "enviado", "entregado"], default: 'pendiente'},
    total: {type: Number, required: true, min:0}
},{timestamps:true})


module.exports = mongoose.model('Order', orderSchema);