import React from "react";
import Aws from "../../assets/aws.png";
import Course1 from "../../assets/course1.png";
import Clear from "../../assets/clear.png";
import Photography from "../../assets/photography.png";
import avatar from "../../assets/avatar.jpg";

const latestCourses = [
  {
    id: 1,
    title: "Beginner's Guide to AI",
    instructor: "Esther Howard",
    duration: "4h 20m",
    price: "$13",
    image: Aws,
  },
  {
    id: 2,
    title: "Flutter Mobile Dev",
    instructor: "Darlene Robertson",
    duration: "5h 15m",
    price: "$16",
    image: Course1,
  },
  {
    id: 3,
    title: "Typography in Web Design",
    instructor: "Cameron Williamson",
    duration: "3h 10m",
    price: "$10",
    image: Clear,
  },
  {
    id: 4,
    title: "Ethical Hacking 101",
    instructor: "Ronald Richards",
    duration: "6h 45m",
    price: "$19",
    image: Photography,
  },
];

const LatestCourses = () => {
  return (
    <section className="bg-gray-50 py-8 px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Header */}
      <div
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        data-aos="fade-left"
      >
        <h2 className="text-xl sm:text-2xl font-semibold">Latest Courses</h2>
        <a
          href="#"
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          View all
        </a>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300"
            data-aos="fade-up"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <img
                  src={avatar}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="truncate">{course.instructor}</span>
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

export default LatestCourses;
