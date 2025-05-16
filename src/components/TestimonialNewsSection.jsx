import React from "react";
import { motion } from "framer-motion";
import Testimonial from "../assets/testimonial.png";

export default function TestimonialSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-sm text-gray-400 tracking-widest uppercase border-l-2 border-blue-500 pl-2 mb-3">
          Testimonial
        </h3>
        <h2 className="text-3xl font-bold text-[#49BBBD] mb-4">What They Say?</h2>
        <p className="text-gray-600 mb-2">
          LMS has got more than 100k positive ratings from our users around the world.
        </p>
        <p className="text-gray-600 mb-2">
          Some of the students and teachers were greatly helped by the Skilline.
        </p>
        <p className="text-gray-600 mb-6">Are you too? Please give your assessment</p>

        <button className="inline-flex items-center px-4 py-2 border border-teal-500 text-teal-600 rounded-full hover:bg-teal-50 transition">
          Write your assessment
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </motion.div>

      {/* Right Image and Card */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl overflow-hidden w-full sm:w-80 h-96 mx-auto">
          <img
            src={Testimonial}
            alt="Student"
            className="object-cover w-full h-full"
          />
        </div>

      

        {/* Testimonial Card */}
      <motion.div
  className="absolute bottom-0 right-4 sm:right-20 bg-white shadow-xl rounded-xl p-4 sm:p-5 w-[250px] sm:w-[280px] md:w-[300px] translate-y-1/2"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <p className="text-sm text-gray-700">
    “Thank you so much for your help. It’s exactly what I’ve been looking for. You won’t regret it. It really saves me time and effort. LMS is exactly what our business has been lacking.”
  </p>
  <div className="mt-4">
    <p className="font-semibold text-gray-900 text-sm sm:text-base">Divya Sharma</p>
    <div className="flex items-center gap-1 text-yellow-400 mt-1">
      {Array(5).fill(0).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
    <p className="text-xs text-gray-400 mt-1">12 reviews at Yelp</p>
  </div>
</motion.div>

      </motion.div>
    </section>
  );
}
