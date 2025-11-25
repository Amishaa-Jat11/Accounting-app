import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showFilters, setShowFilters] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [generatingReport, setGeneratingReport] = useState(null);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [accountsResponse, transactionsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/accounts', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/transactions', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      if (accountsResponse.ok) {
        const accountsResult = await accountsResponse.json();
        const accountsData = accountsResult.data || accountsResult;
        setAccounts(Array.isArray(accountsData) ? accountsData : []);
      }
      
      if (transactionsResponse.ok) {
        const transactionsResult = await transactionsResponse.json();
        const transactionsData = transactionsResult.data || transactionsResult;
        setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
      }
    } catch (error) {
      console.error('Error fetching reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType) => {
    setGeneratingReport(reportType);
    try {
      const token = localStorage.getItem('token');
      let endpoint = '';
      
      switch(reportType) {
        case 'Profit & Loss':
          endpoint = '/api/reports/profit-loss';
          break;
        case 'Balance Sheet':
          endpoint = '/api/reports/balance-sheet';
          break;
        case 'Cash Flow':
          endpoint = '/api/reports/cash-flow';
          break;
        case 'Trial Balance':
          endpoint = '/api/reports/trial-balance';
          break;
        default:
          alert('Report type not implemented yet');
          return;
      }
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const result = await response.json();
        const newReport = {
          id: Date.now(),
          name: `${reportType} - ${new Date().toLocaleDateString()}`,
          type: reportType,
          date: new Date().toISOString().split('T')[0],
          size: '1.2 MB',
          status: 'Ready',
          data: result.data
        };
        
        setGeneratedReports(prev => [newReport, ...prev]);
        alert(`${reportType} report generated successfully!`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report');
    } finally {
      setGeneratingReport(null);
    }
  };

  const reportTypes = [
    { 
      id: 1, 
      name: 'Profit & Loss', 
      description: 'View income and expenses summary', 
      icon: '📊',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      id: 2, 
      name: 'Balance Sheet', 
      description: 'View assets, liabilities and equity', 
      icon: '⚖️',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      id: 3, 
      name: 'Cash Flow', 
      description: 'Track cash inflows and outflows', 
      icon: '💰',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    { 
      id: 4, 
      name: 'Trial Balance', 
      description: 'View all account balances', 
      icon: '📋',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    { 
      id: 5, 
      name: 'Tax Report', 
      description: 'Generate tax-related reports', 
      icon: '🧾',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    { 
      id: 6, 
      name: 'Custom Report', 
      description: 'Create custom financial reports', 
      icon: '🔧',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    }
  ];

  const recentReports = [];

  const quickStats = [
    { label: 'Total Accounts', value: (Array.isArray(accounts) ? accounts.length : 0).toString(), icon: '📈', change: `${Array.isArray(accounts) ? accounts.length : 0} active` },
    { label: 'Total Transactions', value: (Array.isArray(transactions) ? transactions.length : 0).toString(), icon: '📅', change: `This period` },
    { label: 'Income Transactions', value: (Array.isArray(transactions) ? transactions.filter(t => t.type === 'Income').length : 0).toString(), icon: '⏳', change: 'Revenue entries' },
    { label: 'Expense Transactions', value: (Array.isArray(transactions) ? transactions.filter(t => t.type === 'Expense').length : 0).toString(), icon: '💾', change: 'Expense entries' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-green-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Financial Reports</h2>
            <p className="text-green-100">Generate comprehensive business reports and analytics</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
            >
              🔍 Filters
            </button>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all font-semibold">
              📤 Export All
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow border-l-4 ${
            index === 0 ? 'border-l-green-500' :
            index === 1 ? 'border-l-blue-500' :
            index === 2 ? 'border-l-orange-500' : 'border-l-purple-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option>All Types</option>
                <option>Financial</option>
                <option>Tax</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Types Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 border-l-green-500">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center text-2xl mr-4`}>
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-500">{(Array.isArray(transactions) ? transactions.length : 0) > 0 ? `${transactions.length} transactions` : 'No data yet'}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{report.description}</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => generateReport(report.name)}
                    disabled={generatingReport === report.name}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all font-medium disabled:opacity-50"
                  >
                    {generatingReport === report.name ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {generatedReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated yet</h3>
                    <p className="text-gray-500">Generate your first report to see it here</p>
                  </td>
                </tr>
              ) : (
                generatedReports.map((report, index) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">
                          {report.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-base">{report.name}</div>
                          <div className="text-sm text-gray-500 mt-1">Financial Report • PDF Format</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{report.size}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'Ready' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => alert('View functionality coming soon!')}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors font-medium"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => setGeneratedReports(prev => prev.filter(r => r.id !== report.id))}
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;