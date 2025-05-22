import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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
        } min-h-screen pt-12 bg-white text-gray-800 font-sans transition-filter duration-300`}
      >
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center relative">
  <div className="relative z-20">
    <h1 className="text-4xl md:text-5xl font-bold leading-tight pl-4">
      Grow your skills with Advanced <span className="text-orange-400">Courses</span>
    </h1>
    <p className="mt-6 text-gray-600 pl-4">
      Start, switch, or advance your career with more than 5,000 courses. <br />
      Unlock your potential — skill up with thousands of expert-led courses.
    </p>
    <div className="mt-10 flex flex-wrap items-center gap-8 pl-4">
      <div className="flex items-center border border-gray-300 px-4 py-2 rounded-full w-full md:w-72 transition-all duration-300 hover:ring-2 hover:ring-cyan-300 hover:shadow-md">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search Course (e.g., JavaScript)"
          className="outline-none flex-grow"
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
        className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-all duration-300 hover:scale-105"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    {error && !modalOpen && !showLoginPrompt && (
      <p className="mt-4 text-red-500 pl-4">{error}</p>
    )}
  </div>

  <div className="relative flex justify-center items-center z-20">
    <div className="absolute w-[22rem] h-[22rem] z-0 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
    <img
      src="hero.webp"
      alt="Job Search Illustration"
      className="w-full max-w-md relative z-10"
    />
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center text-sm z-20">
      <span className="text-cyan-500 font-semibold mr-1">10.5K</span> Happy Students
    </div>
    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm z-20">
      It only takes a few seconds
    </div>
  </div>
</section>

      </div>

      {/* Modal showing search results */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[70vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
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
                        className="w-20 h-20 mb-2 object-cover rounded-full"
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
              <p className="text-gray-600 text-center">No courses found matching "{searchTerm}".</p>
            )}
          </div>
        </div>
      )}

      {/* Login prompt after clicking on course */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={handleCloseLoginPrompt}
              className="absolute top-4 right-4 text-[#00B4CC] text-xl font-bold hover:text-[#0098aa] transition"
              aria-label="Close login prompt"
            >
              ×
            </button>
            <h3 className="text-2xl font-semibold text-[#023047] mb-2">You have not signed in</h3>
            <p className="text-gray-600 mb-6">Please sign in to access this course.</p>
            <button
              onClick={goToSignIn}
              className="bg-[#00B4CC] hover:bg-[#0098aa] text-white px-6 py-2 rounded-full text-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </>
  );
}
