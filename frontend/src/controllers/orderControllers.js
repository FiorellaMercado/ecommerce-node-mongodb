const Order = require('../models/Order')
const Product = require('../models/Product')


const showCreateForm = async(req, res)=>{

    const productos=await Product.find({activo: true}).sort({nombre:1}).lean()
    res.render('orders/new', {productos, errores: []
    })



}

module.exports={showCreateForm}