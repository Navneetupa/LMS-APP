import React from "react";

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-20 px-6 text-center relative"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="absolute inset-0 bg-[#49BBBD] bg-opacity-80"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-white mb-6">About Us</h2>
        <p className="text-lg text-gray-100 font-medium max-w-2xl mx-auto mb-6">
          From preschool to pre-university, our students enjoy the{" "}
          <span className="font-bold text-white">freedom and responsibility</span> of shaping their own paths in an environment designed to foster innovation, exploration, and growth{" "}
          <span className="font-bold text-white">beyond the classroom</span>.
        </p>
        <button className="bg-white text-[#49BBBD] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all shadow-lg">
          See More
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
