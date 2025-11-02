import React from 'react';

const Accounts = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Accounts</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Account
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Cash Account</td>
              <td className="px-6 py-4">Asset</td>
              <td className="px-6 py-4 text-green-600">₹50,000</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Bank Account</td>
              <td className="px-6 py-4">Asset</td>
              <td className="px-6 py-4 text-green-600">₹2,50,000</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Accounts Payable</td>
              <td className="px-6 py-4">Liability</td>
              <td className="px-6 py-4 text-red-600">₹15,000</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;