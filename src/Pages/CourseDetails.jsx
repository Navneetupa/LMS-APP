import React from "react";
import CourseHeader from "../CourseDetailsComponent/CourseHeader";
import CourseRatings from "../CourseDetailsComponent/CourseRatings";
import MarketingArticles from "../CourseDetailsComponent/MarketingArticles";
import FeatureHighlight from "../CourseDetailsComponent/FeatureHighlight";
import TopInstructors from "../CourseDetailsComponent/TopInstructors";
import Header from "../components/StickyNavbar";
import Footer from "../components/Footer";

function CourseDetails() {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <Header />

      <CourseHeader />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 py-6">
        <CourseRatings />
       
        <MarketingArticles />
        <FeatureHighlight />
        <TopInstructors />
      </div>

      <Footer />
    </div>
  );
}

export default CourseDetails;
