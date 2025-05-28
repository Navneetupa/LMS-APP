import React, { useState } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import MyCourses from './mycourses';
import Contact from './contact';
import AssessmentScores from './assessmentscore';

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
      case 'assessmentscore':
        return <AssessmentScores />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="h-[3.5rem] bg-white shadow-md flex items-center px-4">
        {/* Navbar content can go here if needed */}
      </div>

      {/* Sidebar Toggle Button (Visible only on mobile) */}
      <button
        className="md:hidden fixed top-[4rem] right-4 z-20 p-2 bg-[#49BBBD] text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 h-[calc(100vh-3.5rem)] w-16 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setIsSidebarOpen(false); // Close sidebar on mobile after selection
          }}
        />
      </div>

      {/* Overlay when sidebar is open (Visible only on mobile) */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50 px-2 min-h-[calc(100vh-3.5rem)] md:ml-16">
        {renderPage()}
      </div>
    </div>
  );
};

export default ParentLayout;