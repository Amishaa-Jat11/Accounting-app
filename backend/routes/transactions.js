const express = require('express');
const { body } = require('express-validator');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', auth, getTransactions);

// @route   GET /api/transactions/summary
// @desc    Get transaction summary
// @access  Private
router.get('/summary', auth, getTransactionSummary);

// @route   GET /api/transactions/:id
// @desc    Get single transaction
// @access  Private
router.get('/:id', auth, getTransaction);

// @route   POST /api/transactions
// @desc    Create transaction
// @access  Private
router.post('/', [
  auth,
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['Income', 'Expense']).withMessage('Type must be Income or Expense'),
  body('category').notEmpty().withMessage('Category is required'),
  body('accountId').notEmpty().withMessage('Account ID is required')
], createTransaction);

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', [
  auth,
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('type').optional().isIn(['Income', 'Expense']).withMessage('Type must be Income or Expense')
], updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, deleteTransaction);

module.exports = router;