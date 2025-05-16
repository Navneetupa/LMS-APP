import React from 'react';
import {
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaTelegram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const CourseCombined = () => {
  const reviews = [
    {
      name: 'John Doe',
      rating: 5,
      text: 'Very well-structured course, learned a lot!',
    },
    {
      name: 'Sarah Kim',
      rating: 4,
      text: 'Great content and delivery, would recommend!',
    },
  ];

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const ratingCount = [1, 2, 3, 4, 5].map(
    (rating) => reviews.filter((review) => review.rating === rating).length
  );

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6 relative p-4 sm:p-6 bg-gray-50">
      {/* Ratings Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full lg:w-2/3"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
     <h2 className="w-full max-w-[180px] h-[45px] text-sm sm:text-lg font-semibold text-white bg-[#49BBBD] flex items-center justify-center mb-4 rounded cursor-pointer hover:bg-[#3ea1a3] transition">
  OverViews
</h2>

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
          {/* Average Rating Box */}
          <div className="w-full lg:w-[250px] h-[160px] bg-white p-4 border rounded-lg shadow-sm flex flex-col justify-center items-start">
            <span className="text-xs text-gray-600 mb-1">
              {averageRating.toFixed(1)} out of 5
            </span>
            <div className="flex text-yellow-500 text-base">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex flex-col justify-between text-xs text-gray-600 w-full">
            {ratingCount.map((count, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 mb-2 w-full"
              >
                <div className="flex">
                  {[...Array(5 - index)].map((_, i) => (
                    <FaStar key={i} size={12} className="text-yellow-400" />
                  ))}
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-[#49BBBD] text-white h-1 rounded-full"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="border-t pt-3">
              <p className="text-sm font-medium text-gray-800">
                {review.name}
              </p>
              <div className="flex text-yellow-400 mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} size={12} />
                ))}
              </div>
              <p className="text-xs text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Course Info Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-[350px]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-600 text-xs mb-2">This course Price Now...</p>

        <div className="flex items-end flex-wrap gap-2 sm:space-x-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">$49.65</span>
          <span className="text-base line-through text-gray-500">$99.99</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-semibold">
            50% Off
          </span>
        </div>

        <p className="text-[#49BBBD] font-medium text-xs mb-4 flex items-center">
          <span className="inline-block w-3 h-3 bg-[#49BBBD] rounded-full mr-2"></span>
          11 hours left at this price
        </p>

        <button className="w-full bg-[#49BBBD] hover:bg-[#3ea1a3] text-white font-bold py-2 text-sm rounded-lg transition duration-200 mb-4">
          Enroll Now
        </button>

        <hr className="w-full border border-gray-300 mb-4" />

        <h2 className="text-lg font-bold text-gray-800 mb-3">
          This Course includes
        </h2>

        <ul className="text-xs text-gray-700 space-y-2 mb-4">
          <li>✔️ Full lifetime access</li>
          <li>✔️ Certificate of completion</li>
          <li>✔️ Access on mobile and TV</li>
          <li>✔️ Training for 5+ people</li>
        </ul>

        <button className="w-full bg-[#49BBBD] hover:bg-[#3ea1a3] text-white py-2 text-sm rounded-lg transition-all duration-300 mb-4">
          Enroll Now
        </button>

        {/* Social Share */}
        <div className="text-gray-500 text-xs mt-4">
          <div className="font-bold mb-2">Share this course</div>
          <div className="flex flex-wrap gap-3 text-base mt-2">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            </a>
            <a
              href="https://t.me/share/url?url=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="hover:text-blue-500 cursor-pointer" />
            </a>
            <a
              href="https://wa.me/?text=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
            </a>
            <a
              href="https://www.youtube.com/share?url=YOUR_COURSE_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="hover:text-red-500 cursor-pointer" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseCombined;
