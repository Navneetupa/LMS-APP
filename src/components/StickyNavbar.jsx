import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/usersss.png";

const FixedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Memoized fetch profile function
  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("https://lms-backend-flwq.onrender.com/api/v1/students/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success && response.data.data.avatar) {
        setAvatarUrl(response.data.data.avatar);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  }, []);

  // Fetch login status and user profile/avatar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetchProfile();
    } else {
      setAvatarUrl(defaultAvatar);
    }
  }, [fetchProfile]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close hamburger menu on scroll
  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setAvatarUrl(defaultAvatar);
    navigate("/");
  };

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  // Nav links data
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/career", label: "Careers" },
    { path: "/aboutus", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-2 bg-[#49BBBD] z-50 shadow-md">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10" />
      </Link>

      {/* Nav Links */}
      <div
        className={`${
          isMenuOpen ? "flex opacity-80" : "hidden"
        } md:flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-10 bg-[#49BBBD] w-full md:w-auto absolute md:static top-14 md:top-0 left-0 z-40 px-4 py-2 md:p-0 transition-all text-center`}
      >
        {/* Navigation Pages with enhanced active styling */}
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`
              relative text-white font-semibold hover:text-[#467d74] transition-colors
              ${isActive(path) ? "text-[#00A78E] font-bold" : ""}
              group
            `}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            {label}
            {/* Animated underline for active link */}
            <span
              className={`
              absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0.5 bg-[#45897d] transition-all duration-300
              ${isActive(path) ? "w-full" : "group-hover:w-full"}
            `}
            ></span>
          </Link>
        ))}

        {/* Login/Signup or Profile/Logout for Mobile */}
        {!isLoggedIn ? (
          <div className="flex flex-col md:hidden w-full gap-2">
            <Link
              to="/login"
              className="text-sm px-4 py-1 rounded-full text-[#49BBBD] bg-white font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-1 rounded-full text-white bg-[#7ddedf] font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="md:hidden w-full text-white font-medium space-y-2">
            <Link
              to="/student-dashboard"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-[#3aa9ab] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser />
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-2 px-4 text-sm text-white hover:bg-[#3aa9ab] rounded w-full transition-colors"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Profile / Auth Buttons Desktop */}
      <div className="hidden md:flex items-center space-x-3" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-sm px-4 py-0.5 rounded-full text-[#49BBBD] bg-white font-medium hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-0.5 rounded-full text-white bg-[#7ddedf] font-medium hover:bg-[#59c1c3] transition-colors"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-white object-cover hover:border-[#00A78E] transition-colors"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                <Link
                  to="/student-dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <FaUser className="text-[#49BBBD]" />
                  <span>Profile</span>
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                >
                  <FaSignOutAlt className="text-[#49BBBD]" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
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