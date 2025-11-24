const express = require('express');
const { body } = require('express-validator');
const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountSummary
} = require('../controllers/accountController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/', auth, getAccounts);

// @route   GET /api/accounts/summary
// @desc    Get account summary
// @access  Private
router.get('/summary', auth, getAccountSummary);

// @route   GET /api/accounts/:id
// @desc    Get single account
// @access  Private
router.get('/:id', auth, getAccount);

// @route   POST /api/accounts
// @desc    Create account
// @access  Private
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Account name is required'),
  body('type').isIn(['Asset', 'Liability', 'Equity', 'Revenue', 'Expense']).withMessage('Invalid account type')
], createAccount);

// @route   PUT /api/accounts/:id
// @desc    Update account
// @access  Private
router.put('/:id', [
  auth,
  body('name').optional().notEmpty().withMessage('Account name cannot be empty'),
  body('type').optional().isIn(['Asset', 'Liability', 'Equity', 'Revenue', 'Expense']).withMessage('Invalid account type')
], updateAccount);

// @route   DELETE /api/accounts/:id
// @desc    Delete account
// @access  Private
router.delete('/:id', auth, deleteAccount);

module.exports = router;