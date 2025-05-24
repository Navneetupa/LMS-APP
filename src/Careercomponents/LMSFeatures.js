import React from "react";
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

const FeatureCard = ({ feature, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white min-h-[320px] rounded-3xl shadow-md p-8 flex flex-col items-center text-center
        transition-all duration-300 transform
        hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]
        active:bg-[#49bbbd1a] active:scale-[0.98] cursor-pointer"
    >
      <img
        src={feature.image}
        alt={feature.title}
        className="w-24 h-24 mb-6 object-contain transition-transform duration-300"
        loading="lazy"
      />
      <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-gray-700">{feature.description}</p>
    </motion.div>
  );
};

const LMSFeatures = () => {
  return (
    <div className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-tr from-white to-cyan-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-cyan-900 mb-6 tracking-wide">
        Key Features of Our LMS
      </h2>
      <p className="text-base sm:text-lg text-center text-cyan-700 max-w-3xl mx-auto mb-12 sm:mb-16">
        Empower your learning experience with features built to improve engagement, monitoring, and success.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LMSFeatures;

