const order = require('../controllers/orderControllers')
const express = require('express');
const router = express.Router();


router.get('/', order.showCreateForm);
router.post('/', order.createOrder);
router.get('/confirmation',order.showConfirmation)


module.exports=router;