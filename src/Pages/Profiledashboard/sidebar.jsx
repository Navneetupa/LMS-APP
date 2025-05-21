
import { FiGrid, FiBookOpen, FiAward, FiMessageSquare } from 'react-icons/fi';

const Sidebar = ({ activePage, setActivePage }) => {
  const menu = [
    { name: 'dashboard', icon: <FiGrid /> },
    { name: 'courses', icon: <FiBookOpen /> },
    // { name: 'certificate', icon: <FiAward /> },
    { name: 'contact', icon: <FiMessageSquare /> },
  ];

  return (
    <div className="w-16 bg-white shadow-md flex flex-col justify-center items-center py-6 space-y-6">
      {menu.map((item) => (
        <div
          key={item.name}
          className={`p-4 cursor-pointer rounded-xl hover:bg-gray-200 ${
            activePage === item.name ? 'bg-gray-200' : ''
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
