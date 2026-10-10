const Product = require('../models/Product')


const listProducts=async(req,res)=>{
    const productos= await Product.find().sort({nombre:1}).lean()
    return res.render('products/index',{productos})
}

const showNewForm = (req, res) => {
    res.render('products/form', { producto: {}, errores: [] });
};


const createProduct = async(req,res)=>{
    const nombre= req.body['nombre'];
    const categoria=req.body['categoria'];
    const precio=req.body['precio'];
    const stock=req.body['stock'];
    try{
        await Product.create({
            nombre: nombre,
            categoria: categoria,
            precio:precio,
            stock: stock === '' ? undefined : stock
        });
    }catch(err){
        if (err.name === 'ValidationError'){
            const errores = Object.values(err.errors).map(e => e.message);
            return res.status(400).render('products/form', { errores, producto: req.body });
        }
        throw err;
    }
    
    res.redirect('/productos')
}

module.exports={listProducts, showNewForm, createProduct}