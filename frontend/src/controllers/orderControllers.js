const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose= require('mongoose')


const showCreateForm = async(req, res)=>{

    const productos=await Product.find({activo: true}).sort({nombre:1}).lean()
    res.render('orders/new', {productos, errores: []
    })

}

const createOrder = async (req,res)=>{
    const cliente=req.body['cliente']
    const direccion=req.body['direccion']
    const cantidades_crudo= Object.entries(req.body['cantidades'] || {})

    const cantidades_validas=cantidades_crudo.filter(item => mongoose.isValidObjectId(item[0]) &&  Number.isInteger(Number(item[1])) && Number(item[1])>0 )
    let suma=0;
    const cantidades=Object.fromEntries(cantidades_validas);
    const items = []
    
    const ids=Object.keys(cantidades)
    
    const productos= await Product.find({ _id: { $in: ids }, activo: true }).lean()
    for(const producto of productos) {
        let cantidad=Number(cantidades[producto['_id']])
        suma=suma+(producto['precio']*cantidad)
        items.push({producto:producto['_id'], nombre:producto['nombre'],precio:producto['precio'], cantidad:cantidad})
    };

    try{
        await Order.create({
        cliente: cliente,
        direccion: direccion,
        items: items,
        total: suma
        })
    }catch(err){
        if (err.name==='ValidationError'){
            const errores= Object.values(err.errors).map((e)=> e.message);
            const productos_recarga = await Product.find({ activo: true }).sort({nombre:1}).lean()
            return res.status(400).render('orders/new',{
                errores,
                pedido: req.body,
                productos: productos_recarga
            });
        }
        throw err;
    }
    
    res.redirect('/pedidos/confirmation')
}

const showConfirmation = (req,res) =>{

    res.render('orders/confirmation')
}

module.exports={showCreateForm, createOrder, showConfirmation}