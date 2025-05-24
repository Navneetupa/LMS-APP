import { FiGrid, FiBookOpen, FiMessageSquare } from 'react-icons/fi';

const Sidebar = ({ activePage, setActivePage }) => {
  const menu = [
    { name: 'dashboard', icon: <FiGrid className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'courses', icon: <FiBookOpen className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'contact', icon: <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ];

  return (
    <div className="w-16 bg-[#49BBBD] shadow-md flex flex-col justify-center items-center py-6 space-y-6 fixed left-0 top-[3.5rem] h-[calc(100vh-3.5rem)]">
      {menu.map((item) => (
        <div
          key={item.name}
          className={`p-3 sm:p-4 cursor-pointer rounded-xl hover:bg-[#3AA8AA] ${
            activePage === item.name ? 'bg-[#3AA8AA]' : ''
          }`}
          onClick={() => setActivePage(item.name)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;