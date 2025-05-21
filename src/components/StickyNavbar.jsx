import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // path adjust karo

const FixedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user") || localStorage.getItem("authToken");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Yahan hum check kar rahe hain ki agar path '/login' ya '/signup' ho to navbar render na ho
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null; // Navbar render hi nahi hoga in pages pe
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
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              👤 My Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block mt-2 text-sm bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
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

      {/* Desktop Buttons or Profile */}
      <div className="hidden md:flex items-center space-x-3 mt-4 md:mt-0">
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
          <>
            <Link
              to="/profile"
              className="text-sm px-4 py-0.5 rounded-full text-white bg-[#00A78E] font-medium transition-all duration-300 hover:bg-[#008f76]"
            >
              👤 Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-0.5 rounded-full text-white bg-red-500 font-medium transition-all duration-300 hover:bg-red-600"
            >
              Logout
            </button>
          </>
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
