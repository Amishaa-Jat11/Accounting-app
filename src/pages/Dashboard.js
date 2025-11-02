import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <button 
          onClick={handleLogout}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹1,25,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">₹85,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Net Profit</h3>
          <p className="text-3xl font-bold text-blue-600">₹40,000</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">2024-01-15</td>
                <td className="py-2">Office Supplies</td>
                <td className="py-2 text-red-600">-₹5,000</td>
                <td className="py-2">Expense</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2024-01-14</td>
                <td className="py-2">Client Payment</td>
                <td className="py-2 text-green-600">+₹25,000</td>
                <td className="py-2">Income</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;