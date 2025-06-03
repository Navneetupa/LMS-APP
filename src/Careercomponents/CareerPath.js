import React from "react";
import {
  Briefcase,
  GraduationCap,
  School,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "High School",
    description: "Foundation of your academic journey.",
    icon: <School className="w-6 h-6 text-white" />,
  },
  {
    title: "Graduation",
    description: "Specialize in your field of interest.",
    icon: <GraduationCap className="w-6 h-6 text-white" />,
  },
  {
    title: "Internship",
    description: "Gain real-world exposure and practical skills.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
  },
  {
    title: "First Job",
    description: "Start your career and build experience.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
  {
    title: "Mid-Level Role",
    description: "Grow your leadership and problem-solving skills.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
  },
  {
    title: "Senior Position",
    description: "Lead projects, mentor juniors, and strategize.",
    icon: <GraduationCap className="w-6 h-6 text-white" />,
  },
  {
    title: "Leadership",
    description: "Shape the future of teams and organizations.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
  {
    title: "Director",
    description: "Oversee departments and align strategic goals.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
  },
  {
    title: "CXO / Founder",
    description: "Drive vision, innovation, and company direction.",
    icon: <Rocket className="w-6 h-6 text-white" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CareerPath = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-white to-gray-100">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="text-center mb-14">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900"
            variants={itemVariants}
          >
            Your <span className="text-[#59c1c3]">Career Path</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Visualize your journey from learner to leader with modern steps.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative bg-[#49bbbd1a] border border-transparent hover:border-[#49bbbd] rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
              variants={itemVariants}
            >
              <div className="absolute top-5 right-5 w-10 h-10 bg-[#49bbbd] text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <div className="mt-14">
                <h4 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#49bbbd] transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CareerPath;


