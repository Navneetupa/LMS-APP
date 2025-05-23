import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import CoursesPage from "./Pages/CoursePage.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import Career from "./Pages/Career.js";
import About from "./Pages/AboutUs.js";
import Contact from "./Pages/ContactUs.js";
import Login from "./Pages/Login.jsx";
import FixedNavbar from "./components/StickyNavbar.jsx"; // Make sure path is correct
import StudentDashboard from './Pages/Profiledashboard/parentLayout.jsx'
import CoursePlayer from "./Pages/CoursePlayer.jsx";

function App() {
  return (
    <Router>
      <FixedNavbar />
      <div > 
        <Routes>
          <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} /> 
          <Route path="/career" element={<Career />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/course-player/:courseId" element={<CoursePlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
