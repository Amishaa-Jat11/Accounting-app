const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Generate Profit & Loss Report
const getProfitLossReport = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    
    const query = { userId: req.user.id };
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const transactions = await Transaction.find(query)
      .populate('accountId', 'name type');

    const report = {
      period: {
        from: fromDate || 'Beginning',
        to: toDate || 'Current'
      },
      income: {
        categories: {},
        total: 0
      },
      expenses: {
        categories: {},
        total: 0
      },
      netIncome: 0
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'Income') {
        if (!report.income.categories[transaction.category]) {
          report.income.categories[transaction.category] = 0;
        }
        report.income.categories[transaction.category] += transaction.amount;
        report.income.total += transaction.amount;
      } else {
        if (!report.expenses.categories[transaction.category]) {
          report.expenses.categories[transaction.category] = 0;
        }
        report.expenses.categories[transaction.category] += Math.abs(transaction.amount);
        report.expenses.total += Math.abs(transaction.amount);
      }
    });

    report.netIncome = report.income.total - report.expenses.total;

    res.json({
      success: true,
      reportType: 'Profit & Loss',
      data: report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate Balance Sheet Report
const getBalanceSheetReport = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id, isActive: true });

    const report = {
      asOfDate: new Date().toISOString().split('T')[0],
      assets: {
        categories: {},
        total: 0
      },
      liabilities: {
        categories: {},
        total: 0
      },
      equity: {
        categories: {},
        total: 0
      }
    };

    accounts.forEach(account => {
      if (account.type === 'Asset') {
        if (!report.assets.categories[account.type]) {
          report.assets.categories[account.type] = [];
        }
        report.assets.categories[account.type].push({
          name: account.name,
          balance: account.balance
        });
        report.assets.total += account.balance;
      } else if (account.type === 'Liability') {
        if (!report.liabilities.categories[account.type]) {
          report.liabilities.categories[account.type] = [];
        }
        report.liabilities.categories[account.type].push({
          name: account.name,
          balance: Math.abs(account.balance)
        });
        report.liabilities.total += Math.abs(account.balance);
      } else if (account.type === 'Equity') {
        if (!report.equity.categories[account.type]) {
          report.equity.categories[account.type] = [];
        }
        report.equity.categories[account.type].push({
          name: account.name,
          balance: account.balance
        });
        report.equity.total += account.balance;
      }
    });

    report.totalLiabilitiesAndEquity = report.liabilities.total + report.equity.total;

    res.json({
      success: true,
      reportType: 'Balance Sheet',
      data: report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate Cash Flow Report
const getCashFlowReport = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    
    const query = { userId: req.user.id };
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const transactions = await Transaction.find(query)
      .populate('accountId', 'name type')
      .sort({ date: 1 });

    const report = {
      period: {
        from: fromDate || 'Beginning',
        to: toDate || 'Current'
      },
      operatingActivities: {
        cashInflows: 0,
        cashOutflows: 0,
        netCashFlow: 0
      },
      summary: {
        beginningBalance: 0,
        totalInflows: 0,
        totalOutflows: 0,
        endingBalance: 0
      }
    };

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        report.operatingActivities.cashInflows += transaction.amount;
        report.summary.totalInflows += transaction.amount;
      } else {
        report.operatingActivities.cashOutflows += Math.abs(transaction.amount);
        report.summary.totalOutflows += Math.abs(transaction.amount);
      }
    });

    report.operatingActivities.netCashFlow = 
      report.operatingActivities.cashInflows - report.operatingActivities.cashOutflows;
    
    report.summary.endingBalance = 
      report.summary.beginningBalance + report.summary.totalInflows - report.summary.totalOutflows;

    res.json({
      success: true,
      reportType: 'Cash Flow',
      data: report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate Trial Balance Report
const getTrialBalanceReport = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id, isActive: true })
      .sort({ type: 1, name: 1 });

    const report = {
      asOfDate: new Date().toISOString().split('T')[0],
      accounts: [],
      totals: {
        debit: 0,
        credit: 0
      }
    };

    accounts.forEach(account => {
      const accountData = {
        name: account.name,
        type: account.type,
        debit: account.balance >= 0 ? account.balance : 0,
        credit: account.balance < 0 ? Math.abs(account.balance) : 0
      };

      report.accounts.push(accountData);
      report.totals.debit += accountData.debit;
      report.totals.credit += accountData.credit;
    });

    res.json({
      success: true,
      reportType: 'Trial Balance',
      data: report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const monthlyTransactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: currentMonth }
    });

    const accounts = await Account.find({ userId: req.user.id, isActive: true });

    const summary = {
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      pendingInvoices: 0,
      accountBalances: {
        cash: 0,
        bank: 0,
        totalAssets: 0,
        totalLiabilities: 0
      },
      monthlyOverview: [],
      recentTransactions: []
    };

    // Calculate monthly totals
    monthlyTransactions.forEach(transaction => {
      if (transaction.type === 'Income') {
        summary.totalRevenue += transaction.amount;
      } else {
        summary.totalExpenses += Math.abs(transaction.amount);
      }
      
      if (transaction.status === 'Pending') {
        summary.pendingInvoices += 1;
      }
    });

    summary.netProfit = summary.totalRevenue - summary.totalExpenses;

    // Calculate account balances
    accounts.forEach(account => {
      if (account.name.toLowerCase().includes('cash')) {
        summary.accountBalances.cash += account.balance;
      } else if (account.name.toLowerCase().includes('bank')) {
        summary.accountBalances.bank += account.balance;
      }

      if (account.type === 'Asset') {
        summary.accountBalances.totalAssets += account.balance;
      } else if (account.type === 'Liability') {
        summary.accountBalances.totalLiabilities += Math.abs(account.balance);
      }
    });

    // Get recent transactions
    summary.recentTransactions = await Transaction.find({ userId: req.user.id })
      .populate('accountId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProfitLossReport,
  getBalanceSheetReport,
  getCashFlowReport,
  getTrialBalanceReport,
  getDashboardSummary
};