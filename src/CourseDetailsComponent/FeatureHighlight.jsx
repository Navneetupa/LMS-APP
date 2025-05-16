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
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          Everything you can do in a physical classroom,{" "}
          <span className="text-[#00CBB8]">you can do with LMS</span>
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Our Learning Management System enables you to access resources,
          submit assignments, and engage with instructors in real-time.
        </p>

        <a
          href="https://your-link-here.com"
          className="text-sm text-blue-500 font-semibold hover:underline transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </motion.div>

      {/* Image Block */}
      <motion.img
        src={Feature}
        alt="Feature highlight"
        className="w-full md:w-1/2 rounded-xl shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default FeatureHighlight;
