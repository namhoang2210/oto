const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Lấy danh sách đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id', 'name phone').populate('product_id', 'model');
    res.status(200).json({ message: 'Lấy danh sách đơn hàng thành công', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  const { user_id, product_id, status } = req.body;

  try {
    // Kiểm tra nếu sản phẩm tồn tại và có trạng thái hợp lệ
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
    }

    if (product.status !== 'in_stock') {
      return res.status(400).json({ message: 'Sản phẩm không khả dụng để đặt hàng!' });
    }

    // Lấy mã đơn hàng mới nhất
    const latestOrder = await Order.findOne().sort({ code: -1 }); // Sắp xếp theo code giảm dần
    let newCode = 'OD001'; // Giá trị mặc định nếu chưa có đơn hàng nào

    if (latestOrder) {
      const latestCodeNumber = parseInt(latestOrder.code.replace('OD', ''), 10); // Loại bỏ 'OD' và chuyển sang số
      newCode = `OD${(latestCodeNumber + 1).toString().padStart(3, '0')}`; // Tăng giá trị và định dạng lại
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      user_id,
      product_id,
      code: newCode,
      status: status || 'in_progress', // Mặc định trạng thái đơn hàng là in_progress
    });
    await newOrder.save();

    // Cập nhật trạng thái sản phẩm thành in_order
    product.status = 'in_order';
    await product.save();

    res.status(201).json({ message: 'Tạo đơn hàng thành công!', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};
  

// Cập nhật đơn hàng
exports.updateOrder = async (req, res) => {
    const { id } = req.params; // ID của đơn hàng
    const { status } = req.body; // Trạng thái mới của đơn hàng
  
    try {
      // Tìm đơn hàng theo ID
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại!' });
      }
  
      // Cập nhật trạng thái đơn hàng
      order.status = status || order.status;
      await order.save();
  
      // Nếu trạng thái đơn hàng là "completed", cập nhật trạng thái sản phẩm thành "sold"
      if (status === 'completed') {
        const product = await Product.findById(order.product_id);
  
        if (!product) {
          return res.status(404).json({ message: 'Sản phẩm liên kết với đơn hàng không tồn tại!' });
        }
  
        product.status = 'sold';
        await product.save();
      }
  
      res.status(200).json({ message: 'Cập nhật đơn hàng thành công!', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server!' });
    }
  };
  
