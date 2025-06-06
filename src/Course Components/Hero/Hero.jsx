import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import heroImage from "../../assets/boom.png";

export default function Career() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const token = localStorage.getItem('token');

    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      setModalOpen(true);
      return;
    }

    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('search', searchTerm.trim().toLowerCase());

      const url = `https://lms-backend-flwq.onrender.com/api/v1/courses/search/filters?${queryParams.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const filteredResults = (data.data || []).filter(
          (course) =>
            course.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
            course.description?.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );
        setSearchResults(filteredResults);
        if (filteredResults.length === 0) {
          setError(`No courses found matching "${searchTerm}"`);
        }
        setModalOpen(true);
      } else {
        setSearchResults([]);
        setError(data.message || `No courses found for "${searchTerm}"`);
        setModalOpen(true);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setSearchResults([]);
      setError('An error occurred while fetching courses');
      setModalOpen(true);
    }
  };

  const handleCourseClick = (courseId) => {
    const token = localStorage.getItem('token');
    console.log("Token on course click:", token);
    if (token) {
      setModalOpen(false);
      setShowLoginPrompt(false);
      navigate(`/courses/${courseId}`);
    } else {
      setModalOpen(false);
      setShowLoginPrompt(true);
    }
  };

  const goToSignIn = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <>
      <div
        className={`${
          modalOpen || showLoginPrompt ? 'blur-sm pointer-events-none select-none' : ''
        } bg-white text-gray-800 font-sans transition-filter duration-300`}
      >
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative">
          <div className="relative z-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight pl-4">
              Unlock Your Future with Expert-Led <span className="text-orange-400">Courses.</span>
            </h1>
            <p className="mt-4 md:mt-6 text-gray-600 pl-4 text-sm sm:text-base">
              Fuel your professional growth and spark your career trajectory with 5,000+
              rigorously curated, expert-led courses. <br />
              Whether initiating a new professional chapter or strategically leveling up existing proficiencies, your next significant opportunity awaits.
            </p>
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pl-4">
              <div className="flex items-center border border-gray-300 px-4 py-2 rounded-full w-full sm:w-64 md:w-72 transition-all duration-300 hover:ring-2 hover:ring-cyan-300 hover:shadow-md">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search Course (e.g., JavaScript)"
                  className="outline-none flex-grow text-sm sm:text-base placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button
                className="bg-[#59c1c3] text-white px-6 py-2 rounded-full hover:bg-[#7ddedf] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            {error && !modalOpen && !showLoginPrompt && (
              <p className="mt-4 text-red-500 pl-4 text-sm">{error}</p>
            )}
          </div>

          <div className="relative flex justify-center items-center z-20 mt-8 md:mt-0">
            <img
              src={heroImage}
              alt="Job Search Illustration"
              className="w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] relative z-10 mx-auto rounded-2xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
            <div className="absolute top-[-3.5rem] sm:top-[-3.25rem] md:top-[-3.5rem] lg:top-[-2rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center text-sm sm:text-base z-20">
              <span className="text-cyan-500 font-semibold mr-2">10.5K</span> Happy Students
            </div>
            <div className="absolute bottom-[-3.5rem] sm:bottom-[-3rem] md:bottom-[-2.5rem] lg:bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm sm:text-base z-20">
              It only takes a few seconds
            </div>
          </div>
        </section>
      </div>

      {/* Modal showing search results */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-lg w-full max-h-[70vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
            {error ? (
              <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>
            ) : searchResults.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4">
                {searchResults.map((course) => (
                  <li key={course._id} className="py-2">
                    <div
                      onClick={() => handleCourseClick(course._id)}
                      className="bg-gray-100 hover:bg-blue-100 transition p-4 rounded-lg flex flex-col items-center text-center shadow-md cursor-pointer"
                    >
                      <img
                        src={course.thumbnail || 'https://via.placeholder.com/150'}
                        alt={course.title}
                        className="w-16 sm:w-20 h-16 sm:h-20 mb-2 object-cover rounded-full"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                      />
                      <span className="text-sm font-medium text-gray-800">{course.title}</span>
                      <p className="text-xs mt-1 text-gray-600 line-clamp-2">{course.description}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        By {course.instructor?.firstName} {course.instructor?.lastName}
                      </p>
                      <p className="text-xs mt-1 text-gray-500">{course.duration} hours</p>
                      <p className="text-xs mt-1 text-gray-500">${course.price}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        Rating: {course.rating} ({course.totalRatings || 0} reviews)
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center text-sm sm:text-base">No courses found matching "{searchTerm}".</p>
            )}
          </div>
        </div>
      )}

      {/* Login prompt after clicking on course */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={handleCloseLoginPrompt}
              className="absolute top-4 right-4 text-[#00B4CC] text-lg sm:text-xl font-bold hover:text-[#0098aa] transition"
              aria-label="Close login prompt"
            >
              ×
            </button>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#023047] mb-2">You have not signed in</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Please sign in to access this course.</p>
            <button
              onClick={goToSignIn}
              className="bg-[#00B4CC] hover:bg-[#0098aa] text-white px-6 py-2 rounded-full text-base sm:text-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </>
  );
}