const order = require('../controllers/orderController');
const express = require('express')
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth);

router.get('/', order.listOrders);
router.get('/:id', order.showOrderDetails);


module.exports=router;