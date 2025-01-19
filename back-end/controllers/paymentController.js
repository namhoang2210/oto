const Payment = require('../models/paymentModel');

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
			.populate('order_id', 'code status') 
			.populate('user_id', 'name phone');

    res.status(200).json({ message: 'Lấy danh sách thanh toán thành công', payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

exports.createPayment = async (req, res) => {
	const { order_id, total, payment_method, user_id } = req.body;

	try {
			const newPayment = new Payment({
			order_id,
			user_id,
			total,
			payment_method,
			});

			await newPayment.save();

			res.status(201).json({ message: 'Tạo thanh toán thành công!', payment: newPayment });
	} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Lỗi server!' });
	}
};


exports.updatePayment = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
    const payment = await Payment.findById(id);

    if (!payment) {
    return res.status(404).json({ message: 'Thanh toán không tồn tại!' });
    }

    if (status) payment.status = status;

    await payment.save();

    res.status(200).json({ message: 'Cập nhật thanh toán thành công!', payment });
	} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Lỗi server!' });
	}
};


