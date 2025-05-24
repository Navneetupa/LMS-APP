import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PopularCourses from "../Careercomponents/PopularCourses";
import PopularCompanies from '../Careercomponents/PopularCompanies';
import CareerPath from '../Careercomponents/CareerPath';
import Footer from '../CourseDetailsComponent/Footer';
import Navbar from '../components/StickyNavbar';

const companies = [
  { name: 'Slack', logo: 'slack.png' },
  { name: 'Microsoft', logo: 'microsoft.png' },
  { name: 'Google', logo: 'Google.jpg' },
  { name: 'Airbnb', logo: 'airbnb.png' },
];

export default function Career() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Modal component (if any) should go here OUTSIDE the blurred area */}
      {/* Example:
        {modalOpen && <MyModal onClose={() => setModalOpen(false)} />}
      */}

      {/* Wrap only page content inside conditional blur container */}
      <div className={`min-h-screen pt-12 bg-white text-gray-800 font-sans transition-filter duration-300`}>
        <div className={`${modalOpen ? 'blur-sm pointer-events-none select-none' : ''}`}>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center relative">
            {/* Text Area */}
            <div className="relative z-20 px-6 md:px-12" data-aos="fade-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Unlock the Next Level of Your <span className="text-orange-400">Journey.</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
                Imagine a career where your unparalleled skills converge with profound purpose, and your ambitious aspirations find a definitive home.
              </p>

              {/* Trending Jobs */}
              <div className="mt-6" data-aos="fade-up" data-aos-delay="100">
                <span className="text-sm font-bold">Trending Keywords:</span>
                <div className="mt-2 flex gap-1 text-cyan-500 font-medium flex-wrap text-xs sm:text-sm">
                  {[
                    'Empower Your Ambition with Career-Driven Learning.',
                    'Your Potential. Our Platform. Endless Possibilities.',
                    'Master Your Domain. Own Your Future.',
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="cursor-pointer hover:underline whitespace-nowrap"
                      onClick={() => setSearchTerm(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cards Section */}
              <div
                className="mt-10 flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto px-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="bg-cyan-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 flex flex-col items-center gap-3 sm:gap-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M12 4v16" />
                    <path d="M3 12h9" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <p className="text-base sm:text-lg text-cyan-900 font-semibold text-center">Specialized Career Acceleration.</p>
                </div>
                <div className="bg-cyan-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 flex flex-col items-center gap-3 sm:gap-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <p className="text-base sm:text-lg text-cyan-900 font-semibold text-center">Innovate Here. Grow Everywhere.</p>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div
              className="relative flex justify-center items-center z-20 px-4 sm:px-0"
              data-aos="zoom-in"
              style={{ minWidth: '280px' }}
            >
              <div className="absolute w-44 h-44 sm:w-[22rem] sm:h-[22rem] bg-[#059FA3] rounded-full z-0 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
              <img
                src="CareerPage.png"
                alt="Job Search Illustration"
                className="w-full max-w-xs sm:max-w-md relative z-10"
                style={{ maxHeight: '350px', objectFit: 'contain' }}
              />
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-3 py-1 rounded-full flex items-center text-xs sm:text-sm z-20 whitespace-nowrap">
                <span className="text-cyan-500 font-semibold mr-1">10.5K</span> Job Vacancy
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-3 py-1 rounded-full text-xs sm:text-sm z-20 whitespace-nowrap">
                It only takes a few seconds
              </div>
            </div>
          </section>

          {/* Companies Section */}
          <section className="text-center mt-10 px-4" data-aos="fade-up">
            <p className="text-black text-lg sm:text-xl font-semibold">
              Join the Most Well-Known <span className="text-cyan-500">Companies</span> Around the World
            </p>
            <div className="mt-6 flex justify-center flex-wrap gap-8 sm:gap-12 md:gap-16 items-center">
              {companies.map((company) => (
                <img
                  key={company.name}
                  src={company.logo}
                  alt={company.name}
                  className="h-12 sm:h-16 md:h-20 object-contain mx-auto"
                  loading="lazy"
                />
              ))}
            </div>
          </section>

          {/* Other Sections */}
          <div data-aos="fade-up">
            <PopularCourses
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              searchTerm={filterTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <div data-aos="fade-up">
            <PopularCompanies />
          </div>

          <div data-aos="fade-up">
            <CareerPath />
          </div>

          <div data-aos="fade-up">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
