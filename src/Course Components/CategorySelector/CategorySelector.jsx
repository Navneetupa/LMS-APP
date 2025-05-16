import React from "react";

// Image imports
import developmentImage from '../../assets/developmentImage.png';
import designImage from '../../assets/designImage.png';
import marketingImage from '../../assets/marketingImage.png';
import languagesImage from '../../assets/languagesImage.png';
import photographyImage from '../../assets/photographyImage.png';
import businessImage from '../../assets/businessImage.png';
import actingImage from '../../assets/actingImage.png';
import webDevelopmentImage from '../../assets/webDevelopmentImage.png';

const categories = [
  { id: 1, title: "Development", image: developmentImage, quote: "Build the future with code." },
  { id: 2, title: "Design", image: designImage, quote: "Design is not just what it looks like, it's how it works." },
  { id: 3, title: "Marketing", image: marketingImage, quote: "Marketing is telling the world you’re a rock star." },
  { id: 4, title: "Languages", image: languagesImage, quote: "Learn a new language, unlock new worlds." },
  { id: 5, title: "Photography", image: photographyImage, quote: "Photography is the story I fail to put into words." },
  { id: 6, title: "Business", image: businessImage, quote: "Business opportunities are like buses, there’s always another one coming." },
  { id: 7, title: "Acting", image: actingImage, quote: "Acting is being real in imaginary circumstances." },
  { id: 8, title: "Web Development", image: webDevelopmentImage, quote: "Create the digital world with Web Development." },
];

const CategorySelector = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 md:px-16 bg-white">
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center" data-aos="fade-right">
          Choose a course category
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md"
              data-aos="zoom-in"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-20 h-20 sm:w-24 sm:h-24 mb-4 object-cover rounded-full"
              />
              <span className="text-base sm:text-lg font-medium">{cat.title}</span>
              <p className="text-xs sm:text-sm mt-3 text-gray-500">{cat.quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategorySelector;
