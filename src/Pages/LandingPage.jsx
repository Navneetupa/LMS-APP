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
import NewsSection from "../components/NewsSection";
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
      <Features />
      <LMSInfo />
      <FeatureHighlight />
      <LearnGrow />
      <LearningSection />
      <SimplifyLearning />
    <TestimonialNewsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
