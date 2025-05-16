import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '', subject: 'General Query'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   alert(`Message sent!
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject}`);

    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', subject: 'General Query' });
};

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-1/2 p-10 bg-white"
    >
      <h2 className="text-3xl font-bold mb-3 text-[#49BBBD]">Contact Us</h2>
      <p className="mb-6 text-gray-600">We’d love to hear from you. Let’s get in touch!</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={formData.firstName} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={formData.lastName} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
          />
        </div>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
        />
        <textarea 
          name="message" 
          placeholder="Your Message..." 
          value={formData.message} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded-xl shadow-inner h-32 focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
        />
        <select 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#49BBBD] transition"
        >
          <option value="General Query">General Query</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Billing Inquiry">Billing Inquiry</option>
          <option value="Feedback">Feedback</option>
        </select>
        <button 
          type="submit" 
          className="bg-[#49BBBD] hover:bg-[#49b8b7] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;