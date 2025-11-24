const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const transactionRoutes = require('./transactions');
const accountRoutes = require('./accounts');
const reportRoutes = require('./reports');

// Use routes
router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/accounts', accountRoutes);
router.use('/reports', reportRoutes);

module.exports = router;