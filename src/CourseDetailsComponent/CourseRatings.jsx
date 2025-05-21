import React, { useState, useEffect } from 'react';
import {
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaTelegram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const CourseRatings = () => {
  const { courseId } = useParams();

  // Review states
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentRating, setCommentRating] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  // Course states
  const [price, setPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [courseName, setCourseName] = useState(''); // State for course name
  const [courseError, setCourseError] = useState(null);
  const [courseLoading, setCourseLoading] = useState(false);

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const courseApiUrl = courseId
    ? `https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}`
    : null;
  const reviewsApiUrl = courseId
    ? `https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}/reviews`
    : null;

  useEffect(() => {
  }, [courseId]);

  // Fetch course details including name
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId || !courseApiUrl) {
        setCourseError('Invalid or missing course ID');
        return;
      }

      setCourseLoading(true);
      try {
        const res = await fetch(courseApiUrl);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          if (!data.data) {
            throw new Error('No data field in response');
          }
          setPrice(data.data.price || null);
          setDiscountPrice(data.data.discountPrice || null);
          setCurrency(data.data.currency || 'INR');
          setCourseName(data.data.title || 'Unknown Course'); // Set course name (using 'title' field)
          if (!data.data.price || !data.data.discountPrice) {
            setCourseError('Missing price or discountPrice in response');
          }
        } else {
          setCourseError(data.message || 'Failed to fetch course data');
        }
      } catch (err) {
        console.error('Failed to fetch course pricing:', err);
        setCourseError('Error fetching course data: ' + err.message);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, courseApiUrl]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!courseId || !reviewsApiUrl) {
        setReviewError('Invalid or missing course ID');
        return;
      }

      setReviewLoading(true);
      try {
        const response = await fetch(reviewsApiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          const mappedReviews = data.data.map((review) => ({
            name: `${review.user?.firstName || 'Unknown'} ${review.user?.lastName || ''}`,
            rating: review.rating || 0,
            text: review.comment || '',
          }));
          setReviews(mappedReviews);
        } else {
          setReviewError(data.message || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setReviewError('Error fetching reviews: ' + err.message);
      } finally {
        setReviewLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, reviewsApiUrl]);

  // Review filtering and calculations
  const filteredReviews = reviews.filter((review) =>
    review.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingCount = [1, 2, 3, 4, 5].map(
    (rating) => reviews.filter((review) => review.rating === rating).length
  );

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!courseId || !reviewsApiUrl) {
      setReviewError('Invalid or missing course ID');
      return;
    }
    if (commentText.trim() && commentName.trim() && commentRating > 0) {
      setReviewLoading(true);
      try {
        const response = await fetch(reviewsApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating: commentRating,
            comment: commentText,
          }),
        });

        const data = await response.json();
        if (data.success) {
          const newReview = {
            name: commentName,
            rating: commentRating,
            text: commentText,
          };
          setReviews([...reviews, newReview]);
          setCommentText('');
          setCommentName('');
          setCommentRating(0);
        } else {
          setReviewError(data.message || 'Failed to submit review');
        }
      } catch (err) {
        console.error('Error submitting review:', err);
        setReviewError('Error submitting review: ' + err.message);
      } finally {
        setReviewLoading(false);
      }
    } else {
      setReviewError('Please provide a name, rating, and comment');
    }
  };

  // Calculate discount percentage
  const getDiscountPercent = () => {
    if (!price || !discountPrice) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6 relative p-4 sm:p-6 bg-gray-50">
      <motion.div
        className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full lg:w-2/3"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="w-full max-w-[400px] h-[50px] text-lg sm:text-xl font-bold text-white bg-[#49BBBD] flex items-center justify-center mb-4 rounded cursor-pointer hover:bg-[#3ea1a3] transition">
          {courseLoading ? 'Loading...' : `Course Overview - ${courseName || 'Unknown Course'}`}
        </h2>
        {courseError && <p className="text-sm text-red-500 mb-4">{courseError}</p>}

        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {reviewLoading && <p className="text-sm text-gray-600">Loading reviews...</p>}
        {reviewError && <p className="text-sm text-red-500">{reviewError}</p>}

        {!reviewLoading && (
          <>
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
              <div className="w-full lg:w-[250px] h-[160px] bg-white p-4 border rounded-lg shadow-sm flex flex-col justify-center items-start">
                <div className="flex text-yellow-500 text-base">
                  {[...Array(Math.round(averageRating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </p>
              </div>

              <div className="flex flex-col justify-between text-xs text-gray-600 w-full">
                {ratingCount.map((count, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2 w-full">
                    <div className="flex">
                      {[...Array(5 - index)].map((_, i) => (
                        <FaStar key={i} size={12} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                      <div
                        className="bg-[#49BBBD] text-white h-1 rounded-full"
                        style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <div key={index} className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-800">{review.name}</p>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} size={12} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No reviews match your search.</p>
              )}
            </div>
          </>
        )}

        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-2 p-2 border border-gray-300 rounded text-sm"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
          />
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={20}
                className={`cursor-pointer mr-1 ${
                  star <= commentRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setCommentRating(star)}
              />
            ))}
          </div>
          <textarea
            placeholder="Your comment..."
            className="w-full p-2 border border-gray-300 rounded text-sm mb-2"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            disabled={reviewLoading}
            className={`bg-[#49BBBD] text-white px-4 py-2 rounded hover:bg-[#3ea1a3] transition text-sm ${
              reviewLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {reviewLoading ? 'Submitting...' : 'Add Comment'}
          </button>
        </div>
      </motion.div>
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full lg:w-[350px]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-600 text-xs mb-2">This course Price Now...</p>

        {courseLoading && <p className="text-sm text-gray-600">Loading price...</p>}
        {courseError && <p className="text-sm text-red-500">{courseError}</p>}

        {!courseLoading && !courseError && (
          <div className="flex items-end flex-wrap gap-2 sm:space-x-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {currencySymbols[currency] || currency} {discountPrice || '...'}
            </span>
            {price && (
              <span className="text-base line-through text-gray-500">
                {currencySymbols[currency] || currency} {price}
              </span>
            )}
            {price && discountPrice && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-semibold">
                {getDiscountPercent()}% Off
              </span>
            )}
          </div>
        )}

        <button className="w-full bg-[#49BBBD] hover:bg-[#3ea1a3] text-white font-bold py-2 text-sm rounded-lg transition duration-200 mb-4">
          Enroll Now
        </button>

        <hr className="w-full border border-gray-300 mb-4" />

        <h2 className="text-lg font-bold text-gray-800 mb-3">This Course Includes</h2>

        <ul className="text-xs text-gray-700 space-y-2 mb-4">
          <li>✔️ Full lifetime access</li>
          <li>✔️ Certificate of completion</li>
          <li>✔️ Access on mobile and TV</li>
          <li>✔️ Training for 5+ people</li>
        </ul>

        <button className="w-full bg-[#49BBBD] hover:bg-[#3ea1a3] text-white py-2 text-sm rounded-lg transition-all duration-300 mb-4">
          Enroll Now
        </button>

        <div className="text-gray-500 text-xs mt-4">
          <div className="font-bold mb-2">Share this course</div>
          <div className="flex flex-wrap gap-3 text-base mt-2">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            <FaTelegram className="hover:text-blue-500 cursor-pointer" />
            <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseRatings;