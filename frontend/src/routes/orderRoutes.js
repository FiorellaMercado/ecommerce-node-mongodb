const order = require('../controllers/orderControllers')
const express = require('express');
const router = express.Router();


router.get('/', order.showCreateForm)


module.exports=router;