const order = require('../controllers/orderController');
const express = require('express')
const router = express.Router();

router.get('/', order.listOrders);
router.get('/:id', order.showOrderDetails);


module.exports=router;