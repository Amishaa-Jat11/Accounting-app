const express = require('express');
const {
  getProfitLossReport,
  getBalanceSheetReport,
  getCashFlowReport,
  getTrialBalanceReport,
  getDashboardSummary
} = require('../controllers/reportController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/reports/dashboard
// @desc    Get dashboard summary
// @access  Private
router.get('/dashboard', auth, getDashboardSummary);

// @route   GET /api/reports/profit-loss
// @desc    Get profit & loss report
// @access  Private
router.get('/profit-loss', auth, getProfitLossReport);

// @route   GET /api/reports/balance-sheet
// @desc    Get balance sheet report
// @access  Private
router.get('/balance-sheet', auth, getBalanceSheetReport);

// @route   GET /api/reports/cash-flow
// @desc    Get cash flow report
// @access  Private
router.get('/cash-flow', auth, getCashFlowReport);

// @route   GET /api/reports/trial-balance
// @desc    Get trial balance report
// @access  Private
router.get('/trial-balance', auth, getTrialBalanceReport);

module.exports = router;