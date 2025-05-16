import React from "react";

const cards = [
  {
    title: "Building Confident and Goal-Oriented Learners",
    subheading: "Fostering self-belief and academic curiosity in every student.",
    description:
      "We empower students with personalized support and interactive lessons that help them grow both academically and personally. Our approach nurtures their curiosity and confidence, preparing them to thrive in real-world scenarios.",
    image: "student1.jpg",
    reverse: false,
  },
  {
    title: "Engaging Learning Through Interactive Classrooms",
    subheading: "Creating meaningful learning experiences that last.",
    description:
      "Our classrooms combine dynamic teaching techniques with technology to create immersive, student-focused environments. This encourages active participation, deeper understanding, and a love for lifelong learning.",
    image: "student1.jpg",
    reverse: true,
  },
  {
    title: "Enabling Success Beyond the Curriculum",
    subheading: "Preparing students for both exams and life challenges.",
    description:
      "We focus not only on academic excellence but also on practical skills, teamwork, and emotional intelligence. This holistic approach ensures learners are ready to succeed beyond textbooks.",
    image: "student1.jpg",
    reverse: false,
  },
];

const PreparingStudents = () => {
  return (
    <div className="py-20 px-6 bg-slate-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        Preparing Students to Achieve Success
      </h2>
      <div className="w-24 h-1 bg-[#49BBBD] mx-auto mb-12 rounded-full"></div>

      <div className="space-y-20 max-w-7xl mx-auto">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col-reverse md:flex-row ${
              item.reverse ? "md:flex-row-reverse" : ""
            } items-center gap-10 md:gap-20`}
          >
            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left bg-white bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0A1F2F] mb-2">
                {item.title}
              </h3>
              <h4 className="text-lg font-medium text-[#49BBBD] mb-4">
                {item.subheading}
              </h4>
              <p className="text-gray-700 text-base leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 relative group rounded-xl overflow-hidden shadow-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover transform transition duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#49BBBDcc] via-transparent to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-lg text-[#49BBBD] p-2 rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 15c0 2.486-.697 4.786-1.88 6.722L12 14z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparingStudents;
