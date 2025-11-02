import React from 'react';

const Reports = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Profit & Loss</h3>
          <p className="text-gray-600 mb-4">View income and expenses summary</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Balance Sheet</h3>
          <p className="text-gray-600 mb-4">View assets, liabilities and equity</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Cash Flow</h3>
          <p className="text-gray-600 mb-4">Track cash inflows and outflows</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Trial Balance</h3>
          <p className="text-gray-600 mb-4">View all account balances</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Tax Report</h3>
          <p className="text-gray-600 mb-4">Generate tax-related reports</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Custom Report</h3>
          <p className="text-gray-600 mb-4">Create custom financial reports</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Report
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">Profit & Loss - January 2024</h4>
              <p className="text-sm text-gray-600">Generated on 2024-01-15</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">Download</button>
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">Balance Sheet - December 2023</h4>
              <p className="text-sm text-gray-600">Generated on 2024-01-01</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;