import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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
              <p className="text-3xl font-bold text-green-600">₹1,25,000</p>
              <p className="text-sm text-green-500 mt-1">↗ +12% from last month</p>
            </div>
            <div className="text-3xl text-green-500">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">₹85,000</p>
              <p className="text-sm text-red-500 mt-1">↗ +8% from last month</p>
            </div>
            <div className="text-3xl text-red-500">📊</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-3xl font-bold text-blue-600">₹40,000</p>
              <p className="text-sm text-blue-500 mt-1">↗ +15% from last month</p>
            </div>
            <div className="text-3xl text-blue-500">📈</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-purple-500 mt-1">₹25,000 total</p>
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
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">January 2024</span>
              <span className="text-green-600 font-semibold">+₹45,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">December 2023</span>
              <span className="text-green-600 font-semibold">+₹38,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">November 2023</span>
              <span className="text-green-600 font-semibold">+₹42,000</span>
            </div>
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
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Jan 15, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">Office Supplies Purchase</td>
                <td className="px-6 py-4 text-sm text-gray-500">Expense</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">-₹5,000</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Jan 14, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">Client Payment Received</td>
                <td className="px-6 py-4 text-sm text-gray-500">Income</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">+₹25,000</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Jan 13, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">Software Subscription</td>
                <td className="px-6 py-4 text-sm text-gray-500">Expense</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">-₹2,500</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Jan 12, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">Consulting Service</td>
                <td className="px-6 py-4 text-sm text-gray-500">Income</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">+₹15,000</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Balances</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium">Cash Account</span>
              </div>
              <span className="font-semibold text-green-600">₹50,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium">Bank Account</span>
              </div>
              <span className="font-semibold text-green-600">₹2,50,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="font-medium">Credit Card</span>
              </div>
              <span className="font-semibold text-red-600">-₹15,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Bills</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div>
                <p className="font-medium text-gray-800">Office Rent</p>
                <p className="text-sm text-gray-600">Due: Jan 20, 2024</p>
              </div>
              <span className="font-semibold text-red-600">₹15,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <p className="font-medium text-gray-800">Internet Bill</p>
                <p className="text-sm text-gray-600">Due: Jan 25, 2024</p>
              </div>
              <span className="font-semibold text-yellow-600">₹2,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <p className="font-medium text-gray-800">Insurance Premium</p>
                <p className="text-sm text-gray-600">Due: Jan 30, 2024</p>
              </div>
              <span className="font-semibold text-blue-600">₹8,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;