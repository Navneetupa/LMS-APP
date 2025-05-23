import React, { useEffect, useState } from "react";
import heroImage from "../assets/hero-girl.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import edit from "../assets/edit.png";
import edit1 from "../assets/edit1.png";
import edit2 from "../assets/edit2.png";

const HeroWithNavbar = () => {
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [courseType, setCourseType] = useState("");
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  // Fetch dropdown options on component mount
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch("https://lms-backend-flwq.onrender.com/api/v1/courses/categories");
        const categoriesData = await categoriesResponse.json();

        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data.map((category) => category.toLowerCase()));
        } else {
          // Fallback static data if API fails
          setCategories(["Web Development", "Data Science", "Mobile Development", "Machine Learning"]);
        }


        // Fetch languages
        const languagesResponse = await fetch("https://lms-backend-flwq.onrender.com/api/v1/courses/languages");
        const languagesData = await languagesResponse.json();
        if (languagesData.success) {
          setLanguages(languagesData.data || []);
        } else {
          // Fallback static data if API fails
          setLanguages(["English", "Spanish", "French", "German"]);
        }

        // Fetch course types
        const courseTypesResponse = await fetch("https://lms-backend-flwq.onrender.com/api/v1/courses/levels");
        const courseTypesData = await courseTypesResponse.json();
        if (courseTypesData.success) {
          setCourseTypes(courseTypesData.data || []);
        } else {
          // Fallback static data if API fails
          setCourseTypes(["Beginner", "Intermediate", "Advanced"]);
        }
      } catch (err) {
        console.error("Error fetching dropdown options:", err);
        // Fallback to static data
        setCategories(["Web Development", "Data Science", "Mobile Development", "Machine Learning"]);
        setLanguages(["English", "Spanish", "French", "German"]);
        setCourseTypes(["Beginner", "Intermediate", "Advanced"]);
      }
    };

    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    // Fetch courses whenever any dropdown changes (category or courseType)
    const fetchCourses = async () => {
      try {
        // Build query parameters dynamically, only including non-empty values
        const queryParams = new URLSearchParams();
        if (category) queryParams.append("category", encodeURIComponent(category));
        if (courseType) queryParams.append("level", encodeURIComponent(courseType));
        queryParams.append("minPrice", "0");
        queryParams.append("maxPrice", "1000");
        queryParams.append("rating", "0");

        const url = `https://lms-backend-flwq.onrender.com/api/v1/courses/filter?${queryParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
          // Add 3-second delay before showing the popup
          setTimeout(() => {
            setShowPopup(true);
            setError(null);
          }, 3000);
        } else {
          setError(data.message || "Failed to fetch courses");
          setCourses([]);
          // Add 3-second delay before showing the popup with error
          setTimeout(() => {
            setShowPopup(true);
          }, 3000);
        }
      } catch (err) {
        setError("An error occurred while fetching courses");
        setCourses([]);
        // Add 3-second delay before showing the popup with error
        setTimeout(() => {
          setShowPopup(true);
        }, 3000);
      }
    };

    // Trigger fetch if at least one dropdown is selected
    if (category || courseType) {
      fetchCourses();
    }
  }, [category, courseType]);

  const handleCourseClick = (courseId) => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowPopup(false);
      setModalOpen(false);
      navigate(`/courses/${courseId}`);
    } else {
      setShowPopup(false);
      setModalOpen(false);
      setShowLoginPrompt(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowLoginPrompt(false);
    setCategory("");
    setLanguage("");
    setCourseType("");
    setCourses([]);
    setError(null);
  };

  const goToSignIn = () => {
    setShowLoginPrompt(false);
    setCategory("");
    setLanguage("");
    setCourseType("");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      setModalOpen(true);
      return;
    }

    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("search", searchTerm.trim().toLowerCase());

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
      setSearchResults([]);
      setError("An error occurred while fetching courses");
      setModalOpen(true);
    }
  };

  return (
    <section className="relative bg-[#49BBBD] pb-20 pt-0 overflow-hidden text-gray-800 mt-14">
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="search-wrapper flex items-center gap-6">
          <input
            className="flex-1 px-4 py-2 rounded-lg shadow-md outline-none text-sm"
            type="text"
            autoComplete="none"
            placeholder="Search your favourite course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="bg-[#7ddedf] text-white px-4 py-2 rounded-md font-medium text-sm shadow hover:bg-[#59c1c3] transition-all duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {error && !modalOpen && !showPopup && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 px-4" data-aos="fade-up">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Type</option>
          {courseTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 mt-10 md:mt-2">
        <div
          className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left ml-0 md:ml-10"
          style={{ marginTop: '-40px' }}
          data-aos="fade-right"
        >
          <h1 className="mt-8 md:mt-0 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            <span className="text-orange-400">Empowering</span> Online Education{" "}
            <br className="hidden sm:block" />
          </h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            <span className="text-semibold">Brain Bridge</span> is your all-in-one cloud learning hub, uniting students, teachers, and administrators in one intuitive platform. From engaging tools and secure hosting to a modern, user-friendly interface, TOTC makes learning from home or managing a school smarter and more efficient than ever
          </p>
          <Link to="/courses">
            <button className="mt-4 bg-[#7ddedf] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#59c1c3] transition-all duration-300">
              Join for free
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 relative mt-6 md:mt-0" data-aos="fade-left">
          <img
            src={heroImage}
            alt="Girl with laptop"
            className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10"
          />
          <div className="hidden md:block">
            <img
              src={edit}
              alt="Assisted Students"
              className="absolute top-2 left-2 w-36 sm:w-40 shadow-lg rounded-lg mt-12"
              data-aos="fade-up"
            />
            <img
              src={edit1}
              alt="Achiever Badge"
              className="absolute bottom-2 left-2 w-36 sm:w-40 shadow-lg rounded-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            />
            <img
              src={edit2}
              alt="Admission Completed"
              className="absolute top-10 right-0 w-36 sm:w-40 mr-4 sm:mr-12 mt-20 shadow-lg rounded-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            />
          </div>
        </div>
      </div>

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
                        src={course.thumbnail || "https://via.placeholder.com/150"}
                        alt={course.title}
                        className="w-20 h-20 mb-2 object-cover rounded-full"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Filtered Courses</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : courses.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <li key={course._id}>
                    <div
                      onClick={() => handleCourseClick(course._id)}
                      className="bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md cursor-pointer"
                    >
                      <img
                        src={course.thumbnail || "https://via.placeholder.com/150"}
                        alt={course.title}
                        className="w-24 h-24 mb-4 object-cover rounded-full"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                      />
                      <span className="text-lg font-medium text-gray-800">{course.title}</span>
                      <p className="text-sm mt-2 text-gray-600 line-clamp-2">{course.description}</p>
                      <p className="text-sm mt-2 text-gray-500">
                        By {course.instructor?.firstName} {course.instructor?.lastName}
                      </p>
                      <p className="text-sm mt-1 text-gray-500">{course.duration} hours</p>
                      <p className="text-sm mt-1 text-gray-500">${course.price}</p>
                      <p className="text-sm mt-1 text-gray-500">
                        Rating: {course.rating} ({course.totalRatings || 0} reviews)
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses found matching the criteria.</p>
            )}
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-[#00B4CC] text-xl font-bold hover:text-[#0098aa] transition"
              aria-label="Close login prompt"
            >
              ×
            </button>
            <h3 className="text-2xl font-semibold text-[#023047] mb-2">You have not signed in</h3>
            <p className="text-gray-600 mb-6">Please sign up to access this course.</p>
            <button
              onClick={goToSignIn}
              className="bg-[#00B4CC] hover:bg-[#0098aa] text-white px-6 py-2 rounded-full text-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroWithNavbar;