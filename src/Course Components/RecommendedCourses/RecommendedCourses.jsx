import React from "react";
import Aws from "../../assets/aws.png";
import Course1 from "../../assets/course1.png";
import Clear from "../../assets/clear.png";
import avatar from "../../assets/avatar.jpg";

const recommended = [
  {
    id: 1,
    title: "Product Design Essentials",
    instructor: "Leslie Alexander",
    duration: "4h 45m",
    price: "$9",
    image: Aws,
  },
  {
    id: 2,
    title: "Fullstack Web Dev",
    instructor: "Kristin Watson",
    duration: "6h 10m",
    price: "$15",
    image: Course1,
  },
  {
    id: 3,
    title: "Intro to Graphic Design",
    instructor: "Wade Warren",
    duration: "3h 20m",
    price: "$12",
    image: Clear,
  },
];

const RecommendedCourses = () => {
  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6 md:px-16">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0" data-aos="fade-right">
        <h2 className="text-2xl font-semibold text-center sm:text-left">Recommended for you</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View all
        </a>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-6">
          {recommended.map((course) => (
            <div
              key={course.id}
              className="min-w-[260px] sm:min-w-[300px] bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex-shrink-0"
              data-aos="fade-up"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <img
                    src={avatar}
                    alt={course.instructor}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{course.instructor}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-blue-600">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedCourses;
