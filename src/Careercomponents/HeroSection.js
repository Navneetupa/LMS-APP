import React from "react";

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-20 px-6 text-center relative"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1451316016/photo/lms-learning-management-system-for-lesson-and-online-education-course-application-study-e.jpg?s=612x612&w=0&k=20&c=fRH0AanVP3IkjZtYNwJiyALkAvN3plLtrcPd1L2MrJo=')",
      }}
    >
      {/* Stronger overlay for better text readability */}
      <div className="absolute inset-0" style={{ backgroundColor: "#49BBBDCC" }}></div> {/* CC = ~80% opacity */}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto mb-6 drop-shadow-md leading-relaxed">
          From preschool to pre-university, our students enjoy the{" "}
          <span className="font-bold text-white">freedom and responsibility</span> of shaping their own paths in an environment designed to foster innovation, exploration, and growth{" "}
          <span className="font-bold text-white">beyond the classroom</span>.
        </p>
       
      </div>
    </div>
  );
};

export default HeroSection;
