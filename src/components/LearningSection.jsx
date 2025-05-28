import React, { useEffect } from "react";
import heroGirl from '../assets/girl.png';
import group from '../assets/Group.png';
import AOS from "aos";
import "aos/dist/aos.css";

const LearningSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: false,
      mirror: true
    });
  }, []);

  return (
    <div className="bg-white py-16 px-4 sm:px-8 md:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-4">
            Learn. Grow. <br /> <span className="text-[#49BBBD]">Succeed.</span>
          </h2>
          <p className="text-gray-600 max-w-md sm:max-w-lg">
            Unlock your potential with expert-led courses, real-world projects, and flexible learning tools — all in one powerful LMS platform.
          </p>
        </div>
        <div 
          className="relative flex justify-center"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="relative z-10">
            <img
              src={heroGirl}
              alt="Student"
              className="w-72 sm:w-80 md:w-96 object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div 
            className="absolute top-4 left-4 w-6 h-6 bg-yellow-400 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="300"
          ></div>
          <div 
            className="absolute bottom-6 right-6 w-4 h-4 bg-green-400 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="400"
          ></div>
          <div 
            className="absolute top-0 right-16 w-3 h-3 bg-purple-400 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="500"
          ></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 gap-10">
        <div 
          className="bg-white shadow-xl rounded-xl p-6 max-w-sm relative"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <img
            src={group}
            alt="Group of people"
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-all duration-500 hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>

        <div
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Real-Time <span className="text-[#49BBBD]">Assessments </span>& Management
          </h3>
          <p className="text-gray-600 max-w-md sm:max-w-lg">
  <span className="font-bold">Live Quizzes & Exams:</span> Launch timed quizzes during class or assign tests for homework. Questions
  can be auto-graded for immediate feedback.
</p>
    <p className="text-gray-600 max-w-md sm:max-w-lg">
  <span className="font-bold">Instant Grading:</span> Objective answers are graded instantly. Teachers can review subjective answers in real time or offline later.</p>
        
              <p className="text-gray-600 max-w-md sm:max-w-lg">
  <span className="font-bold">Attendance & Rosters:</span>Take attendance online–even in virtual classes and maintain up-to-date
class lists. Integrates with your schedule seamlessly.
</p>
                   <p className="text-gray-600 max-w-md sm:max-w-lg">
  <span className="font-bold">Private Discussions:</span>Chat one-on-one with any student during or after class. Keep personalized
threads for confidential feedback or tutoring.
</p>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
