import React, { useEffect } from "react";
import instructor1 from '../assets/instructor1.png';
import instructor2 from '../assets/instructor2.png';
import instructor3 from '../assets/instructor3.png';
import AOS from "aos";
import "aos/dist/aos.css";

const LearnGrow = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: false,
      mirror: true
    });
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-20">
      {/* Heading */}
      <div 
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-offset="200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          <span className="text-black-600">Our</span>{" "}
          <span className="text-[#49BBBD]">Features</span>
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Everything You Need to Learn & Grow</p>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left - Video Preview & Actions */}
        <div 
          className="bg-gray-50 rounded-2xl p-6 shadow-lg max-w-2xl w-full"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          {/* Top row (image cards) */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[instructor1, instructor2, instructor3].map((img, index) => (
              <div 
                key={index}
                className="text-center"
                data-aos="zoom-in"
                data-aos-delay={200 + (index * 100)}
              >
                <img 
                  src={img} 
                  alt={index === 0 ? "Instructor" : index === 1 ? "Mentor" : "Trainer"} 
                  className="rounded-xl w-full h-24 object-cover shadow-md hover:shadow-lg transition-shadow"
                />
                <p className="text-xs mt-1 font-semibold">
                  <span className={index === 0 ? "text-blue-600" : "text-gray-600"}>
                    {index === 0 ? "Instructor" : index === 1 ? "Mentor" : "Trainer"}
                  </span>
                </p>
                <p className="text-sm font-medium">
                  {index === 0 ? "Dany Howard" : index === 1 ? "Riya Sharma" : "Navneet"}
                </p>
              </div>
            ))}
          </div>

          {/* Middle row (learner + 2 more images) */}
          <div 
            className="flex flex-wrap items-center justify-between mb-4 gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-center w-1/2 sm:w-1/3">
              <img 
                src={instructor1} 
                alt="Learner 1" 
                className="rounded-xl w-20 h-20 object-cover shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay="500"
              />
              <p className="text-sm font-medium">Deepak Dutt</p>
            </div>
            <div 
              className="text-center text-sm text-gray-500 font-semibold w-full sm:w-auto"
              data-aos="fade-in"
              data-aos-delay="550"
            >
              Learners
            </div>
            <div className="text-center w-1/2 sm:w-1/3">
              <img 
                src={instructor2} 
                alt="Learner 2" 
                className="rounded-xl w-20 h-20 object-cover shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay="600"
              />
              <p className="text-sm font-medium">Soniya Sharma</p>
            </div>
          </div>

          {/* Buttons */}
          <div 
            className="flex items-center justify-center gap-4 mt-4 flex-wrap"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <button 
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="750"
            >
              Certificates
            </button>
            <button 
              className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition-all transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              Enroll
            </button>
          </div>
        </div>

        {/* Right - Feature List */}
        <div 
          className="space-y-6 max-w-md w-full"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          {[ 
            { color: "bg-blue-500", text: "Engaging video lectures, quizzes, and assignments designed for real-world learning." },
            { color: "bg-orange-500", text: "Learn from industry leaders with practical experience and teaching excellence." },
            { color: "bg-gray-400", text: "Get downloadable and shareable certificates after completing courses." }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-4"
              data-aos="fade-left"
              data-aos-delay={200 + (index * 150)}
            >
              <div 
                className={`mt-1 w-3 h-3 rounded-full ${item.color}`}
                data-aos="zoom-in"
                data-aos-delay={250 + (index * 150)}
              ></div>
              <p className="text-gray-700 text-sm sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnGrow;
