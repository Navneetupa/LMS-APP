import React, { useEffect } from "react";
import instructorImg from "../assets/instructor.jpg";
import studentImg from "../assets/student.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const LMSInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10 px-4" data-aos="fade-down">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          What is <span className="text-[#49BBBD] px-2 py-1">LMS</span>?
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Brain Bridge cloud-based LMS connects teachers, students, and admins
          on one secure platform. Instructors can create courses, share
          materials, and assess learners. Students can join from any device,
          track progress, and learn anytime — bringing the full classroom
          experience online.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instructor Card */}
        <div
          className="relative rounded-2xl overflow-hidden min-h-[16rem] sm:min-h-[20rem] bg-cover bg-center"
          style={{ backgroundImage: `url(${instructorImg})` }}
          data-aos="zoom-in-right"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 p-4 text-center">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
              FOR INSTRUCTORS
            </h3>
            <a
              href="/"
              className="border-2 border-white text-white px-5 py-2 rounded-full text-sm sm:text-base hover:bg-white hover:text-black transition inline-block text-center"
            >
              Create & Share Your Courses
            </a>
          </div>
        </div>

        {/* Student Card */}
        <div
          className="relative rounded-2xl overflow-hidden min-h-[16rem] sm:min-h-[20rem] bg-cover bg-center"
          style={{ backgroundImage: `url(${studentImg})` }}
          data-aos="zoom-in-left"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 p-4 text-center">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
              FOR STUDENTS
            </h3>
            <a
              href="/courses"
              className="border-2 border-white text-white px-5 py-2 rounded-full text-sm sm:text-base hover:bg-white hover:text-black transition inline-block text-center"
>
  Create & Share Your Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LMSInfo;
