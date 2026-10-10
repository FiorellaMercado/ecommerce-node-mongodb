const Product = require('../models/Product')
const mongoose = require('mongoose');


const listProducts=async(req,res)=>{
    const productos= await Product.find().sort({nombre:1}).lean()
    return res.render('products/index',{productos})
}

const showNewForm = (req, res) => {
    res.render('products/form', { producto: {}, errores: [],
    titulo: 'Nuevo producto', action: '/productos'});
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
            return res.status(400).render('products/form', { errores, producto: req.body,
                titulo: 'Nuevo producto', action: '/productos'
            });
        }
        throw err;
    }
    
    res.redirect('/productos')
};

const showEditForm = async (req, res) => {
     const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send('Producto no encontrado');
    }

    const producto = await Product.findById(id).lean();

    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    res.render('products/form', {
        producto,
        errores: [],
        titulo: 'Editar producto',
        action: `/productos/${id}?_method=PUT`
    });
};

const editProduct=async (req,res)=>{
    const id=req.params.id;
    const nombre= req.body['nombre'];
    const categoria=req.body['categoria'];
    const precio=req.body['precio'];
    const stock=req.body['stock'];
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send('Producto no encontrado');
    }
    try{
        const producto = await Product.findByIdAndUpdate(id, {nombre: nombre,
            categoria: categoria,
            precio:precio,
            stock: stock === '' ? 0 : stock}, { runValidators: true })
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
    }catch(err){
        if (err.name === 'ValidationError') {
            const errores = Object.values(err.errors).map((e) => e.message);
            return res.status(400).render('products/form', {
                errores,
                producto: { ...req.body, _id: id },
                titulo: 'Editar producto',
                action: `/productos/${id}?_method=PUT`
            });
        }
        throw err;
    }
    res.redirect('/productos')
}

module.exports={listProducts, showNewForm, createProduct, showEditForm, editProduct}