import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroSection from "../Careercomponents/HeroSection";
import PreparingStudents from "../Careercomponents/PreparingStudents";
import InstructorCourse from "../Careercomponents/InstructorCourse";
import WhyItWorks from "../Careercomponents/WhyItWorks";
import LMSFeatures from "../Careercomponents/LMSFeatures";
import Navbar from "../components/StickyNavbar";
import Footer from "../components/Footer";

const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <PreparingStudents />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <InstructorCourse />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <WhyItWorks />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <LMSFeatures />
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default AboutUs;

