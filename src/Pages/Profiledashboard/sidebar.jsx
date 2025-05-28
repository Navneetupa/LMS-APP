import { FiGrid, FiBookOpen, FiMessageSquare, FiStar, FiCreditCard } from 'react-icons/fi';

const Sidebar = ({ activePage, setActivePage }) => {
  const menu = [
    { name: 'Dashboard', page: 'dashboard', icon: <FiGrid className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Courses', page: 'courses', icon: <FiBookOpen className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Assessment Score', page: 'assessmentscore', icon: <FiStar className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Payment History', page: 'paymentHistory', icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Contact', page: 'contact', icon: <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ];

  return (
    <div className="w-16 bg-white shadow-md flex flex-col justify-center items-center py-6 space-y-6 fixed left-0 top-[3.5rem] h-[calc(100vh-3.5rem)]">
      {menu.map((item) => (
        <div
          key={item.page}
          className="relative group p-3 sm:p-4 cursor-pointer rounded-xl transition-colors duration-200"
          onClick={() => setActivePage(item.page)}
        >
          <div
            className={`flex justify-center items-center ${
              activePage === item.page
                ? 'bg-gray-200 text-gray-800'
                : 'text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
            } rounded-xl p-2 transition-colors duration-200`}
          >
            {item.icon}
          </div>
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#3AA8AA] text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;