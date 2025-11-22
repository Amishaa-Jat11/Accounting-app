import React, { useState } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', description: 'Office Rent Payment', account: 'Cash Account', amount: -15000, type: 'Expense', category: 'Rent', status: 'Completed' },
    { id: 2, date: '2024-01-14', description: 'Service Revenue from Client A', account: 'Bank Account', amount: 35000, type: 'Income', category: 'Service', status: 'Completed' },
    { id: 3, date: '2024-01-13', description: 'Office Supplies Purchase', account: 'Cash Account', amount: -2500, type: 'Expense', category: 'Supplies', status: 'Completed' },
    { id: 4, date: '2024-01-12', description: 'Consulting Fee', account: 'Bank Account', amount: 25000, type: 'Income', category: 'Consulting', status: 'Pending' },
    { id: 5, date: '2024-01-11', description: 'Internet Bill', account: 'Bank Account', amount: -2000, type: 'Expense', category: 'Utilities', status: 'Completed' },
    { id: 6, date: '2024-01-10', description: 'Product Sales', account: 'Cash Account', amount: 18000, type: 'Income', category: 'Sales', status: 'Completed' },
    { id: 7, date: '2024-01-09', description: 'Marketing Expenses', account: 'Credit Card', amount: -5000, type: 'Expense', category: 'Marketing', status: 'Pending' },
    { id: 8, date: '2024-01-08', description: 'Freelance Payment', account: 'Bank Account', amount: 12000, type: 'Income', category: 'Freelance', status: 'Completed' }
  ]);
  
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    account: '',
    amount: '',
    type: 'Income',
    category: '',
    status: 'Completed'
  });

  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    category: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      ...formData,
      amount: formData.type === 'Expense' ? -Math.abs(parseFloat(formData.amount)) : parseFloat(formData.amount)
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      date: '',
      description: '',
      account: '',
      amount: '',
      type: 'Income',
      category: '',
      status: 'Completed'
    });
    setShowAddModal(false);
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Tab filter
    let tabMatch = true;
    if (activeTab === 'income') tabMatch = transaction.type === 'Income';
    if (activeTab === 'expense') tabMatch = transaction.type === 'Expense';
    
    // Date filter
    let dateMatch = true;
    if (filters.fromDate) {
      dateMatch = dateMatch && new Date(transaction.date) >= new Date(filters.fromDate);
    }
    if (filters.toDate) {
      dateMatch = dateMatch && new Date(transaction.date) <= new Date(filters.toDate);
    }
    
    // Category filter
    let categoryMatch = true;
    if (filters.category && filters.category !== 'All Categories') {
      categoryMatch = transaction.category.toLowerCase().includes(filters.category.toLowerCase());
    }
    
    return tabMatch && dateMatch && categoryMatch;
  });

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
  const netAmount = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Transactions</h2>
            <p className="text-blue-100 mt-1">Manage and track all your financial transactions</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-md"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              <p className="text-sm text-green-500 mt-1">This month</p>
            </div>
            <div className="text-3xl text-green-500">📈</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
              <p className="text-sm text-red-500 mt-1">This month</p>
            </div>
            <div className="text-3xl text-red-500">📉</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Amount</p>
              <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ₹{Math.abs(netAmount).toLocaleString()}
              </p>
              <p className="text-sm text-blue-500 mt-1">This month</p>
            </div>
            <div className="text-3xl text-blue-500">💰</div>
          </div>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setActiveTab('expense')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Expenses
            </button>
          </div>

          {/* Date Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Rent">Rent</option>
                <option value="Service">Service</option>
                <option value="Supplies">Supplies</option>
                <option value="Utilities">Utilities</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => setFilters({fromDate: '', toDate: '', category: ''})}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {activeTab === 'all' ? 'All Transactions' : 
               activeTab === 'income' ? 'Income Transactions' : 'Expense Transactions'}
              <span className="ml-2 text-sm text-gray-500">({filteredTransactions.length} records)</span>
            </h3>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded border">Export</button>
              <button className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded border">Print</button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="font-medium">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
            <span className="font-medium">{transactions.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-primary text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Transaction</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter transaction description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select
                  name="account"
                  value={formData.account}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Account</option>
                  <option value="Cash Account">Cash Account</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;