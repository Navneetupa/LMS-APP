import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import "swiper/css";
import "swiper/css/autoplay";

const instructors = [
  {
    name: 'Deepak Kumar',
    img: 'image5.png',
    description: 'Expert in Mathematics with 10+ years of teaching experience.',
  },
  {
    name: 'Diya Jain',
    img: 'CareerPage.png',
    description: 'Science educator passionate about simplifying complex concepts.',
  },
  {
    name: 'Rohit Singh',
    img: 'image4.png',
    description: 'Specializes in English and communication skills.',
  },
  {
    name: 'Ayush Khan',
    img: 'image7.png',
    description: 'Computer Science instructor with industry knowledge.',
  },
  {
    name: 'Sneha Mehra',
    img: 'image6.png',
    description: 'Focuses on creative learning and student engagement.',
  },
  {
    name: 'Raj Verma',
    img: 'image9.png',
    description: 'History and Geography mentor with interactive teaching style.',
  },
];

// ✅ Extracted card component
const InstructorCard = ({ instructor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl transition-transform duration-500 hover:scale-105 overflow-hidden group max-w-sm w-full"
    >
      <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        ★ Featured
      </div>
      <div className="relative">
        <img
          src={instructor.img}
          alt={instructor.name}
          style={{ objectPosition: "center 20%" }}
          className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-3xl" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-cyan-600 mb-2 group-hover:text-cyan-800 transition-colors duration-300">
          {instructor.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {instructor.description}
        </p>
      </div>
    </motion.div>
  );
};

const InstructorCourse = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-[#e6f7f9] py-20 px-4 md:px-20 text-center relative">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        Meet Our Expert Instructors
      </h2>
      <div className="w-24 h-1 bg-[#49BBBD] mx-auto mb-12 rounded-full"></div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-6xl mx-auto"
      >
        {instructors.map((instructor, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <InstructorCard instructor={instructor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstructorCourse;


