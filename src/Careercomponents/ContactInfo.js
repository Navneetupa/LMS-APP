import React from 'react';
import { motion } from 'framer-motion';
import link from '../assets/contact.jpg'
const ContactInfo = () => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1, backgroundColor: 'rgba(73, 187, 189, 0.8)' }} // softly transform bg color
    transition={{ duration: 0.8 }}
    className="relative w-full md:w-1/2 p-10 text-white overflow-hidden rounded-xl"
    style={{
      backgroundColor: 'rgba(73, 187, 189, 0.6)', // semi-transparent teal
      backdropFilter: 'blur(6px)', // nice blur effect
      WebkitBackdropFilter: 'blur(6px)', // Safari support
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    }}
  >
    {/* Background image with low opacity */}
    <div
      style={{
        backgroundImage: `url(${link})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.23,
        zIndex: 0,
        borderRadius: '1rem',
      }}
      aria-hidden="true"
    />

    {/* Content container with higher z-index so it is above the bg image */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
      <p className="text-lg"><strong>Phone:</strong> +1012 3456 789</p>
      <p className="text-lg"><strong>Email:</strong> demo@gmail.com</p>
      <p className="text-lg"><strong>Address:</strong> 132 Dartmouth Street, Boston, MA 02156</p>
      <div className="flex space-x-6 pt-4 text-2xl">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110">
          <i className="fab fa-twitter" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110">
          <i className="fab fa-facebook" />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110">
          <i className="fab fa-instagram" />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition transform hover:scale-110">
          <i className="fab fa-linkedin" />
        </a>
      </div>
    </div>
  </motion.div>
);

export default ContactInfo;