import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const CourseHeader = () => {
  const { courseId } = useParams(); // Get course ID from URL
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback image in case the thumbnail is invalid or missing
  const fallbackImage = 'https://via.placeholder.com/600x400?text=Course+Thumbnail';

  // Fetch specific course data from the API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        if (!courseId) {
          throw new Error('No course ID provided');
        }

        const response = await fetch(`https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch course data: ${response.statusText}`);
        }

        const data = await response.json();
        // Handle both direct course object and wrapped response
        const course = data.data || data;

        if (course && course.thumbnail) {
          setThumbnail(course.thumbnail);
          // Log the thumbnail URL for debugging
        } else {
          throw new Error('No thumbnail found for this course');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching course data:', err);
        setThumbnail(fallbackImage); // Set fallback image on error
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <div className="w-full min-h-screen relative mt-12">
      {/* Background Image */}
      {loading ? (
        <div className="w-full h-[600px] bg-gray-200 animate-pulse" />
      ) : error ? (
        <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <motion.img
          src={thumbnail || fallbackImage}
          alt="Course Thumbnail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[600px] object-cover"
          onError={(e) => {
            console.error('Background image failed to load:', thumbnail);
            e.target.src = fallbackImage; // Fallback on image load failure
          }}
        />
      )}

      {/* Course Info Card - Floating Box */}
      <motion.div
        className="absolute bottom-0 right-10 bg-white shadow-2xl rounded-xl p-6 w-[90%] sm:w-[350px] space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <div className="w-full h-[220px] bg-gray-200 animate-pulse rounded-lg" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <img
            src={thumbnail || fallbackImage}
            alt="Course Thumbnail"
            className="w-full h-[220px] object-cover rounded-lg"
            onError={(e) => {
              console.error('Card image failed to load:', thumbnail);
              e.target.src = fallbackImage; // Fallback on image load failure
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CourseHeader;