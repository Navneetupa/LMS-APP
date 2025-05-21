import React, { useEffect, useState } from "react";
import heroImage from "../assets/hero-girl.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

import edit from "../assets/edit.png";
import edit1 from "../assets/edit1.png";
import edit2 from "../assets/edit2.png";

const HeroWithNavbar = () => {
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [courseType, setCourseType] = useState("");
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

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
            setShowPopup(true);
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

  const handleClosePopup = () => {
    setShowPopup(false);
    setCategory("");
    setLanguage("");
    setCourseType("");
    setCourses([]);
    setError(null);
  };

  return (
    <section className="relative bg-[#49BBBD] pb-20 pt-0 overflow-hidden text-gray-800 mt-14">
      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="search-wrapper flex items-center gap-6">
          <input
            className="flex-1 px-4 py-2 rounded-lg shadow-md outline-none text-sm"
            type="text"
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
        {/* Left */}
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

        {/* Right */}
        <div className="md:w-1/2 relative mt-6 md:mt-0" data-aos="fade-left">
          <img
            src={heroImage}
            alt="Girl with laptop"
            className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10"
          />

          {/* Pop-up badges hidden on small screens */}
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

      {/* Popup */}
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
              <ul className="space-y-2">
                {courses.map((course) => (
                  <li
                    key={course._id}
                    className="border-b py-2 hover:bg-gray-100 rounded transition-all"
                  >
                    <Link
                      to={`/courses/${course._id}`}
                      onClick={handleClosePopup}
                      className="block p-2"
                    >
                      <p className="font-semibold text-blue-600 hover:underline">{course.title}</p>
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <p className="text-sm">Price: ${course.price}</p>
                      <p className="text-sm">Rating: {course.rating}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses found matching the criteria.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroWithNavbar;
