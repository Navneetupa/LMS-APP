import React from "react";
import { motion } from "framer-motion";  // Import motion from framer-motion
import { useInView } from "react-intersection-observer";  // Import intersection observer
import Group from "../assets/laptop.png";
import My from "../assets/feature.png";
import News from "../assets/feature.png";
import New from "../assets/feature.png";

const newsItems = [
  {
    title: "Discover how AI-driven tools personalize each student’s education.",
    category: "NEWS",
    image: Group,
    description: "Integrating AI Tutors into Everyday Learning” – by Riya Bisht (June 2025)",
    link: "#",
  },
  {
    title: "Explore game-based strategies that boost motivation in online classes.",
    category: "PRESS RELEASE",
    image: My,
    description: "Engaging Students with Gamification” – by Rahul Mehta (May 2025)",
    link: "#",
  },
  {
    title: "Practical advice for blending in-person and virtual learning effectively.",
    category: "NEWS",
    image: News,
    description: "Top 5 Tips for Hybrid Teaching” – by Ananya Singh (April 2025) ",
    link: "#",
  },
  {
    title: " Explore game-based strategies that boost motivation in online classes.",
    category: "NEWS",
    image: New,
    description: "This year, investors have reaped big financial returns from betting on Game Based Strategies.",
    link: "#",
  },
];

export default function NewsSection() {
  const { ref: largeNewsRef, inView: largeNewsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: smallNewsRef, inView: smallNewsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-blue-900"> 
          <span className="text-black">Latest News and </span>
             <span className="text-[#49BBBD]">Resources </span>
        </h2>
        <p className="text-gray-600 mt-2">
          See the developments that have occurred to LMS in the world
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Large featured news (left side) */}
        <motion.div
          ref={largeNewsRef}
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: largeNewsInView ? 1 : 0,
            x: largeNewsInView ? 0 : -100,
          }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={newsItems[0].image}
            alt="Featured News"
            className="w-full h-60 object-cover"
          />
          <div className="p-6 flex flex-col justify-between">
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full w-fit mb-2 font-semibold">
              {newsItems[0].category}
            </span>
            <h3 className="text-lg font-semibold mb-2">{newsItems[0].title}</h3>
            <p className="text-sm text-gray-600 mb-2">{newsItems[0].description}</p>
           
          </div>
        </motion.div>

        {/* Smaller news cards stacked vertically on the right */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {newsItems.slice(1).map((item, index) => (
            <motion.div
              key={index}
              ref={smallNewsRef}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: smallNewsInView ? 1 : 0,
                y: smallNewsInView ? 0 : 100,
              }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover"  
              />
              <div className="p-4 flex-1">
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                  {item.category}
                </span>
                <h4 className="text-sm font-semibold mt-2 leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
