import React from "react";

const features = [
  {
    title: "Personalized Learning",
    description:
      "Students learn at their own pace, filling knowledge gaps before moving ahead.",
    icon: "🧠",
  },
  {
    title: "Trusted Content",
    description:
      "Expert-curated material across all major subjects ensures effective learning.",
    icon: "📚",
  },
  {
    title: "Empowered Teachers",
    description:
      "Teachers get tools to analyze, tailor, and elevate instruction for each student.",
    icon: "👩‍🏫",
  },
];

const WhyItWorks = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-slate-100 text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Why it Works</h2>
      <div className="w-24 h-1 bg-[#49BBBD] mx-auto mb-12 rounded-full"></div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="shadow-md hover:shadow-2xl p-8 rounded-3xl transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 text-[#0A1F2F]"
            style={{
              backgroundColor: "rgba(73, 187, 189, 0.12)", // 12% initial bg
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(73, 187, 189, 0.6)"; // 60% hover bg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(73, 187, 189, 0.12)"; // revert to 12%
            }}
          >
            <div className="w-20 h-20 flex items-center justify-center mx-auto text-4xl rounded-full bg-white text-[#49BBBD] shadow-lg mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-[#0A1F2F]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyItWorks;
