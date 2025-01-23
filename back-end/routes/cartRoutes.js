// routes/cartRouter.js
const express = require('express');
const router = express.Router();
const { getCarts, createCart, deleteCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware');

// Lấy danh sách giỏ hàng
router.get('/carts', verifyToken, getCarts);

// Thêm sản phẩm vào giỏ hàng
router.post('/carts', verifyToken, createCart);

// Xoá sản phẩm khỏi giỏ hàng
router.delete('/carts/:id', verifyToken, deleteCart);

module.exports = router;