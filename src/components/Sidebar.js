import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/accounts', label: 'Accounts', icon: '💰' },
    { path: '/transactions', label: 'Transactions', icon: '📝' },
    { path: '/reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">💼 Accounting</h1>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green-600 text-white'
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
    </>
  );
};

export default Sidebar;