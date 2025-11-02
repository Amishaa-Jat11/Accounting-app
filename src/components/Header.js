import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">NextBook Cloud</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, User</span>
            <button 
              onClick={onLogout}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;