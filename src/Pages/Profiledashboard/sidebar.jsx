import React, { useContext } from 'react';
import { FiGrid, FiHeart, FiHome, FiFileText, FiSettings, FiMessageSquare, FiStar } from 'react-icons/fi';
import { RiMedalLine } from 'react-icons/ri';
import { ThemeContext } from '../Profiledashboard/ThemeContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage, setActivePage }) => {
  const { language } = useContext(ThemeContext);
  const navigate = useNavigate();

  const menu = [
    { name: 'home', icon: <FiHome className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Go to Home' : 'होम' },
    { name: 'dashboard', icon: <FiGrid className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Dashboard' : 'डैशबोर्ड' },
    { name: 'Achievements', icon: <RiMedalLine className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Achievements' : 'उपलब्धियाँ' },
    { name: 'assessmentscore', icon: <FiStar className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Assessment Score' : 'मूल्यांकन स्कोर' },
    { name: 'Interest', icon: <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Interest' : 'रुचि' },
    { name: 'contact', icon: <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Contact' : 'संपर्क' },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'en' ? 'Settings' : 'सेटिंग' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-16 md:w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col items-center md:items-start py-6 space-y-1 fixed left-0 h-screen">
      {menu.map((item) => (
        <div
          key={item.name}
          className="relative group w-full flex justify-center md:justify-start p-3 md:pl-6 cursor-pointer rounded-xl transition-colors duration-200"
          onClick={() => setActivePage(item.name)}
        >
          <div
            className={`flex items-center gap-4 ${
              activePage === item.name
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-hover:text-gray-800 dark:group-hover:text-gray-100'
            } rounded-xl p-2 w-10 md:w-full transition-colors duration-200`}
          >
            {item.icon}
            <span className="hidden md:inline text-sm capitalize">{item.label}</span>
          </div>
          <span className="md:hidden absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#3AA8AA] dark:bg-[#2A9D8F] text-white dark:text-gray-100 text-xs capitalize font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
      <div
        className="relative group w-full flex justify-center md:justify-start p-3 md:pl-6 cursor-pointer rounded-xl transition-colors duration-200 mt-auto"
        onClick={handleLogout}
      >
        <div
          className="flex items-center gap-4 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-hover:text-gray-800 dark:group-hover:text-gray-100 rounded-xl p-2 w-10 md:w-full transition-colors duration-200"
        >
          <FaSignOutAlt className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden md:inline text-sm capitalize">{language === 'en' ? 'Sign Out' : 'साइन आउट'}</span>
        </div>
        <span className="md:hidden absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#3AA8AA] dark:bg-[#2A9D8F] text-white dark:text-gray-100 text-xs capitalize font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {language === 'en' ? 'Sign Out' : 'साइन आउट'}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;