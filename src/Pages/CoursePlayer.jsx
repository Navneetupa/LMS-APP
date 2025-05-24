import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Settings,
  Play,
  SkipBack,
  SkipForward,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import arrowLeft from '../assets/image (1).png';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [playSpeed, setPlaySpeed] = useState(1);
  const [modules, setModules] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseTitle, setCourseTitle] = useState('Course Player');
  const [instructorName, setInstructorName] = useState('Unknown Instructor');
  const [courses, setCourses] = useState([]);
  const [activeLecture, setActiveLecture] = useState({ moduleIndex: null, lessonIndex: null });
  const [assessments, setAssessments] = useState([]);
  const [isAssessmentsModalOpen, setIsAssessmentsModalOpen] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch course content
        const contentRes = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch enrollment status and course details
        const enrollmentRes = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch all courses for book section
        const coursesRes = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch assessments
        const assessmentsRes = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${courseId}/assessments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (enrollmentRes.data.success) {
          const enrolledCourses = enrollmentRes.data.data;
          const isUserEnrolled = enrolledCourses.some(
            (enrollment) => enrollment.course?._id === courseId
          );
          setIsEnrolled(isUserEnrolled);

          const course = enrolledCourses.find(
            (enrollment) => enrollment.course?._id === courseId
          );
          if (course?.course) {
            setCourseTitle(course.course.title);
            setInstructorName(`${course.course.instructor.firstName} ${course.course.instructor.lastName}`);
          }
        }

        if (contentRes.data.success) {
          const formattedModules = contentRes.data.data.map((section) => ({
            title: section.sectionTitle,
            lessons: section.lectures.map((lecture, index) => ({
              title: lecture.title,
              time: lecture.duration
                ? `${Math.floor(lecture.duration / 60)}:${lecture.duration % 60
                    .toString()
                    .padStart(2, '0')}`
                : '0:00',
              locked: isEnrolled ? false : index !== 0 && !lecture.isPreview,
              content: lecture.content,
            })),
            active: false,
          }));
          setModules(formattedModules);

          // Auto-select the first lecture of the first module
          if (formattedModules.length > 0 && formattedModules[0].lessons.length > 0) {
            const firstLecture = formattedModules[0].lessons[0];
            setSelectedVideo({
              title: firstLecture.title,
              description: firstLecture.content?.description || firstLecture.description || 'No description available.',
              url: firstLecture.content?.url || null,
            });
            setActiveLecture({ moduleIndex: 0, lessonIndex: 0 });
          }
        }

        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data);
        }

        if (assessmentsRes.data.success) {
          setAssessments(assessmentsRes.data.data);
        } else {
          setAssessmentsError('No assessments found for this course.');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setAssessmentsError('Failed to load assessments.');
      }
    };

    fetchData();
  }, [courseId]);

  const toggleModule = (index) => {
    setModules((prevModules) =>
      prevModules.map((mod, i) => ({
        ...mod,
        active: i === index ? !mod.active : false,
      }))
    );
  };

  const toggleAssessmentsModal = () => {
    setIsAssessmentsModalOpen(!isAssessmentsModalOpen);
  };

  const handleAttemptAssessment = (assessmentId) => {
    navigate(`/courses/${courseId}/assessments/${assessmentId}`);
    setIsAssessmentsModalOpen(false);
  };

  return (
    <div className="bg-[#eaf5ff] p-1 sm:p-2 md:p-4 flex flex-col min-h-[calc(100vh-3.5rem)] w-full mt-[3.5rem]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-xl shadow w-full flex-wrap gap-y-2"
      >
        <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
          <Link to="/courses" className="p-1 w-[2.5rem] h-[2.5rem] rounded-full bg-gray-100 flex-shrink-0">
            <img src={arrowLeft} alt="Back" className="!w-full !h-full !rounded-md" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-medium text-xs sm:text-sm truncate">
              Course: {courseTitle}
            </h1>
            <p className="text-[10px] sm:text-xs w-fit text-white bg-green-300 px-2 py-1 rounded">
              {instructorName}
            </p>
          </div>
        </div>
        <button
          onClick={toggleAssessmentsModal}
          className="bg-[#49BBBD] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-[#49BBBD] transition"
        >
          Your Assessments
        </button>
      </motion.div>

      {/* Assessments Modal */}
      {isAssessmentsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Course Assessments</h2>
              <button
                onClick={toggleAssessmentsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {assessmentsError ? (
              <p className="text-red-500 text-sm">{assessmentsError}</p>
            ) : assessments.length === 0 ? (
              <p className="text-gray-600 text-sm">No assessments available.</p>
            ) : (
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment._id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold">{assessment.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{assessment.description}</p>
                    </div>
                    <button
                      onClick={() => handleAttemptAssessment(assessment._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-green-600 transition"
                    >
                      Attempt
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 sm:gap-4 mt-2 w-full max-w-7xl mx-auto flex-1">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow p-2 sm:p-3 flex flex-col" style={{ height: 'fit-content' }}>
            {selectedVideo?.url ? (
              <video
                src={selectedVideo.url}
                controls
                controlsList="nodownload"
                className="rounded-lg object-cover w-full max-h-[260px] sm:max-h-[400px] md:max-h-[500px]"
              />
            ) : (
              <div className="rounded-lg w-full bg-gray-200 h-[260px] sm:h-[400px] md:h-[500px]" />
            )}

            {/* Video Title & Description */}
            {selectedVideo && (
              <div className="mt-4">
                <h2 className="text-base sm:text-lg font-semibold mb-1">
                  {selectedVideo.title || 'Untitled Video'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {selectedVideo.description || 'No description available.'}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Course Contents */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 flex flex-col"
        >
          <div className="bg-white p-2 sm:p-3 rounded-lg shadow h-fit flex flex-col overflow-hidden">
            <div>
              <h2 className="font-bold text-sm sm:text-base">{instructorName}</h2>
              <p className="text-[10px] sm:text-xs text-green-600">{modules.length} Modules</p>
            </div>

            <div
              className="flex-1 overflow-y-auto mt-3 pr-1 sm:pr-2"
              style={{ maxHeight: 'calc(100vh - 230px)' }}
            >
              {modules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={i !== modules.length - 1 ? 'mb-3' : ''}
                >
                  <div className="border rounded-lg p-2">
                    <div
                      className={`flex justify-between font-semibold items-center cursor-pointer ${
                        mod.active ? 'text-black' : ''
                      }`}
                      onClick={() => toggleModule(i)}
                    >
                      <span className="truncate text-sm">{mod.title}</span>
                      {mod.active ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{mod.lessons.length} Lessons</span>
                      )}
                    </div>

                    {mod.active && (
                      <div className="mt-1 space-y-1 text-xs sm:text-sm">
                        {mod.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center p-1 bg-gray-50 hover:bg-gray-100 ${
                              lesson.locked ? 'text-gray-400 cursor-not-allowed' : 'text-[#00c8a0] cursor-pointer'
                            } ${
                              activeLecture.moduleIndex === i && activeLecture.lessonIndex === idx
                                ? 'bg-green-50'
                                : ''
                            }`}
                            onClick={() => {
                              if (!lesson.locked) {
                                setSelectedVideo({
                                  title: lesson.title,
                                  description: lesson.content?.description || lesson.description || 'No description available.',
                                  url: lesson.content?.url || null,
                                });
                                setActiveLecture({ moduleIndex: i, lessonIndex: idx });
                              } else {
                                alert('This lesson is locked. Please enroll in the course to access all content.');
                              }
                            }}
                          >
                            <span>{lesson.title || `Lesson ${idx + 1}`}</span>
                            <span className="flex items-center gap-1 text-[10px]">
                              {lesson.time || '0:00'}{' '}
                              {lesson.locked && <Lock className="w-3 h-3" />}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Book Section */}
            <div className="p-2 sm:p-3 rounded-lg border bg-white shadow mt-3">
              <h2 className="font-bold text-sm sm:text-base mb-2">Explore more</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {courses.map((course, idx) => (
                  <Link
                    to={`/courses/${course._id}`}
                    key={idx}
                    className="p-1 rounded-lg border bg-white shadow hover:shadow-md transition-shadow"
                  >
                    <img
                      src={course.thumbnail}
                      className="rounded-lg mb-1 h-20 sm:h-24 object-cover w-full"
                      alt={course.title}
                    />
                    <p className="text-xs font-semibold truncate">{course.title}</p>
                    <p className="text-xs text-green-600">
                      ₹{course.discountPrice || course.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}