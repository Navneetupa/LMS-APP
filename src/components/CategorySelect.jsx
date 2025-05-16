import React from "react";

// Aap apni images ko import kar sakte hain ya URL bhi use kar sakte hain
import developmentImage from '../assets/developmentImage.png';
import designImage from '../assets/designImage.png';
import marketingImage from '../assets/marketingImage.png';
import languagesImage from '../assets/languagesImage.png';
import photographyImage from '../assets/photographyImage.png';
import businessImage from '../assets/businessImage.png';
import actingImage from '../assets/actingImage.png'; // Add your image for Acting
import webDevelopmentImage from '../assets/webDevelopmentImage.png'; // Add your image for Web Development

const categories = [
  { id: 1, title: "Web Development", image: developmentImage, quote: "Build the future with code." },
  { id: 2, title: "App Development", image: designImage, quote: "Design is not just what it looks like, it's how it works." },
  { id: 3, title: "DataScience", image: marketingImage, quote: "Marketing is telling the world you’re a rock star." },
  { id: 4, title: "Machine Learning & AI", image: languagesImage, quote: "Learn a new language, unlock new worlds." },
  { id: 5, title: "Cyber-Security", image: photographyImage, quote: "Photography is the story I fail to put into words." },
  { id: 6, title: "Cloud Computing", image: businessImage, quote: "Business opportunities are like buses, there’s always another one coming." },
  { id: 7, title: "DevOps", image: actingImage, quote: "Acting is being real in imaginary circumstances." },
  { id: 8, title: "BlockChain", image: webDevelopmentImage, quote: "Create the digital world with Web Development." },
];

const CategorySelector = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 md:px-16 bg-white">
      {/* First Container */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-right">
  <span className="text-[#0b0b0b]">Perfect</span>{' '}
  <span className="text-[#49BBBD]">Courses</span>
</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md"
              data-aos="zoom-in"
            >
              {/* Image Display */}
              <img src={cat.image} alt={cat.title} className="w-24 h-24 mb-4 object-cover rounded-full" />
              <span className="text-lg font-medium">{cat.title}</span>
              {/* Small quote under each card */}
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
              className="bg-gray-100 hover:bg-blue-100 transition p-6 rounded-xl flex flex-col items-center text-center shadow-md"
              data-aos="zoom-in"
            >
              {/* Image Display */}
              <img src={cat.image} alt={cat.title} className="w-24 h-24 mb-4 object-cover rounded-full" />
              <span className="text-lg font-medium">{cat.title}</span>
              {/* Small quote under each card */}
              <p className="text-sm mt-4 text-gray-500">{cat.quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategorySelector;
