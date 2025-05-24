import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import record from "../assets/record.png";
import email from "../assets/email.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ScrollFadeSection = ({ children }) => {
  const ref = useRef();
  const controls = useAnimation();
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = ref.current?.getBoundingClientRect().top;
      const bottom = ref.current?.getBoundingClientRect().bottom;
      const inView = top < window.innerHeight && bottom > 0;

      if (inView && !hasAnimatedIn) {
        controls.start("visible");
        setHasAnimatedIn(true);
      }

      if (!inView && hasAnimatedIn) {
        controls.start("hidden");
        setHasAnimatedIn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, hasAnimatedIn]);

  return (
    <motion.div
      ref={ref}
      variants={fadeVariants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default function SimplifyLearning() {
  return (
    <motion.div
      className="p-8 bg-white min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <ScrollFadeSection>
       <div>
           <h2 className="text-3xl sm:text-4xl font-bold text-[#49BBBD] leading-tight">
            <span className="text-black">Empower </span> Learning.

<br />
          <span className="text-black">Elevate </span>Management. <br/>
 <span className="text-black">Expand </span> Possibilities.
          </h2>
       </div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
           Unlock the full potential of education with a powerful Learning Management System built
for institutions and training organizations. From seamless course delivery to real-time
progress tracking — manage, scale, and transform learning experiences with unmatched
efficiency
          </p>
        </ScrollFadeSection>

        <ScrollFadeSection>
          <div className="p-6 rounded-2xl shadow-lg relative">
            <img src={record} alt="Record of Results" className="w-full rounded-lg" />
          </div>
        </ScrollFadeSection>
      </div>

      {/* One-on-One Discussion Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-20">
        <ScrollFadeSection>
          <div className="bg-white border shadow-lg rounded-xl p-6 w-full max-w-md mx-auto">
            <img
              src={email}
              alt="Combined"
              className="w-full h-72 object-cover rounded-xl"
            />
          </div>
        </ScrollFadeSection>

        <ScrollFadeSection>
          <h3 className="text-2xl sm:text-3xl font-bold text-black-900 mb-2">
           Private One-on-One <span className="text-[#49BBBD]">Discussions</span>
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
           Facilitate meaningful conversations between teachers, assistants, and students — all within the
Zoom platform. Discuss progress, provide feedback, or offer support without ever leaving the virtual
classroom.
          </p>
        </ScrollFadeSection>
      </div>

      {/* Call-to-Action Button */}
      <ScrollFadeSection>
        <div className="flex justify-center mt-12">
         <a
  href="/courses"
  className="w-[260px] h-[60px] rounded-full border border-[#49BBBD] text-[#49BBBD] text-lg font-semibold flex items-center justify-center hover:bg-[#49BBBD]/10 transition"
>
  Start Learning Now
</a>

        </div>
      </ScrollFadeSection>
    </motion.div>
  );
}
