import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../Profiledashboard/ThemeContext'; // Adjust path as needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InterestPage = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [myInterests, setMyInterests] = useState(() => {
    // Retrieve interests from localStorage on mount
    const savedInterests = localStorage.getItem('myInterests');
    return savedInterests ? JSON.parse(savedInterests) : [];
  });
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(5);
  const initialVisibleCount = 5;
  const navigate = useNavigate();

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/courses');
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Save interests to localStorage whenever myInterests changes
  useEffect(() => {
    localStorage.setItem('myInterests', JSON.stringify(myInterests));
  }, [myInterests]);

  // Function to handle adding interest
  const handleAddInterest = (courseCategory) => {
    if (!myInterests.includes(courseCategory)) {
      setMyInterests([...myInterests, courseCategory]);
    }
  };

  // Function to handle removing interest
  const handleRemoveInterest = (interest) => {
    setMyInterests(myInterests.filter((item) => item !== interest));
  };

  // Function to handle view more/less
  const handleToggleView = (e) => {
    e.preventDefault();
    setVisibleCourses((prev) =>
      prev < uniqueCategories.length ? uniqueCategories.length : initialVisibleCount
    );
  };

  // Get unique categories and filter/sort based on search term
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ].filter((category) =>
    category?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.localeCompare(b));

  // Get all courses for my interests
  const allInterestCourses = courses.filter((course) =>
    myInterests.includes(course.category)
  );

  // Function to handle course click
  const handleCourseClick = (course) => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="w-full min-h-screen mx-auto p-6 bg-gray-100 dark:bg-t600 rounded-lg shadow-lg max-w-4xl flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        What are your interests?
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please let us know topics of interest to you, so we can help identify the content that would be most relevant to you.
      </p>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search categories"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && uniqueCategories.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            No matching categories found
          </p>
        )}
      </div>

      {/* My Interests Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          My Interests
        </h2>
        {myInterests.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No Interests</p>
        ) : (
          <div className="flex flex-col gap-4 mb-4">
            {/* Display all selected categories */}
            <div className="flex flex-wrap gap-2 mb-2">
              {myInterests.map((interest, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  {interest} <span className="ml-2 text-red-500">✕</span>
                </button>
              ))}
            </div>
            {/* Display all courses for selected categories */}
            {allInterestCourses.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No courses available</p>
            ) : (
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Associated Courses
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {allInterestCourses.map((course, idx) => (
                    <li key={course._id || idx}>
                      <button
                        onClick={() => handleCourseClick(course)}
                        className="text-blue-500 hover:underline"
                      >
                        {course.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* All Categories Section */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          All Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Pick categories below you're interested in and help Infosys Springboard to know you better. The platform will use this information to improve your learning recommendations. The more often you use Infosys Springboard, the better the recommendations will be. Take the first step to your personalized learning experience!
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueCategories.slice(0, visibleCourses).map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
              onClick={() => handleAddInterest(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View More/Less Link */}
        {uniqueCategories.length > initialVisibleCount && (
          <a
            href="#"
            className="text-blue-500 dark:text-blue-400 hover:underline"
            onClick={handleToggleView}
          >
            {visibleCourses < uniqueCategories.length
              ? `View ${uniqueCategories.length - visibleCourses} more`
              : 'View less'}
          </a>
        )}
      </div>
    </div>
  );
};

export default InterestPage;