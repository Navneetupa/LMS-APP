import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Settings,
  Play,
  SkipBack,
  SkipForward,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import axios from 'axios';

import arrowLeft from '../assets/image (1).png';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [playSpeed, setPlaySpeed] = useState(1);
  const [modules, setModules] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseTitle, setCourseTitle] = useState('Course Player');
  const [instructorName, setInstructorName] = useState('Unknown Instructor');
  const [courses, setCourses] = useState([]);
  const [activeLecture, setActiveLecture] = useState({ moduleIndex: null, lessonIndex: null });

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
      } catch (error) {
        console.error('Failed to fetch data:', error);
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

  return (
    <div className="bg-[#eaf5ff] p-1 mt-[3.5rem] sm:p-2 md:p-4 flex flex-col min-h-screen w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-xl shadow w-full flex-wrap gap-y-1"
      >
        <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
          <button className="p-1 w-[3rem] h-[3rem] rounded-full bg-gray-100 flex-shrink-0">
            <img src={arrowLeft} alt="Back" className="!w-[100%] !h-[100%] !rounded-md" />
          </button>
          <div className="!w-[20rem]">
            <h1 className="font-medium text-xs sm:text-sm !sm:w-[160px] !w-full">
              Course: {courseTitle}
            </h1>
            <p className="text-[10px] sm:text-xs w-fit text-white bg-green-300 px-2 py-1 rounded">
              {instructorName}
            </p>
          </div>
        </div>
        <button className="p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors">
          <Settings className="text-gray-500 w-3 h-3" />
        </button>
      </motion.div>

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
                className="rounded-lg object-cover w-full max-h-[260px] sm:max-h-[30rem]"
              />
            ) : (
              <div className="rounded-lg w-full" />
            )}

            {/* Video Title & Description */}
            {selectedVideo && (
              <div className="mt-4">
                <h2 className="text-base font-semibold mb-1">
                  {selectedVideo.title || 'Untitled Video'}
                </h2>
                <p className="text-sm text-gray-600">
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
                            className={`flex justify-between items-center p-1  bg-gray-250 hover:bg-gray-350 ${
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

              {/* Book Section */}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}