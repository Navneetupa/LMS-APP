import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../Profiledashboard/ThemeContext"; // Adjust path

const Notification = React.lazy(() => import("./Notification")); // Lazy load if needed

const AssessmentScore = () => {
  const { theme } = useContext(ThemeContext); // Access theme
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Show notification
  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("Please log in to view courses.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://lms-backend-flwq.onrender.com/api/v1/students/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const courseData = response.data.data || [];
        setCourses(courseData);
        if (courseData.length === 0) {
          showNotification("No courses found.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        showNotification("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch assessments when a course is selected
  useEffect(() => {
    if (!selectedCourseId) {
      setAssessments([]);
      setSelectedAssessmentId("");
      setAssessmentResult(null);
      return;
    }

    const fetchAssessments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("Please log in to view assessments.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${selectedCourseId}/assessments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const assessmentData = response.data.data || [];
        setAssessments(assessmentData);
        setSelectedAssessmentId("");
        setAssessmentResult(null);
        if (assessmentData.length === 0) {
          showNotification("No assessments found for this course.");
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
        showNotification("Failed to load assessments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [selectedCourseId]);

  // Fetch assessment result when an assessment is selected
  useEffect(() => {
    if (!selectedCourseId || !selectedAssessmentId) {
      setAssessmentResult(null);
      return;
    }

    const fetchAssessmentResult = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("Please log in to view assessment results.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${selectedCourseId}/assessments/${selectedAssessmentId}/result`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data.data;
        setAssessmentResult(result);
      } catch (error) {
        console.error("Error fetching assessment result:", error);
        showNotification("Failed to load assessment result.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentResult();
  }, [selectedCourseId, selectedAssessmentId]);

  return (
    <div className={`sm:p-0 mt-12 md:mt-6 h-fit px-[10px] lg:py-6 lg:px-6 bg-white dark:bg-gray-900 rounded-lg space-y-6 max-w-4xl mx-auto transition-colors duration-300`}>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <h1 className="text-[2rem] font-bold text-slate-900 dark:text-gray-100 pb-2">Assessment Scores</h1>
      <div className="space-y-5">
        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 text-[#49BBBD] dark:text-[#49BBBD]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2 text-gray-700 dark:text-gray-300">Loading...</span>
          </div>
        )}

        {/* Course Selection */}
        <div className="space-y-1">
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Course
          </label>
          <select
            id="course"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 text-base focus:ring-2 focus:ring-[#49BBBD] focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={loading}
          >
            <option value="">Select a course</option>
            {courses.map((course) =>
              course.course ? (
                <option key={course.course._id} value={course.course._id}>
                  {course.course.title}
                </option>
              ) : null
            )}
          </select>
          {!loading && courses.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">No courses available.</p>
          )}
        </div>

        {/* Assessment Selection */}
        {selectedCourseId && (
          <div className="space-y-1">
            <label htmlFor="assessment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Assessment
            </label>
            <select
              id="assessment"
              value={selectedAssessmentId}
              onChange={(e) => setSelectedAssessmentId(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 text-base focus:ring-2 focus:ring-[#49BBBD] focus:border-transparent transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              disabled={loading || assessments.length === 0}
            >
              <option value="">Select an assessment</option>
              {assessments.map((assessment) => (
                <option key={assessment._id} value={assessment._id}>
                  {assessment.title}
                </option>
              ))}
            </select>
            {!loading && assessments.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">No assessments available for this course.</p>
            )}
          </div>
        )}

        {/* Assessment Result */}
        {assessmentResult && !loading && (
          <div className="space-y-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {assessmentResult.assessment.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Type:</p>
                <p className="text-base text-gray-900 dark:text-gray-100 capitalize">
                  {assessmentResult.assessment.type}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</p>
                <p className="text-base text-gray-900 dark:text-gray-100 capitalize">
                  {assessmentResult.status}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Score:</p>
                <p className="text-base text-gray-900 dark:text-gray-100">
                  {assessmentResult.score}/
                  {assessmentResult.totalPoints || "100 (based on questions)"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Passing Score:</p>
                <p className="text-base text-gray-900 dark:text-gray-100">
                  {assessmentResult.assessment.passingScore}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date:</p>
                <p className="text-base text-gray-900 dark:text-gray-100">
                  {new Date(assessmentResult.assessment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Submission Date:</p>
                <p className="text-base text-gray-900 dark:text-gray-100">
                  {new Date(assessmentResult.submissionDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentScore;