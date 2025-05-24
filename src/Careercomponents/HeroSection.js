import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <div className="relative py-20 px-6 h-160 text-center overflow-hidden">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('About1.jpg')",
          opacity: 0.5, 
          zIndex: 1,
        }}
      ></div>

      {/* Content with scroll animation */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-6 drop-shadow-lg">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto mb-6 drop-shadow-md leading-relaxed">
          Empowering learners from foundational stages through pre-university, we meticulously cultivate an environment where individual agency flourishes.{" "}
          <span className="font-bold text-black">Students </span>are not merely educated, but profoundly inspired to innovate, strategically explore, and lead, forging their unique pathways to a future replete with{" "}
          <span className="font-bold text-black">boundless possibilities</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
