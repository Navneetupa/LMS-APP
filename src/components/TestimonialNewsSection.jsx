import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testimonial from "../assets/testimonial.png";
import testimonialss from "../assets//testi.jpg";
import testimonialsss from "../assets//testim.jpg";
const testimonials = [
  {
    text: "Thank you so much for your help. It’s exactly what I’ve been looking for. LMS is exactly what our business has been lacking.",
    name: "Divya Sharma",
    reviews: "12",
    image: testimonial,
  },
  {
    text: "The platform made learning so interactive and fun. I highly recommend it to everyone!",
    name: "Shruti Verma",
    reviews: "8",
    image: testimonialss,
  },
  {
    text: "Excellent support and well-structured content. It saved me a lot of time.",
    name: "Anita Singh",
    reviews: "15",
    image: testimonialsss,
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* Sliding Testimonial Card */}
        <div
          className="
            absolute bottom-1 right-4 sm:right-20
            md:left-1/2 md:right-auto
            md:translate-x-[-50%]
            w-[190px] sm:w-[210px] md:w-[230px]
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-xl p-2 sm:p-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] text-gray-700 leading-snug">
                “{testimonials[index].text}”
              </p>
              <div className="mt-2">
                <p className="font-semibold text-gray-900 text-xs">
                  {testimonials[index].name}
                </p>
                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                </div>
                <p className="text-[9px] text-gray-400 mt-1">
                  {testimonials[index].reviews} reviews at Yelp
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
