import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PopularCourses from "../Careercomponents/PopularCourses";
import PopularCompanies from '../Careercomponents/PopularCompanies';
import CareerPath from '../Careercomponents/CareerPath';
import Footer from '../CourseDetailsComponent/Footer';
import Navbar from '../components/StickyNavbar';

const companies = [
  { name: 'Slack', logo: 'slack.png' },
  { name: 'Microsoft', logo: 'microsoft.png' },
  { name: 'Google', logo: 'google.jpg' },
  { name: 'Airbnb', logo: 'airbnb.png' },
];

export default function Career() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');

  return (
    <>
      <Navbar />
      <div className={`${modalOpen ? 'blur-sm pointer-events-none select-none' : ''} min-h-screen pt-12 bg-white text-gray-800 font-sans transition-filter duration-300`}>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center relative">
          {/* Text Area */}
          <div className="relative z-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find the job of your <span className="text-cyan-500">Dreams</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Find Your New Job Today! Browse thousands of openings and apply in seconds.
            </p>

            {/* Trending Jobs */}
            <div className="mt-6">
              <span className="text-sm font-bold">Trending Keywords:</span>
              <div className="mt-2 flex gap-4 text-cyan-500 font-medium flex-wrap">
                {['Web Designer', 'UI/UX Designer', 'Frontend', 'Backend'].map((tag, index) => (
                  <span key={index} className="cursor-pointer hover:underline" onClick={() => setSearchTerm(tag)}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* New Attractive Cards Section */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto px-4">
              <div className="bg-cyan-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 flex items-center justify-center">
                <p className="text-lg text-cyan-900 font-semibold text-center">
                  Start your journey with the best courses tailored to your career.
                </p>
              </div>
              <div className="bg-cyan-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 flex items-center justify-center">
                <p className="text-lg text-cyan-900 font-semibold text-center">
                  Discover opportunities that match your skills and passions.
                </p>
              </div>
            </div>
          </div>

          {/* Circular SVG Design */}
          <div className="hidden md:block absolute top-0 right-0 h-full w-48 z-0 pointer-events-none flex justify-center items-center">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="100" cy="100" r="90" stroke="url(#grad1)" strokeWidth="2" className="opacity-30 animate-pulse-slow" />
              <circle cx="100" cy="100" r="65" stroke="url(#grad2)" strokeWidth="2" className="opacity-40 animate-pulse-slower" />
              <circle cx="100" cy="100" r="40" stroke="url(#grad3)" strokeWidth="2" className="opacity-50 animate-pulse-fast" />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Illustration */}
          <div className="relative flex justify-center items-center z-20">
            <div className="absolute w-[22rem] h-[22rem] bg-[#059FA3] rounded-full z-0 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
            <img
              src="CareerPage.png"
              alt="Job Search Illustration"
              className="w-full max-w-md relative z-10"
            />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center text-sm z-20">
              <span className="text-cyan-500 font-semibold mr-1">10.5K</span> Job Vacancy
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm z-20">
              It only takes a few seconds
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="text-center mt-10 px-4">
          <p className="text-black text-xl font-semibold">
            Join the Most Well-Known <span className="text-cyan-500">Companies</span> Around the World
          </p>
          <div className="mt-6 flex justify-center flex-wrap gap-10 sm:gap-12 md:gap-16 items-center">
            {companies.map((company) => (
              <img
                key={company.name}
                src={company.logo}
                alt={company.name}
                className="h-16 sm:h-20 object-contain mx-auto"
              />
            ))}
          </div>
        </section>

        {/* Other Sections */}
        <PopularCourses
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          searchTerm={filterTerm}
          setSearchTerm={setSearchTerm}
        />
        <PopularCompanies />
        <CareerPath />
        <Footer />
      </div>
    </>
  );
}
