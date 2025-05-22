// components/ParentLayout.jsx
import React, { useState } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import MyCourses from './mycourses';
import Certificate from './certificate';
import Contact from './contact';

const ParentLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <MyCourses />;
      case 'certificate':
        return <Certificate />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar always visible */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Content area updates based on selection */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50 mt-[3.5rem]">
        {renderPage()}
      </div>
    </div>
  );
};

export default ParentLayout;
