import React, { useState } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import MyCourses from './mycourses';
import Contact from './contact';

const ParentLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <MyCourses />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      {/* <div className="w-full h-[3.5rem] bg-white shadow-md flex items-center px-4 fixed top-0 z-70">
      
      </div> */}

      {/* Sidebar */}
      <div
        className={`fixed left-0 h-[calc(100vh-3.5rem)] w-16 transition-transform duration-300 ease-in-out z-100
          md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full '}`}
      >
        <Sidebar activePage={activePage} setActivePage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false); // Close sidebar after selection on mobile
        }} />
      </div>

      {/* Overlay when sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Toggle Button (visible only on small screens) */}
      <button
        className="fixed top-[4rem] right-4 z-50 p-2 bg-[#49BBBD] text-white rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Close' : 'Menu'}
      </button>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50 px-2 min-h-[calc(100vh-3.5rem)] mt-[3.5rem] md:ml-16">
        {renderPage()}
      </div>
    </div>
  );
};

export default ParentLayout;