import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/accounts', label: 'Accounts', icon: '💰' },
    { path: '/transactions', label: 'Transactions', icon: '📝' },
    { path: '/reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">💼 Accounting</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;