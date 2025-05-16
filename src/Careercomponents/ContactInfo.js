import React from 'react';
import { motion } from 'framer-motion';

const ContactInfo = () => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="bg-[#49BBBD] text-white w-full md:w-1/2 p-10 space-y-6"
  >
    <h2 className="text-4xl font-bold">Let's Connect</h2>
    <p className="text-lg"><strong>Phone:</strong> +1012 3456 789</p>
    <p className="text-lg"><strong>Email:</strong> demo@gmail.com</p>
    <p className="text-lg"><strong>Address:</strong> 132 Dartmouth Street, Boston, MA 02156</p>
    <div className="flex space-x-6 pt-4 text-2xl">
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110"><i className="fab fa-twitter" /></a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110"><i className="fab fa-facebook" /></a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110"><i className="fab fa-instagram" /></a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110"><i className="fab fa-linkedin" /></a>
    </div>
  </motion.div>
);

export default ContactInfo;