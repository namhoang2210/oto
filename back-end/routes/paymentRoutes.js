const express = require('express');
const router = express.Router();
const { getPayments, createPayment, updatePayment } = require('../controllers/paymentController');
const verifyToken = require('../middleware/authMiddleware');

// Lấy danh sách thanh toán
router.get('/payments', verifyToken, getPayments);

// Tạo thanh toán mới
router.post('/payments', verifyToken, createPayment);

// Cập nhật thanh toán
router.put('/payments/:id', verifyToken, updatePayment);

module.exports = router;
