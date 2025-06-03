import React from "react";

const heroImage = "/About2.png";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative">
      <div className="relative z-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight pl-4">
          <span className="text-orange-400">About Us</span>
        </h1>
        <p className="mt-4 md:mt-6 text-gray-600 pl-4 text-sm sm:text-base">
          Empowering learners from foundational stages through pre-university, we meticulously cultivate an environment where individual agency flourishes. Students are not merely educated, but profoundly inspired to innovate, strategically explore, and lead, forging their unique pathways to a future replete with boundless possibilities.
        </p>
      </div>

      <div className="relative flex justify-center items-center z-20 mt-8 md:mt-0">
        {/* Centered circle behind the image */}
        <div 
          className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-[#49bbbd] -z-10"
          aria-hidden="true"
        ></div>

        <img
          src={heroImage}
          alt="About Illustration"
          className="w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] relative z-10 mx-auto rounded-2xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        />

        {/* Top Badge */}
        <div className="absolute top-[-3.5rem] sm:top-[-3.25rem] md:top-[-3.5rem] lg:top-[-2rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full flex items-center text-sm sm:text-base z-20">
          <span className="text-cyan-500 font-semibold mr-2">10.5K</span> Happy Students
        </div>

        {/* Bottom Badge */}
        <div className="absolute bottom-[-3.5rem] sm:bottom-[-3rem] md:bottom-[-2.5rem] lg:bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded-full text-sm sm:text-base z-20">
          Define Your Future
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
