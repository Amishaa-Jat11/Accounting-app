const express = require('express');
const router = express.Router();

// @route   GET /api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/', (req, res) => {
  res.json({ message: 'Get accounts endpoint' });
});

// @route   POST /api/accounts
// @desc    Create account
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create account endpoint' });
});

module.exports = router;