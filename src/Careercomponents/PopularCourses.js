import React, { useState } from "react";

const courses = [
  {
    title: "Full Stack Web Development",
    description: "Master front-end & back-end development using MERN stack.",
    image: "https://img.icons8.com/color/96/code.png",
    students: "5.2K+ learners",
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Learn user-centered design with Figma and Adobe XD.",
    image: "https://img.icons8.com/color/96/design.png",
    students: "3.7K+ learners",
  },
  {
    title: "Python for Beginners",
    description: "Kickstart your coding journey with Python.",
    image: "https://img.icons8.com/color/96/python--v1.png",
    students: "7.1K+ learners",
  },
  {
    title: "Digital Marketing Mastery",
    description: "Become a pro in SEO, SEM & social media marketing.",
    image: "https://dmwsprod.wpenginepowered.com/wp-content/uploads/2019/11/DM-logo-dark-1024x361.png",
    students: "4.8K+ learners",
  },
  {
    title: "Data Science with R",
    description: "Analyze data and visualize results using R language.",
    image: "https://img.icons8.com/color/96/data-science.png",
    students: "2.9K+ learners",
  },
  {
    title: "Cloud Computing Basics",
    description: "Understand cloud infrastructure and services.",
    image: "https://img.icons8.com/color/96/cloud.png",
    students: "3.1K+ learners",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Protect systems and data with cyber fundamentals.",
    image: "https://img.icons8.com/color/96/cyber-security.png",
    students: "4.5K+ learners",
  },
  {
    title: "Machine Learning A-Z",
    description: "Dive into ML algorithms, projects, and tools.",
    image: "https://img.icons8.com/color/96/machine-learning.png",
    students: "6.3K+ learners",
  },
  {
    title: "React JS Advanced",
    description: "Build dynamic apps using React hooks and context.",
    image: "https://img.icons8.com/color/96/react-native.png",
    students: "5.0K+ learners",
  },
  {
    title: "Graphic Design Masterclass",
    description: "Create pro designs with Photoshop & Illustrator.",
    image: "https://img.icons8.com/color/96/graphic-design.png",
    students: "3.4K+ learners",
  },
  {
    title: "SQL & Database Management",
    description: "Master database design, queries, and tools.",
    image: "https://img.icons8.com/color/96/database.png",
    students: "4.2K+ learners",
  },
  {
    title: "DevOps Fundamentals",
    description: "Streamline deployment & CI/CD with DevOps tools.",
    image: "https://img.icons8.com/color/96/devops.png",
    students: "3.6K+ learners",
  },
];

const PopularCourses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const previewCourses = courses.slice(0, 4);

  return (
    <section className="py-20 bg-white px-6 md:px-16 relative">
      <div className={modalOpen ? "filter blur-sm pointer-events-none" : ""}>
        <h2 className="text-4xl font-extrabold text-center text-cyan-900 mb-6 tracking-wide">
          Explore Your <span className="text-cyan-500">Career Path</span>
        </h2>
        <p className="text-center text-cyan-700 max-w-3xl mx-auto mb-12 text-lg">
          Unlock your potential with our expert-curated learning tracks designed to guide you toward your dream job. Start small, grow fast.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {previewCourses.map((course, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-20 h-20 mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mb-2 text-cyan-900">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <p className="text-cyan-600 font-semibold">{course.students}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold text-lg hover:bg-cyan-600 transition-colors duration-300 shadow-lg"
          >
            View All Courses
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
            <h3 className="text-3xl font-extrabold text-cyan-900 mb-8 text-center">
              All <span className="text-cyan-500">Learning Paths</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-lg font-semibold mb-1 text-cyan-900">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <p className="text-cyan-600 font-semibold">{course.students}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularCourses;
