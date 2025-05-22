import React from "react";

const features = [
  {
    title: "Interactive Lessons",
    description: "Engage students with videos, quizzes, and real-time feedback.",
    image: "https://cdn-icons-png.flaticon.com/512/3652/3652314.png",
  },
  {
    title: "Progress Tracking",
    description: "Monitor student performance with analytics & dashboards.",
    image: "https://img.icons8.com/color/96/combo-chart--v1.png",
  },
  {
    title: "Assignments & Grading",
    description: "Create, assign, and grade work efficiently and clearly.",
    image: "https://cdn-icons-png.flaticon.com/512/11725/11725632.png",
  },
  {
    title: "Live Classes",
    description: "Conduct live sessions and webinars with integrated tools.",
    image: "https://img.icons8.com/color/96/video-call.png",
  },
];

const LMSFeatures = () => {
  return (
    <div className="py-20 px-6 md:px-16 bg-gradient-to-tr from-white to-cyan-50">
      <h2 className="text-4xl font-extrabold text-center text-cyan-900 mb-6 tracking-wide">
        Key Features of Our LMS
      </h2>
      <p className="text-center text-cyan-700 max-w-3xl mx-auto mb-16 text-lg">
        Empower your learning experience with features built to improve engagement, monitoring, and success.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center
                       transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br
                       hover:from-cyan-400 hover:to-cyan-200 hover:text-white cursor-pointer"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-24 h-24 mb-6 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LMSFeatures;
