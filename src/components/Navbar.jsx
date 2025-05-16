import React, { useState, useEffect } from "react";
import heroImage from "../assets/hero-girl.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
import edit1 from "../assets/edit1.png";
import edit2 from "../assets/edit2.png";

const HeroWithNavbar = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

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
        {["Course Category", "Difficulty Level", "Language", "Course Type"].map((label) => (
          <select key={label} className="text-sm border px-2 py-2 rounded w-full sm:w-40">
            <option>{label}</option>
          </select>
        ))}
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 mt-12">
        {/* Left */}
        <div
          className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left ml-6 md:ml-10"
          data-aos="fade-right"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            <span className="text-orange-400">Studying</span> Online is now <br className="hidden sm:block" /> much easier
          </h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            TOTC is an interesting platform that will teach you in a more interactive way.
          </p>
          <button className="mt-8 bg-[#7ddedf] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#59c1c3] transition-all duration-300">
            Join for free
          </button>
        </div>

        {/* Right */}
        <div className="md:w-1/2 relative mt-6 md:mt-0" data-aos="fade-left">
          <img
            src={heroImage}
            alt="Girl with laptop"
            className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10"
          />
          <img
            src={edit}
            alt="Assisted Students"
            className="absolute top-2 left-2 w-36 sm:w-40 shadow-lg rounded-lg"
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
    </section>
  );
};

export default HeroWithNavbar;
