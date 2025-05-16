import React from "react";
import HeroSection from "../Careercomponents/HeroSection";
import PreparingStudents from "../Careercomponents/PreparingStudents";
import InstructorCourse from "../Careercomponents/InstructorCourse";
import WhyItWorks from "../Careercomponents/WhyItWorks";
import LMSFeatures from "../Careercomponents/LMSFeatures";
import Navbar from "../CourseDetailsComponent/Header";
import Footer from "../CourseDetailsComponent/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <HeroSection />
      <PreparingStudents />
      <InstructorCourse />
      <WhyItWorks />
      <LMSFeatures />
      <Footer />

    </div>
  );
};

export default AboutUs;
