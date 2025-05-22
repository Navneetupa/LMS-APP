// components/MyCourses.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePlay = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  return (
    <div className="min-h-screen w-full bg-sky-50 p-4 sm:px-6 md:p-8 overflow-auto">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">My Courses</h1>
      </div>

      {loading ? (
        <p className="text-gray-600 text-sm">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600 text-sm">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 sm:p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/course-player/${item.course._id}`)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-40 sm:h-32 bg-gray-200 rounded-md mb-3 overflow-hidden">
                {item.course.thumbnail && (
                  <img
                    src={item.course.thumbnail}
                    alt={item.course.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(item.course._id);
                  }}
                  className="absolute -bottom-4 right-2 bg-[#49BBBD] text-white p-3 rounded-full shadow-lg hover:scale-110 z-10"
                  title="Play Course"
                >
                  <FaPlay className="text-sm" />
                </button>
              </div>

              <h3 className="text-sm sm:text-md md:text-lg font-semibold text-slate-800 mb-1 truncate">
                {item.course.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                {item.course.description}
              </p>

              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">
                  ₹{item.course.discountPrice ?? item.course.price}
                </span>
                {item.course.discountPrice && (
                  <span className="text-gray-500 line-through">
                    ₹{item.course.price}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-3 text-xs sm:text-sm">
                <span className="text-gray-700 truncate">
                  👨‍🏫 {item.course.instructor?.firstName} {item.course.instructor?.lastName}
                </span>
                <span className="text-yellow-500">
                  ⭐ {item.course.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
