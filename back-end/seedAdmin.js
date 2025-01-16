const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ username: 'nguyenanh' });
    if (existingAdmin) {
      console.log('Admin đã tồn tại!');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      name: 'Admin',
      email: 'admin@gmail.com',
      phone: '0987654321',
      address: 'Hà Nội',
      role: 'admin',
      created_at: new Date()
    });

    await admin.save();
    console.log('Admin mặc định đã được tạo!');
    process.exit();
  } catch (error) {
    console.error('Lỗi khi tạo admin:', error);
    process.exit(1);
  }
};

createAdmin();
