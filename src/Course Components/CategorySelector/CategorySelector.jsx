import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Placeholder images (replace with actual paths or URLs)
import developmentImage from '../../assets/developmentImage.png';
import designImage from '../../assets/designImage.png';
import marketingImage from '../../assets/marketingImage.png';
import languagesImage from '../../assets/languagesImage.png';
import photographyImage from '../../assets/photographyImage.png';
import businessImage from '../../assets/businessImage.png';
import actingImage from '../../assets/actingImage.png';
import webDevelopmentImage from '../../assets/webDevelopmentImage.png';

// Category data (aligned with API categories)
const categories = [
  { id: 1, title: "Web Development", image: developmentImage, quote: "Build the future with code." },
  { id: 2, title: "App Development", image: designImage, quote: "Design is not just what it looks like, it's how it works." },
  { id: 3, title: "Data Science", image: marketingImage, quote: "Unlock insights with data." },
  { id: 4, title: "Machine Learning & AI", image: languagesImage, quote: "Create intelligent systems." },
  { id: 5, title: "Cybersecurity", image: photographyImage, quote: "Secure the digital world." },
  { id: 6, title: "Cloud Computing", image: businessImage, quote: "Scale with the cloud." },
  { id: 7, title: "DevOps", image: actingImage, quote: "Streamline development and operations." },
  { id: 8, title: "Blockchain", image: webDevelopmentImage, quote: "Build decentralized solutions." },
];

const CategorySelector = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async (pageNum) => {
      setLoading(true);
      try {
        const response = await fetch(`https://lms-backend-flwq.onrender.com/api/v1/courses?page=${pageNum}&limit=10&sort=-createdAt`);
        const data = await response.json();
        if (data.success) {
          setCourses((prev) => [...prev, ...data.data]);
          setHasMore(data.data.length === 10);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses(page);
  }, [page]);

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const filteredCourses = selectedCategory
    ? courses.filter((course) =>
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 md:px-16 bg-white">
      {/* First Container */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-right">
          <span className="text-[#0b0b0b]">Categories </span>{' '}
          <span className="text-[#49BBBD]">Courses</span>
          <span> For You</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              className={`bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md cursor-pointer ${selectedCategory === cat.title ? 'bg-blue-200' : ''}`}
              data-aos="zoom-in"
              onClick={() => handleCategoryClick(cat.title)}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-24 h-24 mb-4 object-cover rounded-full"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <span className="text-lg font-medium">{cat.title}</span>
              <p className="text-sm mt-4 text-gray-500">{cat.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Second Container */}
      <section className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.slice(4).map((cat) => (
            <div
              key={cat.id}
              className={`bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md cursor-pointer ${selectedCategory === cat.title ? 'bg-blue-200' : ''}`}
              data-aos="zoom-in"
              onClick={() => handleCategoryClick(cat.title)}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-24 h-24 mb-4 object-cover rounded-full"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <span className="text-lg font-medium">{cat.title}</span>
              <p className="text-sm mt-4 text-gray-500">{cat.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Courses */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <div className="modal-header">
              <button
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-xl font-semibold transition"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Courses in {selectedCategory}
              </h3>
            </div>
            {loading && <p className="text-center text-gray-600 text-lg">Loading courses...</p>}
            {error && <p className="text-center text-red-500 text-lg">{error}</p>}
            {!loading && !error && filteredCourses.length === 0 && (
              <p className="text-center text-gray-600 text-lg">
                No courses found for {selectedCategory}
              </p>
            )}
            {!loading && !error && filteredCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Link to={`/courses/${course._id}`} key={course._id} className="w-full">
                    <div
                      className="bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md"
                      data-aos="zoom-in"
                    >
                      <img
                        src={course.thumbnail || 'https://via.placeholder.com/150'}
                        alt={course.title}
                        className="w-24 h-24 mb-4 object-cover rounded-full"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                      />
                      <span className="text-lg font-medium text-gray-800">{course.title}</span>
                      <p className="text-sm mt-2 text-gray-600 line-clamp-2">{course.subtitle}</p>
                      <p className="text-sm mt-2 text-gray-500">
                        By {course.instructor.firstName} {course.instructor.lastName}
                      </p>
                      <p className="text-sm mt-1 text-gray-500">{course.duration} hours</p>
                      <p className="text-sm mt-1 text-gray-500">${course.discountPrice}</p>
                      <p className="text-sm mt-1 text-gray-500">
                        Rating: {course.rating} ({course.totalRatings} reviews)
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {hasMore && !loading && (
              <button
                onClick={loadMore}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;