import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png"; // Adjust path as needed

const FixedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get("https://lms-backend-flwq.onrender.com/api/v1/students/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            const avatarPath = response.data.data.avatar || 'default_avatar.jpg';
            setAvatarUrl(`https://lms-backend-flwq.onrender.com/uploads/${avatarPath}`);
          }
        } catch (error) {
          console.error("Error fetching profile:", error.response?.data || error.message);
          // Use default avatar on failure (from login response)
          setAvatarUrl('https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg');
        }
      };
      fetchProfile();
    } else {
      setAvatarUrl('https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setAvatarUrl(null);
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex flex-wrap justify-between items-center py-2 px-4 sm:px-8 bg-[#49BBBD] z-50 shadow-md">
      <div>
        <Link to="/">
          <img src={logo} alt="Your Logo" className="h-10" />
        </Link>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mt-4 md:mt-0 font-medium bg-[#49BBBD] w-full md:w-auto absolute md:relative top-16 md:top-0 left-0 z-40 px-4 py-4 md:p-0 transition-all duration-300 ease-in-out`}
      >
        {!isLoggedIn ? (
          <div className="flex flex-col md:hidden w-full gap-3 mb-4">
            <Link
              to="/login"
              className="text-sm px-4 py-1 rounded-full text-[#49BBBD] bg-white font-medium hover:text-white hover:bg-[#49BBBD] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-1 rounded-full text-white bg-[#7ddedf] font-medium hover:bg-[#59c1c3] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="md:hidden w-full text-white font-medium mb-4">
            <Link
              to="/student-dashboard"
              className="flex items-center gap-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser />
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-1 text-sm bg-red-500 px-4 rounded hover:bg-red-600"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}

        {/* Main Nav Links */}
        <Link
          to="/"
          className="text-white font-semibold hover:text-[#00A78E]"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/courses"
          className="text-white font-semibold hover:text-[#00A78E]"
          onClick={() => setIsMenuOpen(false)}
        >
          Courses
        </Link>
        <Link
          to="/career"
          className="text-white font-semibold hover:text-[#00A78E]"
          onClick={() => setIsMenuOpen(false)}
        >
          Careers
        </Link>
        <Link
          to="/aboutus"
          className="text-white font-semibold hover:text-[#00A78E]"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-white font-semibold hover:text-[#00A78E]"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </div>

      {/* Desktop Buttons or Avatar */}
      <div className="hidden md:flex items-center space-x-3 mt-4 md:mt-0" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-sm px-4 py-0.5 rounded-full text-[#49BBBD] bg-white font-medium transition-all duration-300 hover:text-white hover:bg-[#49BBBD]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-0.5 rounded-full text-white bg-[#7ddedf] font-medium transition-all duration-300 hover:bg-[#59c1c3]"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 object-cover"
                  onError={(e) => (e.target.src = 'https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg')}
                />
              ) : (
                <FaUserCircle />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <Link
                  to="/student-dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#49BBBD] hover:text-white"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white w-full text-left"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center ml-2">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default FixedNavbar;