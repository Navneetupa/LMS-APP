import React from "react";
import Aws from "../../assets/aws.png";
import Course1 from "../../assets/course1.png";
import Clear from "../../assets/clear.png";
import { Link } from "react-router-dom"; 

const courses = [
  {
    id: 1,
    title: "UI/UX Design Basics",
    author: "Jenny Wilson",
    price: "Free",
    duration: "3h 30m",
    image: Aws,
  },
  {
    id: 2,
    title: "Intro to JavaScript",
    author: "Courtney Henry",
    price: "$12",
    duration: "4h 15m",
    image: Course1,
  },
  {
    id: 3,
    title: "Mastering React",
    author: "Dianne Russell",
    price: "$15",
    duration: "5h 45m",
    image: Clear,
  },
];

const Hero = () => {
  return (
    <div className="bg-[#aed2e6] py-10 mt-10 ">
      <section className="max-w-screen-xl mx-auto px-6 md:px-16">
        <div className="mb-8 flex justify-between items-center" data-aos="fade-down">
          <h2 className="text-3xl font-bold font-poppins">
            Welcome Back, Ready for your next lessons?
          </h2>
          <a href="#" className="text-sm text-blue-700 hover:underline">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/courses/${course.id}`} // Link to course details
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
              data-aos="fade-up"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-gray-500 text-sm">by {course.author}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-blue-600">{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
