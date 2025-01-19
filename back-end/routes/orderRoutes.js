const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');
const checkProductAvailability = require('../middleware/productMiddleware');

// Lấy danh sách đơn hàng
router.get('/orders', verifyToken, getOrders);

// Tạo đơn hàng mới
router.post('/orders', verifyToken, checkProductAvailability, createOrder);

// Cập nhật đơn hàng
router.put('/orders/:id', verifyToken, updateOrder);

module.exports = router;
