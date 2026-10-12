const product = require('../controllers/productControllers');

const express= require('express')

const router= express.Router();

router.get('/', product.listProducts)

module.exports=router;