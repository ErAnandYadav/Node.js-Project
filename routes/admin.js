const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/admin/dashboardController');

router.get('/', dashboardController.getDashboard);
router.get('/login', dashboardController.adminLogin);
router.post('/login', dashboardController.login);
router.get('/transactions', dashboardController.transactionHistory);

module.exports = router;