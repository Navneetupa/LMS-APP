import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import StickyNavbar from "../components/StickyNavbar";
import Navbar from "../components/Navbar";
import SuccessMetrics from "../components/SuccessMetrics";
import Features from "../components/Features";
import LMSInfo from "../components/LMSInfo";
import FeatureHighlight from "../components/Highlight";
import LearnGrow from "../components/LearnGrow";
import SimplifyLearning from "../components/SimplifyLearning";
import LearningSection from "../components/LearningSection";
import TestimonialNewsSection from "../components/TestimonialNewsSection";

import CourseDetail from "../components/InstructorCourse"
import Footer from "../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans overflow-x-hidden ">
      <StickyNavbar />
      <Navbar />
      <SuccessMetrics />
      <FeatureHighlight />
      <LMSInfo />
      <Features />
  <CourseDetail />

      <LearningSection />
      <SimplifyLearning />
      <LearnGrow />
      <TestimonialNewsSection />
    
      <Footer />
    </div>
  );
};

export default LandingPage;
