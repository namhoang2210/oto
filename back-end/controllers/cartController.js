const Cart = require('../models/cartModel');

// Lấy danh sách giỏ hàng theo user_id
exports.getCarts = async (req, res) => {
  const { user_id } = req.query;

  try {
    const filter = user_id ? { user_id } : {};
    const carts = await Cart.find(filter)
      .populate('user_id', 'name email')
      .populate('product_id', 'model code price');

    res.status(200).json({ message: 'Lấy danh sách giỏ hàng thành công', carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.createCart = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const newCart = new Cart({ user_id, product_id });

    await newCart.save();

    res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công!', cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Xoá sản phẩm khỏi giỏ hàng
exports.deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return res.status(404).json({ message: 'Sản phẩm trong giỏ hàng không tồn tại!' });
    }

    res.status(200).json({ message: 'Xoá sản phẩm khỏi giỏ hàng thành công!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};