import React, { useEffect } from "react";
import { FaFileInvoiceDollar, FaClipboardList, FaChartLine } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    icon: <FaFileInvoiceDollar className="text-3xl text-blue-500" />,
    title: "Online Billing, Invoicing & Contracts",
    description: "Manage all billing-related tasks with ease, including contracts and payments."
  },
  {
    icon: <FaClipboardList className="text-3xl text-green-500" />,
    title: "Easy Enrollment & Attendance Tracking",
    description: "Simple tools for managing student attendance and course enrollments."
  },
  {
    icon: <FaChartLine className="text-3xl text-purple-500" />,
    title: "Learners' Tracking",
    description: "Track learner progress, engagement and performance in real-time."
  }
];

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: false,
      mirror: true
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div 
        className="text-center mb-10 px-4" 
        data-aos="fade-down"
        data-aos-offset="200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All-in-One <span className="text-[#49BBBD]">Cloud Software</span>.
        </h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          LMS is a powerful online solution that combines all the tools needed to run a successful learning platform.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-offset="200"
          >
            <div className="mb-4 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
