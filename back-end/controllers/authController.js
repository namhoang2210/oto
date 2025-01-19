const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../models/orderModel');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.role !== 'admin') {
      return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách khách hàng (cần middleware xác thực)
exports.getCustomers = async (req, res) => {
  try {
     // Lấy danh sách khách hàng
     const customerData = await User.find({ role: 'customer' }).lean();

     // Kiểm tra từng khách hàng xem họ có đơn hàng nào không
     const customers= await Promise.all(
        customerData.map(async (customer) => {
         const hasOrders = await Order.exists({ user_id: customer._id });
         return {
           ...customer,
           hasOrders: !!hasOrders, // true nếu có đơn hàng, false nếu không
         };
       })
     );

    res.status(200).json({ message: 'Lấy danh sách khách hàng thành công', customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Đăng ký tài khoản người dùng role customer
exports.registerCustomer = async (req, res) => {
  const { username, password, name, email, phone, address } = req.body;

  try {
    // Kiểm tra xem username hoặc email đã tồn tại hay chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username hoặc Email đã tồn tại!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      phone,
      address,
      role: 'customer',
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Sửa thông tin người dùng (cần middleware xác thực)
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Chỉ cho phép sửa thông tin nếu người dùng là chính họ hoặc là admin
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Bạn không có quyền sửa thông tin này' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({ message: 'Cập nhật thành công', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

// Xóa người dùng (cần middleware xác thực)
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Chỉ cho phép xóa nếu người dùng là admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa người dùng này' });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};