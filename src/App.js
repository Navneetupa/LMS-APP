import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import CoursesPage from "./Pages/CoursePage.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import Career from "./Pages/Career.js";
import About from "./Pages/AboutUs.js";
import Contact from "./Pages/ContactUs.js";
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LandingPage" element={<LandingPage/>} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetails />} /> 
        <Route path="/career" element={<Career />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
