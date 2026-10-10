const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)
router.get('/', product.listProducts)


module.exports=router;