import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";

// Simple auth check (consistent with PopularCourses.jsx)
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-cyan-500 border-cyan-200 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-cyan-600 border-cyan-100 rounded-full animate-spin animation-delay-200"></div>
        <div className="absolute inset-4 border-4 border-t-cyan-700 border-cyan-50 rounded-full animate-spin animation-delay-400"></div>
      </div>
      <p className="ml-4 text-lg text-cyan-600 font-semibold animate-pulse">Loading Courses...</p>
    </div>
  );
};

const CourseCard = ({ course, index, isPreview = false, onUnauthenticatedClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate();
  const thumbnail = course.thumbnail || "https://img.icons8.com/color/96/code.png";
  const enrollmentText = course.totalStudents > 0 ? `${course.totalStudents} enrolled` : "New course!";

  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (isAuthenticated()) {
      navigate(`/courses/${course._id}`);
    } else {
      onUnauthenticatedClick(`/courses/${course._id}/enroll`);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
      className={`p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer bg-gradient-to-br from-cyan-50 to-white ${
        isPreview ? "h-[320px]" : ""
      }`}
      aria-label={`View ${course.title} course`}
    >
      {inView && (
        <img
          src={thumbnail}
          alt={course.title}
          className={`mb-4 object-cover ${isPreview ? "w-20 h-20" : "w-16 h-16"}`}
          loading="lazy"
        />
      )}
      <h4 className={`font-semibold mb-2 text-cyan-900 ${isPreview ? "text-lg" : "text-lg"}`}>
        {course.title}
      </h4>
      <p className="text-sm text-gray-600 mb-3">{course.subtitle || "No subtitle available"}</p>
      <p className="text-cyan-600 font-semibold">{enrollmentText}</p>
    </motion.div>
  );
};

const LatestCourses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth popup state
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://lms-backend-flwq.onrender.com/api/v1/courses/new");
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch courses");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleUnauthenticatedClick = (path) => {
    setRedirectPath(path);
    setAuthPopupOpen(true);
  };

  const handleLoginRedirect = () => {
    setAuthPopupOpen(false);
    if (redirectPath) {
      localStorage.setItem("redirectAfterLogin", redirectPath);
    }
    navigate("/login");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  const previewCourses = courses.slice(0, 3);

  return (
    <section className="py-20 bg-white px-6 md:px-16 relative">
      <div className={modalOpen || authPopupOpen ? "pointer-events-none filter blur-sm" : ""}>
        <h2 className="text-4xl font-extrabold text-center text-black mb-6 tracking-wide">
          Latest <span className="text-[#49BBBD]">Courses</span> <span>for You</span>
        </h2>
        <p className="text-center text-cyan-700 max-w-3xl mx-auto mb-12 text-lg">
          Browse our top trending courses, handpicked to boost your career and skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {previewCourses.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              index={index}
              isPreview={true}
              onUnauthenticatedClick={handleUnauthenticatedClick}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 bg-[#59c1c3] text-white rounded-full font-semibold text-lg hover:bg-[#7dded] transition-colors duration-300 shadow-lg"
          >
            View All Courses
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="sticky top-4 right-4 text-cyan-500 text-2xl font-bold hover:text-cyan-700 bg-white rounded-full px-3 py-1 shadow-lg z-50"
              onClick={() => setModalOpen(false)}
              aria-label="Close all courses modal"
            >
              <span className="sr-only">Close</span> ×
            </button>
            <h3 className="text-3xl font-extrabold text-cyan-900 mb-8 text-center">
              All <span className="text-[#49BBBD]">Courses</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  index={index}
                  onUnauthenticatedClick={handleUnauthenticatedClick}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Auth popup modal */}
      {authPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-4"
          onClick={() => setAuthPopupOpen(false)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-900">Please Log In</h2>
            <p className="mb-6 text-gray-700">Please log in to enroll in this course.</p>
            <button
              onClick={handleLoginRedirect}
              style={{ backgroundColor: '#49BBBD' }}
              className="px-6 py-3 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors duration-300"
            >
              Log In
            </button>
            <button
              onClick={() => setAuthPopupOpen(false)}
              className="absolute top-3 right-3 text-cyan-500 hover:text-cyan-700 font-bold text-xl"
              aria-label="Close popup"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LatestCourses;