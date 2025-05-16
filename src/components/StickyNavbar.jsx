import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const FixedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex flex-wrap justify-between items-center py-2 px-4 sm:px-8 bg-[#49BBBD] z-50 shadow-md">
      <div>
        <img src={logo} alt="Your Logo" className="h-10" />
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mt-4 md:mt-0 font-medium bg-[#49BBBD] w-full md:w-auto absolute md:relative top-16 md:top-0 left-0 z-40 px-4 py-4 md:p-0 transition-all duration-300 ease-in-out`}
      >
        {/* Mobile Login & Signup Buttons */}
        <div className="flex flex-col md:hidden w-full gap-3 mb-4">
          <button className="text-sm px-4 py-1 rounded-full text-[#49BBBD] bg-white font-medium hover:text-white hover:bg-[#49BBBD] transition-all">
            Login
          </button>
          <button className="text-sm px-4 py-1 rounded-full text-white bg-[#7ddedf] font-medium hover:bg-[#59c1c3] transition-all">
            Sign Up
          </button>
        </div>

        {/* Nav Links */}
        <Link to="#" className="text-white font-semibold hover:text-[#00A78E]">
          Home
        </Link>
        <Link to="/Courses" className="text-white font-semibold hover:text-[#00A78E]">
          Courses
        </Link>
        <Link to="/Career" className="text-white font-semibold hover:text-[#00A78E]">
          Careers
        </Link>
        <Link to="/AboutUs" className="text-white font-semibold hover:text-[#00A78E]">
          About
        </Link>
        <Link to="/contact" className="text-white font-semibold hover:text-[#00A78E]">
          Contact
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-3 mt-4 md:mt-0">
        <button className="text-sm px-4 py-0.5 rounded-full text-[#49BBBD] bg-white font-medium transition-all duration-300 hover:text-white hover:bg-[#49BBBD]">
          Login
        </button>
        <button className="text-sm px-4 py-0.5 rounded-full text-white bg-[#7ddedf] font-medium transition-all duration-300 hover:bg-[#59c1c3]">
          Sign Up
        </button>
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
