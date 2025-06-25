import React, { useContext, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { ThemeContext } from "../../Pages/Profiledashboard/ThemeContext";
import dotnetImg from "../../assets/iconsss.png"; // TODO: Replace with actual .NET image
import webdevImg from "../../assets/iconsss.png"; // TODO: Replace with actual Web Dev image
import mongodbImg from "../../assets/iconsss.png"; // TODO: Replace with actual MongoDB image
import jsImg from "../../assets/iconsss.png"; // TODO: Replace with actual JS image
import jayAvatar from "../../assets/iconsss.png"; // TODO: Replace with actual Jay avatar
import ruchikaAvatar from "../../assets/iconsss.png"; // TODO: Replace with actual Ruchika avatar

const courses = [
  {
    image: dotnetImg,
    title: ".Net",
    subtitle: "C#",
    price: 1800,
    discountPrice: null,
    author: "Jay Prakash",
    rating: 5,
    avatar: jayAvatar,
  },
  {
    image: webdevImg,
    title: "Basics of Web Dev",
    subtitle: "100 days course for master full stack",
    price: 1999.99,
    discountPrice: null,
    author: "Ruchika P",
    rating: 5,
    avatar: ruchikaAvatar,
  },
  {
    image: mongodbImg,
    title: "MongoDB",
    subtitle: "Database",
    price: 1499,
    discountPrice: null,
    author: "Jay Prakash",
    rating: 4,
    avatar: jayAvatar,
  },
  {
    image: jsImg,
    title: "Advanced Javascript",
    subtitle: "Javascript",
    price: 1400,
    discountPrice: null,
    author: "Jay Prakash",
    rating: 1,
    avatar: jayAvatar,
  },
];

const Notification = ({ message, type, onClose }) => {
  const { theme } = useContext(ThemeContext);
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 ${
        type === "error"
          ? theme === "dark"
            ? "bg-red-600 dark:bg-red-700"
            : "bg-red-500"
          : theme === "dark"
          ? "bg-green-600 dark:bg-green-700"
          : "bg-green-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:text-gray-200 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const CourseCard = ({
  image,
  title,
  subtitle,
  price,
  discountPrice,
  author,
  rating,
  avatar,
  onClick,
  handlePlay,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer relative"
      onClick={onClick}
    >
      <div className="w-full h-36 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 overflow-hidden relative group">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#49BBBD] dark:bg-[#3A9D9D] text-white p-2 rounded-full shadow-lg hover:scale-110 z-50"
          title="Play Course"
        >
          <FaPlay className="text-xs" />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-gray-200 mb-1 truncate">
        {title}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
        {subtitle}
      </p>
      <div className="flex justify-between items-center text-xs">
        {discountPrice ? (
          <>
            <span className="font-semibold text-slate-700 dark:text-gray-300">
              ₹{price - discountPrice}
            </span>
            <span className="text-gray-500 dark:text-gray-400 line-through">
              ₹{price}
            </span>
          </>
        ) : (
          <span className="font-semibold text-slate-700 dark:text-gray-300">
            ₹{price}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 text-xs">
        <span className="text-gray-700 dark:text-gray-300 truncate">
          👨‍🏫 {author}
        </span>
        <span className="text-yellow-500 dark:text-yellow-400">
          ⭐ {rating}
        </span>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayedCourses = courses.slice(0, 3);

  const handlePlay = (title) => {
    console.log(`Playing course: ${title}`);
  };

  return (
    <div className={`w-full ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Our Bookmarks
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCourses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            subtitle={course.subtitle}
            price={course.price}
            discountPrice={course.discountPrice}
            author={course.author}
            rating={course.rating}
            avatar={course.avatar}
            onClick={() => console.log(`Clicked course: ${course.title}`)}
            handlePlay={() => handlePlay(course.title)}
          />
        ))}
      </div>

      {courses.length > 3 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={openModal}
            className="px-8 py-3 bg-[#49BBBD] dark:bg-[#3A9D9D] text-white rounded-full font-semibold text-lg hover:bg-[#7dded] dark:hover:bg-[#2A8D8D] transition-colors duration-300 shadow-lg"
          >
            View All Courses
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                All Courses
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course, index) => (
                <CourseCard
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  price={course.price}
                  discountPrice={course.discountPrice}
                  author={course.author}
                  rating={course.rating}
                  avatar={course.avatar}
                  onClick={() => {
                    console.log(`Clicked course: ${course.title}`);
                    closeModal();
                  }}
                  handlePlay={() => {
                    handlePlay(course.title);
                    closeModal();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;