const { default: mongoose } = require('mongoose');
const Order = require('../models/Order')


const listOrders=async(req,res)=>{

    const pedidos= await Order.find().sort({createdAt: -1}).lean();
    
    res.render('orders/index',{pedidos});

}

const showOrderDetails= async(req,res)=>{
    const id=req.params.id;

    if (!mongoose.isValidObjectId(id)){
        return res.status(404).send("Pedido no encontrado")
    }

    const pedidos= await Order.findById(id).lean()

    res.render('orders/details', {pedidos})


}

module.exports={listOrders,showOrderDetails}
