const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');

// Lấy tất cả sản phẩm
router.get('/products', productController.getAllProducts);

// Thêm sản phẩm (chỉ admin)
router.post('/products', verifyToken, productController.createProduct);

// Cập nhật sản phẩm (chỉ admin)
router.put('/products/:id', verifyToken, productController.updateProduct);

// Xóa sản phẩm (chỉ admin)
router.delete('/products/:id', verifyToken, productController.deleteProduct);

module.exports = router;
