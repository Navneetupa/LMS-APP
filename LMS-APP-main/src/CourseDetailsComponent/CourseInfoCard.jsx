import React from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const CourseInfoCard = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm absolute top-1/6 right-2 md:top-1/6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <p className="text-gray-600 text-sm mb-2">This course includes...</p>

      <div className="flex items-end space-x-3 mb-4">
        <span className="text-3xl font-bold text-gray-900">$49.65</span>
        <span className="text-xl line-through text-gray-500">$99.99</span>
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">50% Off</span>
      </div>

      <p className="text-orange-500 font-medium text-sm mb-4">
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
        11 hours left at this price
      </p>

      <button className="w-full bg-blue-400 hover:bg-green-300 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mb-4">
        Enroll Now
      </button>

      {/* Add a horizontal line above the "This Course includes" header */}
      <hr className="border-1 border-black-300 mb-4" />


      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        This Course includes
      </h2>

      <ul className="text-sm text-gray-700 space-y-2 mb-4">
        <li>✔️ Full lifetime access</li>
        <li>✔️ Certificate of completion</li>
        <li>✔️ Access on mobile and TV</li>
        <li>✔️ Training for 5+ people</li>
      </ul>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all duration-300 mb-4">
        Enroll Now
      </button>

      <div className="text-gray-500 text-sm mt-4">
        <div className="flex items-center gap-1 font-bold mb-2">
          <FaShareAlt /> Share this course
        </div>

        {/* Social Icons with Links */}
        <div className="flex gap-3 text-lg mt-2">
          <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
          </a>
          <a href="https://twitter.com/intent/tweet?url=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
          </a>
          <a href="https://t.me/share/url?url=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="hover:text-blue-500 cursor-pointer" />
          </a>
          <a href="https://wa.me/?text=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
          </a>
          <a href="https://www.youtube.com/share?url=YOUR_COURSE_URL" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseInfoCard;
