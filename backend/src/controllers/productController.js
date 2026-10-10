const Product = require('../models/Product')


const listProducts=async(req,res)=>{
    const productos= await Product.find().sort({nombre:1}).lean()
    return res.render('products/index',{productos})
}

module.exports={listProducts}