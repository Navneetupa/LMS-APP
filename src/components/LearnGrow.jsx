import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    title: "Interactive Lessons",
    description: "Engage students with videos, quizzes, and real-time feedback.",
    image: "https://cdn-icons-png.flaticon.com/512/3652/3652314.png",
  },
  {
    title: "Progress Tracking",
    description: "Monitor student performance with analytics & dashboards.",
    image: "https://img.icons8.com/color/96/combo-chart--v1.png",
  },
  {
    title: "Assignments Record",
    description: "Create, assign, and grade work efficiently and clearly.",
    image: "https://cdn-icons-png.flaticon.com/512/11725/11725632.png",
  },
  {
    title: "Live Classes",
    description: "Conduct live sessions and webinars with integrated tools.",
    image: "https://static.vecteezy.com/system/resources/previews/029/731/546/non_2x/live-icon-design-vector.jpg",
  },
  {
    title: "Seamless System Integration",
    description: "Enable effortless connectivity with existing enterprise systems (HRIS, CRM, etc.).",
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/system-integration-3d-icon-download-in-png-blend-fbx-gltf-file-formats--combination-setting-laptop-technology-20-pack-science-icons-7067626.png",
  },
  {
    title: "Enterprise-Grade Security",
    description: "Safeguard sensitive data with robust, multi-layered security protocols and adherence.",
    image: "https://www.boardtrac.com.au/wp-content/uploads/Enterprise-Grade-Security.jpg",
  },
  {
    title: "Personalized Learning Paths",
    description: "Empower students with adaptive learning journeys tailored to their pace, style, and goals.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0q9EYaYjPzthlMqNkZOjNLWmwcGsxZ_ABXg&s",
  },
  {
    title: "Mobile-First Accessibility",
    description: "Enable learning anytime, anywhere with a responsive design and mobile-optimized interface.",
    image: "https://i1.wp.com/www.atandme.com/wp-content/uploads/2019/08/aas.png?fit=512%2C250&ssl=1",
  },
];

// Split features to show only the first 4 initially
const initialFeatures = features.slice(0, 4);

const FeatureCard = ({ feature, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col max-w-xs transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
      {/* Image Section */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-24 h-24 object-contain"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-cyan-900 mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{feature.description}</p>

        {/* Footer Section: Mock Instructor and Rating */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
              alt="Instructor"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">John Doe</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-700 ml-1">{(Math.random() * 2 + 3).toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LMSFeatures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-tr from-white to-cyan-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-cyan-900 mb-6 tracking-wide">
        Key Features of Our LMS
      </h2>
      <p className="text-base sm:text-lg text-center text-cyan-700 max-w-3xl mx-auto mb-12 sm:mb-16">
        Empower your learning experience with features built to improve engagement, monitoring, and success.
      </p>

      {/* Initial 4 Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {initialFeatures.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>

      {/* View All Features Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-cyan-600 transition duration-300"
        >
          View All Features
        </button>
      </div>

      {/* Modal for All Features */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-5xl w-full max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-2xl font-bold text-cyan-900 mb-6 text-center">All LMS Features</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LMSFeatures;