import React, { useEffect, useState, useCallback } from "react";
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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://lms-backend-flwq.onrender.com/api/v1/courses/categories"
        );
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(
            categoriesData.data.map((category) => category.toLowerCase())
          );
        } else {
          setCategories([
            "Web Development",
            "Data Science",
            "Mobile Development",
            "Machine Learning",
          ]);
        }

        const languagesResponse = await fetch(
          "https://lms-backend-flwq.onrender.com/api/v1/courses/languages"
        );
        const languagesData = await languagesResponse.json();
        if (languagesData.success) {
          setLanguages(languagesData.data || []);
        } else {
          setLanguages(["English", "Spanish", "French", "German"]);
        }

        const courseTypesResponse = await fetch(
          "https://lms-backend-flwq.onrender.com/api/v1/courses/levels"
        );
        const courseTypesData = await courseTypesResponse.json();
        if (courseTypesData.success) {
          setCourseTypes(courseTypesData.data || []);
        } else {
          setCourseTypes(["Beginner", "Intermediate", "Advanced"]);
        }
      } catch (err) {
        console.error("Error fetching dropdown options:", err);
        setCategories([
          "Web Development",
          "Data Science",
          "Mobile Development",
          "Machine Learning",
        ]);
        setLanguages(["English", "Spanish", "French", "German"]);
        setCourseTypes(["Beginner", "Intermediate", "Advanced"]);
      }
    };

    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (category)
          queryParams.append("category", encodeURIComponent(category));
        if (courseType)
          queryParams.append("level", encodeURIComponent(courseType));
        queryParams.append("minPrice", "0");
        queryParams.append("maxPrice", "1000");
        queryParams.append("rating", "0");

        const url = `https://lms-backend-flwq.onrender.com/api/v1/courses/filter?${queryParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
          setTimeout(() => {
            setShowPopup(true);
            setError(null);
          }, 3000);
        } else {
          setError(data.message || "Failed to fetch courses");
          setCourses([]);
          setTimeout(() => {
            setShowPopup(true);
          }, 3000);
        }
      } catch (err) {
        setError("An error occurred while fetching courses");
        setCourses([]);
        setTimeout(() => {
          setShowPopup(true);
        }, 3000);
      }
    };

    if (category || courseType) {
      fetchCourses();
    }
  }, [category, courseType]);

  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("search", term.trim().toLowerCase());
        const url = `https://lms-backend-flwq.onrender.com/api/v1/courses/search/filters?${queryParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          const filteredSuggestions = (data.data || []).filter(
            (course) =>
              course.title
                ?.toLowerCase()
                .startsWith(term.trim().toLowerCase()) ||
              course.description
                ?.toLowerCase()
                .includes(term.trim().toLowerCase())
          );
          setSuggestions(filteredSuggestions.slice(0, 5));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  const handleCourseClick = (courseId) => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowPopup(false);
      setModalOpen(false);
  

      setShowSuggestions(false);
      navigate(`/courses/${courseId}`);
    } else {
      setShowPopup(false);
      setModalOpen(false);
      setShowSuggestions(false);
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
    setShowSuggestions(false);
  };

  const goToSignIn = () => {
    setShowLoginPrompt(false);
    setCategory("");
    setLanguage("");
    setCourseType("");
    setShowSuggestions(false);
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      setModalOpen(true);
      setShowSuggestions(false);
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
            course.title
              ?.toLowerCase()
              .includes(searchTerm.trim().toLowerCase()) ||
            course.description
              ?.toLowerCase()
              .includes(searchTerm.trim().toLowerCase())
        );
        setSearchResults(filteredResults);
        setShowSuggestions(false);
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
    <section className="relative bg-[#49BBBD] pb-8 pt-0 overflow-hidden text-gray-800 mt-14">
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="search-wrapper flex items-center gap-6 relative">
          <input
            className="flex-1 px-4 py-2 rounded-lg shadow-md outline-none text-sm"
            type="text"
            autoComplete="off"
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
            className="bg-white text-[#7ddedf] px-4 py-2 rounded-md font-medium text-sm shadow transition-all duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-6 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <ul>
                {suggestions.map((course) => (
                  <li
                    key={course._id}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center"
                    onClick={() => {
                      setSearchTerm(course.title);
                      setShowSuggestions(false);
                      handleCourseClick(course._id);
                    }}
                  >
                    <img
                      src={course.thumbnail || "https://via.placeholder.com/50"}
                      alt={course.title}
                      className="w-10 h-10 object-cover rounded-full mr-3"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/50")
                      }
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        {course.title}
                      </span>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {error && !modalOpen && !showPopup && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>

      <div
        className="flex flex-wrap justify-center gap-4 mt-6 px-4"
        data-aos="fade-up"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </ option>
          ))}
        </select>
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Type</option>
          {courseTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 mt-10 md:mt-2">
        <div
          className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left ml-0 md:ml-10"
          data-aos="fade-right"
        >
          <h1 className="mt-8 md:mt-0 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            <span className="text-orange-400">Empowering</span> Online Education{" "}
            <br className="hidden sm:block" />
          </h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            <span className="text-semibold">Brain Bridge</span> is your
            all-in-one cloud learning hub, uniting students, teachers, and
            administrators in one intuitive platform. From engaging tools and
            secure hosting to a modern, user-friendly interface, TOTC makes
            learning from home or managing a school smarter and more efficient
            than ever
          </p>
          <Link to="/courses">
            <button className="mt-4 bg-white text-[#7ddedf] px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
              Join for free
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 relative mt-6 md:mt-0" data-aos="fade-left">
          <img
            src={heroImage}
            alt="Girl with laptop"
            className="w-full max-w-[200px] sm:max-w-[285px] mx-auto relative z-10"
            loading="lazy"
          />
          <div className="hidden md:block">
            <img
              src={edit}
              alt="Assisted Students"
              className="absolute top-0 left-0 w-32 sm:w-36 shadow-lg rounded-lg"
            />
            <img
              src={edit1}
              alt="Achiever Badge"
              className="absolute bottom-0 left-0 w-32 sm:w-36 shadow-lg rounded-lg"
            />
            <img
              src={edit2}
              alt="Admission Completed"
              className="absolute top-8 right-0 w-32 sm:w-36 mr-4 sm:mr-8 shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[70vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Search Results for "{searchTerm}"
            </h2>
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : searchResults.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.map((course) => (
                  <li key={course._id} className="py-2">
                    <div
                      onClick={() => handleCourseClick(course._id)}
                      className="bg-white hover:bg-blue-50 transition p-4 rounded-xl shadow-md cursor-pointer relative flex flex-col items-start"
                    >
                      <div className="relative w-full h-32 mb-2">
                        <img
                          src={
                            course.thumbnail ||
                            "https://via.placeholder.com/150"
                          }
                          alt={course.title}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/150")
                          }
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-[#00C4B4] text-white rounded-full w-10 h-10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 line-clamp-1">
                        {course.title}
                      </span>
                      <p className="text-xs mt-1 text-gray-600 line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-sm mt-2 text-gray-800 font-semibold">
                        ₹{course.price}
                      </p>
                      <div className="flex items-center justify-between w-full mt-2">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">
                            {course.instructor?.firstName}{" "}
                            {course.instructor?.lastName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w選挙

                            .w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 text-yellow-400 mr-1"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-xs text-gray-500">
                            {course.rating} ({course.totalRatings || 0})
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">
                No courses found matching "{searchTerm}".
              </p>
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
                        src={
                          course.thumbnail || "https://via.placeholder.com/150"
                        }
                        alt={course.title}
                        className="w-24 h-24 mb-4 object-cover rounded-full"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/150")
                        }
                      />
                      <span className="text-lg font-medium text-gray-800">
                        {course.title}
                      </span>
                      <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-sm mt-2 text-gray-500">
                        By {course.instructor?.firstName}{" "}
                        {course.instructor?.lastName}
                      </p>
                      <p className="text-sm mt-1 text-gray-500">
                        {course.duration} hours
                      </p>
                      <p className="text-sm mt-1 text-gray-500">
                        ${course.price}
                      </p>
                      <p className="text-sm mt-1 text-gray-500">
                        Rating: {course.rating} ({course.totalRatings || 0}{" "}
                        reviews)
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
            <h3 className="text-2xl font-semibold text-[#023047] mb-2">
              You have not signed in
            </h3>
            <p className="text-gray-600 mb-6">
              Please sign up to access this course.
            </p>
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