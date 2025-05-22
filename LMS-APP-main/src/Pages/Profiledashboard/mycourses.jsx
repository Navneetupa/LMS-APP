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
    <div className="h-full w-full bg-sky-50 p-4 lg:py-12 sm:py-6 sm:px-4 md:p-8 overflow-auto">
      <div className="flex justify-between items-start mb-6 sm:mb-8">
        <h1 className="sm:text-4x1 md:text-3xl font-bold text-slate-900">My Courses</h1>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-md relative transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/course-player/${item.course._id}`)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-32 bg-gray-200 rounded-md mb-3">
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
                  className="absolute -bottom-4 right-0 bg-[#49BBBD] text-white p-3 rounded-full shadow-lg hover:scale-110 z-50"
                  title="Play Course"
                >
                  <FaPlay />
                </button>
              </div>

              <h3 className="text-base sm:text-md md:text-lg font-semibold text-slate-800 mb-1 truncate">
                {item.course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 truncate">
                {item.course.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">
                  ₹{item.course.discountPrice ?? item.course.price}
                </span>
                {item.course.discountPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{item.course.price}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-700">
                  👨‍🏫 {item.course.instructor?.firstName} {item.course.instructor?.lastName}
                </span>
                <span className="text-sm text-yellow-500">
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
