const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, fromDate, toDate } = req.query;
    
    const query = { userId: req.user.id };
    
    // Add filters
    if (type) query.type = type;
    if (category) query.category = new RegExp(category, 'i');
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const transactions = await Transaction.find(query)
      .populate('accountId', 'name type')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      count: transactions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single transaction
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    }).populate('accountId', 'name type');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create transaction
const createTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, description, amount, type, category, accountId, status, reference } = req.body;

    // Verify account belongs to user
    const account = await Account.findOne({ _id: accountId, userId: req.user.id });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const transaction = await Transaction.create({
      date,
      description,
      amount: type === 'Expense' ? -Math.abs(amount) : Math.abs(amount),
      type,
      category,
      accountId,
      userId: req.user.id,
      status,
      reference
    });

    // Update account balance
    account.balance += transaction.amount;
    await account.save();

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('accountId', 'name type');

    res.status(201).json({
      success: true,
      data: populatedTransaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const oldTransaction = await Transaction.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!oldTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Revert old transaction from account balance
    const oldAccount = await Account.findById(oldTransaction.accountId);
    if (oldAccount) {
      oldAccount.balance -= oldTransaction.amount;
      await oldAccount.save();
    }

    const { amount, type, accountId } = req.body;
    
    // Verify new account belongs to user
    if (accountId) {
      const account = await Account.findOne({ _id: accountId, userId: req.user.id });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
    }

    // Update transaction
    const updatedData = { ...req.body };
    if (amount && type) {
      updatedData.amount = type === 'Expense' ? -Math.abs(amount) : Math.abs(amount);
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updatedData,
      { new: true, runValidators: true }
    ).populate('accountId', 'name type');

    // Apply new transaction to account balance
    const newAccount = await Account.findById(transaction.accountId);
    if (newAccount) {
      newAccount.balance += transaction.amount;
      await newAccount.save();
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Revert transaction from account balance
    const account = await Account.findById(transaction.accountId);
    if (account) {
      account.balance -= transaction.amount;
      await account.save();
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get transaction summary
const getTransactionSummary = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    
    const query = { userId: req.user.id };
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const transactions = await Transaction.find(query);
    
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      netAmount: 0,
      transactionCount: transactions.length
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'Income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += Math.abs(transaction.amount);
      }
    });

    summary.netAmount = summary.totalIncome - summary.totalExpense;

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary
};