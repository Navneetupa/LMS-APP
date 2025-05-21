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
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    if (category && language && courseType) {
      const fetchCourses = async () => {
        try {
          const response = await fetch(
            `https://lms-backend-flwq.onrender.com/api/v1/courses/filter?category=${encodeURIComponent(
              category
            )}&level=${encodeURIComponent(courseType)}&minPrice=0&maxPrice=1000&rating=0`
          );
          const data = await response.json();
          if (data.success) {
            setCourses(data.data);
            setShowPopup(true); // Show filtered courses popup
            setError(null);
          } else {
            setError(data.message || "Failed to fetch courses");
            setCourses([]);
            setShowPopup(true);
          }
        } catch (err) {
          setError("An error occurred while fetching courses");
          setCourses([]);
          setShowPopup(true);
        }
      };
      fetchCourses();
    }
  }, [category, language, courseType]);

  const handleCourseClick = (courseId) => {
    const token = localStorage.getItem("token"); // Use 'token' key
    if (token) {
      // User logged in, go to course page
      setShowPopup(false); // Close filtered courses popup
      navigate(`/courses/${courseId}`);
    } else {
      // User not logged in, show login popup
      setShowPopup(false); // Close filtered courses popup
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
    setCategory(""); // Clear filters
    setLanguage("");
    setCourseType("");
    navigate("/login");
  };

  return (
    <section className="relative bg-[#49BBBD] pb-20 pt-0 overflow-hidden text-gray-800 mt-14">
      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="search-wrapper flex items-center gap-6">
          <input
            className="flex-1 px-4 py-2 rounded-lg shadow-md outline-none text-sm"
            type="text"
            autoComplete="none"
            placeholder="Search your favourite course..."
          />
          <button className="bg-[#7ddedf] text-white px-4 py-2 rounded-md font-medium text-sm shadow hover:bg-[#59c1c3] transition-all duration-300">
            Search
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 px-4" data-aos="fade-up">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Design">Design</option>
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          className="text-sm border px-2 py-2 rounded w-full sm:w-40"
        >
          <option value="">Course Type</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 mt-10 md:mt-2">
        <div
          className="md:w-1/2 -mt-1 md:mt-0 mb-10 md:mb-0 text-center md:text-left ml-6 md:ml-10"
          data-aos="fade-right"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            <span className="text-orange-400">Studying</span> Online is now{" "}
            <br className="hidden sm:block" />
            much easier
          </h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            TOTC is an interesting platform that will teach you in a more interactive way.
          </p>
          <Link to="/login">
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

      {/* Filtered Courses Popup */}
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

      {/* Login Prompt Popup */}
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