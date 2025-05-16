import React from 'react';
import { motion } from 'framer-motion';
import courseImage from '../assets/highlight.jpg'; 
import courseImage1 from '../assets/highlight3.jpg';
const CourseHeader = () => {
  return (
    <div className="w-full min-h-screen relative mt-12">
    
      <motion.img
        src={courseImage}
        alt="Course"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[600px] object-cover"
      />

      {/* Course Info Card - Floating Box */}
      <motion.div
        className="absolute bottom-0 right-10 bg-white shadow-2xl rounded-xl p-6 w-[90%] sm:w-[350px] space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={courseImage1} // replace with your image path
          alt="Course Logo"
          className="w-full h-[220px] object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default CourseHeader;
