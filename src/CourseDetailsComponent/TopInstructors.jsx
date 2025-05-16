import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import instructor from "../assets/instructor4.webp";
import instructor1 from "../assets/instructor5.jpg";
import instructor2 from "../assets/instructor6.jpg";


const instructors = [
  {
    name: "Jane Smith",
    image: instructor,
    discount: "50% OFF",
  },
  {
    name: "Jonn Doe",
    image: instructor1,
    discount: "30% OFF",
  },
  {
    name: "Emily Watts",
    image: instructor2,
    discount: "60% OFF",
  },
];


const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
};

const TopInstructors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // triggers when 30% is in view

  return (
    <div className="mt-10">
      <motion.h2
        className="text-xl md:text-2xl font-bold text-gray-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Top Instructors Offers & Deals
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6" ref={ref}>
        {instructors.map((instructor, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="exit"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={instructor.image}
              alt={instructor.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm">
                {instructor.name}
              </h3>
              <span className="text-red-500 text-xs font-medium bg-red-100 px-2 py-1 rounded mt-2 inline-block">
                {instructor.discount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopInstructors;
