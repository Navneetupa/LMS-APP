import React from "react";
import Aws from "../../assets/aws.png";
import Course1 from "../../assets/course1.png";
import Clear from "../../assets/clear.png";
import Photography from "../../assets/photography.png";
import avatar from "../../assets/avatar.jpg";

const popularCourses = [
  {
    id: 1,
    title: "Advanced UI/UX Techniques",
    instructor: "Floyd Miles",
    duration: "5h 10m",
    price: "$14",
    image: Aws,
  },
  {
    id: 2,
    title: "SEO & Digital Marketing",
    instructor: "Annette Black",
    duration: "4h 30m",
    price: "$11",
    image: Course1,
  },
  {
    id: 3,
    title: "Data Structures in Python",
    instructor: "Robert Fox",
    duration: "6h",
    price: "$17",
    image: Clear,
  },
  {
    id: 4,
    title: "Photography for Beginners",
    instructor: "Albert Flores",
    duration: "3h 45m",
    price: "Free",
    image: Photography,
  },
];

const PopularCourses = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-16">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" data-aos="fade-right">
        <h2 className="text-xl sm:text-2xl font-semibold">Popular Courses</h2>
        <a href="#" className="text-sm sm:text-base text-blue-600 hover:underline">
          View All
        </a>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
            data-aos="zoom-in"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold text-base sm:text-lg line-clamp-2">{course.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <img
                  src={avatar}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{course.instructor}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>{course.duration}</span>
                <span className="font-semibold text-blue-600">{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
