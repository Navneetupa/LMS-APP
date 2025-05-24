import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Settings,
  Play,
  SkipBack,
  SkipForward,
  ChevronDown,
  Lock,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isHelpSidebarOpen, setIsHelpSidebarOpen] = useState(false);
  const [assessmentsError, setAssessmentsError] = useState('');

  // Support form state
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
    category: 'course',
    relatedCourse: courseId || '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [contactCourses, setContactCourses] = useState([]);

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

        // Fetch user profile and enrolled courses for support form
        const profileRes = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { firstName, lastName } = profileRes.data.data;
        setForm((prev) => ({ ...prev, name: `${firstName} ${lastName}` }));

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
          setContactCourses(enrolledCourses.map((enrollment) => ({
            _id: enrollment.course._id,
            title: enrollment.course.title,
          })));
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

  const toggleHelpSidebar = () => {
    setIsHelpSidebarOpen(!isHelpSidebarOpen);
  };

  const handleAttemptAssessment = (assessmentId) => {
    navigate(`/courses/${courseId}/assessments/${assessmentId}`);
    setIsAssessmentsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://lms-backend-flwq.onrender.com/api/v1/students/support',
        {
          subject: form.subject,
          message: form.message,
          category: 'course',
          relatedCourse: form.relatedCourse || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setSuccessMsg('Support ticket submitted successfully.');
        setForm((prev) => ({
          ...prev,
          subject: '',
          message: '',
          category: 'course',
          relatedCourse: courseId || '',
        }));
      } else {
        setErrorMsg('Failed to submit the ticket.');
      }
    } catch (error) {
      setErrorMsg('Failed to submit the ticket.');
    } finally {
      setLoading(false);
    }
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
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={toggleAssessmentsModal}
            className="bg-[#49BBBD] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-[#3AA8AA] transition"
          >
            Your Assessments
          </button>
          <button
            onClick={toggleHelpSidebar}
            className="bg-transparent text-black px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-[#49BBBD] hover:text-white border border-2-[#49BBBD] transition flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>
      </motion.div>

      {/* Assessments Modal */}
      <AnimatePresence>
        {isAssessmentsModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Sidebar */}
      <AnimatePresence>
        {isHelpSidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg sm:text-xl font-semibold">Contact Support</h2>
              <button
                onClick={toggleHelpSidebar}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="p-4 w-full"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center">
                Contact Support
              </h2>

              {successMsg && (
                <p className="text-green-600 text-sm sm:text-base mb-4 sm:mb-6 text-center">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-red-600 text-sm sm:text-base mb-4 sm:mb-6 text-center">
                  {errorMsg}
                </p>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    disabled
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 bg-gray-100 cursor-not-allowed text-gray-600 text-sm sm:text-base focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
                    Related Course
                  </label>
                  <select
                    name="relatedCourse"
                    value={form.relatedCourse}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a course (optional)</option>
                    {contactCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[#49BBBD] text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-[#3AA8AA] transition duration-200 text-sm sm:text-base font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                className="rounded-lg object-cover w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
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