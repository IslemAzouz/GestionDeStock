const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route to get dynamic dashboard data
router.get('/dashboard', dashboardController.getDashboardData);

module.exports = router;
