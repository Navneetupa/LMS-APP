import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Career() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State to store API results
  const [error, setError] = useState(null); // State to handle errors

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `https://lms-backend-flwq.onrender.com/api/v1/courses/search?q=${encodeURIComponent(
          searchTerm.trim()
        )}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setSearchResults(data.courses || []); // Assuming the API returns { courses: [...] }
      setModalOpen(true); // Open modal after fetching results
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    }
  };

  return (
    <>
      <div
        className={`${
          modalOpen ? 'blur-sm pointer-events-none select-none' : ''
        } min-h-screen pt-12 bg-white text-gray-800 font-sans transition-filter duration-300`}
      >
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center relative">
          {/* Text Area */}
          <div className="relative z-20">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight pl-14">
              Grow your skills with Advanced <span className="text-orange-400">Courses</span>
            </h1>
            <p className="mt-6 text-gray-600 pl-14">
              Start, switch, or advance your career with more than 5,000 courses. <br />
              Unlock your potential — skill up with thousands of expert-led courses.
            </p>

            {/* Search Area */}
            <div className="mt-10 flex flex-wrap items-center gap-8 pl-14">
              <div className="flex items-center border border-gray-300 px-4 py-2 rounded-full w-full md:w-72 transition-all duration-300 hover:ring-2 hover:ring-cyan-300 hover:shadow-md">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search Course"
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

            {/* Display Error if Any */}
            {error && <p className="mt-4 text-red-500 pl-14">{error}</p>}
          </div>

          {/* Illustration */}
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

        {/* Optional: Display Search Results (for debugging or direct display) */}
        {searchResults.length > 0 && !modalOpen && (
          <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <ul className="mt-4">
              {searchResults.map((course, index) => (
                <li key={index} className="py-2">
                  {course.title || 'Unnamed Course'}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Modal (Placeholder) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((course, index) => (
                  <li key={index} className="py-2">
                    {course.title || 'Unnamed Course'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses found.</p>
            )}
            <button
              className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}