import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 relative">
        {/* Logo */}
        <div>
          <img src={logo} alt="LMS Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-400 transition hover:scale-105">
              Home
            </Link>
            <Link to="/Courses" className="hover:text-blue-400 transition hover:scale-105">
              Courses
            </Link>
            <Link to="/Career" className="hover:text-blue-400 transition hover:scale-105">
              Careers
            </Link>
            <Link to="/AboutUs" className="hover:text-blue-400 transition hover:scale-105">
              About Us
            </Link>
            <Link to="/ContactUs" className="hover:text-blue-400 transition hover:scale-105">
              Contact Us
            </Link>
          </nav>

          <FaUserCircle className="text-2xl cursor-pointer hidden md:block hover:scale-110" />

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="absolute top-full left-0 w-full max-w-[90%] bg-white border rounded-lg shadow-lg flex flex-col items-center p-4 space-y-3 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" onClick={handleCloseMenu} className="w-full hover:text-blue-400">
              Home
            </Link>
            <Link to="/Courses" onClick={handleCloseMenu} className="w-full hover:text-blue-400">
              Courses
            </Link>
            <Link to="/careers" onClick={handleCloseMenu} className="w-full hover:text-blue-400">
              Careers
            </Link>
            <Link to="/about" onClick={handleCloseMenu} className="w-full hover:text-blue-400">
              About Us
            </Link>
            <Link to="/contact" onClick={handleCloseMenu} className="w-full hover:text-blue-400">
              Contact Us
            </Link>
            <FaUserCircle className="text-xl cursor-pointer mt-2 self-end" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
