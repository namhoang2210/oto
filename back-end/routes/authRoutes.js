const express = require('express');
const router = express.Router();
const { loginAdmin, getCustomers, registerCustomer, updateCustomer, deleteCustomer } = require('../controllers/authController');  
const verifyToken = require('../middleware/authMiddleware');

// admin login
router.post('/admin/login', loginAdmin);

//crud khách hàng
router.get('/customers', verifyToken, getCustomers);
router.post('/customers/register', registerCustomer);
router.put('/customers/:id', verifyToken, updateCustomer);
router.delete('/customers/:id', verifyToken, deleteCustomer);

module.exports = router;
