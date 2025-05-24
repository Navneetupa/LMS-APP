import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  {
    title: "Performance Analytics",
    description:
      "Gain actionable insights into learner performance through robust analytics and intuitive dashboards.",
    icon: "👩",
  },
  {
    title: "Streamlined Operations",
    description:
      "Streamline content deployment, task allocation, and performance evaluation for optimized operational efficiency.",
    icon: "🧠",
  },
  {
    title: "Teaching Redefined",
    description:
      "Transform teaching with insights that help customize learning for every student.",
    icon: "📚",
  },
];

// Child component for individual feature card
const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
      className="shadow-md hover:shadow-2xl p-8 rounded-3xl transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 text-[#0A1F2F]"
      style={{
        backgroundColor: "rgba(73, 187, 189, 0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(73, 187, 189, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(73, 187, 189, 0.12)";
      }}
    >
      <div className="w-20 h-20 flex items-center justify-center mx-auto text-4xl rounded-full bg-white text-[#49BBBD] shadow-lg mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-[#0A1F2F]">{feature.description}</p>
    </motion.div>
  );
};

const WhyItWorks = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-slate-100 text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Why it Works</h2>
      <div className="w-24 h-1 bg-[#49BBBD] mx-auto mb-12 rounded-full"></div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default WhyItWorks;
