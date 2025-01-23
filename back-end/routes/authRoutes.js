const express = require('express');
const router = express.Router();
const { loginAdmin, loginCustomer, getCustomers, registerCustomer, updateCustomer, deleteCustomer } = require('../controllers/authController');  
const verifyToken = require('../middleware/authMiddleware');

// login
router.post('/admin/login', loginAdmin);
router.post('/customer/login', loginCustomer);

//crud khách hàng
router.get('/customers', verifyToken, getCustomers);
router.post('/customers/register', registerCustomer);
router.put('/customers/:id', verifyToken, updateCustomer);
router.delete('/customers/:id', verifyToken, deleteCustomer);

module.exports = router;
