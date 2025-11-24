import React from 'react';
import { useSidebar } from '../context/SidebarContext';

const MobileHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="lg:hidden bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold text-gray-800">💼 Accounting</h1>
        <div className="w-10"></div>
      </div>
    </div>
  );
};

export default MobileHeader;