import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../../assets/dashboard.png';
import { FaPlay } from 'react-icons/fa';
import { ThemeContext } from '../../Pages/Profiledashboard/ThemeContext';
import CourseCards from '../Profiledashboard/Coursecard';

const Notification = ({ message, type, onClose }) => {
  const { theme } = useContext(ThemeContext);
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 ${
        type === 'error'
          ? theme === 'dark'
            ? 'bg-red-600 dark:bg-red-700'
            : 'bg-red-500'
          : theme === 'dark'
          ? 'bg-green-600 dark:bg-green-700'
          : 'bg-green-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:text-gray-200 dark:hover:text-gray-300">
          ✕
        </button>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const validCourses = response.data.data.filter((c) => c.course !== null);
        setCourses(validCourses);
      } catch (error) {
        console.error('Error fetching student courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePlay = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayedCourses = courses.slice(0, 3);

  return (
    <div className={`w-full ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Assigned Courses</h3>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center">No enrolled courses found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedCourses.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer relative"
                onClick={() => navigate(`/course-player/${item.course._id}`)}
              >
                <div className="w-full h-36 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 overflow-hidden relative group">
                  {item.course.thumbnail && (
                    <img
                      src={item.course.thumbnail}
                      alt={item.course.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(item.course._id);
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#49BBBD] dark:bg-[#3A9D9D] text-white p-2 rounded-full shadow-lg hover:scale-110 z-50"
                    title="Play Course"
                  >
                    <FaPlay className="text-xs" />
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200 mb-1 truncate">{item.course.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.course.description}</p>
                <div className="flex justify-between items-center text-xs">
                  {item.course.discountPrice ? (
                    <>
                      <span className="font-semibold text-slate-700 dark:text-gray-300">₹{item.course.price - item.course.discountPrice}</span>
                      <span className="text-gray-500 dark:text-gray-400 line-through">₹{item.course.price}</span>
                    </>
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-gray-300">₹{item.course.price}</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-gray-700 dark:text-gray-300 truncate">
                    👨‍🏫 {item.course.instructor?.firstName} {item.course.instructor?.lastName}
                  </span>
                  <span className="text-yellow-500 dark:text-yellow-400">⭐ {item.course.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {courses.length > 3 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={openModal}
                className="px-8 py-3 bg-[#59c1c3] dark:bg-[#3A9D9D] text-white rounded-full font-semibold text-lg hover:bg-[#7dded] dark:hover:bg-[#2A8D8D] transition-colors duration-300 shadow-lg"
              >
                View All Courses
              </button>
            </div>
          )}
          <CourseCards courses={courses} />

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">All Enrolled Courses</h3>
                  <button onClick={closeModal} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer relative"
                      onClick={() => {
                        navigate(`/course-player/${item.course._id}`);
                        closeModal();
                      }}
                    >
                      <div className="w-full h-36 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 overflow-hidden relative group">
                        {item.course.thumbnail && (
                          <img
                            src={item.course.thumbnail}
                            alt={item.course.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(item.course._id);
                            closeModal();
                          }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#49BBBD] dark:bg-[#3A9D9D] text-white p-2 rounded-full shadow-lg hover:scale-110 z-50"
                          title="Play Course"
                        >
                          <FaPlay className="text-xs" />
                        </button>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200 mb-1 truncate">{item.course.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.course.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        {item.course.discountPrice ? (
                          <>
                            <span className="font-semibold text-slate-700 dark:text-gray-300">₹{item.course.price - item.course.discountPrice}</span>
                            <span className="text-gray-500 dark:text-gray-400 line-through">₹{item.course.price}</span>
                          </>
                        ) : (
                          <span className="font-semibold text-slate-700 dark:text-gray-300">₹{item.course.price}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="text-gray-700 dark:text-gray-300 truncate">
                          👨‍🏫 {item.course.instructor?.firstName} {item.course.instructor?.lastName}
                        </span>
                        <span className="text-yellow-500 dark:text-yellow-400">⭐ {item.course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [student, setStudent] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('dashboard_refreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('dashboard_refreshed', 'true');
      window.location.reload();
      return;
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification({ message: 'Authentication required. Please log in to access your profile.', type: 'error' });
        return;
      }

      try {
        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setStudent(data);
      } catch (err) {
        setNotification({ message: 'Unable to retrieve profile data. Please try again later.', type: 'error' });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={`bg-gradient-to-r from-[#D8C4E5] dark:from-gray-800 to-[#E8D9F0] dark:to-gray-900 p-6 rounded-lg shadow w-full ${theme === 'dark' ? 'dark' : ''}`}>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center mb-8">
        <div className="max-w-[70%]">
          <h1 className="font-bold text-xl text-gray-800 dark:text-gray-200">Hey {student?.firstName || 'User'}.</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! We’re here to support you on your learning journey. Dive into your classes and keep progressing towards your goals
          </p>
        </div>
        <div className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]">
          <img src={dashboardImage} alt="Illustration" className="w-full h-auto" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
        <MyCourses />
      </div>

        
    
    </div>
  );
};

export default Dashboard;