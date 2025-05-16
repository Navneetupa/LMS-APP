import React, { useEffect, useState } from "react";

const metrics = [
  { value: "5K+", label: "Learners Empowered", start: 1 },
  { value: "500+", label: "Expert Instructors", start: 10 },
  { value: "3,200+", label: "Courses Delivered", start: 10 },
  { value: "50", label: "Chief Experts", start: 1 },
  { value: "95%", label: "Satisfaction Rate", start: 0 },
];

const parseNumericValue = (str) => {
  let normalized = str.replace(/,/g, "").replace(/\+/g, "").replace(/%/g, "");
  if (normalized.toUpperCase().includes("K")) {
    return parseFloat(normalized.toUpperCase().replace("K", "")) * 1000;
  }
  return parseFloat(normalized);
};

const formatValue = (value, originalValue) => {
  if (originalValue.includes("K+")) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K+";
    }
    return value.toString();
  } else if (originalValue.includes("+")) {
    return value + "+";
  } else if (originalValue.includes("%")) {
    return value + "%";
  } else {
    return value.toString();
  }
};

const SuccessMetrics = () => {
  const [displayedMetrics, setDisplayedMetrics] = useState(
    metrics.map((item) => {
      const targetNum = parseNumericValue(item.value);
      return { ...item, currentValue: item.start > targetNum ? targetNum : item.start };
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedMetrics((prevMetrics) =>
        prevMetrics.map((item) => {
          const targetNum = parseNumericValue(item.value);
          let currentNum = parseNumericValue(item.currentValue.toString());

          if (currentNum < targetNum) {
            let increment = 1;
            if (targetNum > 1000) {
              increment = 50;
            } else if (targetNum > 100) {
              increment = 5;
            }

            let nextNum = Math.min(currentNum + increment, targetNum);
            return { ...item, currentValue: nextNum };
          } else {
            return { ...item, currentValue: targetNum };
          }
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
       <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
  <span className="text-black">Our </span>
  <span className="text-[#49BBBD]">Success</span>
</h2>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          We believe in delivering results, not just promises. Here’s how we’ve done it.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
        {displayedMetrics.map((item, index) => (
          <div
            key={index}
            className="opacity-0 transform translate-y-10 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold inline-block bg-gradient-to-r from-[#136CB5] to-[#49BBBD] bg-clip-text text-transparent">
  {formatValue(item.currentValue, item.value)}
</h3>

            <p className="text-xs sm:text-sm text-gray-700 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessMetrics;
