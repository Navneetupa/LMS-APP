import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PopularCourses from "../Careercomponents/PopularCourses";
import PopularCompanies from '../Careercomponents/PopularCompanies';
import CareerPath from '../Careercomponents/CareerPath';
import Footer from '../components/Footer';
import Navbar from '../components/StickyNavbar';

const companies = [
  { name: 'Slack', logo: 'slack.png' },
  { name: 'Microsoft', logo: 'microsoft.png' },
  { name: 'Google', logo: 'Google.jpg' },
  { name: 'Tesla', logo: 'https://res.cloudinary.com/vistaprint/images/c_scale,w_300,h_385/f_auto,q_auto/v1719942420/ideas-and-advice-prod/blogadmin/tesla-logo/tesla-logo.png?_i=AA' },
   { name: 'Apple', logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049' },
    { name: 'IBM', logo: 'https://res.cloudinary.com/vistaprint/images/c_scale,w_693,h_319/f_auto,q_auto/v1719942391/ideas-and-advice-prod/blogadmin/ibm-logo/ibm-logo.png?_i=AA' },
     { name: 'Amazon', logo: 'https://static.vecteezy.com/system/resources/thumbnails/014/018/563/small_2x/amazon-logo-on-transparent-background-free-vector.jpg' },
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

      <div className={`min-h-screen pt-12 bg-white text-gray-800 font-sans transition-filter duration-300`}>
        <div className={`${modalOpen ? 'blur-sm pointer-events-none select-none backdrop-blur-sm' : ''}`}>
          {/* Hero Section */}
         <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 flex flex-col-reverse md:grid md:grid-cols-2 gap-6 items-center relative">
  {/* Text Area */}
  <div className="relative z-20 px-6 md:px-12 mt-6 md:mt-0" data-aos="fade-up">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight hover:scale-105 transition-transform duration-300">
      Unlock the Next Level of Your <span className="text-orange-400">Journey.</span>
    </h1>
    <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
      Imagine a career where your unparalleled skills converge with profound purpose, and your ambitious aspirations find a definitive home.
    </p>

    {/* Trending Jobs */}
    <div className="mt-6" data-aos="fade-up" data-aos-delay="100">
      <span className="text-sm font-bold">Trending Keywords:</span>
      <div className="mt-2 flex justify-center sm:justify-start">
        <div className="flex flex-wrap gap-2 text-cyan-500 font-medium text-xs sm:text-sm">
          {[
            'Web Developer',
            'Machine Learning',
            'App Development',
            'UI/UX Designer',
            'Data Analyst',
            'Cloud Computing',
            'Data Science',
          ].map((tag, index) => (
            <span
              key={index}
              className="cursor-pointer hover:underline hover:text-orange-500 transition-colors duration-300"
              onClick={() => setSearchTerm(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
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

          {/* Companies Section with scrolling effect */}
          <section className="text-center mt-10 px-4 overflow-hidden" data-aos="fade-up">
            <p className="text-black text-lg sm:text-xl font-semibold">
              Join the Most Well-Known <span className="text-cyan-500">Companies</span> Around the World
            </p>

            {/* Container with horizontal scroll animation */}
            <div className="mt-6 relative w-full overflow-hidden">
              <div
                className="flex gap-8 sm:gap-12 md:gap-16 items-center animate-scroll-left"
                style={{ width: `${companies.length * 200}px` }}
              >
                {[...companies, ...companies].map((company, index) => (
                  <img
                    key={`${company.name}-${index}`}
                    src={company.logo}
                    alt={company.name}
                    className="h-12 sm:h-16 md:h-20 object-contain mx-auto hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
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

      {/* Add custom CSS animation inside style tag or import CSS file */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 5s linear infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
}
