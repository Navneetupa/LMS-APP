import React from "react";
import { motion } from "framer-motion";


import Aws from "../assets/aws.png";
import Azure from "../assets/clear.png";
import Gcp from "../assets/course1.png";
import Linux from "../assets/clear.png";


import RightOne from "../assets/your-right-image.png";
import RightTwo from "../assets/your-right-image.png";
import RightThree from "../assets/your-right-image.png";
import RightFour from "../assets/your-right-image.png";

const articles = [
  {
    title: "Become a Cloud Expert",
    desc: "Master cloud technologies and get certified.",
    price: "$89.00",
    image: Aws,
    imageRight: RightOne,
  },
  {
    title: "Enhance Your Career",
    desc: "Upgrade your skills with industry-leading courses.",
    price: "$79.99",
    image: Azure,
    imageRight: RightTwo,
  },
  {
    title: "Hands-On Experience",
    desc: "Work on real-world projects and improve your portfolio.",
    price: "$99.50",
    image: Gcp,
    imageRight: RightThree,
  },
  {
    title: "Learn from the Best",
    desc: "Get taught by industry experts with years of experience.",
    price: "$119.00",
    image: Linux,
    imageRight: RightFour,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const MarketingArticles = () => {
  return (
    <motion.div
      className="mt-10 bg-blue-50 p-6 rounded-2xl shadow-inner"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 text-center">
        Marketing Articles
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer relative min-h-[400px]"
            whileHover={{ scale: 1.05 }}
          >
            <div className="overflow-hidden rounded mb-4">
              <motion.img
                src={article.image}
                alt={article.title}
                className="h-40 w-full object-cover rounded transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </div>
            <h3 className="text-base font-semibold text-gray-800">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.desc}</p>

            {/* Price on the bottom-right */}
            <div className="absolute bottom-6 right-6 text-xl font-semibold text-gray-800">
              {article.price}
            </div>

            {/* Right-side PNG image, positioned on the bottom-left */}
            <img
              src={article.imageRight}
              alt="Right icon"
              className="absolute bottom-6 left-6 w-12 h-12 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketingArticles;
