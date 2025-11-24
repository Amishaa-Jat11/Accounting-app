import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { SidebarProvider } from './context/SidebarContext';

function AppContent() {
  const location = useLocation();
  const noSidebarPages = ['/', '/login', '/signup'];
  const showSidebar = !noSidebarPages.includes(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      {showSidebar && <MobileHeader />}
      <main className={showSidebar ? 'lg:ml-64 p-6 pt-20 lg:pt-6' : ''}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
          <Route path="/accounts" element={isAuthenticated ? <Accounts /> : <Login onLogin={handleLogin} />} />
          <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Login onLogin={handleLogin} />} />
          <Route path="/reports" element={isAuthenticated ? <Reports /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </Router>
  );
}

export default App;