import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    title:
      "Unlock Your Potential. Define Your Future. Interactive Pathways to Global Readiness",
    subheading: "Igniting Confidence and Intellectual Exploration in Every Learner.",
    description:
      "We cultivate future-ready talent by delivering dynamic, outcome-driven learning experiences. Through a blend of personalized mentorship and highly interactive modules, students develop critical competencies, fostering both intellectual prowess and essential soft skills for impactful real-world application.",
    image: "Contentimg1.png",
    reverse: false,
  },
  {
    title: "Activating Minds Through Dynamic Interaction",
    subheading: "Experiences that Resonate Knowledge that Endures.",
    description:
      "Our learning environments strategically integrate cutting-edge pedagogical approaches with advanced technological infrastructure to cultivate highly engaging, participant-centric experiences. This methodology drives accelerated knowledge acquisition, fosters critical analytical capabilities, and embeds a proactive commitment to continuous professional development.",
    image: "Contentimg2.png",
    reverse: true,
  },
  {
    title: "Cultivating Real-World Readiness and Enduring Impact",
    subheading: "Cultivating Proficiency for Academic Rigor and Professional Resilience.",
    description:
      "Beyond foundational knowledge, our rigorous curriculum and experiential learning frameworks are designed to cultivate a comprehensive suite of high-demand competencies. We strategically develop advanced practical skills, optimize collaborative capabilities, and enhance emotional intelligence, preparing individuals for impactful leadership and sustained success in complex, dynamic professional ecosystems.",
    image: "Contentimg3.jpg",
    reverse: false,
  },
];

// Child component for each card
const Card = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col-reverse md:flex-row ${
        item.reverse ? "md:flex-row-reverse" : ""
      } items-stretch gap-10 md:gap-20`}
    >
      {/* Text Section */}
      <div className="md:w-1/2 h-96 overflow-auto bg-white bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-md">
        <h3 className="text-2xl md:text-3xl font-bold text-[#0A1F2F] mb-2">{item.title}</h3>
        <h4 className="text-lg font-medium text-[#49BBBD] mb-4">{item.subheading}</h4>
        <p className="text-gray-700 text-base leading-relaxed">{item.description}</p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 h-96">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl group">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#49BBBDcc] via-transparent to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-lg text-[#49BBBD] p-2 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422A12.083 12.083 0 0118 15c0 2.486-.697 4.786-1.88 6.722L12 14z"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PreparingStudents = () => {
  return (
    <div className="py-20 px-6 bg-slate-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        Preparing Students to Achieve Success
      </h2>
      <div className="w-24 h-1 bg-[#49BBBD] mx-auto mb-12 rounded-full"></div>

      <div className="space-y-20 max-w-7xl mx-auto">
        {cards.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PreparingStudents;


