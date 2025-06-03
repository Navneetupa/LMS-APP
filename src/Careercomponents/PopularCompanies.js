import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const companies = [
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Adobe_Corporate_wordmark.svg/280px-Adobe_Corporate_wordmark.svg.png",
    hiringFor: "Software Engineer, Computer Scientist, Product Manager, UX Designer, Quality Assurance Engineer, Data Engineer",
    avgCTC: "₹22 - 45 LPA+",
    location: "Bangalore, Hyderabad",
  },
  {
    name: "NVIDIA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NVIDIA_logo.svg/330px-NVIDIA_logo.svg.png",
    hiringFor: "System Software Engineer, Machine Learning Engineer, ASIC Design Engineer, GPU Software Engineer, Software Developer",
    avgCTC: "₹30 - 75 LPA+",
    location: "Hyderabad, Chennai",
  },
  {
    name: "Intel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/250px-Intel_logo_2023.svg.png",
    hiringFor: "Software Engineer, Firmware Developer, Hardware Engineer, SoC Design Engineer, AI Engineer, Validation Engineer",
    avgCTC: "₹25 - 50 LPA+",
    location: "Noida, Bangalore",
  },
  {
    name: "Meta (Facebook)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/1920px-Facebook_logo_%282023%29.svg.png",
    hiringFor: "Software Engineer, Research Scientist, Data Scientist, Product Manager, Solutions Engineer, Web Developer",
    avgCTC: "₹40 - 80 LPA+",
    location: "Pune, Mysore",
  },
  {
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/330px-Oracle_logo.svg.png",
    hiringFor: "Member of Technical Staff (MTS), Senior MTS, Principal Engineer, Cloud Engineer, Software Development",
    avgCTC: "₹5.5 LPA",
    location: "Mumbai, Delhi",
  },
  {
    name: "Flipkart",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Flipkart_logo.svg/250px-Flipkart_logo.svg.png",
    hiringFor: "Software Development Engineer (SDE 1, SDE 2, SDE 3), Data Scientist, Product Manager, Business Analyst, UX Designer",
    avgCTC: "₹25 - 50 LPA+",
    location: "Kolkata, Bangalore",
  },
];

const PopularCompanies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const preview = companies.slice(0, 4);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-white relative">
      <div className={modalOpen ? "blur-sm pointer-events-none select-none" : ""}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-6 tracking-wide">
          Popular <span className="text-[#59c1c3]">Companies</span>
        </h2>
        <p className="text-center text-black max-w-3xl mx-auto mb-10 text-base md:text-lg">
          These top companies are actively hiring for multiple roles across India.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {preview.map((company, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-gradient-to-br from-indigo-50 to-white p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer transform flex flex-col items-center text-center hover:scale-105 hover:shadow-xl hover:bg-[#49BBBD]/20"
            >
              <img src={company.logo} alt={company.name} className="w-16 h-16 md:w-20 md:h-20 mb-3 object-contain" />
              <h3 className="text-md md:text-lg font-semibold mb-1 text-indigo-900">
                {company.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">Hiring: {company.hiringFor}</p>
              <p className="text-[#49BBBD] font-semibold">Avg CTC: {company.avgCTC}</p>
              <p className="text-sm text-gray-500">{company.location}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 md:px-8 md:py-3 bg-[#49BBBD] text-white rounded-full font-semibold text-base md:text-lg hover:bg-[#3ca3a5] transition duration-300 shadow-lg"
          >
            View All Companies
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-[#49BBBD] text-2xl font-bold hover:text-indigo-700"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-900 mb-6 text-center">
              All <span className="text-[#49BBBD]">Companies</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 100}
                  className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer transform flex flex-col items-center text-center hover:scale-105 hover:shadow-xl hover:bg-[#49BBBD]/20"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 mb-3 object-contain"
                    loading="lazy"
                  />
                  <h4 className="text-md font-semibold mb-1 text-indigo-900">{company.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">Roles: {company.hiringFor}</p>
                  <p className="text-[#49BBBD] font-semibold mb-1">{company.avgCTC}</p>
                  <p className="text-sm text-gray-500">{company.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularCompanies;
