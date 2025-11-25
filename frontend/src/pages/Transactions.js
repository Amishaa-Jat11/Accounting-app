import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        const transactions = result.data || result;
        setTransactions(Array.isArray(transactions) ? transactions : []);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'exists' : 'missing');
      
      const response = await fetch('http://localhost:5000/api/accounts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Accounts response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Accounts fetched:', result);
        const accounts = result.data || result;
        setAccounts(Array.isArray(accounts) ? accounts : []);
      } else {
        const errorData = await response.text();
        console.error('Failed to fetch accounts:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const selectedAccount = accounts.find(acc => acc.name === formData.account);
      
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          accountId: selectedAccount?._id,
          amount: formData.type === 'Expense' ? -Math.abs(parseFloat(formData.amount)) : parseFloat(formData.amount)
        })
      });
      
      if (response.ok) {
        fetchTransactions();
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
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const filteredTransactions = (Array.isArray(transactions) ? transactions : []).filter(transaction => {
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

  const totalIncome = (Array.isArray(transactions) ? transactions : []).filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs((Array.isArray(transactions) ? transactions : []).filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
  const netAmount = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-600 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Transactions</h2>
            <p className="text-green-100 mt-1">Manage and track all your financial transactions</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold shadow-md"
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

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Amount</p>
              <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(netAmount).toLocaleString()}
              </p>
              <p className="text-sm text-green-500 mt-1">This month</p>
            </div>
            <div className="text-3xl text-green-500">💰</div>
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
                activeTab === 'all' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
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
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="text-6xl mb-4">💳</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                    <p className="text-gray-500">Add your first transaction to get started</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
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
                        <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                        <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
            <button className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg">1</button>
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
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Account</option>
                  {loading ? (
                    <option disabled>Loading accounts...</option>
                  ) : accounts.length === 0 ? (
                    <option disabled>No accounts found - Create an account first</option>
                  ) : (
                    accounts.map(account => (
                      <option key={account._id} value={account.name}>{account.name}</option>
                    ))
                  )}
                </select>
                {accounts.length === 0 && !loading && (
                  <p className="text-sm text-red-500 mt-1">Please create an account first before adding transactions.</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
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