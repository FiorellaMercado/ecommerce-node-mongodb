const Product = require('../models/Product');

const listProducts= async(req,res) =>{
    const productos= await Product.find({activo:true, stock:{$gt:0}})
    res.render('products/index',{productos})
}

module.exports={listProducts}