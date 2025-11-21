import React from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      {showSidebar && <MobileHeader />}
      <main className={showSidebar ? 'lg:ml-64 p-6 pt-20 lg:pt-6' : ''}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
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