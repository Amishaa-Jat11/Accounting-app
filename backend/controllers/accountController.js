const { validationResult } = require('express-validator');
const Account = require('../models/Account');

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id, isActive: true })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: accounts.length,
      data: accounts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single account
const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create account
const createAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, balance, description } = req.body;

    const account = await Account.create({
      name,
      type,
      balance: balance || 0,
      description,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update account
const updateAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive: false },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get account summary
const getAccountSummary = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id, isActive: true });
    
    const summary = {
      totalAssets: 0,
      totalLiabilities: 0,
      totalEquity: 0,
      accountCount: accounts.length
    };

    accounts.forEach(account => {
      if (account.type === 'Asset') {
        summary.totalAssets += account.balance;
      } else if (account.type === 'Liability') {
        summary.totalLiabilities += Math.abs(account.balance);
      } else if (account.type === 'Equity') {
        summary.totalEquity += account.balance;
      }
    });

    summary.netWorth = summary.totalAssets - summary.totalLiabilities;

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountSummary
};