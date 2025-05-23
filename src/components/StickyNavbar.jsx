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

  // Fetch login status and user profile/avatar
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
            const avatarPath = response.data.data.avatar || "default_avatar.jpg";
            setAvatarUrl(`https://lms-backend-flwq.onrender.com/uploads/${avatarPath}`);
          }
        } catch (error) {
          console.error("Error fetching profile:", error.response?.data || error.message);
          setAvatarUrl("https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg");
        }
      };
      fetchProfile();
    } else {
      setAvatarUrl("https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg");
    }
  }, []);

  // Close dropdown if clicked outside
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

  // Close hamburger menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setAvatarUrl(null);
    navigate("/login");
  };

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-2 bg-[#49BBBD] z-50 shadow-md">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10" />
      </Link>

      {/* Nav Links */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 bg-[#49BBBD] w-full md:w-auto absolute md:static top-14 md:top-0 left-0 z-40 px-4 py-2 md:p-0 transition-all`}
      >
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
  to="/login"
  className="text-sm px-4 py-1 rounded-full text-white bg-[#7ddedf] font-medium text-center"
  onClick={() => setIsMenuOpen(false)}
>
  Login
</Link>

          </div>
        ) : (
          <div className="md:hidden w-full text-white font-medium">
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

        {/* Navigation Pages */}
        {[
          { path: "/", label: "Home" },
          { path: "/courses", label: "Courses" },
          { path: "/career", label: "Careers" },
          { path: "/aboutus", label: "About" },
          { path: "/contact", label: "Contact" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="text-white font-semibold hover:text-[#00A78E]"
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Profile / Auth Buttons Desktop */}
      <div className="hidden md:flex items-center space-x-3" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-sm px-4 py-0.5 rounded-full text-[#49BBBD] bg-white font-medium hover:text-white hover:bg-[#49BBBD]"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="text-sm px-4 py-0.5 rounded-full text-white bg-[#7ddedf] font-medium hover:bg-[#59c1c3]"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://lms-backend-flwq.onrender.com/uploads/default_avatar.jpg")
                  }
                />
              ) : (
                <FaUserCircle className="text-white text-2xl" />
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

      {/* Hamburger Button */}
      <div className="md:hidden">
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
