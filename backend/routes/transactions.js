const express = require('express');
const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get transactions endpoint' });
});

// @route   POST /api/transactions
// @desc    Create transaction
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create transaction endpoint' });
});

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ message: 'Update transaction endpoint' });
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete transaction endpoint' });
});

module.exports = router;