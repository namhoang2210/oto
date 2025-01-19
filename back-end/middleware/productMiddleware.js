const Product = require('../models/productModel');

const checkProductAvailability = async (req, res, next) => {
  const { product_id } = req.body;

  try {
    const product = await Product.findById(product_id);
    
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
    }

    if (product.status !== 'in_stock') {
      return res.status(400).json({ message: 'Sản phẩm không khả dụng để đặt hàng!' });
    }

    req.product = product; // Đính kèm thông tin sản phẩm vào request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

module.exports = checkProductAvailability;
