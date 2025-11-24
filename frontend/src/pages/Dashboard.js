import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch accounts
      const accountsResponse = await fetch('http://localhost:5000/api/accounts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch transactions
      const transactionsResponse = await fetch('http://localhost:5000/api/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (accountsResponse.ok) {
        const accountsData = await accountsResponse.json();
        setAccounts(Array.isArray(accountsData) ? accountsData : []);
      }
      
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Calculate stats
  const totalRevenue = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalRevenue - totalExpenses;
  const totalAccounts = accounts.length;
  const recentTransactions = Array.isArray(transactions) ? transactions.slice(0, 5) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <p className="text-blue-100 mt-1">Welcome back! Here's your business overview</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-500 mt-1">{transactions.filter(t => t.type === 'Income').length} transactions</p>
            </div>
            <div className="text-3xl text-green-500">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-red-500 mt-1">{transactions.filter(t => t.type === 'Expense').length} transactions</p>
            </div>
            <div className="text-3xl text-red-500">📊</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{Math.abs(netProfit).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{netProfit >= 0 ? 'Profit' : 'Loss'} this period</p>
            </div>
            <div className="text-3xl text-blue-500">📈</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
              <p className="text-3xl font-bold text-purple-600">{totalAccounts}</p>
              <p className="text-sm text-purple-500 mt-1">Total accounts</p>
            </div>
            <div className="text-3xl text-purple-500">📄</div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Overview</h3>
          <div className="text-center py-8">
            <p className="text-gray-500">No data available</p>
            <p className="text-sm text-gray-400 mt-2">Add transactions to see monthly overview</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleNavigation('/transactions')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
            >
              <div className="text-2xl mb-2">➕</div>
              <span className="text-sm font-medium text-blue-700">Add Transaction</span>
            </button>
            <button 
              onClick={() => handleNavigation('/reports')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium text-green-700">Generate Report</span>
            </button>
            <button 
              onClick={() => handleNavigation('/accounts')}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
            >
              <div className="text-2xl mb-2">💳</div>
              <span className="text-sm font-medium text-purple-700">Add Account</span>
            </button>
            <button 
              onClick={() => handleNavigation('/transactions')}
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📋</div>
              <span className="text-sm font-medium text-orange-700">View Invoices</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
            <button 
              onClick={() => handleNavigation('/transactions')}
              className="text-primary hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No transactions found
                    <p className="text-sm text-gray-400 mt-2">Add your first transaction to get started</p>
                  </td>
                </tr>
              ) : (
                recentTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Balances</h3>
          {accounts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No accounts found</p>
              <p className="text-sm text-gray-400 mt-2">Create your first account to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(Array.isArray(accounts) ? accounts : []).slice(0, 5).map((account) => (
                <div key={account._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      account.type === 'Asset' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">{account.name}</span>
                  </div>
                  <span className={`font-semibold ${
                    account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{Math.abs(account.balance).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Bills</h3>
          <div className="text-center py-8">
            <p className="text-gray-500">No upcoming bills</p>
            <p className="text-sm text-gray-400 mt-2">Bills will appear here when added</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;