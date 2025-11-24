const express = require('express');
const router = express.Router();

// @route   GET /api/reports/profit-loss
// @desc    Get profit & loss report
// @access  Private
router.get('/profit-loss', (req, res) => {
  res.json({ message: 'Profit & Loss report endpoint' });
});

// @route   GET /api/reports/balance-sheet
// @desc    Get balance sheet report
// @access  Private
router.get('/balance-sheet', (req, res) => {
  res.json({ message: 'Balance Sheet report endpoint' });
});

module.exports = router;