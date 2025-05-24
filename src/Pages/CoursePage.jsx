// CoursePage.jsx
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

import Header from '../components/StickyNavbar.jsx';
import CategorySelector from '../Course Components/CategorySelector/CategorySelector.jsx';
import Hero from '../Course Components/Hero/Hero.jsx';
import RecommendedCourses from '../Course Components/RecommendedCourses/RecommendedCourses.jsx';
import PromoSection from '../Course Components/PromoSection/PromoSection.jsx';
import PopularCourses from '../Course Components/PopularCourses/PopularCourses.jsx';
import LatestCourses from '../Course Components/LatestCourses/LatestCourses.jsx';
import Footer from '../Course Components/Footer/Footer.jsx';

function CoursePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans overflow-x-hidden space-y-0"> {/* Added space-y-0 */}
      <Header />
      <Hero />
      <CategorySelector />
      <RecommendedCourses />
      <PromoSection />
      <PopularCourses />
      <LatestCourses />
      <Footer />
    </div>
  );
}

export default CoursePage;