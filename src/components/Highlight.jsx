import React from 'react';
import { motion } from 'framer-motion';
import Feature from "../assets/feature.png";

const FeatureHighlight = () => {
  return (
    <motion.div
      className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col-reverse md:flex-row items-center gap-8 mt-10 w-full"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Text Block */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Everything you can do in a <br />physical classroom,{" "} 
          <span className="text-[#00CBB8]">you can do with LMS</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Our Learning Management System enables you to access resources,<br />
          submit assignments, and engage with instructors in real-time.
        </p>
      </motion.div>

      {/* Image Block */}
    <motion.img
  src={Feature}
  alt="Feature highlight"
  className="w-full md:max-w-md rounded-xl shadow-lg"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
/>

    </motion.div>
  );
};

export default FeatureHighlight;
