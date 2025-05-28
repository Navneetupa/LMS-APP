import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Placeholder images (replace with actual paths or URLs)
import developmentImage from '../assets/developmentImage.png';
import designImage from '../assets/designImage.png';
import marketingImage from '../assets/marketingImage.png';
import languagesImage from '../assets/languagesImage.png';
import photographyImage from '../assets/photographyImage.png';
import businessImage from '../assets/businessImage.png';
import actingImage from '../assets/actingImage.png';
import webDevelopmentImage from '../assets/webDevelopmentImage.png';
import clearImage from '../assets/webDevelopmentImage.png';

// Default image for categories without a specific image
const DEFAULT_IMAGE = clearImage;

// Metadata for categories (maps category names to images and quotes)
const categoryMetadata = {
  "web development": { image: developmentImage, gradient: 'from-blue-900 to-teal-500' },
  "app development": { image: designImage, gradient: 'from-brown-900 to-yellow-800' },
  "data science": { image: marketingImage, gradient: 'from-yellow-700 to-orange-500' },
  "machine learning": { image: languagesImage, gradient: 'from-teal-400 to-cyan-400' },
  "cyber security": { image: photographyImage, gradient: 'from-pink-300 to-purple-200' },
  "cloud computing": { image: businessImage, gradient: 'from-orange-400 to-yellow-400' },
  "devops": { image: actingImage, gradient: 'from-pink-500 to-purple-400' },
  "blockchain": { image: webDevelopmentImage, gradient: 'from-blue-600 to-blue-400' },
};

// Modified CategorySelector component
const CategorySelector = () => {
  const [courses, setCourses] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate();

  // Fetch courses from API and derive categories
  useEffect(() => {
    const fetchCourses = async (pageNum) => {
      setLoading(true);
      try {
        const response = await fetch(`https://lms-backend-flwq.onrender.com/api/v1/courses?page=${pageNum}&limit=10&sort=-createdAt`);
        const data = await response.json();
        if (data.success) {
          setCourses((prev) => [...prev, ...data.data]);
          setHasMore(data.data.length === 10);

          // Extract unique categories from courses and count courses per category
          const courseCategories = [...new Set(data.data.map(course => course.category.toLowerCase()))];
          
          const dynamicCategories = courseCategories.map((category, index) => {
            const metadata = categoryMetadata[category.toLowerCase()] || {
              image: DEFAULT_IMAGE,
              gradient: 'from-gray-500 to-gray-700', // Fallback gradient
            };
            const courseCount = data.data.filter(course => course.category.toLowerCase() === category).length;
            return {
              id: index + 1,
              title: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize title
              image: metadata.image,
              gradient: metadata.gradient,
              courseCount: courseCount,
            };
          });

          setAvailableCategories(dynamicCategories);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses(page);
  }, [page]);

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setShowLoginPrompt(false);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setShowLoginPrompt(false);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleCourseClick = (courseId) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/courses/${courseId}`);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const goToSignIn = () => {
    setShowLoginPrompt(false);
    setSelectedCategory(null);
    navigate('/login');
  };

  const filteredCourses = selectedCategory
    ? courses.filter((course) =>
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 md:px-16 bg-white">
      {/* First Container */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" data-aos="fade-right">
          <span className="text-[#0b0b0b]">Categories</span>{' '}
          <span className="text-[#49BBBD]">Courses</span>
          <span> For You</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {availableCategories.slice(0, 3).map((cat) => (
            <div
              key={cat.id}
              className={`bg-gradient-to-r ${cat.gradient} p-4 sm:p-6 rounded-xl flex items-center shadow-md cursor-pointer hover:opacity-90 transition`}
              data-aos="zoom-in"
              onClick={() => handleCategoryClick(cat.title)}
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-white uppercase">
                  {cat.title}
                </h3>
                <p className="text-sm sm:text-base text-white mt-1">
                  {cat.courseCount} courses
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Second Container */}
      {availableCategories.length > 3 && (
        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {availableCategories.slice(3).map((cat) => (
              <div
                key={cat.id}
                className={`bg-gradient-to-r ${cat.gradient} p-4 sm:p-6 rounded-xl flex items-center shadow-md cursor-pointer hover:opacity-90 transition`}
                data-aos="zoom-in"
                onClick={() => handleCategoryClick(cat.title)}
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-medium text-white uppercase">
                    {cat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white mt-1">
                    {cat.courseCount} courses
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 text-[#00B4CC] text-xl font-bold hover:text-[#0098aa] transition"
              aria-label="Close login prompt"
            >
              ×
            </button>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#023047] mb-2">You have not signed in</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Please sign up to access this course.</p>
            <button
              onClick={goToSignIn}
              className="bg-[#00B4CC] hover:bg-[#0098aa] text-white px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      )}

      {/* Modal for Filtered Courses */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-[740px] w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <div className="modal-header">
              <button
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-semibold transition"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
                Courses in {selectedCategory}
              </h3>
            </div>
            {loading && <p className="text-center text-gray-600 text-base sm:text-lg">Loading courses...</p>}
            {error && <p className="text-center text-red-500 text-base sm:text-lg">{error}</p>}
            {!loading && !error && filteredCourses.length === 0 && (
              <p className="text-center text-gray-600 text-base sm:text-lg">
                No courses found for {selectedCategory}
              </p>
            )}

            {!loading && !error && filteredCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="w-full cursor-pointer"
                    onClick={() => handleCourseClick(course._id)}
                    data-aos="zoom-in"
                  >
                    <div className="bg-white rounded-xl flex items-center p-4 shadow-md hover:shadow-lg transition h-34">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                        <img
                          src={course.thumbnail || DEFAULT_IMAGE}
                          alt={course.title}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                        />
                        <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1 flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1 flex flex-col justify-between overflow-hidden">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{course.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                          By {course.instructor.firstName} {course.instructor.lastName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{course.duration} hours</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">₹{course.discountPrice}</p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Rating: {course.rating} ({course.totalRatings} reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hasMore && !loading && (
              <div className="flex justify-center mt-6">
                {/* <button
                  onClick={loadMore}
                  className="bg-[#00B4CC] hover:bg-[#0098aa] text-white px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg font-semibold transition duration-300"
                >
                  Load More
                </button> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;