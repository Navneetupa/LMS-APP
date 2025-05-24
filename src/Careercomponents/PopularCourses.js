import React, { useState } from "react";

const careerTracks = [
  {
    title: "Software Engineering",
    description: "Learn the fundamentals of software design, coding, testing, and deployment.",
    image: "https://img.icons8.com/color/96/code.png",
    learners: "8.5K+ learners",
  },
  {
    title: "Data Analytics",
    description: "Master data processing, visualization, and insights to drive decisions.",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20230922185402/Data-Analytics-.webp",
    learners: "6.4K+ learners",
  },
  {
    title: "Product Management",
    description: "Understand product lifecycle, user research, and roadmap planning.",
    image: "https://img.icons8.com/color/96/product.png",
    learners: "4.9K+ learners",
  },
  {
    title: "Digital Marketing",
    description: "Explore SEO, content marketing, paid ads, and social media strategies.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pzp_BNVMUJ1jXzGZBgAxBFe1R1Rbov5KnA&s",
    learners: "7.1K+ learners",
  },
  {
    title: "Cloud Computing",
    description: "Get hands-on with AWS, Azure, and cloud infrastructure.",
    image: "https://img.icons8.com/color/96/cloud.png",
    learners: "5.3K+ learners",
  },
  {
    title: "Cybersecurity",
    description: "Learn how to protect networks, systems, and data from attacks.",
    image: "https://img.icons8.com/color/96/cyber-security.png",
    learners: "4.7K+ learners",
  },
  {
    title: "UI/UX Design",
    description: "Design engaging user experiences with Figma and Adobe XD.",
    image: "https://img.icons8.com/color/96/design.png",
    learners: "5.6K+ learners",
  },
  {
    title: "Machine Learning",
    description: "Dive into AI, algorithms, and building intelligent systems.",
    image: "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2024/07/what-is-machine-learning.jpg",
    learners: "6.2K+ learners",
  },
];

const CareerPaths = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const previewTracks = careerTracks.slice(0, 4);

  return (
    <section className="py-20 bg-white px-6 md:px-16 relative">
      <div className={modalOpen ? "filter blur-sm pointer-events-none" : ""}>
        <h2 className="text-4xl font-extrabold text-center text-black mb-6 tracking-wide">
          Explore Your <span className="text-[#49BBBD]">Career Paths</span>
        </h2>
        <p className="text-center text-black max-w-3xl mx-auto mb-12 text-lg">
          Choose a career track to build skills that employers value. Start with basics, then master your domain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {previewTracks.map((track, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={track.image}
                alt={track.title}
                className="w-20 h-20 mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mb-2 text-cyan-900">{track.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{track.description}</p>
              <p className="text-cyan-600 font-semibold">{track.learners}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 bg-[#59c1c3] text-white rounded-full font-semibold text-lg hover:bg-[#7ddedf] transition-colors duration-300 shadow-lg"
          >
            View All Career Paths
          </button>
        </div>
      </div>

      {/* Modal */}
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
              className="sticky top-4 right-4 text-cyan-500 text-2xl font-bold hover:text-cyan-700 bg-white rounded-full px-3 py-1 shadow-lg z-50"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              style={{ float: "right" }}
            >
              &times;
            </button>
            <h3 className="text-3xl font-extrabold text-black mb-8 text-center">
              All <span className="text-[#49BBBD]">Career Paths</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {careerTracks.map((track, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
                >
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-16 h-16 mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-lg font-semibold mb-1 text-cyan-900">{track.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{track.description}</p>
                  <p className="text-cyan-600 font-semibold">{track.learners}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerPaths;
