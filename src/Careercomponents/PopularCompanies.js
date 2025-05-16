import React, { useState } from "react";

const companies = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    hiringFor: "Software Engineer, Data Analyst",
    avgCTC: "₹25 LPA",
    location: "Bangalore, Hyderabad",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    hiringFor: "Cloud Architect, DevOps Engineer",
    avgCTC: "₹20 LPA",
    location: "Hyderabad, Chennai",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    hiringFor: "Full Stack Developer, PM",
    avgCTC: "₹22 LPA",
    location: "Noida, Bangalore",
  },
  {
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Infosys_logo.svg",
    hiringFor: "System Engineer, Analyst",
    avgCTC: "₹6 LPA",
    location: "Pune, Mysore",
  },
  {
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Tata_Consultancy_Services_Logo.svg",
    hiringFor: "Backend Developer, QA Tester",
    avgCTC: "₹5.5 LPA",
    location: "Mumbai, Delhi",
  },
  {
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Wipro_Primary_Logo_Color_RGB.svg",
    hiringFor: "Cloud Engineer, Data Engineer",
    avgCTC: "₹6.2 LPA",
    location: "Kolkata, Bangalore",
  },
];

const PopularCompanies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const preview = companies.slice(0, 4);

  return (
    <section className="py-20 bg-white px-6 md:px-16 relative">
      <div className={modalOpen ? "filter blur-sm pointer-events-none" : ""}>
        <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-6 tracking-wide">
          Popular <span className="text-indigo-500">Companies</span>
        </h2>
        <p className="text-center text-indigo-700 max-w-3xl mx-auto mb-12 text-lg">
          These top companies are actively hiring for multiple roles across India.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {preview.map((company, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-3xl shadow-md transition-all duration-300 ease-in-out cursor-pointer transform flex flex-col items-center text-center hover:scale-105 hover:shadow-xl"
              style={{ transition: 'background-color 0.3s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#49bbbd66")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <img src={company.logo} alt={company.name} className="w-20 h-20 mb-4 object-contain" />
              <h3 className="text-lg font-semibold mb-2 text-indigo-900">{company.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Hiring: {company.hiringFor}</p>
              <p className="text-indigo-600 font-semibold">Avg CTC: {company.avgCTC}</p>
              <p className="text-sm text-gray-500">{company.location}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 bg-indigo-500 text-white rounded-full font-semibold text-lg hover:bg-indigo-600 transition-colors duration-300 shadow-lg"
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
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="sticky top-4 right-4 text-indigo-500 text-2xl font-bold hover:text-indigo-700 bg-white rounded-full px-3 py-1 shadow-lg z-50"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              style={{ float: "right" }}
            >
              &times;
            </button>
            <h3 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center">
              All <span className="text-indigo-500">Companies</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer transform flex flex-col items-center text-center hover:scale-105 hover:shadow-xl"
                  style={{ transition: 'background-color 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#49bbbd66")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 mb-3 object-contain"
                    loading="lazy"
                  />
                  <h4 className="text-lg font-semibold mb-1 text-indigo-900">{company.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">Roles: {company.hiringFor}</p>
                  <p className="text-indigo-600 font-semibold mb-1">{company.avgCTC}</p>
                  <p className="text-gray-500">{company.location}</p>
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
