const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)
router.get('/', product.listProducts)
router.get('/nuevo',product.showNewForm)
router.post('/', product.createProduct)
router.get('/:id/editar', product.showEditForm);
router.put('/:id', product.editProduct)

module.exports=router;