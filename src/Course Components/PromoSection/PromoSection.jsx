import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
const PromoSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="bg-[#7ddedf] text-black py-12 px-4 sm:px-6 md:px-16 text-center"
      data-aos="fade-up"
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4"
        data-aos="fade-up"
      >
        Online Course Website for Remote Learning
      </h2>
      <p
        className="text-gray-900 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Empower your future — learn anytime, anywhere with our expert-led online courses.
      </p>
     <Link
  to="/login"
  className="bg-white text-[#2F365F] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:bg-[#aff3f4] transition text-sm sm:text-base inline-block"
  data-aos="fade-up"
  data-aos-delay="400"
>
  Explore Now
</Link>
    </section>
  );
};

export default PromoSection;
