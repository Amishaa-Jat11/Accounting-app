import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">NextBook Cloud</h1>
          <div className="flex items-center space-x-4">
            <span className="text-blue-100">Welcome, User</span>
            <button 
              onClick={onLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
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