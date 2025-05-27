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
import axios from 'axios';

// Modal Component for Pop-Up
const Modal = ({ isOpen, message, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg shadow-lg max-w-sm w-full ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <p
          className={`text-sm font-medium ${
            type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 rounded text-white text-sm ${
            type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CourseRatings = () => {
  const { courseId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentRating, setCommentRating] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const [price, setPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [courseName, setCourseName] = useState('');
  const [courseError, setCourseError] = useState(null);
  const [courseLoading, setCourseLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(null);

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  // Use environment variable for API base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://lms-backend-flwq.onrender.com';
  const courseApiUrl = courseId
    ? `${API_BASE_URL}/api/v1/courses/${courseId}`
    : null;
  const reviewsApiUrl = courseId
    ? `${API_BASE_URL}/api/v1/courses/${courseId}/reviews`
    : null;

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId || !courseApiUrl) {
        setCourseError('Invalid or missing course ID');
        return;
      }

      setCourseLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(courseApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success && data.data) {
          setPrice(data.data.price || null);
          setDiscountPrice(data.data.discountPrice || null);
          setCurrency(data.data.currency || 'INR');
          setCourseName(data.data.title || 'Unknown Course');
        } else {
          setCourseError(data.message || 'Failed to fetch course data');
        }
      } catch (err) {
        console.error('Failed to fetch course pricing:', err);
        setCourseError(`Error fetching course data: ${err.response?.data?.message || err.message}`);
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
        const token = localStorage.getItem('token');
        console.log('Fetching reviews for courseId:', courseId);
        const { data } = await axios.get(reviewsApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success && data.data) {
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
        setReviewError(`Error fetching reviews: ${err.response?.data?.message || err.message}`);
      } finally {
        setReviewLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, reviewsApiUrl]);

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

  const handleAddComment = async () => {
    if (!courseId || !reviewsApiUrl) {
      setReviewError('Invalid or missing course ID');
      return;
    }
    if (commentText.trim() && commentName.trim() && commentRating > 0) {
      setReviewLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(
          reviewsApiUrl,
          {
            rating: commentRating,
            comment: commentText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
        setReviewError(`Error submitting review: ${err.response?.data?.message || err.message}`);
      } finally {
        setReviewLoading(false);
      }
    } else {
      setReviewError('Please provide a name, rating, and comment');
    }
  };

  const getDiscountPercent = () => {
    if (!price || !discountPrice) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const handleEnrollNow = async () => {
    if (!courseId) {
      setEnrollError('Invalid course ID');
      return;
    }

    // Validate courseId format (MongoDB ObjectId)
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      setEnrollError('Invalid course ID format');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setEnrollError('You must be logged in to enroll.');
      return;
    }

    setEnrollLoading(true);
    setEnrollError(null);
    setEnrollSuccess(null);

    console.log('Enroll attempt:', { courseId, token: token.substring(0, 10) + '...' });

    try {
      // Handle free courses
      if (price === 0 || discountPrice === 0) {
        console.log('Enrolling in free course:', courseId);
        const enrollResponse = await axios.post(
          `${API_BASE_URL}/api/v1/students/courses`,
          { courseId, paymentId: null },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (enrollResponse.data.success) {
          setEnrollSuccess('You have been enrolled successfully!');
        } else {
          setEnrollError(enrollResponse.data.message || 'Enrollment failed');
        }
        setEnrollLoading(false);
        return;
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setEnrollError('Failed to load Razorpay payment gateway');
        setEnrollLoading(false);
        return;
      }

      // Step 1: Create order
      console.log('Creating order for course:', courseId);
      const orderResponse = await axios.post(
        `${API_BASE_URL}/api/v1/payments/create-order`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!orderResponse.data.success) {
        console.error('Order creation failed:', orderResponse.data);
        setEnrollError(orderResponse.data.message || 'Failed to create payment order');
        setEnrollLoading(false);
        return;
      }

      const { orderId, amount, currency, paymentId } = orderResponse.data.data;
      console.log('Order created:', { orderId, amount, currency, paymentId });

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'LMS Platform',
        description: `Payment for course: ${courseName}`,
        order_id: orderId,
        handler: async function (response) {
          console.log('Razorpay payment response:', response);
          try {
            // Step 3: Verify payment
            const verifyResponse = await axios.post(
              `${API_BASE_URL}/api/v1/payments/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!verifyResponse.data.success) {
              setEnrollError(verifyResponse.data.message || 'Payment verification failed');
              setEnrollLoading(false);
              return;
            }

            // Step 4: Enroll in course
            console.log('Enrolling with paymentId:', verifyResponse.data.data.paymentId);
            const enrollResponse = await axios.post(
              `${API_BASE_URL}/api/v1/students/courses`,
              { courseId, paymentId: verifyResponse.data.data.paymentId },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (enrollResponse.data.success) {
              setEnrollSuccess('You have been enrolled successfully!');
            } else {
              setEnrollError(enrollResponse.data.message || 'Enrollment failed');
            }
          } catch (error) {
            console.error('Payment verification or enrollment error:', error);
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              'An error occurred during payment verification or enrollment';
            setEnrollError(errorMessage);
          } finally {
            setEnrollLoading(false);
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
        },
        theme: {
          color: '#49BBBD',
        },
        modal: {
          ondismiss: () => {
            console.log('Razorpay modal dismissed');
            setEnrollError('Payment was cancelled');
            setEnrollLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response);
        setEnrollError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        setEnrollLoading(false);
      });
      razorpay.open();
    } catch (error) {
      console.error('Enroll API error:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred during enrollment';
      setEnrollError(errorMessage);
      setEnrollLoading(false);
    }
  };

  const closeModal = () => {
    setEnrollSuccess(null);
    setEnrollError(null);
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
        <hr className="w-full border border-gray-300 mb-4" />
        <h2 className="text-lg font-bold text-gray-800 mb-3">This Course Includes</h2>
        <ul className="text-xs text-gray-700 space-y-2 mb-4">
          <li>✔️ Full lifetime access</li>
          <li>✔️ Certificate of completion</li>
          <li>✔️ Access on mobile and TV</li>
          <li>✔️ Training for 5+ people</li>
        </ul>
        <button
          onClick={handleEnrollNow}
          disabled={enrollLoading}
          className={`w-full bg-[#49BBBD] hover:bg-[#3ea1a3] text-white py-2 rounded text-sm ${
            enrollLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {enrollLoading ? 'Processing Payment...' : 'Enroll Now'}
        </button>
      </motion.div>

      <Modal
        isOpen={!!enrollSuccess || !!enrollError}
        message={enrollSuccess || enrollError}
        type={enrollSuccess ? 'success' : 'error'}
        onClose={closeModal}
      />
    </div>
  );
};

export default CourseRatings;