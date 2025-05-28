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
    <div className="min-h-screen w-full bg-sky-50 p-4 sm:px-4 mt-12 md:mt-6 md:px-4 overflow-auto">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-slate-900">My Courses</h1>
      </div>

      {loading ? (
        <p className="text-gray-600 text-sm text-center">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600 text-sm text-center">No enrolled courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 sm:p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer relative"
              onClick={() => navigate(`/course-player/${item.course._id}`)}
            >
              {/* Thumbnail */}
              <div className="w-full h-36 sm:h-40 bg-gray-200 rounded-md mb-4 sm:mb-6 overflow-hidden">
                {item.course.thumbnail && (
                  <img
                    src={item.course.thumbnail}
                    alt={item.course.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>

              {/* Play Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(item.course._id);
                }}
                className="absolute top-[calc(36*0.25rem-.7rem)] sm:top-[calc(40*0.25rem-.7rem)] right-3 sm:right-4 bg-[#49BBBD] text-white p-2 sm:p-3 rounded-full shadow-lg hover:scale-110 z-50"
                title="Play Course"
              >
                <FaPlay className="text-xs sm:text-sm" />
              </button>

              <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1 truncate">
                {item.course.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                {item.course.description}
              </p>

              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">
                ₹{(item.course.discountPrice ? item.course.price - item.course.discountPrice : item.course.price).toFixed(2)}

                </span>
                {item.course.discountPrice && (
                  <span className="text-gray-500 line-through">
                    ₹{(item.course.price).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2 sm:mt-3 text-xs sm:text-sm">
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